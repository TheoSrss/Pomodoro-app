import { useEffect, useState, useCallback } from "react";
import { PomodoroSession } from "../../web/src/types/pomodoroSession";
import { mapApiToPomodoroSession, createEmptyPomodoroSession, ApiPomodoroSession, } from "../../web/src/lib/mappers/mapPomodoroSession";
import api from "../services/api";

import { HTTPError } from "ky";
// import { EventSourcePolyfill } from 'event-source-polyfill';
import { useUser } from "./useUser";
import EventSource from 'react-native-sse';

export type Action = "create" | "start" | "pause" | "abort";


export const usePomodoroSession = () => {
    const { jwt, user } = useUser();
    // console.log(jwt);

    const [pomodoroSession, setPomodoroSession] = useState<PomodoroSession | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchSession = useCallback(async () => {
        if (!jwt) return;

        setLoading(true);
        try {
            const res = await api.get("session/active");

            const data: ApiPomodoroSession = await res.json<ApiPomodoroSession>();
            setPomodoroSession(mapApiToPomodoroSession(data));
        } catch (error) {
            if (error instanceof HTTPError && error.response?.status === 404) {
                setPomodoroSession(createEmptyPomodoroSession(user?.id));
            }
        } finally {
            setLoading(false);
            console.log(pomodoroSession);

        }

    }, [jwt, user?.id]);



    const performSessionAction = async (
        action: Action,
    ) => {
        if (!jwt) return;
        const url = `session/${action}`;
        // try {
        const body = action === "create"
            ? {
                focusDuration: pomodoroSession?.focusDuration,
                shortBreakDuration: pomodoroSession?.shortBreakDuration,
                longBreakDuration: pomodoroSession?.longBreakDuration,
                repetitions: pomodoroSession?.repetitions
            }
            : null;

        const res = await api.post(url, {
            json: body
        });

        const data: ApiPomodoroSession = await res.json<ApiPomodoroSession>();
        setPomodoroSession(action === 'abort' ? createEmptyPomodoroSession(user.id) : mapApiToPomodoroSession(data));
        // } catch {
        //     return null;
        // } finally {
        //     setLoading(false);
        // }
    };

    const updateSessionField = (field: keyof PomodoroSession, value: number) => {
        if (!pomodoroSession) return;
        setPomodoroSession({
            ...pomodoroSession,
            [field]: value,
        });
    };
    useEffect(() => {
        if (jwt) fetchSession();
    }, [jwt, fetchSession]);

    useEffect(() => {
        if (!user?.jwtSubscriber || !user?.id) return;

        const topic = `/pomodoro/${user.id}`;
        const url = new URL(process.env.EXPO_PUBLIC_MERCURE_URL!);
        url.searchParams.append("topic", topic);
        url.searchParams.append("subscriber", user.jwtSubscriber);

        const eventSource = new EventSource(url.toString(), {
            headers: { Authorization: `Bearer ${user.jwtSubscriber}` },
        });

        eventSource.addEventListener('message', (event: any) => {
            try {
                const data = JSON.parse(event.data);
                if (data.action === "abort") {
                    setPomodoroSession(createEmptyPomodoroSession(user.id));
                } else {
                    setPomodoroSession(mapApiToPomodoroSession(data.session));
                }
            } catch (error) {
                console.error("❌ Error parsing Mercure message", error);
            }
        });

        eventSource.addEventListener('error', (err: any) => {
            console.error("❌ Mercure error", err);
        });

        return () => {
            eventSource.close();
        };
    }, [user?.jwtSubscriber, user?.id]);

    return {
        pomodoroSession,
        loading,
        fetchSession,
        performSessionAction,
        updateSessionField
    };
};

import { useEffect, useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { PomodoroSession } from "@/types/pomodoroSession";
import { mapApiToPomodoroSession, createEmptyPomodoroSession, ApiPomodoroSession, } from "@/lib/mappers/mapPomodoroSession";
import api from "@/lib/api";
import { HTTPError } from "ky";
import { EventSourcePolyfill } from 'event-source-polyfill';

export type Action = "create" | "start" | "pause" | "abort";


export const usePomodoroSession = () => {
    const { data: session } = useSession();
    const [pomodoroSession, setPomodoroSession] = useState<PomodoroSession | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchSession = useCallback(async () => {
        if (!session?.accessToken) return;

        setLoading(true);
        try {
            const res = await api.get("session/active");

            const data: ApiPomodoroSession = await res.json<ApiPomodoroSession>();
            setPomodoroSession(mapApiToPomodoroSession(data));
        } catch (error) {
            if (error instanceof HTTPError && error.response?.status === 404) {
                setPomodoroSession(createEmptyPomodoroSession(session.user.id));
            }
        } finally {
            setLoading(false);
        }
    }, [session?.accessToken, session?.user?.id]);

    const performSessionAction = async (
        action: Action,
    ) => {
        if (!session?.accessToken) return;
        const url = `session/${action}`;
        try {
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
            setPomodoroSession(action === 'abort' ? createEmptyPomodoroSession(session.user.id) : mapApiToPomodoroSession(data));
        } catch {
            return null;
        } finally {
            setLoading(false);
        }
    };

    const updateSessionField = (field: keyof PomodoroSession, value: number) => {
        if (!pomodoroSession) return;
        setPomodoroSession({
            ...pomodoroSession,
            [field]: value,
        });
    };
    useEffect(() => {
        if (session?.accessToken) fetchSession();
    }, [session?.accessToken, fetchSession]);

    useEffect(() => {
        if (!session?.user?.jwtSubscriber) return;

        const topic = `/pomodoro/${session.user.id}`;
        const url = new URL(process.env.NEXT_PUBLIC_MERCURE_URL!);
        url.searchParams.append("topic", topic);

        const eventSource = new EventSourcePolyfill(url.toString(), {
            headers: {
                Authorization: `Bearer ${session.user.jwtSubscriber}`,
            },
            withCredentials: false,
        });

        eventSource.onmessage = (event: MessageEvent) => {
            try {
                const data = JSON.parse(event.data);
                console.log("🔁 Mercure event received:", data);
                if (data.action === "abort") {
                    setPomodoroSession(createEmptyPomodoroSession(session.user.id));
                } else {
                    setPomodoroSession(mapApiToPomodoroSession(data.session));
                }
            } catch (error) {
                console.error("❌ Error parsing Mercure message", error);
            }
        };

        eventSource.onerror = () => {
            console.error("❌ Mercure error");
        };
    }, [session?.user?.jwtSubscriber, session?.user?.id]);

    return {
        pomodoroSession,
        loading,
        fetchSession,
        performSessionAction,
        updateSessionField
    };
};

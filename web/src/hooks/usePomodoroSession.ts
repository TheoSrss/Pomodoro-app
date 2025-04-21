import { useEffect, useState, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import { PomodoroSession } from "@/types/pomodoroSession";
import { mapApiToPomodoroSession, createEmptyPomodoroSession, } from "@/lib/mappers/mapPomodoroSession";

export type Action = "create" | "start" | "pause" | "abort";


export const usePomodoroSession = () => {
    const { data: session } = useSession();
    const [pomodoroSession, setPomodoroSession] = useState<PomodoroSession | null>(null);
    const [loading, setLoading] = useState(true);

    const headers = useMemo(() => ({
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.accessToken}`,
    }), [session?.accessToken]);


    const fetchSession = useCallback(async () => {
        if (!session?.accessToken) return;

        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URI_API}/session/active`, {
                method: "GET",
                headers,
            });
            if (res.status === 404) {
                setPomodoroSession(createEmptyPomodoroSession(session.user.id));
                return;
            }

            if (!res.ok) throw new Error("Failed to fetch active session");

            const data = await res.json();
            setPomodoroSession(mapApiToPomodoroSession(data));

        } catch {
        } finally {
            setLoading(false);
        }
    }, [headers, session?.accessToken, session?.user?.id]);

    const performSessionAction = async (
        action: Action,
    ) => {
        if (!session?.accessToken) return;
        const url = `${process.env.NEXT_PUBLIC_URI_API}/session/${action}`;
        try {
            const body = action === "create"
                ? JSON.stringify({
                    focusDuration: pomodoroSession?.focusDuration,
                    shortBreakDuration: pomodoroSession?.shortBreakDuration,
                    longBreakDuration: pomodoroSession?.longBreakDuration,
                    repetitions: pomodoroSession?.repetitions,

                })
                : null;

            const res = await fetch(url, {
                method: "POST",
                headers,
                body
            });

            if (!res.ok) {
                return null;
            }
            const data = await res.json();
            setPomodoroSession(action === 'abort' ? createEmptyPomodoroSession(session.user.id) : mapApiToPomodoroSession(data));
        } catch {
            return;
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

    return {
        pomodoroSession,
        loading,
        fetchSession,
        performSessionAction,
        updateSessionField
    };
};

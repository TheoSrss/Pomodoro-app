import { useEffect, useMemo, useState } from "react";
import { PomodoroPhase, PomodoroSession } from "@/types/pomodoroSession";

type Simulated = {
    phase: PomodoroPhase;
    currentCycle: number;
    timeLeft: number;
    progress: number;
};

export const usePomodoroTimer = (session: PomodoroSession | null): Simulated | null => {
    const [now, setNow] = useState(() => Date.now());

    useEffect(() => {
        if (!session?.phaseStartedAt || session.isPaused) return;
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, [session?.phaseStartedAt, session?.isPaused]);

    const simulated = useMemo(() => {
        if (!session) return null;

        const duration = {
            focus: session.focusDuration,
            short_break: session.shortBreakDuration,
            long_break: session.longBreakDuration,
        }[session.phase];

        if (!session.phaseStartedAt || session.isPaused) {
            const timeLeft = Math.max(0, duration - session.elapsedSeconds);
            const progress = Math.min(1, session.elapsedSeconds / duration);

            return {
                phase: session.phase,
                currentCycle: session.currentCycle,
                timeLeft,
                progress,
            };
        }

        const start = new Date(session.phaseStartedAt).getTime();
        const elapsed = Math.floor((now - start) / 1000);

        const phases: Array<{ type: PomodoroPhase; duration: number }> = [];

        for (let i = 1; i <= session.repetitions; i++) {
            phases.push({ type: "focus", duration: session.focusDuration });
            if (i < session.repetitions) {
                phases.push({ type: "short_break", duration: session.shortBreakDuration });
            } else {
                phases.push({ type: "long_break", duration: session.longBreakDuration });
            }
        }

        let total = 0;
        let currentCycle = 1;

        for (let i = 0; i < phases.length; i++) {
            const phase = phases[i];
            total += phase.duration;
            if (elapsed < total) {
                const prevPhases = phases.slice(0, i);
                const secondsBefore = prevPhases.reduce((sum, p) => sum + p.duration, 0);
                const timeLeft = phase.duration - (elapsed - secondsBefore);
                const progress = (elapsed - secondsBefore) / phase.duration;

                if (phase.type === "focus") {
                    currentCycle = 1 + prevPhases.filter(p => p.type === "focus").length;
                }

                return {
                    phase: phase.type,
                    currentCycle,
                    timeLeft: Math.max(0, timeLeft),
                    progress: Math.min(1, Math.max(0, progress)),
                };
            }
        }

        return null;
    }, [session, now]);

    return simulated;
};

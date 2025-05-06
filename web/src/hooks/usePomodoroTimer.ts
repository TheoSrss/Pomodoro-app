import { useEffect, useMemo, useState } from "react";
import { PomodoroPhase, PomodoroSession } from "@/types/pomodoroSession";

type Simulated = {
    phase: PomodoroPhase;
    currentCycle: number;
    timeLeft: number;
    progress: number;
};

export const usePomodoroTimer = (session: PomodoroSession | null): Simulated | null => {
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        if (!session || session.isPaused) {
            setOffset(0);
            return;
        }

        const interval = setInterval(() => {
            setOffset((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [session]);

    const simulated = useMemo(() => {
        if (!session) return null;

        const {
            focusDuration,
            shortBreakDuration,
            longBreakDuration,
            repetitions,
            currentCycle,
            phase,
            elapsedSeconds,
        } = session;

        const phases: { type: PomodoroPhase; duration: number }[] = Array.from({ length: repetitions * 2 }, (_, i) => {
            const isBreak = i % 2 === 1;
            const isLast = i === repetitions * 2 - 1;
            return {
                type: isBreak
                    ? isLast
                        ? "long_break"
                        : "short_break"
                    : "focus",
                duration: isBreak
                    ? isLast
                        ? longBreakDuration
                        : shortBreakDuration
                    : focusDuration,
            };
        });

        let phaseIndex = -1;
        let focusSeen = 0;

        for (let i = 0; i < phases.length; i++) {
            if (phases[i].type === "focus") focusSeen++;
            if (phases[i].type === phase && focusSeen === currentCycle) {
                phaseIndex = i;
                break;
            }
        }

        const pastPhasesDuration = phases.slice(0, phaseIndex).reduce((sum, p) => sum + p.duration, 0);
        const totalElapsed = pastPhasesDuration + elapsedSeconds + offset;

        let remaining = totalElapsed;
        let displayCycle = 1;

        for (let i = 0; i < phases.length; i++) {
            const { type, duration } = phases[i];

            if (type === "focus" && i !== 0) {
                displayCycle++;
            }

            if (remaining < duration) {
                const progress = remaining / duration;
                return {
                    phase: type,
                    currentCycle: displayCycle,
                    timeLeft: duration - remaining,
                    progress: Math.min(1, Math.max(0, progress)),
                };
            }

            remaining -= duration;
        }

        return {
            phase: phases[phases.length - 1].type,
            currentCycle: repetitions,
            timeLeft: 0,
            progress: 1,
        };
    }, [session, offset]);

    return simulated;
};
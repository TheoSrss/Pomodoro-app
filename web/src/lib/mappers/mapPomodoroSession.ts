

import { PomodoroSession } from "@/types/pomodoroSession";

export type ApiPomodoroSession = {
    "@id": number | null;
    creator: string;
    focusDuration: number;
    shortBreakDuration: number;
    longBreakDuration: number;
    repetitions: number;
    currentCycle: number;
    phase: "focus" | "short_break" | "long_break";
    phaseStartedAt?: string | null | undefined;
    elapsedSeconds: number;
    isPaused: boolean;
    isAborted: boolean;
    startedAt?: string | null | undefined;
};

export const mapApiToPomodoroSession = (data: ApiPomodoroSession): PomodoroSession => ({
    id: data['@id'],
    creator: data.creator,
    focusDuration: data.focusDuration,
    shortBreakDuration: data.shortBreakDuration,
    longBreakDuration: data.longBreakDuration,
    repetitions: data.repetitions,
    currentCycle: data.currentCycle,
    phase: data.phase,
    phaseStartedAt: data?.phaseStartedAt,
    elapsedSeconds: data.elapsedSeconds,
    isPaused: data.isPaused,
    isAborted: data.isAborted,
    startedAt: data?.startedAt
});

export const createEmptyPomodoroSession = (userId: string): PomodoroSession => ({
    id: null,
    creator: `/api/users/${userId}`,
    focusDuration: 1800,
    shortBreakDuration: 300,
    longBreakDuration: 900,
    repetitions: 4,
    currentCycle: 1,
    phase: "focus",
    phaseStartedAt: null,
    elapsedSeconds: 0,
    isPaused: true,
    isAborted: false,
    startedAt: null
});



import { PomodoroSession } from "@/types/pomodoroSession";

export const mapApiToPomodoroSession = (data: any): PomodoroSession => ({
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

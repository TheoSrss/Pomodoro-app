export type PomodoroPhase = "focus" | "short_break" | "long_break"

export interface PomodoroSession {
    id: number | null
    creator: string
    focusDuration: number
    shortBreakDuration: number
    longBreakDuration: number
    repetitions: number
    currentCycle: number
    phase: PomodoroPhase
    phaseStartedAt: string | null | undefined
    elapsedSeconds: number
    isPaused: boolean
    isAborted: boolean
    startedAt: string | null | undefined
}
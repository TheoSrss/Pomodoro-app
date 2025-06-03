
import Loader from "../../components/Loader";

import { PomodoroSession } from "../../../web/src/types/pomodoroSession";
import { usePomodoroSession } from "../../hooks/usePomodoroSession";
import { usePomodoroTimer } from "../../hooks/usePomodoroTimer";
import { SessionSettings } from "./SessionSettings";
import { SessionActions } from "./SessionsActions";
import { TimerProgress } from "./TimerProgress";

export function Pomodoro() {
    const { pomodoroSession, loading, updateSessionField, performSessionAction } = usePomodoroSession();
    const simulated = usePomodoroTimer(pomodoroSession);

    const updateSession = (field: string, value: number) => {
        updateSessionField(field as keyof PomodoroSession, value);
    };
    if (!loading && simulated && pomodoroSession) {
        const minutes = String(Math.floor(simulated.timeLeft / 60)).padStart(2, "0");
        const seconds = String(simulated.timeLeft % 60).padStart(2, "0");
        const timeLeft = `${minutes}:${seconds}`;
        return (
            <>
                <TimerProgress
                    progress={simulated.progress}
                    currentCycle={simulated.currentCycle}
                    timeLeft={timeLeft}
                    phase={simulated.phase}
                />
                <SessionSettings session={pomodoroSession} onChange={updateSession} />

                <SessionActions
                    onStart={() => performSessionAction('create')}
                    onPause={() => performSessionAction('pause')}
                    onAbort={() => performSessionAction('abort')}
                    isStart={!!pomodoroSession.phaseStartedAt}
                    isPause={!!pomodoroSession.isPaused}
                />
            </>
        );
    }
    return (
        <Loader />
    );
}

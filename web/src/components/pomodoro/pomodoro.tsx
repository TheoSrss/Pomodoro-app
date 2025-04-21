import { usePomodoroSession } from "@/hooks/usePomodoroSession";
import { usePomodoroTimer } from "@/hooks/usePomodoroTimer";
import { Loading } from "../loading";
import { TimerProgress } from "./TimerProgress";
import { SessionSettings } from "./SessionSettings";
import { PomodoroSession } from "@/types/pomodoroSession";
import { SessionActions } from "./SessionActions";

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
            <div className="w-full flex flex-col items-center justify-around pt-2 pb-3 px-4 bg-beige rounded-2xl shadow-[0.625rem_0.625rem_0.875rem_0_rgb(225,226,228),-0.5rem_-0.5rem_1.125rem_0_rgb(255,255,255)] mt-30">
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
                />
            </div>
        );
    }

    return (
        <div className="m-auto my-30 min-w-100 max-w-140 flex flex-col py-10 px-20 bg-beige rounded-2xl shadow-[0.625rem_0.625rem_0.875rem_0_rgb(225,226,228),-0.5rem_-0.5rem_1.125rem_0_rgb(255,255,255)]">
            <Loading />
        </div>
    );
}

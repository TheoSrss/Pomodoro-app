import { PomodoroPhase } from "@/types/pomodoroSession";
import { TimerDisplay } from "./TimerDisplay";

type Props = {
    progress: number;
    timeLeft: string;
    currentCycle: number;
    phase: PomodoroPhase
};

export const TimerProgress = ({ progress, timeLeft, currentCycle, phase }: Props) => {
    const pathLength = 320;
    let textPhase = phase == 'focus' ? "Focus" : phase === "long_break" ? "Big break" : "Short break";

    return (
        <div className="relative w-[400px] h-[400px] flex items-center justify-center m-5">
            <h2 className="mb-30">{textPhase}</h2>
            <svg viewBox="0 0 100 100" className="absolute w-full h-full">
                {/* FOND : chemin complet en gris foncé */}
                <rect
                    x="5"
                    y="5"
                    width="90"
                    height="90"
                    rx="20"
                    ry="20"
                    fill="none"
                    stroke="#2e2e2e"
                    strokeWidth="10"
                />

                {/* PROGRESSION : barre verte animée */}
                <rect
                    x="5"
                    y="5"
                    width="90"
                    height="90"
                    rx="20"
                    ry="20"
                    fill="none"
                    stroke="#b3eac2"
                    strokeWidth="5"
                    strokeDasharray={pathLength}
                    strokeDashoffset={pathLength * (1 - progress)}
                    strokeLinecap="round"
                    transform="rotate(-0 50 50)"
                    className="transition-all duration-500 ease-in-out"
                />
            </svg>
            <div className="absolute text-center text-foreground z-10">
                <TimerDisplay timeLeft={timeLeft} currentCycle={currentCycle} />
            </div>
        </div>
    );
};

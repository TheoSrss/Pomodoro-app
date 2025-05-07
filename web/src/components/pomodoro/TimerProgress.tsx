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
    const textPhase = phase === "focus" ? "Focus" : phase === "long_break" ? "Big break" : "Short break";

    return (
        <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center mx-auto px-4 my-10">
            <h2 className="mb-30  text-center text-sm sm:text-xl font-semibold">{textPhase}</h2>

            <svg viewBox="0 0 100 100" className="absolute w-full h-full text-primary">
                {/* FOND : contour gris foncé */}
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
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeDasharray={pathLength}
                    strokeDashoffset={pathLength * (1 - progress)}
                    strokeLinecap="round"
                    className="transition-all duration-500 ease-in-out"
                />
            </svg>
            <div className="absolute text-center text-foreground z-10">
                <TimerDisplay timeLeft={timeLeft} currentCycle={currentCycle} />
            </div>
        </div>
    );
};
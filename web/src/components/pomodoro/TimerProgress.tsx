import { TimerDisplay } from "./TimerDisplay";

type Props = {
    progress: number;
    timeLeft: string;
    currentCycle: number;
};

export const TimerProgress = ({ progress, timeLeft, currentCycle }: Props) => {
    const pathLength = 320;
    return (
        <div className="relative w-[400px] h-[400px] flex items-center justify-center m-5">
            <svg viewBox="0 0 100 100" className="absolute w-full h-full">
                <path
                    d="
            M50,5
            H80
            A15,15 0 0 1 95,20
            V80
            A15,15 0 0 1 80,95
            H20
            A15,15 0 0 1 5,80
            V20
            A15,15 0 0 1 20,5
            H50
        "
                    fill="none"
                    stroke="#2e2e2e"
                    strokeWidth="10"
                />
                <path
                    d="
            M50,5
            H80
            A15,15 0 0 1 95,20
            V90
            A15,15 0 0 1 80,95
            H20
            A15,15 0 0 1 5,80
            V20
            A15,15 0 0 1 20,5
            H50
        "
                    fill="none"
                    stroke="#b3eac2"
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

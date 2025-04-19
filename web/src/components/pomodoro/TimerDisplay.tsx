type Props = {
    timeLeft: string;
    currentCycle: number;
};

export const TimerDisplay = ({ timeLeft, currentCycle }: Props) => (
    <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold">{timeLeft}</span>
        <span className="text-sm text-gray-400">#{currentCycle}</span>
    </div>
);

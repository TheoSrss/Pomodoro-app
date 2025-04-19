import { PomodoroSession } from "@/types/pomodoroSession";

type SettingSliderProps = {
    label: string;
    value: number;
    min: number;
    max: number;
    suffix?: string;
    disabled?: boolean,
    onChange: (value: number) => void;
};

export function SettingSlider({
    label,
    value,
    min,
    max,
    suffix = "",
    disabled = false,
    onChange,
}: SettingSliderProps) {
    return (
        <div className="flex flex-col gap-2 items-center bg-[#1e1e1e] rounded-2xl px-4 py-3 text-white w-full shadow-[5px_5px_10px_rgb(25,25,25),-5px_-5px_10px_rgb(60,60,60)] ">
            <span className="text-l text-gray-400">{label}</span>
            <span className="text-xl font-semibold">
                {Math.round(value)}{suffix}
            </span>
            <input
                type="range"
                min={min}
                max={max}
                step="1"
                value={value}
                disabled={disabled}
                onChange={(e) => onChange(Math.round(Number(e.target.value)))}
                className={`w-full accent-green-400 bg-zinc-300/20 appearance-none h-2 rounded-md ${disabled ? 'opacity-40 cursor-not-allowed' : ''
                    }`}
            />
        </div>
    );
}


export function SessionSettings({
    session,
    onChange,
}: {
    session: PomodoroSession,
    onChange: (field: string, value: number) => void;
}) {
    const disabled = !!session.startedAt
    return (
        <div className="flex flex-row gap-10 my-20">
            <SettingSlider
                label="Focus"
                value={session.focusDuration / 60}
                min={5}
                max={120}
                suffix=" min"
                disabled={disabled}
                onChange={(v) => onChange("focusDuration", v * 60)}
            />

            <SettingSlider
                label="Short break"
                value={session.shortBreakDuration / 60}
                min={1}
                max={30}
                suffix=" min"
                disabled={disabled}
                onChange={(v) => onChange("shortBreakDuration", v * 60)}
            />

            <SettingSlider
                label="Long break"
                value={session.longBreakDuration / 60}
                min={5}
                max={60}
                suffix=" min"
                disabled={disabled}
                onChange={(v) => onChange("longBreakDuration", v * 60)}
            />

            <SettingSlider
                label="Cycles"
                value={session.repetitions}
                min={1}
                max={10}
                suffix=""
                disabled={disabled}
                onChange={(v) => onChange("repetitions", v)}
            />


        </div>
    );
}

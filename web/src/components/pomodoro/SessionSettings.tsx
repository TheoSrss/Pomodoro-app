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
        <div className="w-30 xl:w-40 flex flex-col gap-2 items-center bg-[#1e1e1e] rounded-2xl px-3 py-3 text-white shadow-[5px_5px_10px_rgb(25,25,25),-5px_-5px_10px_rgb(60,60,60)] text-center">
            <span className="text-xs xl:text-lg text-primary font-bold">{label}</span>
            <span className="text-s xl:text-xl font-semibold">
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
                className={`w-full accent-primary bg-zinc-300/20 appearance-none h-2 rounded-md ${disabled ? 'opacity-40 cursor-not-allowed' : ''
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
    const disabled = !!session.startedAt;

    return (
        <div className="grid grid-cols-2 justify-items-center  xl:grid-cols-4 gap-6 my-10 w-full max-w-5xl mx-auto">
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


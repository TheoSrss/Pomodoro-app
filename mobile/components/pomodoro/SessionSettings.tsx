import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import { PomodoroSession } from "../../web/src/types/pomodoroSession";

type SettingSliderProps = {
    label: string;
    value: number;
    min: number;
    max: number;
    suffix?: string;
    disabled?: boolean;
    onChange: (value: number) => void;
};

function SettingSlider({
    label,
    value,
    min,
    max,
    suffix = "",
    disabled = false,
    onChange,
}: SettingSliderProps) {
    return (
        <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>{label}</Text>
            <Text style={styles.sliderValue}>{Math.round(value)}{suffix}</Text>
            <Slider
                style={{ width: "100%" }}
                minimumValue={min}
                maximumValue={max}
                step={1}
                value={value}
                disabled={disabled}
                onValueChange={onChange}
                minimumTrackTintColor="#cbebcb"
                maximumTrackTintColor="#ccc"
                thumbTintColor="#cbebcb"
            />
        </View>
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
        <View style={styles.settingsGrid}>
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
                label="Short Break"
                value={session.shortBreakDuration / 60}
                min={1}
                max={30}
                suffix=" min"
                disabled={disabled}
                onChange={(v) => onChange("shortBreakDuration", v * 60)}
            />
            <SettingSlider
                label="Long Break"
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
                disabled={disabled}
                onChange={(v) => onChange("repetitions", v)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    settingsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 16,
        marginVertical: 24,
        // backgroundColor: 'red'
    },
    sliderContainer: {
        width: 120,
        backgroundColor: "#1e293b",
        borderRadius: 16,
        padding: 12,
        alignItems: "center",
        margin: 8,
    },
    sliderLabel: {
        color: "#cbebcb",
        fontWeight: "bold",
        fontSize: 16,
    },
    sliderValue: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 8,
    },
});
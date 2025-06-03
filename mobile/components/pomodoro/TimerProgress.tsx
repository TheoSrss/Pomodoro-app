import { View, Text, StyleSheet } from "react-native";
import { PomodoroPhase } from "../../../web/src/types/pomodoroSession";
import { TimerDisplay } from "./TimerDisplay";
import { Svg, Rect } from "react-native-svg";

type Props = {
    progress: number;
    timeLeft: string;
    currentCycle: number;
    phase: PomodoroPhase;
};

export const TimerProgress = ({ progress, timeLeft, currentCycle, phase }: Props) => {
    const pathLength = 320;
    const textPhase = phase === "focus" ? "Focus" : phase === "long_break" ? "Long Break" : "Short Break";

    return (
        <View style={styles.container}>
            <View style={styles.svgContainer}>
                <Svg width="100%" height="100%" viewBox="0 0 100 100" >
                    <Rect
                        x="10"
                        y="5"
                        width="80"
                        height="80"
                        rx="20"
                        ry="20"
                        fill="none"
                        stroke="#1d293d"
                        strokeWidth="8"
                    />
                    <Rect
                        x="10"
                        y="5"
                        width="80"
                        height="80"
                        rx="20"
                        ry="20"
                        fill="none"
                        stroke="#cbebcb"
                        strokeWidth="3"
                        strokeDasharray={pathLength}
                        strokeDashoffset={pathLength * (1 - progress)}
                        strokeLinecap="round"
                    />
                </Svg>
                <Text style={styles.phase}>{textPhase}</Text>
                <TimerDisplay timeLeft={timeLeft} currentCycle={currentCycle} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        aspectRatio: 1,
        alignSelf: "center",
        marginVertical: 20,
        // backgroundColor: 'blue'
    },
    phase: {
        position: "absolute",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 130,
    },
    svgContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
import { View, Text, StyleSheet } from "react-native";

type Props = {
    timeLeft: string;
    currentCycle: number;
};

export const TimerDisplay = ({ timeLeft, currentCycle }: Props) => (
    <View style={styles.container}>
        <Text style={styles.time}>{timeLeft}</Text>
        <Text style={styles.cycle}>#{currentCycle}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        alignItems: "center",
        justifyContent: "center",
    },
    time: {
        fontSize: 36,
        fontWeight: "bold",
    },
    cycle: {
        fontSize: 16,
        color: "#888",
    },
});
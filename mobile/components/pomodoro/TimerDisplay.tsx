import { View, Text, StyleSheet } from "react-native";
import AppText from "../AppText";

type Props = {
    timeLeft: string;
    currentCycle: number;
};

export const TimerDisplay = ({ timeLeft, currentCycle }: Props) => (
    <View style={styles.container}>
        <AppText style={styles.time}>{timeLeft}</AppText>
        <AppText style={styles.cycle}>#{currentCycle}</AppText>
    </View>
);

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 20,
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
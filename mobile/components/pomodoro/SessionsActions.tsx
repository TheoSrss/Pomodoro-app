import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../AppText";

type SessionActionsProps = {
    isStart: boolean;
    isPause: boolean;
    onStart: () => void;
    onPause: () => void;
    onAbort: () => void;
};

export function SessionActions({
    isStart,
    isPause,
    onStart,
    onPause,
    onAbort,
}: SessionActionsProps) {
    return (
        <View style={styles.container}>
            {isStart ? (
                <View style={styles.row}>
                    <TouchableOpacity style={styles.button} onPress={onPause}>
                        <AppText style={styles.buttonText}>{isPause ? "▶️ Reprendre" : "⏸️ Pause"}</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onAbort}>
                        <AppText style={styles.buttonText}>⏹️ Stop</AppText>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity style={styles.button} onPress={onStart}>
                    <AppText style={styles.buttonText}>▶️ Démarrer</AppText>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        width: "100%",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        gap: 16,
    },
    button: {
        backgroundColor: "#4ade80",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginHorizontal: 8,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
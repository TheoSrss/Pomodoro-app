import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "../AppText";
import { Pause, Play, Square } from "lucide-react-native";

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
                        {isPause ? <Pause /> : <Play />}
                        <AppText style={styles.buttonText}>{isPause ? "Reprendre" : "Pause"}</AppText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onAbort}>
                        <Square />
                        <AppText style={styles.buttonText}>Stop</AppText>
                    </TouchableOpacity>
                </View>
            ) : (
                <TouchableOpacity style={styles.button} onPress={onStart}>
                    <AppText style={styles.buttonText}>Démarrer</AppText>
                </TouchableOpacity>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        width: "100%",
        alignItems: "center",
        marginBottom: 20
    },
    row: {
        flexDirection: "row",
        gap: 16,
    },
    button: {
        backgroundColor: "#f4f4f4",
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 24,
        marginHorizontal: 8,
        // Ombre iOS
        shadowColor: "#bfc9d1",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 2.25,
        shadowRadius: 10,
        // Ombre Android
        elevation: 8,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12
    },
    buttonText: {
        color: "#1a2b1a",
        fontSize: 18,
        letterSpacing: 2,
        fontWeight: "400",
    },
});

import Loader from "../../components/Loader";
import { PomodoroSession } from "../../../web/src/types/pomodoroSession";
import { usePomodoroSession } from "../../hooks/usePomodoroSession";
import { usePomodoroTimer } from "../../hooks/usePomodoroTimer";
import { SessionSettings } from "./SessionSettings";
import { SessionActions } from "./SessionsActions";
import { TimerProgress } from "./TimerProgress";
import { Image, StyleSheet, View } from "react-native";
import Logo from "../../assets/pomo.png"
import AppText from "../AppText";

export default function Pomodoro() {
    const { pomodoroSession, loading, updateSessionField, performSessionAction } = usePomodoroSession();
    const simulated = usePomodoroTimer(pomodoroSession);

    const updateSession = (field: string, value: number) => {
        updateSessionField(field as keyof PomodoroSession, value);
    };
    if (!loading && simulated && pomodoroSession) {
        const minutes = String(Math.floor(simulated.timeLeft / 60)).padStart(2, "0");
        const seconds = String(simulated.timeLeft % 60).padStart(2, "0");
        const timeLeft = `${minutes}:${seconds}`;
        return (
            <>
                <View style={[styles.tabs, { alignItems: 'center' }]}>
                    <Image
                        source={Logo}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <AppText style={styles.title}>POMODORO</AppText>
                </View>
                <TimerProgress
                    progress={simulated.progress}
                    currentCycle={simulated.currentCycle}
                    timeLeft={timeLeft}
                    phase={simulated.phase}
                />
                <SessionSettings session={pomodoroSession} onChange={updateSession} />

                <SessionActions
                    onStart={() => performSessionAction('create')}
                    onPause={() => performSessionAction('pause')}
                    onAbort={() => performSessionAction('abort')}
                    isStart={!!pomodoroSession.phaseStartedAt}
                    isPause={!!pomodoroSession.isPaused}
                />
            </>
        );
    }
    return (
        <Loader />
    );
}


const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
        gap: 20,
    },
    logo: {
        alignSelf: 'center',
        width: 60,
        height: 60,
    },
    title: {
        fontSize: 50,
        color: '#444',
    },
});
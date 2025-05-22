import { Slot } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GuestOnly from '../../components/auth/GuestOnly';

export default function AuthLayout() {

    return (
        <GuestOnly>
            <SafeAreaView >
                <StatusBar />
                <Slot />
            </SafeAreaView>
        </GuestOnly>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

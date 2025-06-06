import { Stack } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GuestOnly from '../../components/auth/GuestOnly';

export default function AuthLayout() {
    return (
        <GuestOnly>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar />
                <Stack screenOptions={{
                    headerShown: false,
                    animation: "none",
                }}>
                </Stack>
            </SafeAreaView>
        </GuestOnly>
    );
}
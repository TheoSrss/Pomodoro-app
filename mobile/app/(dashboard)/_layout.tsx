import { Stack } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import UserOnly from '../../components/auth/UserOnly';

export default function AuthLayout() {
    return (
        <UserOnly>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar />
                <Stack screenOptions={{
                    headerShown: false,
                    animation: "none",
                }}>
                </Stack>
            </SafeAreaView>
        </UserOnly>
    );
}
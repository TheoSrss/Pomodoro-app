import { StyleSheet, useColorScheme } from 'react-native'
import { Stack, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import Colors from '../constant/Colors';
import { useFonts } from 'expo-font';
import Loader from '../components/Loader';
import { UserProvider } from '../context/UserContext';
import { useUser } from '../hooks/useUser';
import { useEffect } from 'react';

const RootLayout = () => {
    const [fontsLoaded] = useFonts({
        Doto: require('../assets/fonts/Doto-Regular.ttf'),
        DotoBold: require('../assets/fonts/Doto-Bold.ttf'),
    });

    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];

    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!fontsLoaded) return;

        if (user) {
            router.replace('/(dashboard)');
        } else {
            router.replace('/login');
        }
    }, [user, fontsLoaded, router]);

    if (!fontsLoaded) return <Loader />;

    return (
        <UserProvider>
            <StatusBar style="auto" />
            <Stack
                screenOptions={{
                    headerStyle: { backgroundColor: theme.background },
                    headerTintColor: theme.text,
                    gestureEnabled: true,
                    gestureDirection: 'horizontal',
                    animation: 'slide_from_right',
                }}
            >
                {/* <Stack.Screen
                    name="index"
                    options={{
                        title: 'Home',
                        headerShown: true
                    }}
                /> */}
                <Stack.Screen
                    name="(dashboard)"
                    options={{
                        headerShown: false,
                        gestureEnabled: true
                    }}
                />
                <Stack.Screen
                    name="(auth)"
                    options={{
                        headerShown: false,
                        gestureEnabled: true
                    }}
                />
            </Stack>
        </UserProvider>
    )
}

export default RootLayout

const styles = StyleSheet.create({});
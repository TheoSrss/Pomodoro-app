import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import { Slot, Stack } from 'expo-router'

import { StatusBar } from 'expo-status-bar';
import Colors from '../constant/Colors';
import { useFonts } from 'expo-font';
import Loader from '../components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';

const RootLayout = () => {

    const [fontsLoaded] = useFonts({
        Doto: require('../assets/fonts/Doto-Regular.ttf'),
        DotoBold: require('../assets/fonts/Doto-Bold.ttf'),
    });

    const colorScheme = useColorScheme();
    const theme = Colors[colorScheme ?? 'light'];
    if (!fontsLoaded) return <Loader />;

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <StatusBar style={colorScheme === 'dark' ? 'dark' : 'light'} />
            <Slot />
        </SafeAreaView>
    )
}

export default RootLayout


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
});
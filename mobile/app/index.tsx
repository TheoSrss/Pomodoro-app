import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';
import Colors from '../constant/Colors';
import { Link } from 'expo-router';

export default function App() {

    const [fontsLoaded] = useFonts({
        Doto: require('../assets/fonts/Doto-Regular.ttf'),
        DotoBold: require('../assets/fonts/Doto-Bold.ttf'),
    });

    return (
        <View>
            <Text>Open up App.tsx to  working on your apps!</Text>
            <StatusBar style="auto" />
            <Text style={{ fontFamily: 'Doto', fontSize: 40 }}>Texte régulier</Text>
            <Text style={{ fontFamily: 'DotoBold', fontSize: 90 }}>Texte gras</Text>

            {/* <Card> */}
            <Link href="/register">Register Page</Link>
            {/* </ThemedCard> */}

            {/* <ThemedCard> */}
            <Link href="/login">Login</Link>
            {/* </ThemedCard> */}
            <Link href="/dashboard">Dashboard</Link>

        </View>
    );
}

const styles = StyleSheet.create({
});

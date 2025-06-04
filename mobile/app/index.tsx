import { StatusBar } from 'expo-status-bar';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import { useUser } from '../hooks/useUser';


export default function App() {

    const { logout } = useUser();
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

            <Pressable onPress={logout} >
                <Text >LOGOUT</Text>
            </Pressable>
        </View >
    );
}

const styles = StyleSheet.create({
});

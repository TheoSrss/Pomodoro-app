import { Image, Platform, Pressable, StyleSheet, View } from "react-native";
import Logo from "../../assets/pomo.png"
import { Link, usePathname } from "expo-router";
import { useEffect } from "react";
import { makeRedirectUri, useAuthRequest, useAutoDiscovery } from "expo-auth-session";
import AppText from "../AppText";


export default function MainAuth({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();

    const isLogin = pathname === '/login';

    const discovery = useAutoDiscovery('https://accounts.google.com');
    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: Platform.select({
                ios: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
                // android: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
                // default: process.env.EXPO_PUBLIC_GOOGLE_EXPO_CLIENT_ID,
            }),
            scopes: ['openid', 'profile', 'email'],
            redirectUri: makeRedirectUri({
                native: 'com.theosourisseau.pomodoro:/oauthredirect',
            }),
        },
        discovery
    );
    useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
        }
    }, [response]);

    return (
        <View style={styles.card}>
            <View style={styles.tabs}>
                <Link href="/login">
                    <AppText style={[styles.tab, isLogin && styles.tabActive]}>Connexion</AppText>
                </Link>
                <Link href="/register">
                    <AppText style={[styles.tab, !isLogin && styles.tabActive]}>Inscription</AppText>
                </Link>
            </View>
            <View style={[styles.tabs, { alignItems: 'center' }]}>
                <Image
                    source={Logo}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <AppText style={styles.title}>POMODORO</AppText>
            </View>
            {children}
            <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <AppText style={styles.dividerText}>Continuer avec</AppText>
                <View style={styles.divider} />
            </View>
            <Pressable onPress={() => promptAsync()} style={styles.loginButton} disabled={!request}>
                <Image
                    source={require('../../assets/google.png')}
                    style={styles.googleIcon}
                />
                <AppText style={styles.loginText}>Google</AppText>
            </Pressable>

        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginTop: 40,
        margin: 10,
        padding: 24,
        borderRadius: 24,
        backgroundColor: '#f3f3f5',
        shadowColor: '#000',
        shadowOffset: { width: 6, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
        gap: 20,
    },
    tab: {
        fontSize: 18,
        color: '#999',
    },
    tabActive: {
        color: '#222',
        fontWeight: 700
    },
    logo: {
        alignSelf: 'center',
        width: 60,
        height: 60
    },

    loginButton: {
        backgroundColor: '#f7f7f7',
        borderRadius: 16,
        padding: 9,
        marginTop: 10,
        shadowColor: '#bbb',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,

    },
    loginText: {
        fontWeight: 900,
        fontSize: 16,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ccc',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#999',
    },
    googleIcon: {
        width: 20,
        height: 20,
    },
    googleText: {
        fontSize: 16,
    },
    title: {
        fontSize: 30,
        color: '#444',
    },
});

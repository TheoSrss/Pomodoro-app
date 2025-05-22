import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Logo from '../../assets/pomo.png'
import { Link, usePathname } from "expo-router";


export default function MainAuth({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();

    const isLogin = pathname === '/login';

    return (
        <View style={styles.card}>
            <View style={styles.tabs}>
                <Link href="/login">
                    <Text style={[styles.tab, isLogin && styles.tabActive]}>Connexion</Text>
                </Link>
                <Link href="/register">
                    <Text style={[styles.tab, !isLogin && styles.tabActive]}>Inscription</Text>
                </Link>
            </View>
            <View style={[styles.tabs, { alignItems: 'center' }]}>
                <Image
                    source={Logo}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.title}>POMODORO</Text>
            </View>
            {children}
            <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>Continuer avec</Text>
                <View style={styles.divider} />
            </View>

            <Pressable style={styles.loginButton}>
                <Image
                    source={Logo}
                    style={styles.googleIcon}
                />
                <Text style={styles.loginText}>Google</Text>
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
        fontFamily: 'Doto',
        color: '#999',
    },
    tabActive: {
        fontFamily: 'DotoBold',
        color: '#222',
    },
    logo: {
        alignSelf: 'center',
        width: 60,
        height: 60,
        // marginBottom: 20,
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
        fontFamily: 'DotoBold',
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
        fontFamily: 'Doto',
    },
    googleIcon: {
        width: 20,
        height: 20,
    },
    googleText: {
        fontFamily: 'Doto',
        fontSize: 16,
    },
    title: {
        fontFamily: 'Doto',
        fontSize: 30,
        color: '#444',
    },
});

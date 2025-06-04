import React, { useState } from 'react';
import {
    TextInput,
    Pressable,
    StyleSheet,
} from 'react-native';
import { useUser } from '../../hooks/useUser';
import MainAuth from '../../components/auth/auth';
import { API_ERRORS } from '../../services/config';
import { REGEX } from '../../constant/Regex';
import AppText from '../../components/AppText';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const { login } = useUser();

    const handleLogin = async () => {
        setError(null)

        if (!email || !password) {
            setError("Tous les champs sont requis.");
            return;
        }

        if (!REGEX.EMAIL.test(email)) {
            setError("Adresse email invalide.");
            return;
        }

        try {
            await login(email, password)
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(API_ERRORS.DEFAULT);
            }
        }
    }

    return (
        <MainAuth>
            {error && <AppText style={styles.error}>{error}</AppText>}
            <AppText style={styles.label}>Email</AppText>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="gabin@gmail.com"
                style={styles.input}
                placeholderTextColor="#bbb"
            />

            <AppText style={styles.label}>Mot de passe</AppText>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="motdepasse"
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#bbb"
            />

            <Pressable onPress={handleLogin} style={styles.loginButton}>
                <AppText style={styles.loginText}>Se connecter</AppText>
            </Pressable>
        </MainAuth>
    );
}

const styles = StyleSheet.create({
    error: {
        backgroundColor: '#ffe5e5',
        color: '#b00000',
        padding: 10,
        borderRadius: 8,
        textAlign: 'center',
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        marginTop: 10,
        marginBottom: 10,
        color: '#444',
    },
    input: {
        backgroundColor: '#f0f0f2',
        borderRadius: 12,
        padding: 10,
        marginBottom: 10,
        fontSize: 16,
        shadowColor: '#ccc',
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        fontFamily: 'Doto'
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
});
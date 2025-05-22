import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Link } from 'expo-router'
import { useUser } from '../../hooks/useUser';
import MainAuth from '../../components/auth/auth';
import { API_ERRORS } from '../../services/config';
import { REGEX } from '../../constant/Regex';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const { register } = useUser();

    const handleRegister = async () => {
        setError(null);

        if (!REGEX.PASSWORD.test(password)) {
            setError('Mot de passe : au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Les mots de passe ne correspondent pas.');
            return;
        }

        try {
            await register(email, password)
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(API_ERRORS.DEFAULT);
            }
        }
    };


    return (
        <MainAuth>
            {error && <Text style={styles.error}>{error}</Text>}
            <Text style={styles.label}>Email</Text>
            <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="gabin@gmail.com"
                style={styles.input}
                placeholderTextColor="#bbb"
            />
            <Text style={styles.label}>Mot de passe</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="motdepasse"
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#bbb"
            />
            <Text style={styles.label}>
                Répétez le mot de passe
            </Text>
            <TextInput
                placeholder='motdepasse2'
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#bbb"

            />
            <Pressable onPress={handleRegister} style={styles.loginButton}>
                <Text style={styles.loginText}>S'inscrire</Text>
            </Pressable>
        </MainAuth>
    )
}

export default Register



const styles = StyleSheet.create({
    error: {
        backgroundColor: '#ffe5e5',
        color: '#b00000',
        padding: 10,
        borderRadius: 8,
        textAlign: 'center',
        marginBottom: 12,
        fontFamily: 'Doto',
    },
    label: {
        fontFamily: 'Doto',
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
        fontFamily: 'Doto',
        fontSize: 16,
        shadowColor: '#ccc',
        shadowOffset: { width: -2, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
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
});
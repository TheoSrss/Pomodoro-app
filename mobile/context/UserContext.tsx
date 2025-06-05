import { createContext, useEffect, useState, ReactNode } from 'react';
import { AuthResponse, authService } from '../services/auth';
import { HTTPError } from 'ky';
import { API_ERRORS } from '../services/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomUser } from "../../web/src/types/next-auth";

type UserContextType = {
    user: CustomUser | null;
    jwt: string | null;
    authCheck: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const USER_STORAGE_KEY = '@Pomodoro:userData';

export const UserContext = createContext<UserContextType>({
    user: null,
    jwt: null,
    authCheck: false,
    login: async () => { },
    register: async () => { },
    logout: async () => { },
});

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<CustomUser | null>(null);
    const [jwt, setJwt] = useState<string | null>(null);
    const [authCheck, setAuthCheck] = useState(false);

    const saveUserToStorage = async (userData: AuthResponse | null) => {
        try {
            if (userData) {
                await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
            } else {
                await AsyncStorage.removeItem(USER_STORAGE_KEY);
            }
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données utilisateur:', error);
        }
    };

    const loadUserFromStorage = async () => {
        try {
            const storedDataUser = await AsyncStorage.getItem(USER_STORAGE_KEY);
            if (storedDataUser) {
                const dataParsed = JSON.parse(storedDataUser);
                setUser(dataParsed.user);
                setJwt(dataParsed.token);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des données utilisateur:', error);
        }
    };

    async function login(email: string, password: string) {
        try {
            const response = await authService.login({ email, password });
            setUser(response.user);
            setJwt(response.token);
            await saveUserToStorage(response);
            setAuthCheck(true);
        } catch (error) {
            if (error instanceof HTTPError) {
                const status = error.response?.status;
                const message = API_ERRORS[status as keyof typeof API_ERRORS] || API_ERRORS.DEFAULT;
                throw new Error(message);
            }
            throw new Error(API_ERRORS.DEFAULT);
        }
    }

    async function register(email: string, password: string) {
        try {
            const response = await authService.register({ email, password });
            await login(email, password);
        } catch (error) {
            if (error instanceof HTTPError) {
                const status = error.response?.status;
                const message = API_ERRORS[status as keyof typeof API_ERRORS] || API_ERRORS.DEFAULT;
                throw new Error(message);
            }
            throw new Error(API_ERRORS.DEFAULT);
        }
    }

    async function logout() {
        await authService.logout();
        setUser(null);
        await saveUserToStorage(null);
        setAuthCheck(true);
    }

    async function getInitialUserValue() {
        try {
            await loadUserFromStorage();
        } catch (error) {
            setUser(null);
        } finally {
            setAuthCheck(true);
        }
    }

    useEffect(() => {
        getInitialUserValue();
    }, []);

    return (
        <UserContext.Provider value={{
            user,
            jwt,
            authCheck,
            login,
            register,
            logout
        }}>
            {children}
        </UserContext.Provider>
    );
}

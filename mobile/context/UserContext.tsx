import { createContext, useEffect, useState, ReactNode } from 'react';
import { authService, AuthResponse } from '../services/auth';
import { HTTPError } from 'ky';
import { API_ERRORS } from '../services/config';

type User = AuthResponse['user'];

type UserContextType = {
    user: User | null;
    authCheck: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

export const UserContext = createContext<UserContextType>({
    user: null,
    authCheck: false,
    login: async () => { },
    register: async () => { },
    logout: async () => { },
});

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [authCheck, setAuthCheck] = useState(false);

    async function login(email: string, password: string) {
        try {
            const response = await authService.login({ email, password });
            setUser(response.user);
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
        setAuthCheck(true);
    }

    async function getInitialUserValue() {
        try {
            // const currentUser = await authService.getCurrentUser();
            // setUser(currentUser);
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
            authCheck,
            login,
            register,
            logout
        }}>
            {children}
        </UserContext.Provider>
    );
}

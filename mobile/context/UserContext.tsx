import { createContext, useEffect, useState, ReactNode } from 'react';

type User = {
    id: string;
    email: string;
};

// Type du contexte
type UserContextType = {
    user: User | null;
    authCheck: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

// Contexte vide initial
export const UserContext = createContext<UserContextType>({
    user: null,
    authCheck: false,
    login: async () => { },
    register: async () => { },
    logout: () => { },
});

export function UserProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [authCheck, setAuthCheck] = useState(false);

    async function login(email: string, password: string) {
        // Simulation : utilisateur fake
        const fakeUser = { id: '1', email };
        setUser(fakeUser);
    }

    async function register(email: string, password: string) {
        // Simulation : création puis login
        await login(email, password);
    }

    async function logout() {
        setUser(null);
    }

    async function getInitialUserValue() {
        try {
            // Simulation : pas d'utilisateur
            setUser(null);
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
        <UserContext.Provider value={{ user, authCheck, login, register, logout }}>
            {children}
        </UserContext.Provider>
    );
}

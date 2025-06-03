import api from './api';
import { API_ENDPOINTS } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomUser } from "../../web/src/types/next-auth";

export interface LoginRegisterCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    token: string;
    user: CustomUser
}

class AuthService {
    async login(credentials: LoginRegisterCredentials): Promise<AuthResponse> {
        try {
            const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, {
                json: credentials
            }).json<AuthResponse>();
            await this.setTokens(response.token);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async register(credentials: LoginRegisterCredentials): Promise<AuthResponse> {
        try {
            const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, {
                json: credentials
            }).json<AuthResponse>();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async logout(): Promise<void> {
        await this.clearTokens();
    }

    async getCurrentUser(): Promise<AuthResponse> {
        try {
            const response = await api.get(API_ENDPOINTS.USER.PROFILE).json<AuthResponse>();

            return response;
        } catch (error) {
            throw error;
        }
    }

    private async setTokens(accessToken: string): Promise<void> {
        await AsyncStorage.setItem('token', accessToken);
    }

    private async clearTokens(): Promise<void> {
        await AsyncStorage.removeItem('token');
    }
}

export const authService = new AuthService(); 
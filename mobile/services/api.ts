import ky from 'ky';
import { API_URL } from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = ky.create({
    prefixUrl: API_URL,
    timeout: 10000,
    hooks: {
        beforeRequest: [
            async (request) => {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    request.headers.set('Authorization', `Bearer ${token}`);
                }
            }
        ],
        afterResponse: [
            async (request, options, response) => {

            }
        ]
    }
});

export default api; 
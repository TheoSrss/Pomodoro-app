const API_URL = process.env.EXPO_PUBLIC_URI_API;

const API_ENDPOINTS = {
    AUTH: {
        LOGIN: 'login',
        REGISTER: 'register',
    },
    USER: {
        PROFILE: '/user/profile',
        UPDATE: '/user/update',
    },
} as const;


const API_ERRORS = {
    401: 'Identifiants incorrects.',
    403: 'Vous n’avez pas les droits pour accéder à cette ressource.',
    404: 'Ressource introuvable.',
    DEFAULT: 'Une erreur est survenue, veuillez réessayer'
} as const;

export { API_URL, API_ENDPOINTS, API_ERRORS };
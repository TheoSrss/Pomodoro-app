import ky from 'ky';

import { getSession, signOut } from 'next-auth/react';

const api = ky.create({
    prefixUrl: process.env.NEXT_PUBLIC_URI_API,
    hooks: {
        beforeRequest: [
            async request => {
                const session = await getSession();
                if (session?.accessToken) {
                    request.headers.set('Authorization', `Bearer ${session.accessToken}`);
                }
            },
        ],
        afterResponse: [
            async (_request, _options, response) => {
                if (response.status === 401) {
                    await signOut({ callbackUrl: "/login?error=expired", });
                }
            },
        ],

    }
});

export default api;

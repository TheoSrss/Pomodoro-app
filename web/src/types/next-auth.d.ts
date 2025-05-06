// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { NextAuth } from "next-auth";

type CustomUser = {
    id: string;
    email: string;
    token: string;
    jwtSubscriber: string;
};

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user: CustomUser;
    }


    interface JWT {
        accessToken?: string;
        id: string;
        email: string;
        jwtSubscriber: string
    }
}

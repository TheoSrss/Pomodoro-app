
import "next-auth";

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user: {
            id: string;
            email: string;
        };
    }

    interface JWT {
        accessToken?: string;
        id: string;
        email: string;
    }
}

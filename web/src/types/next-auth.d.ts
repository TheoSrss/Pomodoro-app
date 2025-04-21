

type CustomUser = {
    id: string;
    email: string;
    token: string;
};

declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user: CustomUser;
    }

    interface User extends CustomUser { }

    interface JWT {
        accessToken?: string;
        id: string;
        email: string;
    }
}

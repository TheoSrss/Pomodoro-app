import { CustomUser } from "@/types/next-auth";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";


export const authOptions: NextAuthOptions = {
    pages: {
        signIn: "/login",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials): Promise<CustomUser | null> {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_URI_API}/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            email: credentials?.email,
                            password: credentials?.password,
                        }),
                    });
                    const data = await res.json();

                    if (res.ok && data.token) {
                        return {
                            id: data.user.id,
                            email: data.user.email,
                            token: data.token
                        };
                    }
                    return null;
                } catch {
                    return null;
                }
            },

        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!
        })

    ],
    callbacks: {
        async jwt({ account, token, user }) {
            if (user?.token) {
                token.accessToken = user.token;
                token.id = user.id;
                token.email = user.email;
                return token;
            }
            if (account?.provider === "google") {
                const googleAccessToken = account.access_token;

                const res = await fetch(`${process.env.NEXT_PUBLIC_URI_API}/oauth/check/google`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ access_token: googleAccessToken }),
                });

                const data = await res.json();
                if (!res.ok || !data.token) {
                    throw new Error("Échec lors de l'échange du token Google");
                }

                token.accessToken = data.token;
                token.id = data.user?.id;
                token.email = data.user?.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.accessToken = token.accessToken as string;
                session.user = {
                    id: token.id as string,
                    email: token.email as string,
                    token: token.accessToken as string,
                };
            }
            return session;
        },
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.AUTH_SECRET,

}
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }

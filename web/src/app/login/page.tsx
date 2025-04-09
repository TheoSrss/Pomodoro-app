"use client";

import { signIn } from "next-auth/react";

export default function Login() {

    const handleLogin = async (e: any) => {
        e.preventDefault();
        const email = "theo@gmail.com";
        const password = "theo";

        await signIn("credentials", {
            email,
            password,
            redirect: true,
            callbackUrl: "/",
        });
    };

    return (
        <>
            <button onClick={handleLogin}>Connexion classique</button>
            <button onClick={() => signIn("google", { callbackUrl: "/" })}>Connexion Google</button >
            <button onClick={() => signIn("github", { callbackUrl: "/" })}>Connexion GitHub</button >
        </>
    );
}

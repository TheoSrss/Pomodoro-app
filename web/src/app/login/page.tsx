"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = async (e: any) => {
        e.preventDefault();

        await signIn("credentials", {
            email,
            password,
            redirect: true,
            callbackUrl: "/",
        });
    };

    return (
        <div className="m-auto my-40 min-w-80 max-w-110 flex flex-col py-10 px-20 bg-beige rounded-2xl shadow-[0.625rem_0.625rem_0.875rem_0_rgb(225,226,228),-0.5rem_-0.5rem_1.125rem_0_rgb(255,255,255)] ">
            <div className=" w-full flex justify-evenly py-2 mb-7">
                <span className="font-bold">Login</span>
                <span>Sign up</span>
            </div>

            <h1 className="uppercase font-bold text-4xl text-center">Pomodoro</h1>
            <form action="#" className="my-5">

                <Input
                    type="text"
                    id="email"
                    placeholder="thibault@gmail.com"
                    value={email}
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    id="password"
                    placeholder="mypassword"
                    label="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    onClick={handleLogin}
                    className="mt-5"
                >
                    Log In
                </Button>
            </form >

            <div className="flex items-center gap-2 my-6">
                <div className="flex-1 border-t border-gray-300 dark:border-zinc-700 shadow-sm blur-[1px] opacity-70" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Continue with</span>
                <div className="flex-1 border-t border-gray-300 dark:border-zinc-700 shadow-sm blur-[1px] opacity-70" />
            </div>


            <Button onClick={() => signIn("google", { callbackUrl: "/" })} className="mb-4">
                <Image src="/google.webp" alt="Google" width={20} height={20} />
                Google
            </Button>


            <Button onClick={() => signIn("google", { callbackUrl: "/" })} className="">
                <Image src="/github.png" alt="Google" width={20} height={20} />
                Github
            </Button>
            {/* <button onClick={() => signIn("github", { callbackUrl: "/" })}>Connexion GitHub</button > */}
        </div >
    );
}

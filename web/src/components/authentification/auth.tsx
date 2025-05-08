import Link from "next/link";
import { Suspense } from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc";

import { usePathname } from "next/navigation";
import Logo from "../logo";

export default function MainAuth({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();

    return (
        <div className="m-4 md:mx-auto my-30 min-w-100 max-w-140 flex flex-col py-10 px-10 md:px-20 bg-beige rounded-2xl shadow-[0.625rem_0.625rem_0.875rem_0_rgb(225,226,228),-0.5rem_-0.5rem_1.125rem_0_rgb(255,255,255)]">
            <div className="w-full flex justify-evenly py-2 mb-7">
                <Link href="/login" className="flex flex-row items-center gap-3 cursor-pointer">
                    <span className={pathname === "/login" ? "font-bold text-2xl text-slate-800" : ""}>Login</span>
                </Link>
                <Link href="/register" className="flex flex-row items-center gap-3 cursor-pointer">
                    <span className={pathname === "/register" ? "font-bold text-2xl text-slate-800" : ""}>Sign up</span>
                </Link>
            </div>
            <Logo />
            <Suspense fallback={<div>Chargement...</div>}>
                {children}
            </Suspense>
            <div className="flex items-center gap-2 my-6">
                <div className="flex-1 border-t border-gray-300 dark:border-zinc-700 shadow-sm blur-[1px] opacity-70" />
                <span className="text-sm text-gray-500 dark:text-gray-400">Continue with</span>
                <div className="flex-1 border-t border-gray-300 dark:border-zinc-700 shadow-sm blur-[1px] opacity-70" />
            </div>

            <Button onClick={() => signIn("google", { callbackUrl: "/dashboard" })} className="mb-4">
                <FcGoogle style={{ width: 25, height: 25 }} />
                Google
            </Button>

            {/* <Button onClick={() => signIn("github", { callbackUrl: "/" })}>
                <Image src="/github.png" alt="Github" width={25} height={25} />
                Github
            </Button> */}
        </div>
    )
}
import Link from "next/link"
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";


function NavBar() {
    const { data: session } = useSession();

    return (
        <div className="w-full flex flex-row items-center justify-around pt-2 pb-3 px-4 bg-beige rounded-2xl shadow-[0.625rem_0.625rem_0.875rem_0_rgb(225,226,228),-0.5rem_-0.5rem_1.125rem_0_rgb(255,255,255)]">
            <Link href="/profile" className="flex flex-row items-center gap-3  cursor-pointer">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#e0e0e0] shadow-[6px_6px_12px_#bebebe,_-6px_-6px_12px_#ffffff]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-7 h-7 text-gray-600" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" />
                    </svg>
                </div>
                <span className="text-xl">
                    {session?.user?.email}
                </span>
            </Link>

            <Link href="/" className="text-4xl">
                POMODORO
            </Link>
            <div>
                <Button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="text-sm"
                >
                    Log out
                </Button>
            </div>
        </div >
    )
}

export { NavBar }

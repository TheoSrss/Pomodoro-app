import { Button } from "../ui/button";
import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import Logo from "../logo";
import { useTranslations } from "next-intl";

function NavBar() {
    const t = useTranslations('General');

    return (
        <div className="relative w-full px-5 xl:px-10 pt-2 pb-3 flex flex-row items-center justify-between bg-beige rounded-2xl shadow-[0.625rem_0.625rem_0.875rem_0_rgb(225,226,228),-0.5rem_-0.5rem_1.125rem_0_rgb(255,255,255)]">
            {/* <Link href="/profile" className="flex flex-row items-center gap-3 cursor-pointer"> */}
            <Button className="w-12 p-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="text-gray-600 w-full h-full" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" />
                </svg>
            </Button>
            {/* </Link> */}
            <Logo url='dashboard' />
            <div>
                <Button
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="text-sm"
                >
                    <span className="hidden xl:inline">{t('logout')}</span>
                    <LogOut className="fa inline xl:hidden" />
                </Button>
            </div>
        </div >
    )
}

export { NavBar }

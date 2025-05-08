import Image from "next/image";
import Link from "next/link";

export default function Logo({ url = "" }: { url?: string }) {
    return (
        <div className="text-align text-4xl font-bold">
            <Link href={`/${url}`} className="flex flex-row items-center justify-center">
                <Image width={50} height={50} src="/pomo.png" alt="Pomo logo" className="mr-2" />
                <h1 className="mt-2">POMODORO</h1>
            </Link>
        </div>
    );
}
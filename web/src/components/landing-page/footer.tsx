import Link from "next/link";
import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";

export function Footer() {
    return (
        <footer className="border-t px-90">
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
                    <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                        Built by{" "}
                        <a
                            href='https://www.linkedin.com/in/theosourisseau/'
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            Théo Sourisseau
                        </a>
                        . The source code is available on{" "}
                        <a
                            href='https://github.com/TheoSrss/Pomodoro-app'
                            target="_blank"
                            rel="noreferrer"
                            className="font-medium underline underline-offset-4"
                        >
                            GitHub
                        </a>
                        .
                    </p>
                </div>

                <div className="flex items-center space-x-3">

                    <Link
                        href='https://github.com/TheoSrss/Pomodoro-app'
                    >
                        <Image src="/github.png" alt="Github" width={25} height={25} />
                    </Link>
                    <Link
                        href='https://www.linkedin.com/in/theosourisseau/'
                    >
                        <FaLinkedin className="w-7 h-7 text-black " />
                    </Link>
                </div>
            </div>
        </footer>
    );
}

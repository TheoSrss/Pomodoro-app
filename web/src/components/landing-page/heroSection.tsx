import Link from "next/link";
import { Button } from "../ui/button";

export default function HeroSection() {
    return (
        <section className="pt-30 lg:pt-50">
            <h1 className="text-4xl font-bold mb-5 text-center">
                Boostez votre productivité avec l&apos;application{" "}
                <span className="inline-block mt-2 text-primary bg-slate-400 rounded-xl font-bold py-1 px-3">
                    Pomodoro.
                </span>
            </h1>
            <p className="mb-6 text-lg text-gray-600 ">
                Une application synchronisé en temps réel et une interface simple et efficace.
            </p>
            <div className="flex gap-4 justify-center">
                <Link href="/register" >
                    <Button className="w-70" variant="primary">
                        Commencez maintenant
                    </Button>
                </Link>
            </div>
        </section>
    );
}
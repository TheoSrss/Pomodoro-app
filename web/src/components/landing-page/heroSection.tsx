import Link from "next/link";
import { Button } from "../ui/button";

export default function HeroSection() {
    return (
        <section className="pt-50">
            <h1 className="text-4xl font-bold mb-5">
                Boostez votre productivité avec l&apos;application Pomodoro.
            </h1>
            <p className="mb-6 text-lg text-gray-600">
                Une application synchronisé en temps réel et une interface simple et efficace.
            </p>
            <div className="flex gap-4 justify-center">
                <Link href="/register" >
                    <Button className="w-70">
                        Commencez maintenant
                    </Button>
                </Link>
            </div>
        </section>
    );
}
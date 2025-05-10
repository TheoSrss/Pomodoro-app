import Link from "next/link";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

export default function HeroSection() {
    const t = useTranslations('LandingPage.HeroSection');

    return (
        <section className="pt-30 lg:pt-50">
            <h1 className="text-4xl font-bold mb-5 text-center">
                {t('title')}
                <span className="inline-block mt-2 text-slate-800 bg-primary rounded-xl font-bold py-1 pl-3 pr-1">
                    Pomodoro.
                </span>
            </h1>
            <p className="mb-6 text-lg text-slate-800 ">
                {t('info')}
            </p>
            <div className="flex gap-4 justify-center">
                <Link href="/register" >
                    <Button className="w-70" variant="primary">
                        {t('start')}
                    </Button>
                </Link>
            </div>
        </section>
    );
}
import { LandingPageHeader } from "@/components/landing-page/header";
import { Footer } from "@/components/landing-page/footer";
import HeroSection from "@/components/landing-page/heroSection";
import FeaturesSection from "@/components/landing-page/featuresSection";
import Preview from "@/components/landing-page/preview";

export const metadata = {
    title: "Pomodoro - Boostez votre productivité",
    description: "App de gestion du temps avec focus, pauses, et synchronisation en temps réel.",
};

export default function HomeLanding() {

    return (
        <div className="flex min-h-screen flex-col">
            <LandingPageHeader
                items={[
                    // { title: "Home", href: "/" },
                    // { title: "Features", href: "/#features" },
                ]}
            />
            <main className="flex flex-col items-center text-center px-4">
                <HeroSection />
                <Preview />
                <FeaturesSection />
            </main>
            <Footer
            />
        </div>
    );
}


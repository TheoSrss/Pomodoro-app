import { Settings, RefreshCw, MonitorSmartphone, Lock } from "lucide-react";
import { useTranslations } from "next-intl";

export default function FeaturesSection() {
    const t = useTranslations('LandingPage.Features');

    const features = [
        {
            icon: <Settings size={28} />,
            title: t("f1.title"),
            desc: t("f1.desc"),
        },
        {
            icon: <RefreshCw size={28} />,
            title: t("f2.title"),
            desc: t("f2.desc"),
        },
        {
            icon: <MonitorSmartphone size={28} />,
            title: t("f3.title"),
            desc: t("f3.desc"),
        },
        {
            icon: <Lock size={28} />,
            title: t("f4.title"),
            desc: t("f4.desc"),
        },
    ];

    return (
        <section id='features' className="py-20 max-w-5xl w-full ">
            <h2 className="text-3xl font-bold mb-10">{t('title')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                {features.map((f, i) => (
                    <div key={i} className="p-6 rounded-xl shadow bg-slate-100  text-left">
                        <div className="mb-5 w-5 text-slate-800">{f.icon}</div>
                        <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                        <p className="text-gray-600 text-sm">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

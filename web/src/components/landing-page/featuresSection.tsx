import { Settings, RefreshCw, MonitorSmartphone, Lock } from "lucide-react";

const features = [
    { icon: <Settings size={28} />, title: "Personnalisation des minuteries", desc: "Réglez les durées des sessions/pauses." },
    { icon: <RefreshCw size={28} />, title: "Synchronisation temps réel", desc: "Votre minuterie est synchronisée en temps réel sur tous vos appareils." },
    { icon: <MonitorSmartphone size={28} />, title: "Design responsive", desc: "Interface adaptée à tous les écrans." },
    { icon: <Lock size={28} />, title: "Authentification sécurisée", desc: "Connexion via Email, Google, etc." },
];

export default function FeaturesSection() {
    return (
        <section id='features' className="py-20 max-w-5xl w-full ">
            <h2 className="text-3xl font-bold mb-10">Fonctionnalités</h2>
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

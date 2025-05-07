import Image from "next/image";

export default function Preview() {
    return (
        <section className="py-20 w-full flex justify-center">
            <div className="bg-white rounded-2xl shadow-lg p-3 max-w-4xl w-full">
                <div className="flex items-center gap-2 px-3 py-1">
                    <span className="w-3 h-3 bg-red-400 rounded-full" />
                    <span className="w-3 h-3 bg-yellow-400 rounded-full" />
                    <span className="w-3 h-3 bg-green-400 rounded-full" />
                </div>
                <div className="rounded-xl overflow-hidden mt-2 border border-gray-200">
                    <Image
                        width={100}
                        height={100}
                        src="/preview.png"
                        alt="Aperçu de l'application Pomodoro"
                        className="w-full"
                    />
                </div>
            </div>
        </section>
    );
}

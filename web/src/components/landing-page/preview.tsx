import Image from "next/image";

export default function Preview() {
    return (
        <section className="py-20 w-full flex flex-col items-center justify-center">
            <div className="flex flex-col md:flex-row md:items-start items-center justify-center gap-8 w-full max-w-6xl px-4 h-full">
                <div className="bg-slate-800 rounded-2xl shadow-lg p-3 max-w-full md:max-w-2xl w-full flex-shrink-0 m-auto rotate-358">
                    <div className="flex items-center gap-2 px-2">
                        <span className="w-3 h-3 bg-red-400 rounded-full" />
                        <span className="w-3 h-3 bg-yellow-400 rounded-full" />
                        <span className="w-3 h-3 bg-green-400 rounded-full" />
                    </div>
                    <div className="rounded-xl overflow-hidden mt-2 border border-gray-200">
                        <Image
                            width={1200}
                            height={750}
                            src="/preview.png"
                            alt="Aperçu de l'application Pomodoro"
                            className="w-full h-auto"
                            priority
                        />
                    </div>
                </div>
                <div className=" flex flex-col items-center justify-center w-full max-w-65 rotate-10 ">
                    <Image
                        width={600}
                        height={1200}
                        src="/IphonePreview.png"
                        alt="Aperçu de l'application Pomodoro"
                        className="w-full h-auto"
                        priority
                    />
                </div>
            </div>
        </section >
    );
}

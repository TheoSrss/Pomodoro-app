"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

const availableLocales = ["fr", "en"];

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const handleChange = (newLocale: string) => {
        const segments = pathname.split("/");
        segments[1] = newLocale;
        const newPath = segments.join("/");
        router.replace(newPath);
    };

    return (
        <Select value={locale} onValueChange={handleChange}>
            <SelectTrigger className="w-[70px]">
                <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent className=" bg-slate-100">
                {availableLocales.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                        {loc.toUpperCase()}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
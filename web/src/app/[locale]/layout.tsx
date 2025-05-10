import "@/app/globals.css";
import { Providers } from "../providers";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale}>
            <body className="font-primary">
                <Providers>
                    <NextIntlClientProvider>
                        {children}
                    </NextIntlClientProvider>
                </Providers>
            </body>
        </html>
    );
}
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MainAuth from "@/components/authentification/auth";
import { Error } from "@/components/ui/error";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";

interface ApiViolation {
    propertyPath: string;
    message: string;
}

function RegisterFormContent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formError, setFormError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const errorSearch = searchParams.get("error");

    const t = useTranslations("RegisterPage");

    useEffect(() => {
        if (errorSearch === "CredentialsSignin") {
            setFormError(t("errors.CredentialsSignin"));
        } else if (errorSearch === "expired") {
            setFormError(t("errors.expired"));
        } else if (errorSearch) {
            setFormError(t("errors.default"));
        } else {
            setFormError(null);
        }
    }, [errorSearch, t]);

    function isPasswordValid(password: string): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setFormError(null);

        if (!isPasswordValid(password)) {
            setFormError(t("errors.passwordInvalid"));
            return;
        }

        if (password !== confirmPassword) {
            setFormError(t("errors.passwordMismatch"));
            return;
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URI_API}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                const data = await res.json();

                if (res.status === 422 && data.violations) {
                    const violation = data.violations.find((v: ApiViolation) => v.propertyPath === "email");
                    if (violation) {
                        setFormError(violation.propertyPath + " : " + violation.message);
                        return;
                    }
                }

                return;
            }

            await signIn("credentials", {
                email,
                password,
                redirect: true,
                callbackUrl: "/",
            });
        } catch {
            setFormError(t("errors.network"));
        }
    };

    return (
        <form className="my-5">
            <Error message={formError || ""} />
            <Input
                type="text"
                id="email"
                placeholder="gabin@gmail.com"
                value={email}
                label="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="password"
                id="password"
                placeholder={t("placeholders.password")}
                label={t("labels.password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Input
                type="password"
                id="confirm-password"
                placeholder={t("placeholders.confirmPassword")}
                label={t("labels.confirmPassword")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button onClick={handleRegister} className="mt-5">
                {t("submit")}
            </Button>
        </form>
    );
}

export default function RegisterPage() {
    return (
        <MainAuth>
            <RegisterFormContent />
        </MainAuth>
    );
}
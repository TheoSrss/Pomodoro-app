"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MainAuth from "@/components/authentification/auth";
import { Error } from "@/components/ui/error";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

interface ApiViolation {
    propertyPath: string;
    message: string;
}

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formError, setFormError] = useState<string | null>(null);
    const searchParams = useSearchParams();

    const errorSearch = searchParams.get("error");

    useEffect(() => {
        if (errorSearch === "CredentialsSignin") {
            setFormError("Email ou mot de passe incorrect.");
        } else if (errorSearch === "expired") {
            setFormError("Session expirée.");
        } else if (errorSearch) {
            setFormError("Une erreur est survenue. Veuillez réessayer.");
        } else {
            setFormError(null);
        }
    }, [errorSearch]);

    function isPasswordValid(password: string): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    }

    const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setFormError(null);

        if (!isPasswordValid(password)) {
            setFormError("Mot de passe : au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
            return;
        }
        if (password !== confirmPassword) {
            setFormError("Les mots de passe ne correspondent pas.");
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
                        setFormError(violation.propertyPath + ' : ' + violation.message);
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
            })
        } catch {
            setFormError("Erreur réseau.");
        }
    };

    return (
        <MainAuth>
            <Suspense fallback={<div>Chargement...</div>}>
                <form className="my-5">
                    <Error message={formError || ""} />
                    <Input
                        type="text"
                        id="email"
                        placeholder="thibault@gmail.com"
                        value={email}
                        label="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        id="password"
                        placeholder="Mot de passe"
                        label="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        type="password"
                        id="confirm-password"
                        placeholder="Répéter le mot de passe"
                        label="Confirmer le mot de passe"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button onClick={handleRegister} className="mt-5">
                        Register
                    </Button>
                </form>
            </Suspense>
        </MainAuth>
    );
}
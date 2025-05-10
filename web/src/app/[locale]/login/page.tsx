"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Error } from "@/components/ui/error"
import { Input } from "@/components/ui/input"
import MainAuth from "@/components/authentification/auth"
import { signIn } from "next-auth/react"
import { useTranslations } from "next-intl"

function LoginFormContent() {
    const t = useTranslations('LoginPage');
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [formError, setFormError] = useState<string | null>(null)

    const searchParams = useSearchParams()
    const errorSearch = searchParams.get("error")

    useEffect(() => {
        if (errorSearch === "OAuthAccountNotLinked") {
            setFormError(t("errors.OAuthAccountNotLinked"))
        } else if (errorSearch === "CredentialsSignin") {
            setFormError(t("errors.CredentialsSignin"))
        } else if (errorSearch === "expired") {
            setFormError(t("errors.expired"))
        } else if (errorSearch) {
            setFormError(t("errors.default"))
        } else {
            setFormError(null)
        }
    }, [errorSearch, t])

    const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        await signIn("credentials", {
            email,
            password,
            redirect: true,
            callbackUrl: "/dashboard",
        })
    }

    return (
        <>
            <form action="#" className="my-5">
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
                    placeholder={t("passwordPlaceholder")}
                    label={t("passwordLabel")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleLogin} className="mt-5">
                    {t('submit')}
                </Button>
            </form>

        </>
    )
}

export default function LoginPage() {
    return (
        <MainAuth>
            <LoginFormContent />
        </MainAuth>
    )
}

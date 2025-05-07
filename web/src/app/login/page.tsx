"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Error } from "@/components/ui/error"
import { Input } from "@/components/ui/input"
import MainAuth from "@/components/authentification/auth"
import { signIn } from "next-auth/react"

function LoginFormContent() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [formError, setFormError] = useState<string | null>(null)

    const searchParams = useSearchParams()
    const errorSearch = searchParams.get("error")

    useEffect(() => {
        if (errorSearch === "OAuthAccountNotLinked") {
            setFormError("Un compte avec cette adresse existe déjà. Veuillez utiliser un autre moyen de connexion.")
        } else if (errorSearch === "CredentialsSignin") {
            setFormError("Email ou mot de passe incorrect.")
        } else if (errorSearch === "expired") {
            setFormError("Session expirée.")
        } else if (errorSearch) {
            setFormError("Une erreur est survenue. Veuillez réessayer.")
        } else {
            setFormError(null)
        }
    }, [errorSearch])

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
                    placeholder="thibault@gmail.com"
                    value={email}
                    label="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    id="password"
                    placeholder="mypassword"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleLogin} className="mt-5">
                    Log In
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

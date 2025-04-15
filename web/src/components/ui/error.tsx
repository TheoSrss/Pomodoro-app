import React from "react"
import { cn } from "@/lib/utils"

interface ErrorProps {
    message: string
    className?: string
}

export const Error = ({ message, className }: ErrorProps) => {
    if (!message) return null

    return (
        <div
            className={cn(
                "w-full text-center rounded-xl bg-red-100/50 text-red-500/60 font-semibold py-2 px-4 shadow-sm my-4",
                className
            )}
        >
            {message}
        </div>
    )
}

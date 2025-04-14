import * as React from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

function Input({ className, type, label, id, ...props }: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-gray-500">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        data-slot="input"
        className={cn(
          // Base styles
          "w-full px-4 py-3 rounded-[15px] border-none outline-none bg-[#f0f0f0] transition duration-300 ease-in-out",
          // Inset light shadow
          "shadow-[inset_1px_2px_4px_rgba(0,0,0,0.1)]",
          // Focus
          "focus:scale-[1.03] focus:shadow-[0_4px_12px_rgba(0,0,0,0.1)]",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { Input }

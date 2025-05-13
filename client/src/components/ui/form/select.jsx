import * as React from "react"
import { cn } from "../../../lib/utils"

export function Select({ children, className, ...props }) {
  return (
    <select
      className={cn("h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-ring", className)}
      {...props}
    >
      {children}
    </select>
  )
}

export function SelectTrigger({ children, className, ...props }) {
  return <div className={cn("rounded-md border px-3 py-2", className)} {...props}>{children}</div>
}

export function SelectValue({ children }) {
  return <span>{children}</span>
}

export function SelectContent({ className, ...props }) {
  return <div className={cn("bg-white border rounded-md shadow-lg mt-1", className)} {...props} />
}

export function SelectItem({ children, className, ...props }) {
  return <option className={cn("px-4 py-2", className)} {...props}>{children}</option>
}
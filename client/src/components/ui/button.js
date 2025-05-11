import React from "react"
import { cn } from "../../lib/utils"

export const buttonVariants = {
  default: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring disabled:opacity-50 disabled:pointer-events-none bg-primary text-primary-foreground hover:bg-primary/90",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
}

export function Button({ className, variant = "default", ...props }) {
  return (
    <button className={cn(buttonVariants[variant], className)} {...props} />
  )
}
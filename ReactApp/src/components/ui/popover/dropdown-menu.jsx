import * as React from "react"
import { cn } from "../../../lib/utils"

export function DropdownMenu({ children }) {
  return <div className="relative">{children}</div>
}

export function DropdownMenuTrigger({ children, ...props }) {
  return <button {...props}>{children}</button>
}

export function DropdownMenuContent({ className, ...props }) {
  return (
    <div
      className={cn(
        "absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md border bg-popover p-1 shadow-md",
        className
      )}
      {...props}
    />
  )
}

export function DropdownMenuItem({ className, ...props }) {
  return (
    <div
      className={cn("px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer", className)}
      {...props}
    />
  )
}
import * as React from "react"
import { cn } from "../../../lib/utils"

export function Dialog({ children }) {
  return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">{children}</div>
}

export function DialogContent({ className, ...props }) {
  return (
    <div
      className={cn(
        "z-50 grid w-full max-w-lg gap-4 border bg-popover p-6 shadow-lg duration-200 rounded-lg",
        className
      )}
      {...props}
    />
  )
}

export function DialogHeader({ className, ...props }) {
  return <div className={cn("flex flex-col space-y-2 text-center sm:text-left", className)} {...props} />
}

export function DialogTitle({ className, ...props }) {
  return <h2 className={cn("text-lg font-semibold", className)} {...props} />
}

export function DialogTrigger({ asChild, children, ...props }) {
  return asChild ? React.cloneElement(children, props) : <button {...props}>{children}</button>
}

export function DialogFooter({ className, ...props }) {
  return <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
}
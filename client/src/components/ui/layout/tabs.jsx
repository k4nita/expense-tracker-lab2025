import * as React from "react"
import { cn } from "../../../lib/utils"

export function Tabs({ children }) {
  return <div>{children}</div>
}

export function TabsList({ className, ...props }) {
  return (
    <div className={cn("inline-flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground", className)} {...props} />
  )
}

export function TabsTrigger({ className, ...props }) {
  return (
    <button
      className={cn("inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground", className)}
      {...props}
    />
  )
}
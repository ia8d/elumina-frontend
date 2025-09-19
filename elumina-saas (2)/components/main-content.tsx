import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface MainContentProps {
  children: ReactNode
  className?: string
}

export function MainContent({ children, className }: MainContentProps) {
  return (
    <main className={cn("ml-64 min-h-screen bg-background transition-all duration-300", className)}>
      <div className="p-6">{children}</div>
    </main>
  )
}

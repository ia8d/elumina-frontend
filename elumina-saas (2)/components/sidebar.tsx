"use client"

import { useState } from "react"
import { LayoutDashboard, Calendar, Users, Inbox, Settings, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  className?: string
}

const navigationItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/",
    active: false,
  },
  {
    name: "Agenda",
    icon: Calendar,
    href: "/agenda",
    active: false,
  },
  {
    name: "Pacientes",
    icon: Users,
    href: "/pacientes",
    active: false,
  },
  {
    name: "Caixa de Entrada",
    icon: Inbox,
    href: "/inbox",
    active: false,
  },
  {
    name: "Configurações",
    icon: Settings,
    href: "/configuracoes",
    active: false,
  },
]

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "fixed left-0 top-0 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 z-50",
        collapsed ? "w-16" : "w-64",
        className,
      )}
    >
      {/* Header with Logo */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div className={cn("flex items-center gap-3 transition-opacity duration-300", collapsed && "opacity-0")}>
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-lg">E</span>
          </div>
          <h1 className="text-sidebar-foreground font-bold text-xl">Elumina</h1>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded-md hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group",
                item.active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className={cn("transition-opacity duration-300", collapsed && "opacity-0")}>{item.name}</span>
            </a>
          )
        })}
      </nav>
    </div>
  )
}

import { Bell, Search, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function DashboardHeader() {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Bem-vindo de volta! Aqui está um resumo da sua clínica hoje.</p>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Buscar pacientes..." className="pl-10 w-64" />
        </div>

        {/* Notifications */}
        <Button variant="outline" size="icon">
          <Bell className="w-4 h-4" />
        </Button>

        {/* Profile */}
        <Button variant="outline" size="icon">
          <User className="w-4 h-4" />
        </Button>
      </div>
    </header>
  )
}

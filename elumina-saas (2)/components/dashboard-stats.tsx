import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Clock, TrendingUp } from "lucide-react"

const stats = [
  {
    title: "Pacientes Hoje",
    value: "12",
    change: "+2 desde ontem",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Consultas Agendadas",
    value: "8",
    change: "3 pendentes",
    icon: Calendar,
    color: "text-green-600",
  },
  {
    title: "Tempo Médio",
    value: "45min",
    change: "-5min desde semana passada",
    icon: Clock,
    color: "text-orange-600",
  },
  {
    title: "Receita Mensal",
    value: "R$ 15.420",
    change: "+12% este mês",
    icon: TrendingUp,
    color: "text-purple-600",
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <Icon className={`w-4 h-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

import { Sidebar } from "@/components/sidebar"
import { MainContent } from "@/components/main-content"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <MainContent>
        <DashboardHeader />
        <DashboardStats />

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Próximas Consultas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Maria Silva</p>
                    <p className="text-sm text-muted-foreground">Consulta de rotina</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">09:00</p>
                    <p className="text-xs text-muted-foreground">Hoje</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">João Santos</p>
                    <p className="text-sm text-muted-foreground">Retorno</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">10:30</p>
                    <p className="text-xs text-muted-foreground">Hoje</p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium">Ana Costa</p>
                    <p className="text-sm text-muted-foreground">Primeira consulta</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">14:00</p>
                    <p className="text-xs text-muted-foreground">Hoje</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Atividade Recente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm">Consulta com Pedro Lima finalizada</p>
                    <p className="text-xs text-muted-foreground">Há 15 minutos</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm">Nova consulta agendada para amanhã</p>
                    <p className="text-xs text-muted-foreground">Há 1 hora</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm">Exame de Carla Mendes recebido</p>
                    <p className="text-xs text-muted-foreground">Há 2 horas</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm">Receita enviada para farmácia</p>
                    <p className="text-xs text-muted-foreground">Há 3 horas</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainContent>
    </div>
  )
}

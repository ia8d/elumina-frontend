import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"

export function GoogleCalendarCard() {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Integração com Google Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Conecte sua agenda do Google Calendar para sincronizar automaticamente seus compromissos e evitar conflitos de
          horários. Isso permite uma gestão mais eficiente da sua agenda médica.
        </p>

        <Button size="lg" className="w-full sm:w-auto">
          <Calendar className="w-4 h-4 mr-2" />
          Conectar com Google Calendar
        </Button>
      </CardContent>
    </Card>
  )
}

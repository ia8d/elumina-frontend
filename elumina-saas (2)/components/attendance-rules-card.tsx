"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Clock } from "lucide-react"

const daysOfWeek = [
  { id: "monday", name: "Segunda-feira", shortName: "Seg" },
  { id: "tuesday", name: "Terça-feira", shortName: "Ter" },
  { id: "wednesday", name: "Quarta-feira", shortName: "Qua" },
  { id: "thursday", name: "Quinta-feira", shortName: "Qui" },
  { id: "friday", name: "Sexta-feira", shortName: "Sex" },
  { id: "saturday", name: "Sábado", shortName: "Sáb" },
  { id: "sunday", name: "Domingo", shortName: "Dom" },
]

export function AttendanceRulesCard() {
  const [consultationDuration, setConsultationDuration] = useState("30")
  const [workingHours, setWorkingHours] = useState({
    monday: { works: true, start: "08:00", end: "18:00" },
    tuesday: { works: true, start: "08:00", end: "18:00" },
    wednesday: { works: true, start: "08:00", end: "18:00" },
    thursday: { works: true, start: "08:00", end: "18:00" },
    friday: { works: true, start: "08:00", end: "18:00" },
    saturday: { works: false, start: "08:00", end: "12:00" },
    sunday: { works: false, start: "08:00", end: "12:00" },
  })

  const handleWorkingHourChange = (day: string, field: string, value: string | boolean) => {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Regras de Atendimento
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Consultation Duration */}
        <div className="space-y-2">
          <Label htmlFor="duration">Duração Padrão da Consulta (em minutos)</Label>
          <Input
            id="duration"
            type="number"
            value={consultationDuration}
            onChange={(e) => setConsultationDuration(e.target.value)}
            className="w-32"
            min="15"
            max="120"
            step="15"
          />
        </div>

        {/* Working Hours Table */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Horários de Atendimento Semanais</Label>

          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-muted px-4 py-3 border-b border-border">
              <div className="grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground">
                <div>Dia</div>
                <div>Trabalha?</div>
                <div>Horário de Início</div>
                <div>Horário de Fim</div>
              </div>
            </div>

            <div className="divide-y divide-border">
              {daysOfWeek.map((day) => (
                <div key={day.id} className="px-4 py-3">
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div className="text-sm font-medium">
                      <span className="hidden sm:inline">{day.name}</span>
                      <span className="sm:hidden">{day.shortName}</span>
                    </div>

                    <div>
                      <Switch
                        checked={workingHours[day.id as keyof typeof workingHours].works}
                        onCheckedChange={(checked) => handleWorkingHourChange(day.id, "works", checked)}
                      />
                    </div>

                    <div>
                      <Input
                        type="time"
                        value={workingHours[day.id as keyof typeof workingHours].start}
                        onChange={(e) => handleWorkingHourChange(day.id, "start", e.target.value)}
                        disabled={!workingHours[day.id as keyof typeof workingHours].works}
                        className="text-sm"
                      />
                    </div>

                    <div>
                      <Input
                        type="time"
                        value={workingHours[day.id as keyof typeof workingHours].end}
                        onChange={(e) => handleWorkingHourChange(day.id, "end", e.target.value)}
                        disabled={!workingHours[day.id as keyof typeof workingHours].works}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

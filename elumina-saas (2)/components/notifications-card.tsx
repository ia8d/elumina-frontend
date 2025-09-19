"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bell } from "lucide-react"

export function NotificationsCard() {
  const [whatsappNumber, setWhatsappNumber] = useState("")

  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          Notificações
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">
          Configure seu número do WhatsApp para receber alertas urgentes sobre consultas, cancelamentos e outras
          informações importantes da clínica.
        </p>

        <div className="space-y-2">
          <Label htmlFor="whatsapp">Número de WhatsApp para Notificações</Label>
          <Input
            id="whatsapp"
            type="tel"
            placeholder="(11) 99999-9999"
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            className="max-w-xs"
          />
          <p className="text-xs text-muted-foreground">
            Digite o número com DDD, incluindo o código do país se necessário.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

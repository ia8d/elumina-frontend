"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"

interface Appointment {
  id: string
  date: string
  time: string
  status: "Confirmado" | "Agendado" | "Remarcar"
  patient_id: string
  patients: {
    name: string
  }
}

const statusColors = {
  Confirmado: "bg-green-100 text-green-800 border-green-200",
  Agendado: "bg-blue-100 text-blue-800 border-blue-200",
  Remarcar: "bg-yellow-100 text-yellow-800 border-yellow-200",
}

const statusLabels = {
  Confirmado: "Confirmado",
  Agendado: "Agendado",
  Remarcar: "Remarcar",
}

const weekDays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]
const timeSlots = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

const ChevronLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const PlusIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v14m7-7H5" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth={1}></rect>
    <line x1="16" y1="2" x2="16" y2="6" strokeWidth={1}></line>
    <line x1="8" y1="2" x2="8" y2="6" strokeWidth={1}></line>
    <line x1="3" y1="10" x2="21" y2="10" strokeWidth={1}></line>
  </svg>
)

export default function AgendaPage() {
  const [viewMode, setViewMode] = useState<"dia" | "semana" | "mes">("semana")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        console.log("[v0] Buscando agendamentos do Supabase...")
        const supabase = createClient()
        const { data, error } = await supabase
          .from("appointments")
          .select(`
            id,
            date,
            time,
            status,
            patient_id,
            patients (
              name
            )
          `)
          .order("date", { ascending: true })
          .order("time", { ascending: true })

        if (error) {
          console.error("[v0] Erro ao buscar agendamentos:", error)
          throw error
        }

        console.log("[v0] Agendamentos recebidos:", data)
        setAppointments(data || [])
      } catch (error) {
        console.error("[v0] Erro ao buscar agendamentos:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-BR", {
      month: "long",
      year: "numeric",
    })
  }

  const goToPrevious = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "semana") {
      newDate.setDate(newDate.getDate() - 7)
    } else if (viewMode === "mes") {
      newDate.setMonth(newDate.getMonth() - 1)
    } else {
      newDate.setDate(newDate.getDate() - 1)
    }
    setCurrentDate(newDate)
  }

  const goToNext = () => {
    const newDate = new Date(currentDate)
    if (viewMode === "semana") {
      newDate.setDate(newDate.getDate() + 7)
    } else if (viewMode === "mes") {
      newDate.setMonth(newDate.getMonth() + 1)
    } else {
      newDate.setDate(newDate.getDate() + 1)
    }
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const getAppointmentsForDay = (dayIndex: number) => {
    const today = new Date()
    const targetDate = new Date(today)
    targetDate.setDate(today.getDate() + dayIndex - today.getDay())

    return appointments.filter((apt) => {
      const aptDate = new Date(apt.date)
      return aptDate.toDateString() === targetDate.toDateString()
    })
  }

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5) // Remove segundos se houver
  }

  if (loading) {
    return (
      <div className="flex-1 space-y-6 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Carregando agendamentos...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Agenda de Consultas</h1>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <PlusIcon />
          <span className="ml-2">Novo Agendamento</span>
        </Button>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg border">
        <div className="flex items-center space-x-4">
          {/* View Mode Buttons */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {(["dia", "semana", "mes"] as const).map((mode) => (
              <Button
                key={mode}
                variant={viewMode === mode ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode(mode)}
                className={viewMode === mode ? "bg-white shadow-sm" : ""}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </Button>
            ))}
          </div>

          {/* Date Navigation */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={goToPrevious}>
              <ChevronLeftIcon />
            </Button>
            <Button variant="outline" size="sm" onClick={goToNext}>
              <ChevronRightIcon />
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Hoje
            </Button>
          </div>
        </div>

        <div className="text-lg font-semibold text-gray-700">{formatDate(currentDate)}</div>
      </div>

      {/* Calendar Grid - Week View */}
      {viewMode === "semana" && (
        <Card className="p-6">
          <div className="grid grid-cols-8 gap-2">
            {/* Time Column Header */}
            <div className="font-semibold text-gray-600 text-sm"></div>

            {/* Day Headers */}
            {weekDays.map((day, index) => (
              <div key={day} className="font-semibold text-center text-gray-600 text-sm p-2">
                {day}
              </div>
            ))}

            {/* Time Slots and Appointments */}
            {timeSlots.map((time) => (
              <>
                {/* Time Label */}
                <div key={time} className="text-sm text-gray-500 py-2 pr-2 text-right">
                  {time}
                </div>

                {/* Day Columns */}
                {weekDays.map((_, dayIndex) => {
                  const dayAppointments = getAppointmentsForDay(dayIndex).filter((apt) => formatTime(apt.time) === time)

                  return (
                    <div key={`${time}-${dayIndex}`} className="min-h-[60px] border border-gray-100 p-1">
                      {dayAppointments.map((appointment) => (
                        <div
                          key={appointment.id}
                          className={`p-2 rounded text-xs font-medium mb-1 ${statusColors[appointment.status]}`}
                        >
                          <div className="font-semibold">{formatTime(appointment.time)}</div>
                          <div className="truncate">{appointment.patients?.name}</div>
                        </div>
                      ))}
                    </div>
                  )
                })}
              </>
            ))}
          </div>
        </Card>
      )}

      {/* Day View */}
      {viewMode === "dia" && (
        <Card className="p-6">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg mb-4">
              {currentDate.toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </h3>
            {timeSlots.map((time) => (
              <div key={time} className="flex items-center space-x-4 py-2 border-b border-gray-100">
                <div className="w-16 text-sm text-gray-500">{time}</div>
                <div className="flex-1">
                  {appointments
                    .filter((apt) => {
                      const aptDate = new Date(apt.date)
                      return formatTime(apt.time) === time && aptDate.toDateString() === currentDate.toDateString()
                    })
                    .map((appointment) => (
                      <div
                        key={appointment.id}
                        className={`inline-block p-2 rounded text-sm font-medium mr-2 ${statusColors[appointment.status]}`}
                      >
                        {appointment.patients?.name}
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Month View */}
      {viewMode === "mes" && (
        <Card className="p-6">
          <div className="text-center text-gray-600">
            <div className="mx-auto mb-4 text-gray-400">
              <CalendarIcon />
            </div>
            <p>Visualização de mês em desenvolvimento</p>
          </div>
        </Card>
      )}

      {/* Status Legend */}
      <Card className="p-4">
        <h3 className="font-semibold text-sm text-gray-700 mb-3">Legenda de Status</h3>
        <div className="flex space-x-6">
          {Object.entries(statusLabels).map(([status, label]) => (
            <div key={status} className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded ${statusColors[status as keyof typeof statusColors].split(" ")[0]}`}
              ></div>
              <span className="text-sm text-gray-600">{label}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

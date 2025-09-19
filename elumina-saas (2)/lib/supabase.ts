import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos para o banco de dados
export interface Patient {
  id: string
  nome_completo: string
  telefone: string
  email?: string
  data_ultima_visita?: string
  recomendacao_retorno?: string
  notas_adicionais?: string
  created_at: string
  updated_at: string
}

export interface Appointment {
  id: string
  patient_id: string
  data_agendamento: string
  horario: string
  status: "agendado" | "confirmado" | "remarcar" | "cancelado"
  observacoes?: string
  created_at: string
  updated_at: string
}

// Funções para pacientes
export const patientsService = {
  // Buscar todos os pacientes
  async getAll() {
    const { data, error } = await supabase.from("patients").select("*").order("nome_completo")

    if (error) throw error
    return data as Patient[]
  },

  // Criar novo paciente
  async create(patient: Omit<Patient, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase.from("patients").insert([patient]).select().single()

    if (error) throw error
    return data as Patient
  },

  // Atualizar paciente
  async update(id: string, patient: Partial<Patient>) {
    const { data, error } = await supabase
      .from("patients")
      .update({ ...patient, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data as Patient
  },

  // Deletar paciente
  async delete(id: string) {
    const { error } = await supabase.from("patients").delete().eq("id", id)

    if (error) throw error
  },
}

// Funções para agendamentos
export const appointmentsService = {
  // Buscar todos os agendamentos
  async getAll() {
    const { data, error } = await supabase
      .from("appointments")
      .select(`
        *,
        patients (
          nome_completo,
          telefone
        )
      `)
      .order("data_agendamento")

    if (error) throw error
    return data
  },

  // Criar novo agendamento
  async create(appointment: Omit<Appointment, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase.from("appointments").insert([appointment]).select().single()

    if (error) throw error
    return data as Appointment
  },

  // Atualizar agendamento
  async update(id: string, appointment: Partial<Appointment>) {
    const { data, error } = await supabase
      .from("appointments")
      .update({ ...appointment, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) throw error
    return data as Appointment
  },

  // Deletar agendamento
  async delete(id: string) {
    const { error } = await supabase.from("appointments").delete().eq("id", id)

    if (error) throw error
  },
}

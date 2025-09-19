import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    console.log("[v0] Iniciando busca de pacientes")
    const supabase = await createClient()

    const { data: pacientes, error } = await supabase
      .from("pacientes")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error("[v0] Erro ao buscar pacientes:", error.message, error.details)
      return NextResponse.json({ error: `Erro ao buscar pacientes: ${error.message}` }, { status: 500 })
    }

    console.log("[v0] Pacientes encontrados:", pacientes?.length || 0)
    console.log("[v0] Dados dos pacientes:", pacientes)
    return NextResponse.json({ patients: pacientes })
  } catch (error) {
    console.error("[v0] Erro interno:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    console.log("[v0] Iniciando criação de paciente")
    const supabase = await createClient()
    const body = await request.json()

    const { data: paciente, error } = await supabase
      .from("pacientes")
      .insert([
        {
          name: body.nomeCompleto,
          phone: body.telefone,
          email: body.email || null,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("[v0] Erro ao criar paciente:", error)
      return NextResponse.json({ error: "Erro ao criar paciente" }, { status: 500 })
    }

    console.log("[v0] Paciente criado com sucesso:", paciente.id)
    return NextResponse.json({ paciente })
  } catch (error) {
    console.error("[v0] Erro interno:", error)
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 })
  }
}

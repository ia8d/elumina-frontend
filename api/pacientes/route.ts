import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Função para LER os pacientes (GET)
export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase.from('pacientes').select('*');

  if (error) {
    console.error('Erro no Supabase (GET):', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// Função para CRIAR um novo paciente (POST)
export async function POST(request: Request) {
  const { name, phone, email } = await request.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data, error } = await supabase
    .from('pacientes')
    .insert([{ name, phone, email }])
    .select();

  if (error) {
    console.error('Erro no Supabase (POST):', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

-- Criar tabela de pacientes
CREATE TABLE IF NOT EXISTS patients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome_completo VARCHAR(255) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  data_ultima_visita DATE,
  recomendacao_retorno VARCHAR(50),
  notas_adicionais TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de agendamentos
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_id UUID REFERENCES patients(id) ON DELETE CASCADE,
  data_agendamento DATE NOT NULL,
  horario TIME NOT NULL,
  status VARCHAR(20) DEFAULT 'agendado' CHECK (status IN ('agendado', 'confirmado', 'remarcar', 'cancelado')),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_patients_nome ON patients(nome_completo);
CREATE INDEX IF NOT EXISTS idx_appointments_data ON appointments(data_agendamento);
CREATE INDEX IF NOT EXISTS idx_appointments_patient ON appointments(patient_id);

-- Inserir dados de exemplo
INSERT INTO patients (nome_completo, telefone, email, data_ultima_visita, recomendacao_retorno, notas_adicionais) VALUES
('Maria Silva', '(11) 99999-1234', 'maria@email.com', '2024-01-15', 'A cada 6 meses', 'Paciente regular, sem complicações'),
('João Santos', '(11) 88888-5678', 'joao@email.com', '2024-02-20', 'A cada 3 meses', 'Necessita acompanhamento mais frequente'),
('Ana Costa', '(11) 77777-9012', 'ana@email.com', '2024-03-10', 'A cada 12 meses', 'Primeira consulta realizada com sucesso')
ON CONFLICT DO NOTHING;

-- Inserir agendamentos de exemplo (usando IDs dos pacientes criados)
INSERT INTO appointments (patient_id, data_agendamento, horario, status, observacoes)
SELECT 
  p.id,
  CASE 
    WHEN p.nome_completo = 'Maria Silva' THEN '2024-01-22'::date
    WHEN p.nome_completo = 'João Santos' THEN '2024-01-22'::date
    ELSE '2024-01-23'::date
  END,
  CASE 
    WHEN p.nome_completo = 'Maria Silva' THEN '09:00'::time
    WHEN p.nome_completo = 'João Santos' THEN '11:00'::time
    ELSE '16:00'::time
  END,
  CASE 
    WHEN p.nome_completo = 'Maria Silva' THEN 'confirmado'
    WHEN p.nome_completo = 'João Santos' THEN 'confirmado'
    ELSE 'remarcar'
  END,
  'Agendamento de exemplo'
FROM patients p
WHERE p.nome_completo IN ('Maria Silva', 'João Santos', 'Ana Costa')
ON CONFLICT DO NOTHING;

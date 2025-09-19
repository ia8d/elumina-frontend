-- Criando tabelas para pacientes e agendamentos com relacionamentos corretos
-- Criar tabela de pacientes
CREATE TABLE IF NOT EXISTS patients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  last_visit DATE,
  return_recommendation TEXT DEFAULT 'Não definido',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de agendamentos
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'Agendado' CHECK (status IN ('Confirmado', 'Agendado', 'Remarcar')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir dados de exemplo para pacientes
INSERT INTO patients (name, phone, email, last_visit, return_recommendation, notes) VALUES
('Maria Silva', '(11) 99999-1111', 'maria@email.com', '2024-01-15', 'A cada 3 meses', 'Paciente regular, sem complicações'),
('João Santos', '(11) 99999-2222', 'joao@email.com', '2024-02-20', 'A cada 6 meses', 'Primeira consulta'),
('Ana Costa', '(11) 99999-3333', 'ana@email.com', '2024-03-10', 'A cada 12 meses', 'Paciente com histórico de alergias'),
('Pedro Lima', '(11) 99999-4444', 'pedro@email.com', '2024-01-30', 'Não definido', 'Necessita acompanhamento especial'),
('Carla Oliveira', '(11) 99999-5555', 'carla@email.com', '2024-02-14', 'A cada 3 meses', 'Paciente colaborativa');

-- Inserir dados de exemplo para agendamentos (usando IDs dos pacientes criados)
INSERT INTO appointments (patient_id, date, time, status, notes)
SELECT 
  p.id,
  CASE 
    WHEN p.name = 'Maria Silva' THEN '2024-12-18'::DATE
    WHEN p.name = 'Carla Oliveira' THEN '2024-12-18'::DATE
    WHEN p.name = 'Pedro Lima' THEN '2024-12-18'::DATE
    WHEN p.name = 'João Santos' THEN '2024-12-19'::DATE
    WHEN p.name = 'Ana Costa' THEN '2024-12-20'::DATE
  END,
  CASE 
    WHEN p.name = 'Maria Silva' THEN '09:00'::TIME
    WHEN p.name = 'Carla Oliveira' THEN '11:00'::TIME
    WHEN p.name = 'Pedro Lima' THEN '16:00'::TIME
    WHEN p.name = 'João Santos' THEN '14:00'::TIME
    WHEN p.name = 'Ana Costa' THEN '10:30'::TIME
  END,
  CASE 
    WHEN p.name = 'Maria Silva' THEN 'Confirmado'
    WHEN p.name = 'Carla Oliveira' THEN 'Confirmado'
    WHEN p.name = 'Pedro Lima' THEN 'Remarcar'
    WHEN p.name = 'João Santos' THEN 'Agendado'
    WHEN p.name = 'Ana Costa' THEN 'Confirmado'
  END,
  'Agendamento de exemplo'
FROM patients p
WHERE p.name IN ('Maria Silva', 'Carla Oliveira', 'Pedro Lima', 'João Santos', 'Ana Costa');

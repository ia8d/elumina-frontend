-- Criando script SQL simplificado para criar as tabelas necessárias
-- Criar tabela de pacientes
CREATE TABLE IF NOT EXISTS patients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  birth_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Criar tabela de agendamentos
CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  patient_id INTEGER REFERENCES patients(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  time TIME NOT NULL,
  status VARCHAR(50) DEFAULT 'scheduled',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir alguns dados de exemplo para pacientes
INSERT INTO patients (name, email, phone, birth_date) VALUES
('Maria Silva', 'maria.silva@email.com', '(11) 99999-1111', '1985-03-15'),
('João Santos', 'joao.santos@email.com', '(11) 99999-2222', '1990-07-22'),
('Ana Costa', 'ana.costa@email.com', '(11) 99999-3333', '1988-11-08'),
('Pedro Oliveira', 'pedro.oliveira@email.com', '(11) 99999-4444', '1992-01-30'),
('Carla Ferreira', 'carla.ferreira@email.com', '(11) 99999-5555', '1987-09-12')
ON CONFLICT (email) DO NOTHING;

-- Inserir alguns agendamentos de exemplo
INSERT INTO appointments (patient_id, date, time, status, notes) VALUES
(1, '2024-01-15', '09:00', 'scheduled', 'Consulta de rotina'),
(2, '2024-01-15', '10:30', 'scheduled', 'Retorno'),
(3, '2024-01-16', '14:00', 'scheduled', 'Primeira consulta'),
(4, '2024-01-16', '15:30', 'scheduled', 'Acompanhamento'),
(5, '2024-01-17', '11:00', 'scheduled', 'Consulta de rotina')
ON CONFLICT DO NOTHING;

-- Criando tabela pacientes com estrutura correta e inserindo dados de teste
-- Criar tabela pacientes se não existir
CREATE TABLE IF NOT EXISTS pacientes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Desabilitar RLS temporariamente para desenvolvimento
ALTER TABLE pacientes DISABLE ROW LEVEL SECURITY;

-- Inserir dados de teste se a tabela estiver vazia
INSERT INTO pacientes (name, phone, email) 
SELECT * FROM (VALUES 
  ('Maria Silva Santos', '(11) 99999-1234', 'maria.silva@email.com'),
  ('João Pedro Oliveira', '(11) 98888-5678', 'joao.pedro@email.com'),
  ('Ana Carolina Costa', '(11) 97777-9012', 'ana.carolina@email.com'),
  ('Carlos Eduardo Lima', '(11) 96666-3456', 'carlos.eduardo@email.com'),
  ('Fernanda Alves Souza', '(11) 95555-7890', 'fernanda.alves@email.com')
) AS v(name, phone, email)
WHERE NOT EXISTS (SELECT 1 FROM pacientes LIMIT 1);

-- Criar tabela pacientes se não existir
CREATE TABLE IF NOT EXISTS public.pacientes (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Desabilitar RLS temporariamente para desenvolvimento
ALTER TABLE public.pacientes DISABLE ROW LEVEL SECURITY;

-- Inserir dados de exemplo se a tabela estiver vazia
INSERT INTO public.pacientes (name, phone, email)
SELECT 'João Silva', '(11) 99999-1234', 'joao@email.com'
WHERE NOT EXISTS (SELECT 1 FROM public.pacientes);

INSERT INTO public.pacientes (name, phone, email)
SELECT 'Maria Santos', '(11) 99999-5678', 'maria@email.com'
WHERE NOT EXISTS (SELECT 1 FROM public.pacientes WHERE name = 'Maria Santos');

-- Comentário: RLS desabilitado para desenvolvimento
-- Para produção, você deve habilitar RLS e criar políticas adequadas

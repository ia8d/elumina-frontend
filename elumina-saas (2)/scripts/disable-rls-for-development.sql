-- Desabilitar RLS temporariamente para desenvolvimento
-- ATENÇÃO: Isso remove a segurança! Use apenas em desenvolvimento

-- Desabilitar RLS na tabela pacientes
ALTER TABLE pacientes DISABLE ROW LEVEL SECURITY;

-- Desabilitar RLS na tabela appointments (se existir)
ALTER TABLE appointments DISABLE ROW LEVEL SECURITY;

-- Opcional: Se quiser reabilitar RLS mais tarde com políticas adequadas
-- ALTER TABLE pacientes ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow all operations" ON pacientes FOR ALL USING (true);

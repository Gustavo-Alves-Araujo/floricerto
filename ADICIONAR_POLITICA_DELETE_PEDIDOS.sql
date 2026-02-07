-- ✅ Execute isto no Supabase SQL Editor
-- Adicionar política RLS para permitir exclusão de pedidos

-- Remover política antiga se existir (para evitar conflitos)
DROP POLICY IF EXISTS "Permitir exclusão de pedidos" ON pedidos;

-- Criar política para permitir exclusão de pedidos
CREATE POLICY "Permitir exclusão de pedidos"
ON pedidos FOR DELETE
TO public
USING (true);

-- Verificar se a política foi criada
SELECT * FROM pg_policies WHERE tablename = 'pedidos' AND policyname = 'Permitir exclusão de pedidos';


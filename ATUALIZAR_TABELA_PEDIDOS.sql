-- ✅ Execute isto no Supabase SQL Editor
-- Adicionar campos faltantes na tabela pedidos

-- Adicionar tipo_entrega
ALTER TABLE pedidos 
ADD COLUMN IF NOT EXISTS tipo_entrega TEXT;

-- Adicionar valor_frete
ALTER TABLE pedidos 
ADD COLUMN IF NOT EXISTS valor_frete DECIMAL(10, 2) DEFAULT 0;

-- Adicionar mensagem_cartao
ALTER TABLE pedidos 
ADD COLUMN IF NOT EXISTS mensagem_cartao TEXT;


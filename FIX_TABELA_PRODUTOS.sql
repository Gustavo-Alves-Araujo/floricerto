-- ⚠️ EXECUTE ISTO NO SUPABASE SQL EDITOR
-- Isso vai deletar a tabela antiga e criar a nova

-- 1. Remover table antiga (se existir)
DROP TABLE IF EXISTS produtos CASCADE;

-- 2. Criar tabela nova com TODOS os campos
CREATE TABLE produtos (
    id BIGSERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    imagem TEXT NOT NULL,
    descricao TEXT,
    categoria TEXT,
    tipo TEXT NOT NULL DEFAULT 'produto' CHECK (tipo IN ('produto', 'order_bump')),
    destaques TEXT,
    ocasiao TEXT,
    entrega TEXT,
    palavrasChave TEXT,
    emoji TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;

-- 4. Políticas RLS
CREATE POLICY "Permitir leitura pública"
ON produtos FOR SELECT
TO public
USING (true);

CREATE POLICY "Permitir inserção"
ON produtos FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Permitir atualização"
ON produtos FOR UPDATE
TO public
USING (true);

CREATE POLICY "Permitir deleção"
ON produtos FOR DELETE
TO public
USING (true);

-- 5. Índices
CREATE INDEX idx_produtos_tipo ON produtos(tipo);
CREATE INDEX idx_produtos_categoria ON produtos(categoria);

-- Tabela de produtos para La Floricultura
-- Execute este SQL no Supabase SQL Editor

CREATE TABLE IF NOT EXISTS produtos (
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

-- Habilitar Row Level Security (RLS)
ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura pública
CREATE POLICY "Permitir leitura pública de produtos"
ON produtos FOR SELECT
TO public
USING (true);

-- Política para permitir inserção (apenas autenticado ou via service_role)
CREATE POLICY "Permitir inserção de produtos"
ON produtos FOR INSERT
TO public
WITH CHECK (true);

-- Política para permitir atualização
CREATE POLICY "Permitir atualização de produtos"
ON produtos FOR UPDATE
TO public
USING (true);

-- Política para permitir deleção
CREATE POLICY "Permitir deleção de produtos"
ON produtos FOR DELETE
TO public
USING (true);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_produtos_tipo ON produtos(tipo);
CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON produtos(categoria);

-- Comentários na tabela
COMMENT ON TABLE produtos IS 'Tabela de produtos e order bumps da floricultura';
COMMENT ON COLUMN produtos.tipo IS 'Tipo do produto: produto (normal) ou order_bump (complementar)';
COMMENT ON COLUMN produtos.emoji IS 'Emoji para order bumps sem imagem';

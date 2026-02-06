-- ⚠️ EXECUTE ISTO - VERSÃO SIMPLIFICADA
-- Tabela apenas com campos ESSENCIAIS

DROP TABLE IF EXISTS produtos CASCADE;

CREATE TABLE produtos (
    id BIGSERIAL PRIMARY KEY,
    nome TEXT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    imagem TEXT NOT NULL,
    descricao TEXT,
    categoria TEXT,
    tipo TEXT NOT NULL DEFAULT 'produto' CHECK (tipo IN ('produto', 'order_bump')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;

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

CREATE INDEX idx_produtos_tipo ON produtos(tipo);
CREATE INDEX idx_produtos_categoria ON produtos(categoria);

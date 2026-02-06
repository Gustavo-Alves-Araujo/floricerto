-- ✅ Execute isto no Supabase SQL Editor
-- Tabela para armazenar pedidos

CREATE TABLE IF NOT EXISTS pedidos (
    id BIGSERIAL PRIMARY KEY,
    numero_pedido TEXT UNIQUE NOT NULL,
    
    -- Cliente
    nome_cliente TEXT NOT NULL,
    telefone TEXT NOT NULL,
    cpf TEXT NOT NULL,
    nome_recebedor TEXT NOT NULL,
    
    -- Endereço
    cep TEXT NOT NULL,
    rua TEXT NOT NULL,
    numero TEXT NOT NULL,
    complemento TEXT,
    bairro TEXT NOT NULL,
    cidade TEXT NOT NULL,
    estado TEXT NOT NULL,
    
    -- Entrega
    data_entrega DATE NOT NULL,
    horario_entrega TEXT NOT NULL,
    instrucoes_adicionais TEXT,
    
    -- Pedido
    itens JSONB NOT NULL, -- Array de produtos
    valor_total DECIMAL(10, 2) NOT NULL,
    
    -- Pagamento
    mercado_pago_id TEXT,
    status_pagamento TEXT DEFAULT 'pendente', -- pendente, aprovado, rejeitado
    status_entrega TEXT DEFAULT 'pendente', -- pendente, separando, saiu_entrega, entregue, cancelado
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- RLS
ALTER TABLE pedidos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir leitura pública de pedidos"
ON pedidos FOR SELECT
TO public
USING (true);

CREATE POLICY "Permitir inserção de pedidos"
ON pedidos FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Permitir atualização de pedidos"
ON pedidos FOR UPDATE
TO public
USING (true);

-- Índices
CREATE INDEX idx_pedidos_numero ON pedidos(numero_pedido);
CREATE INDEX idx_pedidos_cpf ON pedidos(cpf);
CREATE INDEX idx_pedidos_status_pagamento ON pedidos(status_pagamento);
CREATE INDEX idx_pedidos_status_entrega ON pedidos(status_entrega);
CREATE INDEX idx_pedidos_created_at ON pedidos(created_at DESC);

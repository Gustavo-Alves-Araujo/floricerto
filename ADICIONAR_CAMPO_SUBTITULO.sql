-- ✅ Execute isto no Supabase SQL Editor
-- Adicionar campo subtitulo na tabela produtos

ALTER TABLE produtos 
ADD COLUMN IF NOT EXISTS subtitulo TEXT;


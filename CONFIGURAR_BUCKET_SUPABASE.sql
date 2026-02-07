-- ✅ Execute isto no Supabase SQL Editor
-- Configurar bucket para upload de imagens

-- 1. Remover políticas antigas se existirem
DROP POLICY IF EXISTS "Permitir upload de imagens" ON storage.objects;
DROP POLICY IF EXISTS "Permitir leitura pública de imagens" ON storage.objects;
DROP POLICY IF EXISTS "Permitir atualização de imagens" ON storage.objects;
DROP POLICY IF EXISTS "Permitir exclusão de imagens" ON storage.objects;

-- 2. Criar bucket (se não existir)
INSERT INTO storage.buckets (id, name, public)
VALUES ('produtos-imagens', 'produtos-imagens', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- 3. Criar política para permitir upload (anon users - para funcionar sem autenticação)
CREATE POLICY "Permitir upload de imagens"
ON storage.objects
FOR INSERT
TO anon
WITH CHECK (bucket_id = 'produtos-imagens');

-- 3. Criar política para permitir leitura pública
CREATE POLICY "Permitir leitura pública de imagens"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'produtos-imagens');

-- 4. Criar política para permitir atualização (anon users)
CREATE POLICY "Permitir atualização de imagens"
ON storage.objects
FOR UPDATE
TO anon
USING (bucket_id = 'produtos-imagens');

-- 5. Criar política para permitir exclusão (anon users)
CREATE POLICY "Permitir exclusão de imagens"
ON storage.objects
FOR DELETE
TO anon
USING (bucket_id = 'produtos-imagens');


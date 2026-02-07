# 🔧 Como Corrigir o Erro de Upload de Imagem

## Problema
O erro ocorre porque as políticas do Supabase Storage estão configuradas para `authenticated` mas estamos usando a chave `anon`.

## Solução

### 1. Execute o SQL Atualizado
Execute o arquivo `CONFIGURAR_BUCKET_SUPABASE.sql` novamente no Supabase SQL Editor. Ele agora:
- Remove políticas antigas
- Cria políticas para `anon` (sem necessidade de autenticação)

### 2. Verificar no Supabase Dashboard

1. Vá em **Storage** → **Policies**
2. Verifique se existem políticas para o bucket `produtos-imagens`
3. Se houver políticas antigas com `authenticated`, delete-as manualmente

### 3. Alternativa: Usar Service Role Key (Mais Seguro)

Se preferir usar autenticação, você pode:
1. Ir em **Settings** → **API** no Supabase
2. Copiar a **Service Role Key** (NÃO a anon key)
3. Usar essa chave apenas no admin (não exponha no frontend público)

### 4. Verificar Bucket

No Supabase Dashboard:
1. Vá em **Storage**
2. Verifique se o bucket `produtos-imagens` existe
3. Verifique se está marcado como **Public**
4. Teste fazer upload manualmente de uma imagem

### 5. Testar Upload

Após executar o SQL:
1. Recarregue a página do admin
2. Tente fazer upload de uma imagem
3. Verifique o console do navegador (F12) para ver erros detalhados

## Erros Comuns

**"new row violates row-level security policy"**
- As políticas não foram criadas corretamente
- Execute o SQL novamente

**"Bucket not found"**
- O bucket não foi criado
- Execute o SQL novamente ou crie manualmente no Dashboard

**"Permission denied"**
- As políticas estão bloqueando
- Verifique se as políticas estão para `anon` e não `authenticated`


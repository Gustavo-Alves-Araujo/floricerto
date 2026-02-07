# 📸 Instruções para Configurar Upload de Imagens no Admin

## 1. Configurar Bucket no Supabase

Execute o arquivo `CONFIGURAR_BUCKET_SUPABASE.sql` no SQL Editor do Supabase.

Isso irá:
- Criar o bucket `produtos-imagens`
- Configurar políticas de acesso (upload, leitura, atualização, exclusão)

## 2. Verificar Configuração

No painel do Supabase:
1. Vá em **Storage**
2. Verifique se o bucket `produtos-imagens` foi criado
3. Verifique se está marcado como **Public**

## 3. Como Usar no Admin

No formulário de adicionar/editar produto:

1. **Opção 1 - Upload de Arquivo:**
   - Clique em "Escolher arquivo"
   - Selecione uma imagem (máximo 5MB)
   - A imagem será enviada automaticamente para o Supabase
   - A URL será preenchida automaticamente

2. **Opção 2 - URL Manual:**
   - Cole uma URL de imagem diretamente no campo
   - Útil para imagens hospedadas externamente

## 4. Estrutura de Pastas

As imagens serão salvas em:
```
produtos-imagens/
  └── produtos/
      └── [timestamp]_[random].jpg
```

## 5. Limites

- Tamanho máximo: 5MB por imagem
- Formatos aceitos: JPG, PNG, GIF, WebP
- Acesso: Público (qualquer um pode ver as imagens)

## 6. Troubleshooting

**Erro ao fazer upload:**
- Verifique se o bucket foi criado corretamente
- Verifique se as políticas foram aplicadas
- Verifique o console do navegador (F12) para mais detalhes

**Imagem não aparece:**
- Verifique se o bucket está marcado como público
- Verifique se a URL foi gerada corretamente
- Teste a URL diretamente no navegador


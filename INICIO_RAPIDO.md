# 🚀 INÍCIO RÁPIDO - La Floricultura

## ⚡ 3 Passos para Começar

### 1️⃣ Criar a Tabela no Supabase

1. Acesse: https://nrgwldtmucptrhoyqted.supabase.co
2. Faça login
3. Clique em **SQL Editor** (menu esquerdo)
4. Clique em **+ New Query**
5. Abra o arquivo `supabase-schema.sql` neste projeto
6. Copie TODO o conteúdo
7. Cole no SQL Editor do Supabase
8. Clique em **RUN** (ou aperte Ctrl+Enter)
9. Aguarde a mensagem: ✅ **"Success. No rows returned"**

### 2️⃣ Testar a Conexão

1. Abra o arquivo: `test-supabase.html` no navegador
2. Clique em **1. Testar Conexão**
3. Deve aparecer: ✅ **"Conexão bem-sucedida! 0 produtos no banco"**
4. Clique em **2. Criar Produto de Teste**
5. Deve aparecer: ✅ **"Produto criado com ID: 1"**
6. Clique em **3. Listar Produtos**
7. Deve aparecer o produto de teste

✅ Se tudo funcionou, pode ir para o passo 3!

❌ Se deu erro, abra: `TROUBLESHOOTING.md`

### 3️⃣ Adicionar Produtos Reais

1. Abra: `admin.html` no navegador
2. Digite a senha: `admin123`
3. Clique em **+ ADICIONAR PRODUTO**
4. Preencha:
   - **Nome**: Nome completo do produto
   - **Preço**: 195.00 (use ponto, não vírgula)
   - **Categoria**: Escolha uma
   - **Tipo**: Produto Normal (ou Order Bump para complementos)
   - **URL da Imagem**: Cole um link de imagem (ex: do Unsplash)
   - **Descrição**: Texto descritivo
5. Clique em **SALVAR PRODUTO**

✅ Pronto! Seu produto aparecerá em `index.html`

---

## 📁 Estrutura de Arquivos

```
floricerto/
├── index.html              # Página inicial (catálogo)
├── produto.html            # Página de produto individual
├── carrinho.html           # Carrinho de compras
├── checkout.html           # Finalização do pedido
├── admin.html              # Painel administrativo
├── test-supabase.html      # 🧪 Teste de conexão
│
├── js/
│   ├── supabase-config.js  # ⚙️ Configuração do banco
│   ├── admin.js            # Lógica do admin
│   ├── produtos.js         # Carregamento de produtos
│   └── cart.js             # Carrinho de compras
│
├── supabase-schema.sql     # 📊 Schema do banco
├── SUPABASE_CONFIG.md      # 📖 Guia completo
└── TROUBLESHOOTING.md      # 🔧 Solução de problemas
```

---

## 🎯 Tipos de Produtos

### 🌸 Produto Normal
- Aparece na página inicial
- Pode ser filtrado por categoria
- Tem página de detalhes própria

**Categorias disponíveis:**
- Elegante
- Romântico
- Orquídeas
- Alegre
- Durável
- Minimalista

### 🎁 Order Bump
- Aparece APENAS no carrinho
- Na seção "Complete sua compra"
- Exemplos: chocolates, vinhos, pelúcias

---

## ⚠️ Problemas Comuns

| Erro | Solução Rápida |
|------|----------------|
| "supabaseDB is undefined" | Abra `test-supabase.html` e veja os logs |
| Produtos não aparecem | Verifique se cadastrou produtos no admin |
| Erro ao criar produto | Confirme que executou o SQL no Supabase |
| Imagem não carrega | Use URLs diretas (ex: Unsplash) |

📖 **Ver guia completo**: `TROUBLESHOOTING.md`

---

## 🔑 Credenciais

**Admin:**
- URL: `/admin.html`
- Senha: `admin123`

**Supabase:**
- URL: https://nrgwldtmucptrhoyqted.supabase.co
- (Credenciais já configuradas no código)

---

## ✅ Checklist de Verificação

Antes de usar em produção:

- [ ] Executou `supabase-schema.sql` no Supabase
- [ ] `test-supabase.html` funcionou sem erros
- [ ] Conseguiu criar produto no admin
- [ ] Produtos aparecem na página inicial
- [ ] Order bumps aparecem no carrinho
- [ ] Consegue adicionar ao carrinho
- [ ] Checkout exibe os produtos corretamente

---

## 🎨 Exemplos de Imagens

Use sites como:
- **Unsplash**: https://unsplash.com/s/photos/flowers
- **Pexels**: https://pexels.com/search/flowers
- **Pixabay**: https://pixabay.com/images/search/flowers

Copie o link direto da imagem (termina com .jpg ou .png)

---

## 🆘 Suporte

1. **Teste primeiro**: `test-supabase.html`
2. **Veja o guia**: `TROUBLESHOOTING.md`
3. **Abra o Console**: F12 no navegador
4. **Veja os erros**: em vermelho no console

---

**🌸 La Floricultura - Sistema de Gerenciamento de Produtos**

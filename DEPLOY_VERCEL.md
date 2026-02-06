# 🚀 GUIA COMPLETO DE DEPLOY NA VERCEL

## ⚠️ IMPORTANTE: SERÃO 2 DEPLOYS SEPARADOS

1. **Backend** (Node.js API) - Deploy primeiro
2. **Frontend** (HTML/CSS/JS) - Deploy depois

---

## 📦 PARTE 1: DEPLOY DO BACKEND

### Passo 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Passo 2: Login na Vercel

```bash
vercel login
```

### Passo 3: Deploy do Backend

```bash
cd backend
vercel
```

**Durante o deploy, responda:**
- `Set up and deploy "~/projetos/floricerto/backend"?` → **Y**
- `Which scope do you want to deploy to?` → Escolha sua conta
- `Link to existing project?` → **N**
- `What's your project's name?` → **floricerto-backend** (ou outro nome)
- `In which directory is your code located?` → **./** (deixe como está)

**A Vercel vai gerar uma URL tipo:**
```
https://floricerto-backend-abc123.vercel.app
```

**⚠️ ANOTE ESSA URL! Você vai precisar dela!**

---

## 🔐 PARTE 2: CONFIGURAR VARIÁVEIS DE AMBIENTE

### Opção A: Via Dashboard (Mais fácil)

1. Acesse: https://vercel.com/dashboard
2. Clique no projeto **floricerto-backend**
3. Vá em **Settings** → **Environment Variables**
4. Adicione estas 5 variáveis (em **Production, Preview e Development**):

| Variable Name | Value |
|--------------|-------|
| `SUPABASE_URL` | `https://nrgwldtmucptrhoyqted.supabase.co` |
| `SUPABASE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yZ3dsZHRtdWNwdHJob3lxdGVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNTkxMjAsImV4cCI6MjA4NTkzNTEyMH0.8PLX18bXir94kCS5epFEyFGGEHxwKC3YANvwLE1SjmI` |
| `MP_ACCESS_TOKEN` | `APP_USR-34891441981734-020408-08a32c17f153729b41a38a1d95144e07-3180765054` |
| `MP_PUBLIC_KEY` | `APP_USR-bafba6fd-a5d0-4655-a396-a0f01faa5e2d` |
| `PORT` | `3000` |

5. Clique em **Save**
6. Vá em **Deployments** e clique em **Redeploy** (botão com 3 pontinhos)

### Opção B: Via Terminal

```bash
# Ainda dentro da pasta backend
vercel env add SUPABASE_URL
# Cole: https://nrgwldtmucptrhoyqted.supabase.co
# Escolha: Production, Preview e Development

vercel env add SUPABASE_KEY
# Cole: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yZ3dsZHRtdWNwdHJob3lxdGVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNTkxMjAsImV4cCI6MjA4NTkzNTEyMH0.8PLX18bXir94kCS5epFEyFGGEHxwKC3YANvwLE1SjmI

vercel env add MP_ACCESS_TOKEN
# Cole: APP_USR-34891441981734-020408-08a32c17f153729b41a38a1d95144e07-3180765054

vercel env add MP_PUBLIC_KEY
# Cole: APP_USR-bafba6fd-a5d0-4655-a396-a0f01faa5e2d

vercel env add PORT
# Cole: 3000

# Depois de adicionar todas:
vercel --prod
```

---

## 🧪 PARTE 3: TESTAR O BACKEND

Abra no navegador:
```
https://floricerto-backend-abc123.vercel.app/health
```

**Deve retornar:**
```json
{
  "status": "OK",
  "timestamp": "2026-02-06T..."
}
```

---

## 🌐 PARTE 4: ATUALIZAR FRONTEND

**ANTES de fazer deploy do frontend**, preciso atualizar o `checkout-novo.html` com a URL do seu backend.

**Me envie a URL que a Vercel te deu** (tipo `https://floricerto-backend-abc123.vercel.app`) e eu atualizo para você!

Ou edite manualmente:

1. Abra `checkout-novo.html`
2. Procure por `const BACKEND_URL`
3. Mude de `http://localhost:3000` para `https://SUA-URL-BACKEND.vercel.app`

---

## 📤 PARTE 5: DEPLOY DO FRONTEND

### Passo 1: Voltar para pasta raiz

```bash
cd ..
# Agora você está em /home/axolutions/projetos/floricerto
```

### Passo 2: Deploy

```bash
vercel
```

**Durante o deploy, responda:**
- `Set up and deploy "~/projetos/floricerto"?` → **Y**
- `Which scope do you want to deploy to?` → Escolha sua conta
- `Link to existing project?` → **N**
- `What's your project's name?` → **floricerto** (ou outro nome)
- `In which directory is your code located?` → **./** (deixe como está)

**A Vercel vai gerar a URL do site:**
```
https://floricerto-xyz789.vercel.app
```

---

## ✅ PARTE 6: CONFIGURAR WEBHOOK NO MERCADO PAGO

1. Acesse: https://www.mercadopago.com.br/developers/panel/app
2. Selecione sua aplicação
3. Vá em **Webhooks**
4. Configure a URL:
```
https://floricerto-backend-abc123.vercel.app/webhooks/mercado-pago
```
5. Selecione os eventos: **payment**
6. Salve

---

## 🎉 PRONTO! SEU SITE ESTÁ NO AR!

### URLs Finais:
- **Site:** `https://floricerto-xyz789.vercel.app`
- **Admin:** `https://floricerto-xyz789.vercel.app/admin.html`
- **API:** `https://floricerto-backend-abc123.vercel.app`

---

## 🔄 PARA ATUALIZAR NO FUTURO

### Atualizar Backend:
```bash
cd backend
vercel --prod
```

### Atualizar Frontend:
```bash
cd ..
vercel --prod
```

---

## ⚠️ QUANDO FOR PARA PRODUÇÃO REAL

Substitua as credenciais de TESTE do Mercado Pago pelas REAIS:

1. Acesse: https://www.mercadopago.com.br/developers/panel/credentials
2. Copie as credenciais de **Produção**
3. Atualize no Dashboard da Vercel:
   - `MP_ACCESS_TOKEN` → Credencial real
   - `MP_PUBLIC_KEY` → Credencial real
4. Faça **Redeploy**

---

## 🐛 DEBUG

### Ver logs do backend:
```bash
vercel logs floricerto-backend --follow
```

### Ver logs do último deploy:
```bash
vercel logs
```

### Forçar novo deploy:
```bash
vercel --force --prod
```

---

## 📝 CHECKLIST FINAL

- [ ] Backend deployado
- [ ] Variáveis de ambiente configuradas
- [ ] `/health` respondendo OK
- [ ] Frontend atualizado com URL do backend
- [ ] Frontend deployado
- [ ] Webhook configurado no Mercado Pago
- [ ] Testou criar um pedido completo
- [ ] Testou admin.html

---

## 🆘 PROBLEMAS COMUNS

### Erro 500 no backend
→ Variáveis de ambiente não configuradas. Vá no Dashboard da Vercel.

### "Failed to fetch" no checkout
→ URL do backend errada no `checkout-novo.html`

### Webhook não funciona
→ URL mal configurada no painel do Mercado Pago

### CEP não valida
→ Abra o Console do navegador (F12) e veja os logs

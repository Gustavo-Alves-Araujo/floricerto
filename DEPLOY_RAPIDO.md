# 🚀 DEPLOY RÁPIDO - VERCEL

## 📦 PREPARAÇÃO

### 1. Criar repositório SEPARADO para o backend

```bash
cd /home/axolutions/projetos/floricerto/backend
git init
git add .
git commit -m "Backend Floricultura"
```

No GitHub:
1. Crie um novo repositório chamado **floricerto-backend**
2. NÃO inicialize com README

```bash
git remote add origin https://github.com/SEU-USUARIO/floricerto-backend.git
git branch -M main
git push -u origin main
```

---

## 🌐 DEPLOY NA VERCEL

### Opção A: Via Dashboard (Recomendado)

1. Acesse: https://vercel.com/new
2. Clique em **Import Git Repository**
3. Selecione **floricerto-backend**
4. Clique em **Deploy**

### Opção B: Via CLI

```bash
npm install -g vercel
cd /home/axolutions/projetos/floricerto/backend
vercel
```

---

## 🔐 VARIÁVEIS DE AMBIENTE

Após o deploy, configure no Dashboard da Vercel:

**Settings → Environment Variables → Adicione:**

```
SUPABASE_URL=https://nrgwldtmucptrhoyqted.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yZ3dsZHRtdWNwdHJob3lxdGVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNTkxMjAsImV4cCI6MjA4NTkzNTEyMH0.8PLX18bXir94kCS5epFEyFGGEHxwKC3YANvwLE1SjmI
MP_ACCESS_TOKEN=APP_USR-34891441981734-020408-08a32c17f153729b41a38a1d95144e07-3180765054
MP_PUBLIC_KEY=APP_USR-bafba6fd-a5d0-4655-a396-a0f01faa5e2d
PORT=3000
```

**⚠️ Marque todas as 3 opções:**
- ✅ Production
- ✅ Preview  
- ✅ Development

Clique em **Save** e depois em **Redeploy**.

---

## 📝 COPIE A URL DO BACKEND

Após o deploy, você vai ter uma URL tipo:
```
https://floricerto-backend-abc123.vercel.app
```

**⚠️ ME ENVIE ESSA URL!** Vou atualizar o frontend automaticamente.

---

## ✅ TESTAR

Acesse:
```
https://SEU-BACKEND.vercel.app/health
```

Deve retornar:
```json
{"status":"OK","timestamp":"..."}
```

---

## 🎯 PRÓXIMOS PASSOS

1. ✅ Deploy backend → VERCEL
2. ✅ Configure variáveis → DASHBOARD
3. ✅ Teste `/health` → NAVEGADOR
4. 📤 Me envie a URL → EU ATUALIZO O FRONTEND
5. 🚀 Deploy frontend → GITHUB + VERCEL

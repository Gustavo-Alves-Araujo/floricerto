# 🔧 Configurar URLs de Redirecionamento na Vercel

## ❌ Problema Identificado
As URLs de redirecionamento (`back_urls`) do Mercado Pago estão configuradas para localhost, por isso não está redirecionando após o pagamento.

## ✅ Solução

### 1️⃣ Configurar Variáveis de Ambiente no Backend (Vercel)

Acesse o projeto do **backend** na Vercel:
1. Vá em **Settings** → **Environment Variables**
2. Adicione as seguintes variáveis:

```env
SUPABASE_URL=https://nrgwldtmucptrhoyqted.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yZ3dsZHRtdWNwdHJob3lxdGVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNTkxMjAsImV4cCI6MjA4NTkzNTEyMH0.8PLX18bXir94kCS5epFEyFGGEHxwKC3YANvwLE1SjmI

MP_ACCESS_TOKEN=APP_USR-34891441981734-020408-08a32c17f153729b41a38a1d95144e07-3180765054
MP_PUBLIC_KEY=APP_USR-bafba6fd-a5d0-4655-a396-a0f01faa5e2d

# ⚠️ IMPORTANTE: Substitua pela URL REAL do seu frontend na Vercel
FRONTEND_URL=https://SEU-PROJETO-FRONTEND.vercel.app

# ⚠️ IMPORTANTE: Substitua pela URL REAL do seu backend na Vercel
BACKEND_URL=https://backendflori.vercel.app

PORT=3000
```

### 2️⃣ URLs que Você Precisa Ajustar

Com base no código, suas URLs são:
- **Backend**: `https://backendflori.vercel.app` ✅ (já está no checkout-novo.html)
- **Frontend**: Você precisa me informar qual é a URL do projeto frontend na Vercel

### 3️⃣ Exemplo de Configuração Correta

Se seu frontend estiver em `https://floricerto.vercel.app`, configure:

```env
FRONTEND_URL=https://floricerto.vercel.app
BACKEND_URL=https://backendflori.vercel.app
```

Assim os `back_urls` ficarão:
- ✅ Success: `https://floricerto.vercel.app/success.html`
- ✅ Failure: `https://floricerto.vercel.app/failure.html`
- ✅ Pending: `https://floricerto.vercel.app/pending.html`

### 4️⃣ Após Configurar

1. **Redeploy o backend** na Vercel (ele vai pegar as novas variáveis)
2. **Teste novamente** fazendo uma compra

### 5️⃣ Como Verificar se Está Funcionando

1. Abra o **Console do Navegador** (F12)
2. Faça uma compra de teste
3. Veja os logs:
   ```
   🚀 Iniciando confirmação de pedido...
   🛒 Carrinho: [...]
   📦 Dados do pedido: {...}
   🌐 Chamando backend: https://backendflori.vercel.app/api/pedidos/criar
   📡 Status da resposta: 200
   ✅ Resposta do backend: { sucesso: true, checkout_url: "..." }
   💳 Redirecionando para: https://www.mercadopago.com.br/...
   ```

### 6️⃣ Configurar Webhook (Opcional mas Recomendado)

Para receber notificações de pagamento, adicione no Mercado Pago:
```
https://backendflori.vercel.app/webhooks/mercado-pago
```

## 🔍 Como Descobrir a URL do Frontend na Vercel

1. Acesse o projeto frontend na Vercel
2. Vá em **Settings** → **Domains**
3. Copie a URL principal (algo como `floricerto.vercel.app` ou `seu-projeto.vercel.app`)

## 📌 Checklist

- [ ] Configurar `FRONTEND_URL` na Vercel (backend)
- [ ] Configurar `BACKEND_URL` na Vercel (backend)
- [ ] Configurar `MP_ACCESS_TOKEN` na Vercel (backend)
- [ ] Configurar `MP_PUBLIC_KEY` na Vercel (backend)
- [ ] Configurar `SUPABASE_URL` na Vercel (backend)
- [ ] Configurar `SUPABASE_KEY` na Vercel (backend)
- [ ] Redeploy do backend
- [ ] Testar compra novamente
- [ ] Verificar logs no console

## 🎯 Resultado Esperado

Após configurar corretamente:
1. Cliente finaliza o pedido
2. Sistema cria o pedido no Supabase
3. Sistema cria preferência no Mercado Pago
4. Cliente é redirecionado para Mercado Pago
5. **Cliente finaliza o pagamento**
6. **Mercado Pago redireciona para `/success.html`, `/failure.html` ou `/pending.html`** ✅

---

## ⚠️ Me informe a URL do seu frontend na Vercel para eu ajustar o código se necessário!

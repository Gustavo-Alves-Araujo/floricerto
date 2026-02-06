# Backend La Floricultura

## 🚀 Variáveis de Ambiente (.env)

```
SUPABASE_URL=https://nrgwldtmucptrhoyqted.supabase.co
SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yZ3dsZHRtdWNwdHJob3lxdGVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNTkxMjAsImV4cCI6MjA4NTkzNTEyMH0.8PLX18bXir94kCS5epFEyFGGEHxwKC3YANvwLE1SjmI

# Mercado Pago
MP_ACCESS_TOKEN=seu_access_token_aqui
MP_PUBLIC_KEY=sua_public_key_aqui

# URLs
FRONTEND_URL=https://seu-dominio.com
BACKEND_URL=https://seu-backend.com

PORT=3000
```

## 📝 Como usar

### Local (Desenvolvimento)
```bash
npm install
npm run dev
```

### Vercel (Produção)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar variáveis de ambiente no Vercel Dashboard
```

## 🔗 Endpoints

- `POST /api/pedidos/criar` - Criar pedido e gerar link de pagamento
- `GET /api/pedidos` - Listar todos os pedidos
- `PATCH /api/pedidos/:id/status` - Atualizar status de entrega
- `POST /webhooks/mercado-pago` - Webhook de notificação

## 🎯 Fluxo

1. Frontend valida endereço + CEP
2. Frontend envia `/api/pedidos/criar`
3. Backend salva no Supabase + cria preferência MP
4. Frontend redireciona para checkout MP
5. MP avisa via webhook
6. Backend atualiza status no Supabase
7. Admin vê pedido pendente

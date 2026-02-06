# 🚨 SOLUÇÃO PARA ERRO DE PRODUÇÃO NO VERCEL

## ❌ PROBLEMA IDENTIFICADO

O erro `500: INTERNAL_SERVER_ERROR` com código `FUNCTION_INVOCATION_FAILED` acontecia porque:

1. O `vercel.json` estava configurado apenas para servir arquivos estáticos
2. Não havia configuração para executar o `server.js` como serverless function
3. O servidor Express não estava exportando o app corretamente

## ✅ CORREÇÕES REALIZADAS

### 1. Atualizado `vercel.json`
- Adicionado `builds` para compilar o `server.js` com `@vercel/node`
- Mudado de `rewrites` para `routes` (formato correto para serverless)
- Configurado roteamento da API para `/api/*`

### 2. Atualizado `server.js`
- Adicionado `module.exports = app` para exportar como serverless function
- Modificado `app.listen()` para rodar apenas em desenvolvimento local
- Mantido compatibilidade com ambiente local e produção

### 3. Criados arquivos auxiliares
- `.env.example` - Template das variáveis de ambiente
- `.gitignore` - Para não versionar arquivos sensíveis

## 🔧 PRÓXIMOS PASSOS - CONFIGURE O VERCEL

### 1️⃣ Configure as Variáveis de Ambiente no Vercel

Acesse: **Dashboard do Vercel → Seu Projeto → Settings → Environment Variables**

Adicione as seguintes variáveis:

```
MERCADOPAGO_ACCESS_TOKEN = seu_token_mercadopago_aqui
FRONTEND_URL = https://floricerto.vercel.app
BACKEND_URL = https://floricerto.vercel.app
NODE_ENV = production
```

⚠️ **IMPORTANTE**: Use seu token **REAL** do Mercado Pago (não o de sandbox se quiser aceitar pagamentos reais)

### 2️⃣ Faça o Deploy

Você pode fazer de duas formas:

**Opção A: Via Git (Recomendado)**
```bash
git add .
git commit -m "fix: Configure serverless functions for Vercel"
git push origin main
```

O Vercel vai detectar automaticamente e fazer o deploy.

**Opção B: Via Vercel CLI**
```bash
vercel --prod
```

### 3️⃣ Teste a API

Após o deploy, teste:

```bash
# Health check
curl https://floricerto.vercel.app/api/health

# Deve retornar:
# {"status":"OK","message":"🌸 API La Floricultura funcionando!","timestamp":"..."}
```

## 🔍 VERIFICANDO SE FUNCIONOU

### ✅ Sinais de Sucesso:
1. Site carrega normalmente em `https://floricerto.vercel.app`
2. A rota `/api/health` retorna status 200
3. Não aparece mais erro 500
4. Console do Vercel não mostra erros

### ❌ Se continuar com erro:
1. Verifique se as variáveis de ambiente foram salvas
2. Veja os logs no Vercel Dashboard → Functions → Logs
3. Certifique-se que o token do Mercado Pago está correto

## 📝 COMO OBTER O TOKEN DO MERCADO PAGO

1. Acesse: https://www.mercadopago.com.br/developers
2. Vá em "Suas integrações"
3. Selecione sua aplicação
4. Copie o "Access Token" (Production)

**Teste (Sandbox)**: Use o token de teste para homologação
**Produção**: Use o token de produção para aceitar pagamentos reais

## 🆘 SUPORTE

Se o erro persistir:
1. Verifique os logs: `vercel logs --follow`
2. Teste local: `npm start` e veja se funciona
3. Confira se todas as dependências estão no `package.json`

---

**Data da correção**: 03/02/2026
**Status**: ✅ Configuração corrigida - Aguardando deploy

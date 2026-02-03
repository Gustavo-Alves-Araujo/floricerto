# 🚀 GUIA RÁPIDO - Integração Mercado Pago

## ⚡ 3 Passos para Integrar

### 📝 PASSO 1: Obter Credenciais (5 minutos)

1. Acesse: https://www.mercadopago.com.br/developers
2. Faça login
3. Vá em **"Suas integrações"** → **"Credenciais"**
4. Copie o **Access Token de Teste**

```
Exemplo:
TEST-1234567890123456-012345-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6-123456789
```

---

### ⚙️ PASSO 2: Configurar Projeto (2 minutos)

```bash
# 1. Instalar dependências
cd /home/axolutions/projetos/floricultura
npm install

# 2. Criar arquivo .env
cp .env.example .env

# 3. Editar .env e colar seu Access Token
nano .env
```

No arquivo `.env`:
```bash
MERCADOPAGO_ACCESS_TOKEN=TEST-seu-token-aqui
PORT=3000
FRONTEND_URL=http://localhost:8080
BACKEND_URL=http://localhost:3000
```

---

### 🚀 PASSO 3: Rodar o Projeto (1 minuto)

**Terminal 1 - Backend:**
```bash
npm start
# Aguarde ver: "🚀 Servidor rodando na porta 3000"
```

**Terminal 2 - Frontend:**
```bash
cd html
python3 -m http.server 8080
# Abra: http://localhost:8080
```

---

## ✅ Testar a Integração

1. Acesse http://localhost:8080
2. Adicione produtos ao carrinho
3. Clique em **"Finalizar Compra"**
4. Você será redirecionado para o Mercado Pago
5. Use o cartão de teste:
   - **Número:** 5031 4332 1540 6351
   - **CVV:** 123
   - **Validade:** 11/25
6. Complete o pagamento
7. Será redirecionado para página de sucesso ✅

---

## 🔧 Ativar Integração no Frontend

No arquivo `html/carrinho.html`, linha ~280, **descomente** este bloco:

```javascript
try {
    const response = await fetch('http://localhost:3000/api/create-preference', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
    });

    const data = await response.json();
    
    if (data.init_point) {
        window.location.href = data.init_point;
    } else {
        throw new Error('Erro ao criar preferência');
    }
} catch (error) {
    console.error('Erro:', error);
    alert('Erro ao processar pagamento. Tente novamente.');
}
```

E **comente/remova** o alert de demonstração logo abaixo.

---

## 📊 Status dos Arquivos

```
✅ carrinho.html         - Novo design + botão Mercado Pago
✅ success.html          - Página de pagamento aprovado
✅ failure.html          - Página de pagamento rejeitado  
✅ pending.html          - Página de pagamento pendente
✅ server.js             - Backend completo com webhooks
✅ .env.example          - Exemplo de configuração
✅ package.json          - Dependências configuradas
```

---

## 🐛 Problemas Comuns

### ❌ "Erro ao criar preferência"
**Solução:** Verifique se o Access Token está correto no `.env`

### ❌ Backend não conecta
**Solução:** 
1. Certifique-se que `npm install` foi executado
2. Verifique se a porta 3000 está livre: `lsof -i :3000`

### ❌ CORS Error
**Solução:** Verifique se `FRONTEND_URL` no `.env` está correto

---

## 📱 Testar Webhooks Localmente

```bash
# 1. Instalar ngrok
npm install -g ngrok

# 2. Expor backend
ngrok http 3000

# 3. Copiar URL gerada (ex: https://abc123.ngrok.io)

# 4. Configurar no Mercado Pago:
# Dashboard → Webhooks → Nova URL
# Cole: https://abc123.ngrok.io/api/notifications
```

---

## 🎯 Próximos Passos

1. ✅ Testar com cartões de teste
2. ✅ Configurar webhooks com ngrok
3. ✅ Implementar envio de emails
4. ✅ Conectar banco de dados
5. ✅ Deploy para produção
6. ✅ Ativar credenciais de produção

---

## 💡 Dicas

- Use **TEST** credentials durante desenvolvimento
- Só mude para **PROD** quando tudo estiver funcionando
- Guarde os logs de pagamento para debug
- Teste PIX e Boleto também (automático no Mercado Pago)

---

## 📞 Precisa de Ajuda?

- 📖 Documentação completa: `MERCADOPAGO_INTEGRATION.md`
- 🌐 Docs oficiais: https://www.mercadopago.com.br/developers/pt/docs
- 💬 Suporte MP: https://www.mercadopago.com.br/developers/pt/support

---

**Boa sorte! 🌸**

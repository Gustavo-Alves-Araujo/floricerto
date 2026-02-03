# 🛒 Integração Mercado Pago - La Floricultura

## 📋 Guia Completo de Integração

Este guia explica passo a passo como integrar o Mercado Pago ao seu e-commerce de flores.

---

## 🔑 1. Obter Credenciais do Mercado Pago

### 1.1. Criar Conta
1. Acesse [Mercado Pago Developers](https://www.mercadopago.com.br/developers)
2. Faça login ou crie uma conta
3. Acesse o [Dashboard de Desenvolvedores](https://www.mercadopago.com.br/developers/panel)

### 1.2. Obter Credenciais
1. Vá em **"Suas integrações"** → **"Credenciais"**
2. Você terá acesso a:
   - **Public Key**: Usada no frontend
   - **Access Token**: Usada no backend (NUNCA exponha no frontend!)

#### Credenciais de Teste (Sandbox)
```javascript
// Para desenvolvimento/testes
PUBLIC_KEY_TEST = "TEST-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
ACCESS_TOKEN_TEST = "TEST-xxxxxxxxxxxx-xxxxxx-xxxxxxxxxxxx-xxxxxxxxxxxx"
```

#### Credenciais de Produção
```javascript
// Para produção (após aprovação da conta)
PUBLIC_KEY_PROD = "APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
ACCESS_TOKEN_PROD = "APP_USR-xxxxxxxxxxxx-xxxxxx-xxxxxxxxxxxx-xxxxxxxxxxxx"
```

---

## 🏗️ 2. Estrutura do Backend

Você precisa criar um backend para processar pagamentos de forma segura. Recomendações:

### Opção 1: Node.js + Express (Recomendado)

#### 2.1. Instalar Dependências
```bash
cd /home/axolutions/projetos/floricultura
npm init -y
npm install express mercadopago dotenv cors
```

#### 2.2. Criar arquivo `.env`
```bash
# .env
MERCADOPAGO_ACCESS_TOKEN=TEST-xxxxxxxxxxxx-xxxxxx-xxxxxxxxxxxx-xxxxxxxxxxxx
PORT=3000
FRONTEND_URL=http://localhost:8080
```

#### 2.3. Criar `server.js`
```javascript
// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar Mercado Pago
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL
}));
app.use(express.json());

// Endpoint para criar preferência de pagamento
app.post('/api/create-preference', async (req, res) => {
  try {
    const { items, back_urls } = req.body;

    // Criar preferência
    const preference = {
      items: items.map(item => ({
        id: item.id.toString(),
        title: item.title,
        description: item.description,
        picture_url: item.picture_url,
        category_id: item.category_id,
        quantity: parseInt(item.quantity),
        unit_price: parseFloat(item.unit_price)
      })),
      back_urls: {
        success: back_urls.success,
        failure: back_urls.failure,
        pending: back_urls.pending
      },
      auto_return: 'approved',
      statement_descriptor: 'LA FLORICULTURA',
      external_reference: `ORDER-${Date.now()}`, // ID único do pedido
      notification_url: `${process.env.BACKEND_URL}/api/notifications`, // Webhook para notificações
      payer: {
        email: req.body.payer_email || '',
        name: req.body.payer_name || '',
        phone: {
          area_code: '',
          number: ''
        }
      }
    };

    const response = await mercadopago.preferences.create(preference);
    
    res.json({
      id: response.body.id,
      init_point: response.body.init_point, // URL para redirecionar o usuário
      sandbox_init_point: response.body.sandbox_init_point // URL de teste
    });
  } catch (error) {
    console.error('Erro ao criar preferência:', error);
    res.status(500).json({ 
      error: 'Erro ao criar preferência de pagamento',
      details: error.message 
    });
  }
});

// Webhook para receber notificações de pagamento
app.post('/api/notifications', async (req, res) => {
  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      const paymentId = data.id;
      
      // Buscar informações do pagamento
      const payment = await mercadopago.payment.findById(paymentId);
      
      console.log('Pagamento recebido:', {
        id: payment.body.id,
        status: payment.body.status,
        external_reference: payment.body.external_reference,
        transaction_amount: payment.body.transaction_amount
      });

      // Aqui você pode:
      // 1. Atualizar status do pedido no banco de dados
      // 2. Enviar email de confirmação
      // 3. Gerar nota fiscal
      // 4. Notificar sistema de estoque
      
      switch (payment.body.status) {
        case 'approved':
          console.log('✅ Pagamento aprovado!');
          // Processar pedido aprovado
          break;
        case 'pending':
          console.log('⏳ Pagamento pendente');
          // Aguardar confirmação
          break;
        case 'rejected':
          console.log('❌ Pagamento rejeitado');
          // Notificar cliente
          break;
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.sendStatus(500);
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API La Floricultura funcionando!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🌸 API: http://localhost:${PORT}/api`);
});
```

#### 2.4. Iniciar Servidor
```bash
node server.js
```

---

## 🎨 3. Atualizar Frontend

O carrinho já está preparado! A função `finalizarCompraMercadoPago()` está configurada.

### 3.1. Descomentar código de integração

No arquivo `html/carrinho.html`, procure por este comentário e descomente:

```javascript
// TODO: Enviar para o backend que vai criar a preferência no Mercado Pago
// Já está tudo pronto, só descomentar este bloco:

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
        // Redirecionar para o checkout do Mercado Pago
        window.location.href = data.init_point;
    } else {
        throw new Error('Erro ao criar preferência');
    }
} catch (error) {
    console.error('Erro:', error);
    alert('Erro ao processar pagamento. Tente novamente.');
}
```

---

## 📄 4. Criar Páginas de Retorno

### 4.1. Página de Sucesso (`success.html`)
```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Pagamento Aprovado - La Floricultura</title>
    <!-- Mesmo head do carrinho.html -->
</head>
<body class="bg-paper">
    <div class="min-h-screen flex items-center justify-center p-6">
        <div class="bg-white p-12 rounded-2xl shadow-2xl max-w-2xl text-center">
            <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <h1 class="text-4xl font-serif italic mb-4">Pagamento Aprovado!</h1>
            <p class="text-ink/60 mb-8">Seu pedido foi confirmado com sucesso. Em breve você receberá um email com os detalhes.</p>
            <a href="index.html" class="inline-block bg-rust text-paper px-10 py-4 rounded-lg hover:bg-pine transition">
                Voltar ao Início
            </a>
        </div>
    </div>
</body>
</html>
```

### 4.2. Página de Falha (`failure.html`)
```html
<!-- Similar ao success.html mas com mensagem de erro -->
```

### 4.3. Página Pendente (`pending.html`)
```html
<!-- Similar ao success.html mas com mensagem de pagamento pendente -->
```

---

## 🧪 5. Testar a Integração

### 5.1. Cartões de Teste do Mercado Pago

| Cartão | Número | CVV | Validade | Resultado |
|--------|--------|-----|----------|-----------|
| Visa | 4509 9535 6623 3704 | 123 | 11/25 | ✅ Aprovado |
| Mastercard | 5031 4332 1540 6351 | 123 | 11/25 | ✅ Aprovado |
| Visa | 4774 0614 6340 4836 | 123 | 11/25 | ❌ Rejeitado |

### 5.2. Fluxo de Teste
1. Adicione produtos ao carrinho
2. Clique em "Finalizar Compra"
3. Você será redirecionado para o Mercado Pago
4. Use um cartão de teste
5. Complete o pagamento
6. Será redirecionado para página de sucesso

---

## 📱 6. Integração com PIX

Para aceitar PIX, o Mercado Pago já gera automaticamente a opção no checkout. Não precisa configurar nada extra!

---

## 🔔 7. Webhooks (Notificações)

Os webhooks são essenciais para atualizar o status do pedido em tempo real.

### 7.1. Configurar URL do Webhook
No dashboard do Mercado Pago:
1. Vá em **Integrações** → **Webhooks**
2. Configure a URL: `https://seu-dominio.com/api/notifications`
3. Selecione eventos: **Payments** e **Merchant Orders**

### 7.2. Testar Localmente com Ngrok
```bash
# Instalar ngrok
npm install -g ngrok

# Expor servidor local
ngrok http 3000

# Use a URL gerada para configurar webhook
# Ex: https://abc123.ngrok.io/api/notifications
```

---

## 🚀 8. Deploy para Produção

### Opção 1: Vercel (Frontend) + Railway (Backend)
```bash
# Deploy backend no Railway
railway login
railway init
railway up

# Deploy frontend na Vercel
vercel --prod
```

### Opção 2: VPS (Digital Ocean, AWS, etc)
```bash
# PM2 para manter servidor rodando
npm install -g pm2
pm2 start server.js --name "lafloricultura-api"
pm2 save
pm2 startup
```

---

## ✅ Checklist Final

- [ ] Credenciais do Mercado Pago configuradas
- [ ] Backend criado e rodando
- [ ] Frontend descomentado e conectado
- [ ] Páginas de retorno criadas (success, failure, pending)
- [ ] Testado com cartões de teste
- [ ] Webhook configurado
- [ ] Deploy realizado
- [ ] Credenciais de produção ativadas
- [ ] SSL/HTTPS configurado

---

## 📚 Documentação Oficial

- [Mercado Pago Developers](https://www.mercadopago.com.br/developers/pt)
- [SDK Node.js](https://github.com/mercadopago/sdk-nodejs)
- [Checkout Pro](https://www.mercadopago.com.br/developers/pt/docs/checkout-pro/landing)

---

## 🆘 Suporte

Dúvidas? Entre em contato:
- Email: contato@lafloricultura.com
- WhatsApp: (21) 99999-9999

---

**La Floricultura** 🌸 | Rio de Janeiro, 2026

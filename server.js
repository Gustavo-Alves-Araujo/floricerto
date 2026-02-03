// server.js - Backend para integração com Mercado Pago
// La Floricultura - 2026

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mercadopago = require('mercadopago');

const app = express();
const PORT = process.env.PORT || 3000;

// ============================================
// CONFIGURAÇÃO MERCADO PAGO
// ============================================
mercadopago.configure({
  access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
});

// ============================================
// MIDDLEWARES
// ============================================
app.use(cors({
  origin: process.env.FRONTEND_URL || '*'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ============================================
// ROTAS
// ============================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: '🌸 API La Floricultura funcionando!',
    timestamp: new Date().toISOString()
  });
});

// Criar preferência de pagamento
app.post('/api/create-preference', async (req, res) => {
  try {
    const { items, back_urls, payer_email, payer_name } = req.body;

    // Validação básica
    if (!items || items.length === 0) {
      return res.status(400).json({ 
        error: 'É necessário fornecer pelo menos um item' 
      });
    }

    // Gerar ID único para o pedido
    const orderId = `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // Criar preferência
    const preference = {
      items: items.map(item => ({
        id: item.id.toString(),
        title: item.title.substring(0, 150), // Máximo 150 caracteres
        description: item.description ? item.description.substring(0, 300) : '', // Máximo 300 caracteres
        picture_url: item.picture_url,
        category_id: item.category_id,
        quantity: parseInt(item.quantity),
        unit_price: parseFloat(item.unit_price)
      })),
      back_urls: {
        success: back_urls?.success || `${process.env.FRONTEND_URL}/success.html`,
        failure: back_urls?.failure || `${process.env.FRONTEND_URL}/failure.html`,
        pending: back_urls?.pending || `${process.env.FRONTEND_URL}/pending.html`
      },
      auto_return: 'approved',
      statement_descriptor: 'LA FLORICULTURA',
      external_reference: orderId,
      notification_url: `${process.env.BACKEND_URL}/api/notifications`,
      payer: {
        email: payer_email || '',
        name: payer_name || ''
      },
      payment_methods: {
        excluded_payment_types: [],
        installments: 12, // Até 12 parcelas
      },
      shipments: {
        cost: 0, // Frete grátis
        mode: 'not_specified'
      }
    };

    console.log('📦 Criando preferência:', {
      orderId,
      itemsCount: items.length,
      total: items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0)
    });

    const response = await mercadopago.preferences.create(preference);
    
    console.log('✅ Preferência criada:', response.body.id);

    res.json({
      id: response.body.id,
      init_point: response.body.init_point,
      sandbox_init_point: response.body.sandbox_init_point,
      order_id: orderId
    });
  } catch (error) {
    console.error('❌ Erro ao criar preferência:', error);
    res.status(500).json({ 
      error: 'Erro ao criar preferência de pagamento',
      details: error.message,
      cause: error.cause
    });
  }
});

// Webhook para receber notificações de pagamento
app.post('/api/notifications', async (req, res) => {
  try {
    const { type, data, action } = req.body;

    console.log('🔔 Notificação recebida:', { type, action, id: data?.id });

    // Responder rapidamente ao Mercado Pago
    res.sendStatus(200);

    // Processar notificação de forma assíncrona
    if (type === 'payment') {
      const paymentId = data.id;
      
      try {
        // Buscar informações completas do pagamento
        const payment = await mercadopago.payment.findById(paymentId);
        
        const paymentInfo = {
          id: payment.body.id,
          status: payment.body.status,
          status_detail: payment.body.status_detail,
          external_reference: payment.body.external_reference,
          transaction_amount: payment.body.transaction_amount,
          payment_method: payment.body.payment_method_id,
          payer_email: payment.body.payer?.email,
          date_approved: payment.body.date_approved
        };

        console.log('💳 Detalhes do pagamento:', paymentInfo);

        // Processar baseado no status
        switch (payment.body.status) {
          case 'approved':
            console.log('✅ Pagamento aprovado!');
            // TODO: 
            // - Salvar pedido no banco de dados
            // - Enviar email de confirmação
            // - Notificar sistema de estoque
            // - Gerar nota fiscal
            await processApprovedPayment(paymentInfo);
            break;

          case 'pending':
            console.log('⏳ Pagamento pendente');
            // TODO:
            // - Salvar status pendente
            // - Enviar email informando que está aguardando pagamento
            await processPendingPayment(paymentInfo);
            break;

          case 'rejected':
            console.log('❌ Pagamento rejeitado');
            // TODO:
            // - Registrar falha
            // - Enviar email sugerindo nova tentativa
            await processRejectedPayment(paymentInfo);
            break;

          case 'refunded':
            console.log('🔄 Pagamento reembolsado');
            // TODO:
            // - Atualizar status do pedido
            // - Notificar cliente
            await processRefundedPayment(paymentInfo);
            break;
        }
      } catch (error) {
        console.error('❌ Erro ao processar pagamento:', error);
      }
    }
  } catch (error) {
    console.error('❌ Erro no webhook:', error);
    res.sendStatus(500);
  }
});

// Buscar informações de um pagamento específico
app.get('/api/payment/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const payment = await mercadopago.payment.findById(id);
    
    res.json({
      id: payment.body.id,
      status: payment.body.status,
      status_detail: payment.body.status_detail,
      external_reference: payment.body.external_reference,
      transaction_amount: payment.body.transaction_amount,
      date_approved: payment.body.date_approved,
      payer: payment.body.payer
    });
  } catch (error) {
    console.error('❌ Erro ao buscar pagamento:', error);
    res.status(500).json({ 
      error: 'Erro ao buscar pagamento',
      details: error.message 
    });
  }
});

// ============================================
// FUNÇÕES DE PROCESSAMENTO
// ============================================

async function processApprovedPayment(paymentInfo) {
  console.log('📧 Enviando email de confirmação...');
  // TODO: Implementar envio de email
  
  console.log('📦 Atualizando estoque...');
  // TODO: Implementar atualização de estoque
  
  console.log('📄 Gerando nota fiscal...');
  // TODO: Implementar geração de nota fiscal
}

async function processPendingPayment(paymentInfo) {
  console.log('📧 Enviando email de pagamento pendente...');
  // TODO: Implementar notificação
}

async function processRejectedPayment(paymentInfo) {
  console.log('📧 Enviando email de pagamento rejeitado...');
  // TODO: Implementar notificação
}

async function processRefundedPayment(paymentInfo) {
  console.log('📧 Enviando email de reembolso...');
  // TODO: Implementar notificação
}

// ============================================
// ERROR HANDLERS
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Rota não encontrada',
    path: req.path 
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('❌ Erro no servidor:', error);
  res.status(500).json({ 
    error: 'Erro interno do servidor',
    message: error.message 
  });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
  console.log('');
  console.log('🌸 ================================');
  console.log('🌸 La Floricultura - API Backend');
  console.log('🌸 ================================');
  console.log('');
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔗 API Base: http://localhost:${PORT}/api`);
  console.log('');
  console.log('📝 Variáveis de ambiente configuradas:');
  console.log(`   - MERCADOPAGO_ACCESS_TOKEN: ${process.env.MERCADOPAGO_ACCESS_TOKEN ? '✅ Configurado' : '❌ Não configurado'}`);
  console.log(`   - FRONTEND_URL: ${process.env.FRONTEND_URL || 'Não configurado'}`);
  console.log(`   - BACKEND_URL: ${process.env.BACKEND_URL || 'Não configurado'}`);
  console.log('');
  console.log('⚠️  Lembre-se de configurar o .env antes de usar!');
  console.log('');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 Encerrando servidor...');
  process.exit(0);
});

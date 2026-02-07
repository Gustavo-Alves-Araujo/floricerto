import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

// Configuração
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://nrgwldtmucptrhoyqted.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yZ3dsZHRtdWNwdHJob3lxdGVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNTkxMjAsImV4cCI6MjA4NTkzNTEyMH0.8PLX18bXir94kCS5epFEyFGGEHxwKC3YANvwLE1SjmI';
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN; // Você vai passar isso
const MP_PUBLIC_KEY = process.env.MP_PUBLIC_KEY; // Você vai passar isso

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// ✅ Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ✅ Criar pedido e gerar link de pagamento
app.post('/api/pedidos/criar', async (req, res) => {
  try {
    const {
      nome_cliente,
      telefone,
      cpf,
      nome_recebedor,
      cep,
      rua,
      numero,
      complemento,
      bairro,
      cidade,
      estado,
      data_entrega,
      tipo_entrega,
      valor_frete,
      instrucoes_adicionais,
      mensagem_cartao,
      itens, // Array com produtos do carrinho
      valor_total
    } = req.body;

    // Validação básica
    if (!nome_cliente || !cpf || !itens || !valor_total) {
      return res.status(400).json({ erro: 'Dados incompletos' });
    }

    // Gerar número do pedido sequencial
    // Buscar todos os pedidos com formato PED-XXX para encontrar o maior número
    const { data: todosPedidos, error: erroPedidos } = await supabase
      .from('pedidos')
      .select('numero_pedido')
      .like('numero_pedido', 'PED-%');

    let proximoNumero = 1;
    
    if (!erroPedidos && todosPedidos && todosPedidos.length > 0) {
      // Extrair números de todos os pedidos no formato PED-XXX
      const numeros = todosPedidos
        .map(p => {
          // Aceitar tanto PED-001 quanto PED-1001
          const match = p.numero_pedido.match(/^PED-(\d+)$/);
          return match ? parseInt(match[1]) : 0;
        })
        .filter(n => n > 0);
      
      if (numeros.length > 0) {
        proximoNumero = Math.max(...numeros) + 1;
      }
    }
    
    // Formatar com zeros à esquerda: mínimo 3 dígitos, mas cresce naturalmente
    // 001, 002, ..., 010, 011, ..., 100, 101, ..., 1000, 1001, ...
    const numeroFormatado = proximoNumero < 1000 
      ? proximoNumero.toString().padStart(3, '0')
      : proximoNumero.toString();
    
    const numero_pedido = `PED-${numeroFormatado}`;
    
    console.log(`📦 Gerando número de pedido sequencial: ${numero_pedido}`);

    // 1. Salvar pedido no Supabase
    // Preparar objeto de dados base (campos obrigatórios que sempre existem)
    const pedidoDataToInsert = {
      numero_pedido,
      nome_cliente,
      telefone,
      cpf,
      nome_recebedor,
      cep,
      rua,
      numero,
      complemento: complemento || null,
      bairro,
      cidade,
      estado,
      data_entrega,
      horario_entrega: tipo_entrega || 'comercial', // Usar tipo_entrega como horario_entrega para compatibilidade
      instrucoes_adicionais: instrucoes_adicionais || null,
      itens: itens,
      valor_total: parseFloat(valor_total),
      status_pagamento: 'pendente',
      status_entrega: 'pendente'
    };

    // Adicionar campos novos se existirem
    if (tipo_entrega) {
      pedidoDataToInsert.tipo_entrega = tipo_entrega;
    }
    if (valor_frete !== undefined && valor_frete !== null) {
      pedidoDataToInsert.valor_frete = parseFloat(valor_frete);
    }
    if (mensagem_cartao) {
      pedidoDataToInsert.mensagem_cartao = mensagem_cartao;
    }

    let pedidoData;
    
    // Tentar inserir com campos novos primeiro
    const { data: pedidoDataInsert, error: pedidoError } = await supabase
      .from('pedidos')
      .insert([pedidoDataToInsert])
      .select()
      .single();

    if (pedidoError) {
      // Se o erro for de coluna não encontrada, tentar sem os campos novos
      if (pedidoError.message && (pedidoError.message.includes('column') || pedidoError.message.includes('does not exist'))) {
        console.log('⚠️ Campos novos não existem na tabela, tentando sem eles...');
        
        // Remover campos novos e tentar novamente
        const pedidoDataToInsertRetry = { ...pedidoDataToInsert };
        delete pedidoDataToInsertRetry.tipo_entrega;
        delete pedidoDataToInsertRetry.valor_frete;
        delete pedidoDataToInsertRetry.mensagem_cartao;
        
        const { data: pedidoDataRetry, error: pedidoErrorRetry } = await supabase
          .from('pedidos')
          .insert([pedidoDataToInsertRetry])
          .select()
          .single();

        if (pedidoErrorRetry) {
          console.error('Erro ao salvar pedido (retry):', pedidoErrorRetry);
          return res.status(500).json({ 
            erro: 'Erro ao salvar pedido',
            detalhes: pedidoErrorRetry.message || 'Erro desconhecido'
          });
        }
        
        pedidoData = pedidoDataRetry;
      } else {
        console.error('Erro ao salvar pedido:', pedidoError);
        console.error('Detalhes do erro:', JSON.stringify(pedidoError, null, 2));
        return res.status(500).json({ 
          erro: 'Erro ao salvar pedido',
          detalhes: pedidoError.message || 'Erro desconhecido',
          code: pedidoError.code
        });
      }
    } else {
      pedidoData = pedidoDataInsert;
    }

    // 2. Criar preferência de pagamento no Mercado Pago
    // Preparar itens do carrinho
    const mpItems = itens.map(item => ({
      title: item.nome,
      unit_price: parseFloat(item.preco),
      quantity: item.quantidade || 1
    }));

    // Adicionar frete como item separado se houver valor
    const valorFreteNum = valor_frete ? parseFloat(valor_frete) : 0;
    if (valorFreteNum > 0) {
      const tiposEntrega = {
        'comercial': 'Período Comercial',
        'manha': 'Período Manhã',
        'tarde': 'Período Tarde',
        'expressa': 'Entrega Expressa'
      };
      
      mpItems.push({
        title: `Entrega - ${tiposEntrega[tipo_entrega] || 'Entrega'}`,
        unit_price: valorFreteNum,
        quantity: 1
      });
    }

    const preference = {
      items: mpItems,
      payer: {
        name: nome_cliente,
        email: `test_${cpf}@test.com`, // Email de teste para sandbox
        phone: {
          area_code: '21', // Rio de Janeiro
          number: telefone.replace(/\D/g, '').substring(0, 9) // Limitar a 9 dígitos
        },
        identification: {
          type: 'CPF',
          number: cpf.replace(/\D/g, '')
        }
      },
      metadata: {
        numero_pedido: numero_pedido,
        pedido_id: pedidoData.id
      },
      external_reference: numero_pedido,
      back_urls: {
        success: `${process.env.FRONTEND_URL || 'http://localhost:5500'}/success.html`,
        failure: `${process.env.FRONTEND_URL || 'http://localhost:5500'}/failure.html`,
        pending: `${process.env.FRONTEND_URL || 'http://localhost:5500'}/pending.html`
      },
      auto_return: 'approved',
      notification_url: `${process.env.BACKEND_URL || 'https://backendflori.vercel.app'}/webhooks/mercado-pago`,
      statement_descriptor: 'La Floricultura' // Nome que aparece na fatura
    };

    console.log('Criando preferência MP:', preference);

    const mpResponse = await axios.post(
      'https://api.mercadopago.com/checkout/preferences',
      preference,
      {
        headers: {
          'Authorization': `Bearer ${MP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Usar sandbox_init_point se for credencial de teste, senão usar init_point
    const checkoutUrl = mpResponse.data.sandbox_init_point || mpResponse.data.init_point;
    
    console.log('URL do checkout:', checkoutUrl);
    console.log('É sandbox?', !!mpResponse.data.sandbox_init_point);

    // 3. Atualizar pedido com ID do Mercado Pago
    await supabase
      .from('pedidos')
      .update({ mercado_pago_id: mpResponse.data.id })
      .eq('id', pedidoData.id);

    res.json({
      sucesso: true,
      numero_pedido,
      checkout_url: checkoutUrl,
      pedido_id: pedidoData.id
    });

  } catch (error) {
    console.error('Erro ao criar pedido:', error.message);
    res.status(500).json({ erro: error.message });
  }
});

// ✅ Webhook do Mercado Pago
app.post('/webhooks/mercado-pago', async (req, res) => {
  try {
    const { id, type, data } = req.body;

    console.log('Webhook MP recebido:', { id, type });

    if (type === 'payment') {
      const mpPaymentId = data.id;

      // Buscar pagamento no MP
      const paymentResponse = await axios.get(
        `https://api.mercadopago.com/v1/payments/${mpPaymentId}`,
        {
          headers: { 'Authorization': `Bearer ${MP_ACCESS_TOKEN}` }
        }
      );

      const payment = paymentResponse.data;
      const numero_pedido = payment.external_reference;

      // Atualizar status no Supabase
      let novo_status = 'pendente';
      if (payment.status === 'approved') {
        novo_status = 'aprovado';
      } else if (payment.status === 'rejected') {
        novo_status = 'rejeitado';
      }

      await supabase
        .from('pedidos')
        .update({ status_pagamento: novo_status })
        .eq('numero_pedido', numero_pedido);

      console.log(`Pedido ${numero_pedido} atualizado: ${novo_status}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Erro no webhook:', error.message);
    res.status(500).json({ erro: error.message });
  }
});

// ✅ Listar pedidos (para admin)
app.get('/api/pedidos', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('pedidos')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

// ✅ Atualizar status do pedido (admin)
app.patch('/api/pedidos/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status_entrega } = req.body;

    const { data, error } = await supabase
      .from('pedidos')
      .update({ status_entrega })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em porta ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health`);
});

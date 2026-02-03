# 🌸 La Floricultura - E-commerce de Flores

Design botânico autoral com integração Mercado Pago.

## 🚀 Início Rápido

### 1. Instalar Dependências
```bash
cd /home/axolutions/projetos/floricultura
npm install
```

### 2. Configurar Mercado Pago
```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar e adicionar suas credenciais
nano .env
```

Obtenha suas credenciais em: https://www.mercadopago.com.br/developers/panel/credentials

### 3. Iniciar Backend
```bash
node server.js
```

### 4. Iniciar Frontend
```bash
cd html
python3 -m http.server 8080
# ou
npx serve -p 8080
```

Acesse: http://localhost:8080

## 📁 Estrutura do Projeto

```
floricultura/
├── html/
│   ├── index.html          # Página principal
│   ├── carrinho.html       # Carrinho de compras
│   ├── produto.html        # Detalhes do produto
│   ├── admin.html          # Painel administrativo
│   ├── success.html        # Pagamento aprovado
│   ├── failure.html        # Pagamento rejeitado
│   ├── pending.html        # Pagamento pendente
│   └── js/
│       ├── produtos.js     # Dados dos produtos
│       ├── cart.js         # Lógica do carrinho
│       └── admin.js        # CRUD de produtos
├── server.js               # Backend Node.js
├── .env.example            # Exemplo de configuração
└── MERCADOPAGO_INTEGRATION.md  # Guia completo
```

## 🛒 Funcionalidades

✅ Catálogo de produtos com imagens coloridas  
✅ Busca e filtros por categoria  
✅ Carrinho de compras com localStorage  
✅ Admin CRUD (criar, editar, excluir produtos)  
✅ Integração Mercado Pago (Cartão, PIX, Boleto)  
✅ Páginas de retorno (sucesso, falha, pendente)  
✅ Design responsivo e elegante  

## 💳 Testar Pagamento

Use os cartões de teste do Mercado Pago:

**Cartão Aprovado:**
- Número: 5031 4332 1540 6351
- CVV: 123
- Validade: 11/25

**Cartão Rejeitado:**
- Número: 4774 0614 6340 4836
- CVV: 123
- Validade: 11/25

## 📚 Documentação Completa

Veja `MERCADOPAGO_INTEGRATION.md` para:
- Guia passo a passo de integração
- Configuração de webhooks
- Deploy para produção
- Exemplos de código

## 🎨 Personalização

### Cores (Tailwind Config)
```javascript
colors: {
  'paper': '#F7F5F0',  // Fundo bege
  'ink': '#1A1A1A',    // Texto escuro
  'rust': '#8F4F3B',   // Accent laranja
  'pine': '#2F3E35'    // Verde escuro
}
```

### Fontes
- Serif: Cormorant Garamond (títulos)
- Sans: Montserrat (corpo)

## 🔐 Segurança

⚠️ **IMPORTANTE:**
- Nunca exponha seu `ACCESS_TOKEN` no frontend
- Use HTTPS em produção
- Configure CORS adequadamente
- Valide todos os dados no backend

## 📞 Contato

Email: contato@lafloricultura.com  
WhatsApp: (21) 99999-9999

---

**La Floricultura** | Rio de Janeiro, 2026

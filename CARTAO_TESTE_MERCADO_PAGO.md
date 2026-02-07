# Cartão de Teste - Mercado Pago

## ⚠️ IMPORTANTE: Para pagar no Sandbox

Para conseguir efetuar o pagamento no checkout de teste (sandbox), você precisa:

### 1. Fazer Login com Conta de Teste (COMPRADOR)

**ANTES de acessar o checkout**, você precisa:

1. Acesse: https://www.mercadopago.com.br/developers/panel
2. Vá em **Suas integrações** → Sua aplicação → **Contas de teste**
3. Crie uma conta de teste do tipo **"Comprador"**
4. Anote o **Usuário** e **Senha** gerados
5. **Faça logout** da sua conta real do Mercado Pago
6. **Faça login** com a conta de teste (Comprador) que você criou

### 2. Usar os Dados Exatos do Cartão de Teste

Quando estiver no checkout de teste, use **EXATAMENTE** estes dados:

#### ✅ Pagamento Aprovado
- **Número do cartão:** `5031 4332 1540 6351`
- **CVV:** `123`
- **Data de validade:** `11/25` (ou qualquer data futura)
- **Nome no cartão:** `APRO` (deve ser exatamente "APRO")
- **CPF:** `12345678909` (use este CPF de teste, NÃO o seu CPF real)

#### ❌ Pagamento Recusado (para testar)
- **Número do cartão:** `5031 4332 1540 6351`
- **CVV:** `123`
- **Data de validade:** `11/25`
- **Nome no cartão:** `OTHE` (para recusar)
- **CPF:** `12345678909`

## 🔍 Por que o botão "Pagar" fica desabilitado?

O botão pode ficar cinza/desabilitado por vários motivos:

### 1. Conta de teste sem saldo fictício
**SOLUÇÃO:** A conta de teste precisa ter saldo fictício:
1. Vá em **Suas integrações** → Sua aplicação → **Contas de teste**
2. Clique nos **3 pontos** da conta Comprador
3. Selecione **"Editar dados"**
4. Adicione um **valor fictício** (ex: R$ 1000,00)
5. Salve

### 2. Dados do cartão incompletos
**SOLUÇÃO:** Preencha TODOS os campos:
- ✅ Número: `5031 4332 1540 6351`
- ✅ Nome: `APRO` (exatamente assim)
- ✅ Validade: `11/25` (qualquer data futura)
- ✅ CVV: `123`
- ✅ CPF: `12345678909` (NÃO use seu CPF real)
- ✅ Parcelas: Selecione uma opção

### 3. Não está logado com conta de teste
**SOLUÇÃO:** 
- Faça logout da conta real
- Faça login com a conta de teste (Comprador)

### 4. Campos obrigatórios faltando
**SOLUÇÃO:** 
- Verifique se todos os campos estão preenchidos
- Tente recarregar a página (F5)
- Limpe o cache do navegador

## ✅ Passo a Passo Correto

1. Crie conta de teste "Comprador" no painel do desenvolvedor
2. Faça logout da sua conta real
3. Faça login com a conta de teste (Comprador)
4. Acesse o checkout do seu site
5. Use os dados exatos: cartão `5031 4332 1540 6351`, nome `APRO`, CPF `12345678909`

## 📚 Referências

- [Contas de Teste](https://www.mercadopago.com.br/developers/pt/docs/your-integrations/test/accounts)
- [Cartões de Teste](https://www.mercadopago.com.br/developers/pt/docs/your-integrations/test/cards)


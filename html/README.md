****# FloraExpress - E-commerce de Flores

E-commerce simples e rápido para venda de flores, desenvolvido com HTML puro, Tailwind CSS e JavaScript vanilla.

## 🚀 Tecnologias

- **HTML5** - Estrutura das páginas
- **Tailwind CSS** - Estilização via CDN
- **JavaScript Vanilla** - Funcionalidades interativas
- **LocalStorage** - Armazenamento do carrinho

## 📁 Estrutura do Projeto

```
html/
├── index.html          # Página inicial com produtos
├── produto.html        # Página de detalhes do produto
├── carrinho.html       # Página do carrinho de compras
├── checkout.html       # Página de finalização (não funcional)
├── admin.html          # Painel administrativo
├── js/
│   ├── produtos.js     # Dados mockados dos produtos
│   ├── cart.js         # Funções do carrinho
│   └── admin.js        # Autenticação e painel admin
└── css/                # (vazio - usando Tailwind via CDN)
```

## 🌸 Funcionalidades

### Página Inicial (index.html)
- Header com navegação
- Hero section com call-to-action
- Grid de produtos com imagens e preços
- FAQ com perguntas frequentes
- Footer com informações de contato

### Página de Produto (produto.html)
- Detalhes completos do produto
- Botão para adicionar ao carrinho
- Produtos relacionados
- Breadcrumb de navegação

### Carrinho (carrinho.html)
- Lista de produtos adicionados
- Ajuste de quantidade
- Remoção de itens
- Cálculo do total
- Botão para checkout

### Checkout (checkout.html)
- Formulário de dados pessoais
- Endereço de entrega
- Opções de pagamento
- Resumo do pedido
- **Nota: Checkout é não funcional (demonstração)**

### Admin (admin.html)
- Autenticação com senha: **123123**
- Dashboard com estatísticas
- Lista completa de produtos
- Informações sobre categorias e preços

## 🎨 Produtos Disponíveis

1. Buquê de Rosas Vermelhas - R$ 89,90
2. Arranjo de Girassóis - R$ 75,90
3. Orquídeas Brancas - R$ 120,00
4. Buquê de Tulipas - R$ 95,90
5. Arranjo de Lírios - R$ 85,90
6. Cesta de Flores Mistas - R$ 110,00
7. Buquê de Margaridas - R$ 65,90
8. Rosas Cor-de-Rosa - R$ 79,90

## 🔧 Como Usar

1. Abra o arquivo `index.html` no navegador
2. Navegue pelas páginas usando o menu
3. Adicione produtos ao carrinho
4. Veja o carrinho e faça checkout (demonstração)
5. Acesse o admin com a senha **123123**

## 💾 Armazenamento

O carrinho é salvo no **LocalStorage** do navegador, permitindo que os itens permaneçam mesmo após fechar a página.

## 🔐 Credenciais Admin

- **Senha:** 123123

## 📝 Notas

- O checkout é apenas demonstrativo e não processa pagamentos reais
- As imagens são carregadas via Unsplash (require internet)
- O projeto usa Tailwind CSS via CDN
- Todos os dados de produtos são mockados

## 🌐 Navegação

- **Início** → `index.html`
- **Produto** → `produto.html?id={ID}`
- **Carrinho** → `carrinho.html`
- **Checkout** → `checkout.html`
- **Admin** → `admin.html`

---

Desenvolvido com 💚 por FloraExpress

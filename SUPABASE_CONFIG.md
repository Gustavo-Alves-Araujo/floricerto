# 🌸 Configuração do Supabase - La Floricultura

## 📋 Pré-requisitos

- Conta no Supabase (https://supabase.com)
- Projeto criado no Supabase

## 🔧 Passo a Passo de Configuração

### 1. Criar a Tabela de Produtos

1. Acesse seu projeto no Supabase
2. Vá em **SQL Editor** no menu lateral
3. Clique em **New Query**
4. Copie todo o conteúdo do arquivo `supabase-schema.sql`
5. Cole no editor e clique em **Run**
6. Aguarde a confirmação de sucesso ✅

### 2. Verificar as Credenciais

As credenciais já estão configuradas em `js/supabase-config.js`:

```javascript
Project URL: https://nrgwldtmucptrhoyqted.supabase.co
API Key: (anon/public)
```

⚠️ **Nota de Segurança**: A chave anon está configurada para uso público. As políticas RLS (Row Level Security) estão habilitadas para segurança.

### 3. Estrutura da Tabela

A tabela `produtos` possui os seguintes campos:

| Campo | Tipo | Descrição | Obrigatório |
|-------|------|-----------|-------------|
| `id` | BIGSERIAL | ID único do produto (auto-incremento) | ✅ |
| `nome` | TEXT | Nome completo do produto | ✅ |
| `preco` | DECIMAL(10,2) | Preço do produto em reais | ✅ |
| `imagem` | TEXT | URL da imagem do produto | ✅ |
| `descricao` | TEXT | Descrição detalhada | ❌ |
| `categoria` | TEXT | Categoria (Elegante, Romântico, etc.) | ❌ |
| `tipo` | TEXT | 'produto' ou 'order_bump' | ✅ (padrão: 'produto') |
| `destaques` | TEXT | Destaques do produto | ❌ |
| `ocasiao` | TEXT | Ocasiões recomendadas | ❌ |
| `entrega` | TEXT | Informações de entrega | ❌ |
| `palavrasChave` | TEXT | Palavras-chave para busca | ❌ |
| `emoji` | TEXT | Emoji para order bumps sem imagem | ❌ |
| `created_at` | TIMESTAMP | Data de criação | Auto |
| `updated_at` | TIMESTAMP | Data de atualização | Auto |

### 4. Tipos de Produtos

#### 📦 Produto Normal (`tipo: 'produto'`)
- Produtos principais da floricultura
- Exibidos na página inicial e página de produtos
- Categorias: Elegante, Romântico, Orquídeas, Alegre, Durável, Minimalista

#### 🎁 Order Bump (`tipo: 'order_bump'`)
- Produtos complementares
- Exibidos apenas no carrinho como oferta especial
- Exemplos: chocolates, vinhos, pelúcias, cartões

### 5. Adicionar Produtos via Admin

1. Acesse `/admin.html`
2. Digite a senha: `admin123`
3. Clique em **+ Adicionar Produto**
4. Preencha os campos:
   - **Nome**: Nome completo do produto
   - **Preço**: Valor em reais (ex: 195.00)
   - **Categoria**: Selecione uma categoria
   - **Tipo**: Escolha 'Produto Normal' ou 'Order Bump'
   - **URL da Imagem**: Link da imagem (Unsplash, etc.)
   - **Descrição**: Texto descritivo
   - **Emoji** (opcional): Para order bumps (ex: 🍫, 🍷, 🧸)
5. Clique em **Salvar Produto**

### 6. Exemplos de Produtos para Testar

#### Produto Normal:
```json
{
  "nome": "Buquê de Rosas Vermelhas Premium",
  "preco": 220.00,
  "categoria": "Romântico",
  "tipo": "produto",
  "imagem": "https://images.unsplash.com/photo-1561181286-d3fee7d55364",
  "descricao": "15 rosas vermelhas colombianas premium com embalagem craft artesanal"
}
```

#### Order Bump:
```json
{
  "nome": "Chocolate Premium",
  "preco": 45.00,
  "tipo": "order_bump",
  "imagem": "URL_da_imagem",
  "emoji": "🍫",
  "descricao": "Caixa com 12 bombons belgas artesanais"
}
```

### 7. Verificação de Funcionamento

✅ **Checklist de Testes:**

1. [ ] Admin consegue adicionar novos produtos
2. [ ] Admin consegue editar produtos existentes
3. [ ] Admin consegue deletar produtos
4. [ ] Página inicial (`index.html`) carrega produtos do banco
5. [ ] Página de produto (`produto.html`) exibe detalhes corretamente
6. [ ] Carrinho (`carrinho.html`) mostra order bumps dinâmicos
7. [ ] Filtros e busca funcionam corretamente

### 8. Solução de Problemas

#### ❌ Erro: "Supabase não está configurado"
- Verifique se o script do Supabase está carregando: `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2`
- Verifique se `js/supabase-config.js` está sendo carregado antes de outros scripts

#### ❌ Produtos não aparecem
- Abra o Console do navegador (F12)
- Verifique se há erros
- Confirme que a tabela foi criada corretamente no Supabase
- Verifique as políticas RLS no Supabase

#### ❌ Erro de CORS
- As políticas RLS devem estar habilitadas
- Verifique se o projeto Supabase está ativo

### 9. Políticas de Segurança (RLS)

As seguintes políticas estão ativas:

- ✅ **Leitura pública**: Qualquer visitante pode ver produtos
- ✅ **Inserção pública**: Permite adicionar via admin
- ✅ **Atualização pública**: Permite editar via admin
- ✅ **Deleção pública**: Permite deletar via admin

⚠️ **Nota**: Para produção, recomenda-se adicionar autenticação no admin e restringir as políticas.

### 10. Backup e Migração

Para exportar produtos existentes:

```sql
SELECT * FROM produtos;
```

Para importar produtos:

```sql
INSERT INTO produtos (nome, preco, imagem, categoria, tipo, descricao)
VALUES 
('Nome do Produto', 195.00, 'https://...', 'Elegante', 'produto', 'Descrição...');
```

## 🎉 Pronto!

Seu sistema está configurado para gerenciar produtos dinamicamente via Supabase!

---

**Desenvolvido para La Floricultura** 🌸

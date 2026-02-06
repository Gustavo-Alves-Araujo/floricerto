# 🔧 Guia de Solução de Problemas - Supabase

## ❌ Erro: "window.supabaseDB is undefined"

### Causas Possíveis:

1. **SDK do Supabase não carregou**
   - Verifique sua conexão com internet
   - Abra o Console (F12) e veja se há erro de carregamento
   - O script está sendo carregado de: `https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2`

2. **Arquivo supabase-config.js não encontrado**
   - Confirme que o arquivo existe em: `js/supabase-config.js`
   - Verifique o caminho no HTML

3. **Ordem errada dos scripts**
   - Os scripts devem carregar nesta ordem:
     1. Supabase SDK
     2. supabase-config.js
     3. Outros scripts

### ✅ Solução Rápida:

1. **Abra o arquivo de teste**: `test-supabase.html`
   - Ele vai mostrar exatamente qual é o problema
   - Siga os testes na ordem

2. **Verifique o Console (F12)**
   - Deve aparecer:
     - ✅ Supabase SDK carregado com sucesso
     - ✅ supabaseDB inicializado corretamente

3. **Limpe o cache do navegador**
   - Ctrl + Shift + R (Chrome/Edge)
   - Cmd + Shift + R (Mac)

---

## ❌ Erro ao criar produto: "can't access property 'createProduct'"

### Causa:
O objeto `window.supabaseDB` não foi exportado corretamente.

### ✅ Solução:

Verifique se no final do arquivo `js/supabase-config.js` tem:

```javascript
// Exportar para uso global
window.supabaseDB = {
    getAllProducts,
    getOrderBumps,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
```

---

## ❌ Erro: "relation 'produtos' does not exist"

### Causa:
A tabela não foi criada no Supabase.

### ✅ Solução:

1. Acesse: https://nrgwldtmucptrhoyqted.supabase.co
2. Vá em **SQL Editor**
3. Clique em **New Query**
4. Cole TODO o conteúdo de `supabase-schema.sql`
5. Clique em **Run**
6. Aguarde "Success. No rows returned"

---

## ❌ Erro de CORS

### Causa:
Políticas de segurança do navegador ou Supabase.

### ✅ Solução:

1. **Verifique se as políticas RLS estão ativas**:
   ```sql
   ALTER TABLE produtos ENABLE ROW LEVEL SECURITY;
   ```

2. **Confirme que as políticas de acesso existem**:
   - Leitura pública (SELECT)
   - Inserção pública (INSERT)
   - Atualização pública (UPDATE)
   - Deleção pública (DELETE)

3. **Execute novamente o schema completo**

---

## ❌ Produtos não aparecem no frontend

### Checklist:

1. [ ] Tabela criada no Supabase?
2. [ ] Existem produtos cadastrados?
3. [ ] Script do Supabase está carregando?
4. [ ] Console mostra algum erro?
5. [ ] Função `loadProdutos()` está sendo chamada?

### ✅ Teste:

Abra o Console (F12) e digite:

```javascript
loadProdutos().then(produtos => {
    console.log('Produtos:', produtos);
});
```

Se retornar um array vazio `[]`, significa que:
- ✅ Conexão OK
- ❌ Nenhum produto cadastrado

---

## 🧪 Usando o Teste Automático

1. Abra: `test-supabase.html` no navegador
2. Clique nos botões na ordem:
   1. **Testar Conexão** - verifica se conecta ao banco
   2. **Criar Produto de Teste** - adiciona um produto
   3. **Listar Produtos** - mostra todos os produtos

3. Acompanhe os logs na tela
4. Qualquer erro será mostrado com detalhes

---

## 📞 Checklist Final Antes de Usar

- [ ] SQL executado no Supabase (tabela criada)
- [ ] Arquivo `test-supabase.html` funciona sem erros
- [ ] Console (F12) não mostra erros vermelhos
- [ ] Admin consegue fazer login
- [ ] Admin mostra mensagem de "supabaseDB inicializado"
- [ ] Botão "Adicionar Produto" abre o modal
- [ ] Consegue criar um produto de teste

---

## 🆘 Último Recurso

Se nada funcionar:

1. Delete a tabela no Supabase:
   ```sql
   DROP TABLE IF EXISTS produtos CASCADE;
   ```

2. Execute o SQL novamente do zero

3. Limpe TUDO do navegador:
   - Cache
   - Cookies
   - LocalStorage

4. Recarregue a página (F5)

5. Tente o `test-supabase.html` novamente

---

## 📧 Informações para Debug

Ao reportar um erro, inclua:

1. **Mensagem de erro completa** (copie do console F12)
2. **Screenshot da tela**
3. **Resultado do test-supabase.html**
4. **Navegador e versão** (Chrome 120, Firefox 115, etc.)
5. **Confirmação**: executou o SQL no Supabase? (Sim/Não)

---

**Última atualização**: 06/02/2026

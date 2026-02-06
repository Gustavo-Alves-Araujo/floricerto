# 🔒 Segurança da Configuração Supabase

## ✅ Por que a chave está "exposta" no código?

### É a Anon Key (Chave Pública)
A chave que está no `supabase-config.js` é a **anon/public key**, que:
- ✅ **É SEGURA** para uso no frontend
- ✅ É projetada para ser pública
- ✅ Tem permissões limitadas
- ✅ É protegida por Row Level Security (RLS)

### Não é a Service Role Key
A chave que **NUNCA** deve ser exposta é a `service_role` key:
- ❌ Tem acesso administrativo total
- ❌ Bypassa todas as políticas RLS
- ❌ Deve ficar apenas no backend/servidor

## 🛡️ Camadas de Segurança

### 1. Row Level Security (RLS)
No Supabase Dashboard, você configurou políticas que:
- Permitem leitura pública dos produtos
- Bloqueiam inserção/atualização/exclusão sem autenticação
- Controlam quem pode fazer o quê

### 2. Domínios Permitidos
No Supabase Dashboard > Settings > API:
- Configure quais domínios podem usar sua API
- Exemplo: `lafloricultura.com.br`, `localhost`

### 3. Rate Limiting
O Supabase automaticamente:
- Limita requisições por IP
- Previne abusos
- Monitora atividade suspeita

## 🚀 Para Produção (Recomendações Extras)

### Opção 1: Variáveis de Ambiente no Build
Se você usar Vercel, Netlify ou similar:

```bash
# .env.local (NÃO commitado no git)
VITE_SUPABASE_URL=https://nrgwldtmucptrhoyqted.supabase.co
VITE_SUPABASE_ANON_KEY=sua_chave_aqui
```

```javascript
// Uso no código
const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
);
```

### Opção 2: Backend Intermediário
Para máxima segurança:
- Crie API em Node.js/Python/etc
- Use service_role key apenas no servidor
- Frontend chama seu backend
- Backend chama Supabase

## 📋 Checklist de Segurança

- [x] Usar apenas anon key no frontend
- [x] Configurar políticas RLS
- [ ] Adicionar domínios permitidos no Dashboard
- [ ] Configurar autenticação para admin
- [ ] Monitorar logs de acesso
- [ ] Implementar CAPTCHA se necessário

## 🔍 Como Verificar

### 1. Abra o Console do Navegador (F12)
Você verá a anon key exposta, e **está tudo bem**!

### 2. Tente Operações Não Permitidas
Se suas políticas RLS estiverem corretas:
```javascript
// Isso vai FALHAR (bloqueado por RLS):
await supabase.from('produtos').delete().eq('id', 1);
// Error: new row violates row-level security policy
```

### 3. Verifique o Dashboard
- Vá em Settings > API
- Confirme que está usando a anon/public key
- NÃO exponha a service_role key

## 🎯 Resumo

**Para aplicações frontend puras (HTML/JS):**
- ✅ Anon key no código é **SEGURO e CORRETO**
- ✅ RLS protege seus dados
- ✅ É assim que o Supabase foi projetado

**Se precisar de mais segurança:**
- Adicione autenticação (Supabase Auth)
- Use backend intermediário
- Configure domínios permitidos
- Implemente rate limiting customizado

## 📚 Referências

- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth/row-level-security)
- [Understanding API Keys](https://supabase.com/docs/guides/api/api-keys)
- [Row Level Security Policies](https://supabase.com/docs/guides/auth/row-level-security)

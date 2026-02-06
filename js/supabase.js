// 🚀 Configuração Supabase - INLINE SIMPLIFICADO
console.log('🔄 Carregando Supabase...');

(function() {
    const SUPABASE_URL = 'https://nrgwldtmucptrhoyqted.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yZ3dsZHRtdWNwdHJob3lxdGVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNTkxMjAsImV4cCI6MjA4NTkzNTEyMH0.8PLX18bXir94kCS5epFEyFGGEHxwKC3YANvwLE1SjmI';
    
    if (!window.supabase) {
        console.error('❌ Supabase SDK não carregado!');
        return;
    }
    
    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    
    window.supabaseDB = {
        getAllProducts: async () => {
            const { data, error } = await client.from('produtos').select('*').eq('tipo', 'produto').order('id');
            if (error) throw error;
            return data || [];
        },
        getOrderBumps: async () => {
            const { data, error } = await client.from('produtos').select('*').eq('tipo', 'order_bump').order('id');
            if (error) throw error;
            return data || [];
        },
        getProductById: async (id) => {
            const { data, error } = await client.from('produtos').select('*').eq('id', id).single();
            if (error) throw error;
            return data;
        },
        createProduct: async (produto) => {
            const { data, error } = await client.from('produtos').insert([produto]).select().single();
            if (error) throw error;
            return data;
        },
        updateProduct: async (id, produto) => {
            const { data, error } = await client.from('produtos').update(produto).eq('id', id).select().single();
            if (error) throw error;
            return data;
        },
        deleteProduct: async (id) => {
            const { error } = await client.from('produtos').delete().eq('id', id);
            if (error) throw error;
            return true;
        }
    };
    
    console.log('✅ supabaseDB carregado!');
})();

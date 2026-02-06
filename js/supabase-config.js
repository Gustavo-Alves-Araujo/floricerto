// ⚙️ Configuração do Supabase para La Floricultura
console.log('🔄 Carregando supabase-config.js...');

// Configuração
const SUPABASE_CONFIG = {
    url: 'https://nrgwldtmucptrhoyqted.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yZ3dsZHRtdWNwdHJob3lxdGVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNTkxMjAsImV4cCI6MjA4NTkzNTEyMH0.8PLX18bXir94kCS5epFEyFGGEHxwKC3YANvwLE1SjmI'
};

// Verificar se SDK está carregado
if (!window.supabase) {
    console.error('❌ Supabase SDK não foi carregado!');
    throw new Error('Supabase SDK não disponível');
}

console.log('✅ Supabase SDK detectado');

// Inicializar cliente
let supabase;
try {
    supabase = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log('✅ Cliente Supabase criado:', supabase);
} catch (error) {
    console.error('❌ Erro ao criar cliente:', error);
    throw error;
}

// Funções auxiliares para produtos
async function getAllProducts() {
    if (!supabase) {
        console.error('Supabase não inicializado');
        alert('Erro: Banco de dados não está configurado. Recarregue a página.');
        return [];
    }
    
    try {
        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .eq('tipo', 'produto')
            .order('id', { ascending: true });
        
        if (error) {
            console.error('Erro Supabase:', error);
            throw error;
        }
        return data || [];
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        alert('Erro ao carregar produtos: ' + error.message);
        return [];
    }
}

async function getOrderBumps() {
    try {
        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .eq('tipo', 'order_bump')
            .order('id', { ascending: true });
        
        if (error) throw error;
        return data || [];
    } catch (error) {
        console.error('Erro ao buscar order bumps:', error);
        return [];
    }
}

async function getProductById(id) {
    try {
        const { data, error } = await supabase
            .from('produtos')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Erro ao buscar produto:', error);
        return null;
    }
}

async function createProduct(produto) {
    if (!supabase) {
        throw new Error('Banco de dados não está configurado');
    }
    
    try {
        console.log('Criando produto:', produto);
        const { data, error } = await supabase
            .from('produtos')
            .insert([produto])
            .select()
            .single();
        
        if (error) {
            console.error('Erro Supabase ao criar:', error);
            throw error;
        }
        console.log('Produto criado com sucesso:', data);
        return data;
    } catch (error) {
        console.error('Erro ao criar produto:', error);
        throw error;
    }
}

async function updateProduct(id, produto) {
    try {
        const { data, error } = await supabase
            .from('produtos')
            .update(produto)
            .eq('id', id)
            .select()
            .single();
        
        if (error) throw error;
        return data;
    } catch (error) {
        console.error('Erro ao atualizar produto:', error);
        throw error;
    }
}

async function deleteProduct(id) {
    try {
        const { error } = await supabase
            .from('produtos')
            .delete()
            .eq('id', id);
        
        if (error) throw error;
        return true;
    } catch (error) {
        console.error('Erro ao deletar produto:', error);
        throw error;
    }
}

// Exportar para uso global
window.supabaseDB = {
    getAllProducts,
    getOrderBumps,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};

window.SUPABASE_CONFIG = SUPABASE_CONFIG;
window.supabaseClient = supabase;

console.log('✅ supabaseDB exportado para window:', window.supabaseDB);
console.log('✅ supabase-config.js carregado com sucesso!');

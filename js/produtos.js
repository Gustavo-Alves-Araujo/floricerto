// Array global de produtos - será carregado do Supabase
let produtos = [];

// Função para carregar produtos do Supabase
async function loadProdutos() {
    console.log('📦 loadProdutos() chamado');
    console.log('   window.supabaseDB existe?', !!window.supabaseDB);
    
    if (window.supabaseDB && window.supabaseDB.getAllProducts) {
        try {
            console.log('   Chamando getAllProducts()...');
            produtos = await window.supabaseDB.getAllProducts();
            console.log('✅ Produtos carregados do Supabase:', produtos.length, 'produtos');
            if (produtos.length > 0) {
                console.log('   Primeiro produto:', produtos[0]);
            }
        } catch (error) {
            console.error('❌ Erro ao carregar produtos:', error);
            produtos = [];
        }
    } else {
        console.error('❌ Supabase não está configurado');
        produtos = [];
    }
    return produtos;
}

// Exportar para uso global
window.loadProdutos = loadProdutos;
window.produtos = () => produtos;

console.log('✅ produtos.js carregado');
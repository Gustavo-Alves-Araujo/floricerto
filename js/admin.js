// Funções de autenticação do admin
const ADMIN_PASSWORD = 'admin123';

// Variável global para armazenar produtos
let produtos = [];

function isAdminAuthenticated() {
  return sessionStorage.getItem('adminAuth') === 'true';
}

function authenticateAdmin(password) {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem('adminAuth', 'true');
    return true;
  }
  return false;
}

function logoutAdmin() {
  sessionStorage.removeItem('adminAuth');
  window.location.reload();
}

function handleAdminLogin(event) {
  event.preventDefault();
  const password = document.getElementById('adminPassword').value;
  const errorMsg = document.getElementById('errorMsg');
  
  if (authenticateAdmin(password)) {
    showAdminPanel();
  } else {
    errorMsg.textContent = 'Senha incorreta!';
    errorMsg.classList.remove('hidden');
  }
}

async function showAdminPanel() {
  document.getElementById('loginSection').classList.add('hidden');
  document.getElementById('adminPanel').classList.remove('hidden');
  
  // Verificar se o Supabase está disponível
  if (!window.supabaseDB) {
    alert('ERRO: Banco de dados não está configurado. Verifique:\n1. Se executou o SQL no Supabase\n2. Se a conexão com internet está OK\n3. Recarregue a página (F5)');
    console.error('window.supabaseDB não está definido');
    return;
  }
  
  await loadProductsFromSupabase();
  calculateStats();
  renderAdminProducts();
}

async function loadProductsFromSupabase() {
  if (!window.supabaseDB) {
    console.error('❌ supabaseDB não está disponível');
    alert('Erro: Sistema de banco de dados não foi carregado. Recarregue a página.');
    return;
  }
  
  try {
    console.log('📦 Carregando produtos do Supabase...');
    produtos = await window.supabaseDB.getAllProducts();
    console.log('✅ Produtos carregados:', produtos.length);
    
    if (produtos.length > 0) {
      console.log('   Exemplo:', {
        id: produtos[0].id,
        nome: produtos[0].nome,
        preco: produtos[0].preco,
        tipo: produtos[0].tipo
      });
    }
  } catch (error) {
    console.error('❌ Erro ao carregar produtos:', error);
    alert('Erro ao carregar produtos do banco de dados: ' + error.message);
  }
}

function calculateStats() {
  const totalProducts = produtos.length;
  const categories = [...new Set(produtos.map(p => p.categoria))];
  const avgPrice = produtos.length > 0 ? produtos.reduce((sum, p) => sum + p.preco, 0) / produtos.length : 0;
  const maxPrice = produtos.length > 0 ? Math.max(...produtos.map(p => p.preco)) : 0;

  document.getElementById('totalProducts').textContent = totalProducts;
  document.getElementById('totalCategories').textContent = categories.length;
  document.getElementById('avgPrice').textContent = `R$ ${avgPrice.toFixed(2)}`;
  document.getElementById('maxPrice').textContent = `R$ ${maxPrice.toFixed(2)}`;
}

function renderAdminProducts() {
  const container = document.getElementById('adminProductsList');
  
  if (produtos.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-12">
        <p class="text-ink/40 text-lg">Nenhum produto cadastrado ainda.</p>
        <button onclick="openAddProductModal()" class="mt-4 bg-rust text-paper px-6 py-3 rounded-lg hover:bg-pine transition">
          Adicionar Primeiro Produto
        </button>
      </div>
    `;
    return;
  }
  
  container.innerHTML = produtos.map(produto => `
    <div class="border border-ink/10 rounded-xl overflow-hidden hover:shadow-xl transition-shadow bg-white">
      <div class="aspect-square overflow-hidden">
        <img src="${produto.imagem}" alt="${produto.nome}" class="w-full h-full object-cover hover:scale-110 transition-transform duration-500">
      </div>
      <div class="p-5 space-y-3">
        <div>
          <span class="inline-block text-xs bg-rust/10 text-rust px-3 py-1 rounded-full uppercase tracking-wider font-semibold mb-2">${produto.categoria}</span>
          <h3 class="font-serif text-lg leading-tight mb-2 line-clamp-2">${produto.nome}</h3>
          <p class="text-2xl font-light text-rust">R$ ${produto.preco.toFixed(2)}</p>
        </div>
        
        <p class="text-sm text-ink/60 line-clamp-2">${produto.descricao || ''}</p>
        
        <div class="flex gap-2 pt-3 border-t border-ink/5">
          <button onclick="editProduct(${produto.id})" class="flex-1 bg-rust text-paper px-4 py-2.5 rounded-lg hover:bg-pine transition text-xs uppercase tracking-wider font-semibold">
            Editar
          </button>
          <button onclick="deleteProductConfirm(${produto.id})" class="flex-1 border-2 border-red-500 text-red-500 px-4 py-2.5 rounded-lg hover:bg-red-500 hover:text-white transition text-xs uppercase tracking-wider font-semibold">
            Excluir
          </button>
        </div>
      </div>
    </div>
  `).join('');
}
// CRUD Functions
function openAddProductModal() {
  document.getElementById('modalTitle').textContent = 'Adicionar Produto';
  document.getElementById('productId').value = '';
  document.getElementById('productNome').value = '';
  document.getElementById('productPreco').value = '';
  document.getElementById('productCategoria').value = '';
  document.getElementById('productTipo').value = 'produto';
  document.getElementById('productImagem').value = '';
  document.getElementById('productDescricao').value = '';
  document.getElementById('productSubtitulo').value = '';
  document.getElementById('productDestaques').value = '';
  document.getElementById('productOcasiao').value = '';
  document.getElementById('productEntrega').value = '';
  document.getElementById('productPalavrasChave').value = '';
  document.getElementById('productModal').classList.remove('hidden');
}

function closeProductModal() {
  document.getElementById('productModal').classList.add('hidden');
}

async function editProduct(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;
  
  document.getElementById('modalTitle').textContent = 'Editar Produto';
  document.getElementById('productId').value = produto.id;
  document.getElementById('productNome').value = produto.nome;
  document.getElementById('productPreco').value = produto.preco;
  document.getElementById('productCategoria').value = produto.categoria || '';
  document.getElementById('productTipo').value = produto.tipo || 'produto';
  document.getElementById('productImagem').value = produto.imagem;
  document.getElementById('productDescricao').value = produto.descricao || '';
  document.getElementById('productSubtitulo').value = produto.subtitulo || '';
  document.getElementById('productDestaques').value = produto.destaques || '';
  document.getElementById('productOcasiao').value = produto.ocasiao || '';
  document.getElementById('productEntrega').value = produto.entrega || '';
  document.getElementById('productPalavrasChave').value = produto.palavrasChave || '';
  document.getElementById('productModal').classList.remove('hidden');
}

async function saveProduct(event) {
  event.preventDefault();
  
  if (!window.supabaseDB) {
    alert('Erro: Banco de dados não está disponível. Recarregue a página.');
    return;
  }
  
  const id = document.getElementById('productId').value;
  
  // Apenas campos essenciais que existem na tabela
  const produto = {
    nome: document.getElementById('productNome').value.trim(),
    preco: parseFloat(document.getElementById('productPreco').value),
    categoria: document.getElementById('productCategoria').value.trim(),
    tipo: document.getElementById('productTipo').value || 'produto', // Garantir que tenha valor padrão
    imagem: document.getElementById('productImagem').value.trim(),
    descricao: (document.getElementById('productDescricao').value || '').trim() || null,
    subtitulo: (document.getElementById('productSubtitulo').value || '').trim() || null
  };
  
  // Validações básicas
  if (!produto.nome) {
    alert('Nome do produto é obrigatório!');
    return;
  }
  if (!produto.preco || produto.preco <= 0) {
    alert('Preço deve ser maior que 0!');
    return;
  }
  if (!produto.imagem) {
    alert('URL da imagem é obrigatória!');
    return;
  }
  
  console.log('Salvando produto:', produto);
  
  try {
    if (id) {
      // Editar
      await window.supabaseDB.updateProduct(parseInt(id), produto);
      alert('✅ Produto atualizado com sucesso!');
    } else {
      // Adicionar
      const resultado = await window.supabaseDB.createProduct(produto);
      console.log('✅ Produto criado:', resultado);
      alert('✅ Produto adicionado com sucesso!');
    }
    
    closeProductModal();
    await loadProductsFromSupabase();
    calculateStats();
    renderAdminProducts();
  } catch (error) {
    console.error('Erro completo:', error);
    alert('Erro ao salvar produto:\n' + error.message + '\n\nDetalhes no console (F12)');
  }
}

async function deleteProductConfirm(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;
  
  if (confirm(`Deseja realmente excluir o produto "${produto.nome}"?\n\nEsta ação não pode ser desfeita.`)) {
    try {
      await window.supabaseDB.deleteProduct(id);
      alert('Produto excluído com sucesso!');
      await loadProductsFromSupabase();
      calculateStats();
      renderAdminProducts();
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      alert('Erro ao excluir produto: ' + error.message);
    }
  }
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  if (isAdminAuthenticated()) {
    showAdminPanel();
  }
});

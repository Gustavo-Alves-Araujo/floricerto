// Funções de autenticação do admin
const ADMIN_PASSWORD = 'admin123';

// Carregar produtos do localStorage ou usar os padrões
function loadProductsFromStorage() {
  const stored = localStorage.getItem('produtos');
  if (stored) {
    return JSON.parse(stored);
  }
  // Se não houver produtos salvos, salvar os padrões
  saveProductsToStorage(produtos);
  return produtos;
}

function saveProductsToStorage(productsList) {
  localStorage.setItem('produtos', JSON.stringify(productsList));
}

// Sobrescrever a variável global produtos
let produtos = loadProductsFromStorage();

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

function showAdminPanel() {
  document.getElementById('loginSection').classList.add('hidden');
  document.getElementById('adminPanel').classList.remove('hidden');
  calculateStats();
  renderAdminProducts();
}

function calculateStats() {
  const totalProducts = produtos.length;
  const categories = [...new Set(produtos.map(p => p.categoria))];
  const avgPrice = produtos.reduce((sum, p) => sum + p.preco, 0) / produtos.length;
  const maxPrice = Math.max(...produtos.map(p => p.preco));

  document.getElementById('totalProducts').textContent = totalProducts;
  document.getElementById('totalCategories').textContent = categories.length;
  document.getElementById('avgPrice').textContent = `R$ ${avgPrice.toFixed(2)}`;
  document.getElementById('maxPrice').textContent = `R$ ${maxPrice.toFixed(2)}`;
}

function renderAdminProducts() {
  const container = document.getElementById('adminProductsList');
  
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
        
        <p class="text-sm text-ink/60 line-clamp-2">${produto.descricao}</p>
        
        <div class="flex gap-2 pt-3 border-t border-ink/5">
          <button onclick="editProduct(${produto.id})" class="flex-1 bg-rust text-paper px-4 py-2.5 rounded-lg hover:bg-pine transition text-xs uppercase tracking-wider font-semibold">
            Editar
          </button>
          <button onclick="deleteProduct(${produto.id})" class="flex-1 border-2 border-red-500 text-red-500 px-4 py-2.5 rounded-lg hover:bg-red-500 hover:text-white transition text-xs uppercase tracking-wider font-semibold">
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
  document.getElementById('productImagem').value = '';
  document.getElementById('productDescricao').value = '';
  document.getElementById('productDestaques').value = '';
  document.getElementById('productOcasiao').value = '';
  document.getElementById('productEntrega').value = '';
  document.getElementById('productPalavrasChave').value = '';
  document.getElementById('productModal').classList.remove('hidden');
}

function closeProductModal() {
  document.getElementById('productModal').classList.add('hidden');
}

function editProduct(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;
  
  document.getElementById('modalTitle').textContent = 'Editar Produto';
  document.getElementById('productId').value = produto.id;
  document.getElementById('productNome').value = produto.nome;
  document.getElementById('productPreco').value = produto.preco;
  document.getElementById('productCategoria').value = produto.categoria;
  document.getElementById('productImagem').value = produto.imagem;
  document.getElementById('productDescricao').value = produto.descricao;
  document.getElementById('productDestaques').value = produto.destaques;
  document.getElementById('productOcasiao').value = produto.ocasiao;
  document.getElementById('productEntrega').value = produto.entrega;
  document.getElementById('productPalavrasChave').value = produto.palavrasChave;
  document.getElementById('productModal').classList.remove('hidden');
}

function saveProduct(event) {
  event.preventDefault();
  
  const id = document.getElementById('productId').value;
  const produto = {
    id: id ? parseInt(id) : (Math.max(...produtos.map(p => p.id)) + 1),
    nome: document.getElementById('productNome').value,
    preco: parseFloat(document.getElementById('productPreco').value),
    categoria: document.getElementById('productCategoria').value,
    imagem: document.getElementById('productImagem').value,
    descricao: document.getElementById('productDescricao').value,
    destaques: document.getElementById('productDestaques').value,
    ocasiao: document.getElementById('productOcasiao').value,
    entrega: document.getElementById('productEntrega').value,
    palavrasChave: document.getElementById('productPalavrasChave').value
  };
  
  if (id) {
    // Editar
    const index = produtos.findIndex(p => p.id === parseInt(id));
    produtos[index] = produto;
  } else {
    // Adicionar
    produtos.push(produto);
  }
  
  saveProductsToStorage(produtos);
  closeProductModal();
  calculateStats();
  renderAdminProducts();
  
  alert(id ? 'Produto atualizado com sucesso!' : 'Produto adicionado com sucesso!');
}

function deleteProduct(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;
  
  if (confirm(`Deseja realmente excluir o produto "${produto.nome}"?\n\nEsta ação não pode ser desfeita.`)) {
    produtos = produtos.filter(p => p.id !== id);
    saveProductsToStorage(produtos);
    calculateStats();
    renderAdminProducts();
    alert('Produto excluído com sucesso!');
  }
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  if (isAdminAuthenticated()) {
    showAdminPanel();
  }
});

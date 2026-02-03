// Funções de autenticação do admin
const ADMIN_PASSWORD = 'admin123';

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
    <div class="border border-ink/10 rounded-lg p-6 hover:shadow-lg transition-shadow bg-paper/50">
      <div class="flex gap-4 mb-4">
        <img src="${produto.imagem}" alt="${produto.nome}" class="w-24 h-24 object-cover rounded-lg">
        <div class="flex-1">
          <h3 class="font-serif text-lg mb-1">${produto.nome}</h3>
          <p class="text-sm text-rust font-semibold mb-2">R$ ${produto.preco.toFixed(2)}</p>
          <span class="inline-block text-xs bg-rust/10 text-rust px-2 py-1 rounded uppercase tracking-wider">${produto.categoria}</span>
        </div>
      </div>
      
      <div class="space-y-2 text-sm border-t border-ink/5 pt-4">
        <div>
          <strong class="text-xs uppercase tracking-wider text-ink/50">Descrição:</strong>
          <p class="text-ink/70 text-xs line-clamp-2">${produto.descricao}</p>
        </div>
        
        <div>
          <strong class="text-xs uppercase tracking-wider text-ink/50">Destaques:</strong>
          <p class="text-ink/70 text-xs line-clamp-2">${produto.destaques.split('\n')[0]}</p>
        </div>
        
        <div>
          <strong class="text-xs uppercase tracking-wider text-ink/50">Ocasião:</strong>
          <p class="text-ink/70 text-xs line-clamp-2">${produto.ocasiao}</p>
        </div>
        
        <div>
          <strong class="text-xs uppercase tracking-wider text-ink/50">Entrega:</strong>
          <p class="text-ink/70 text-xs">${produto.entrega}</p>
        </div>
        
        <div>
          <strong class="text-xs uppercase tracking-wider text-ink/50">Tags:</strong>
          <p class="text-ink/70 text-xs italic">${produto.palavrasChave}</p>
        </div>
      </div>
      
      <div class="flex gap-2 mt-4 pt-4 border-t border-ink/5">
        <button onclick="editProduct(${produto.id})" class="flex-1 bg-rust text-paper px-4 py-2 rounded hover:bg-pine transition text-xs uppercase tracking-wider">
          Editar
        </button>
        <button onclick="deleteProduct(${produto.id})" class="flex-1 border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-500 hover:text-white transition text-xs uppercase tracking-wider">
          Excluir
        </button>
      </div>
    </div>
  `).join('');
}

function editProduct(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;
  
  alert(`Edição do produto "${produto.nome}" ainda não implementada.\n\nDados atuais:\n- Preço: R$ ${produto.preco}\n- Categoria: ${produto.categoria}`);
}

function deleteProduct(id) {
  const produto = produtos.find(p => p.id === id);
  if (!produto) return;
  
  if (confirm(`Deseja realmente excluir o produto "${produto.nome}"?`)) {
    alert('Funcionalidade de exclusão ainda não implementada.\nNa versão completa, o produto seria removido do banco de dados.');
  }
}

function openAddProductModal() {
  alert('Modal de adição de produto será implementado.\n\nCampos necessários:\n- Nome\n- Preço\n- Imagem (URL)\n- Descrição\n- Categoria\n- Destaques\n- Ocasião\n- Entrega\n- Palavras-chave');
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  if (isAdminAuthenticated()) {
    showAdminPanel();
  }
});

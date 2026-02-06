// Funções de autenticação do admin
const ADMIN_PASSWORD = '123123';

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

function checkAdminAuth() {
  if (!isAdminAuthenticated()) {
    showLoginForm();
  } else {
    showAdminPanel();
  }
}

function showLoginForm() {
  const loginSection = document.getElementById('loginSection');
  const adminPanel = document.getElementById('adminPanel');
  
  if (loginSection) loginSection.classList.remove('hidden');
  if (adminPanel) adminPanel.classList.add('hidden');
}

function showAdminPanel() {
  const loginSection = document.getElementById('loginSection');
  const adminPanel = document.getElementById('adminPanel');
  
  if (loginSection) loginSection.classList.add('hidden');
  if (adminPanel) adminPanel.classList.remove('hidden');
  
  renderAdminProducts();
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

function renderAdminProducts() {
  const container = document.getElementById('adminProductsList');
  if (!container) return;
  
  container.innerHTML = produtos.map(produto => `
    <div class="bg-white p-6 rounded-lg shadow-md">
      <img src="${produto.imagem}" alt="${produto.nome}" class="w-full h-48 object-cover rounded-lg mb-4">
      <h3 class="font-semibold text-lg mb-2">${produto.nome}</h3>
      <p class="text-gray-600 text-sm mb-2">${produto.descricao}</p>
      <p class="text-green-600 font-bold text-xl">R$ ${produto.preco.toFixed(2)}</p>
      <p class="text-sm text-gray-500 mt-2">Categoria: ${produto.categoria}</p>
      <p class="text-sm text-gray-500">ID: ${produto.id}</p>
    </div>
  `).join('');
}

// Inicializar verificação de autenticação
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('admin.html')) {
    checkAdminAuth();
  }
});

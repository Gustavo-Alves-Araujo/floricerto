// Funções do carrinho
function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function addToCart(produtoId) {
  const produto = produtos.find(p => p.id === produtoId);
  if (!produto) return;

  const cart = getCart();
  const existingItem = cart.find(item => item.id === produtoId);

  if (existingItem) {
    existingItem.quantidade++;
  } else {
    cart.push({
      ...produto,
      quantidade: 1
    });
  }

  saveCart(cart);
  showNotification('Item adicionado à coleção');
}

function removeFromCart(produtoId) {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== produtoId);
  saveCart(updatedCart);
}

function updateQuantity(produtoId, quantidade) {
  const cart = getCart();
  const item = cart.find(item => item.id === produtoId);
  
  if (item) {
    item.quantidade = parseInt(quantidade);
    if (item.quantidade <= 0) {
      removeFromCart(produtoId);
    } else {
      saveCart(cart);
    }
  }
}

function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.preco * item.quantidade), 0);
}

function getCartItemCount() {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantidade, 0);
}

function updateCartCount() {
  const cartCountElements = document.querySelectorAll('.cart-count');
  const count = getCartItemCount();
  
  cartCountElements.forEach(element => {
    element.textContent = count;
    // Removemos a lógica de hidden para manter o layout consistente
    // Apenas atualizamos o número. O CSS controla a visibilidade/opacidade se necessário.
    if (count > 0) {
        element.style.opacity = '1';
    } else {
        // Opconal: resetar opacidade se quisermos esconder o zero
        // element.style.opacity = '0'; 
    }
  });
}

function clearCart() {
  localStorage.removeItem('cart');
  updateCartCount();
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.className = 'fixed bottom-8 right-8 bg-ink text-paper px-6 py-4 z-50 animate-fade-in font-sans text-xs tracking-[0.2em] uppercase border border-ink shadow-2xl';
  notification.innerHTML = `<div class="flex items-center gap-4">
    <div class="w-1 h-4 bg-rust"></div>
    ${message}
  </div>`;
  document.body.appendChild(notification);
  
  // Animação fade-in simples via style se a classe não estiver definida
  notification.style.animation = 'fadeIn 0.5s ease-out forwards';
  
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.5s ease';
    setTimeout(() => notification.remove(), 500);
  }, 3000);
}

// Atualizar contagem do carrinho ao carregar a página
document.addEventListener('DOMContentLoaded', updateCartCount);

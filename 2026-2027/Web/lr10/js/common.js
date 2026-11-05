'use strict';

/* ==========================================================
   Спільний код для обох сторінок (товари + корзина)
   ========================================================== */

const CART_KEY = 'football-cart';

/* ---------- Товари ---------- */
const products = [
  { id: 1, category: 'М\'ячі',          name: 'Футбольний м\'яч',        price: 1299, image: 'img/ball.svg',        tag: 'Хіт' },
  { id: 2, category: 'Взуття',          name: 'Бутси футбольні',         price: 2850, image: 'img/boots.svg',       tag: '' },
  { id: 3, category: 'Форма',           name: 'Футболка гравця',         price: 899,  image: 'img/jersey.svg',      tag: 'Новинка' },
  { id: 4, category: 'Воротарям',       name: 'Рукавички воротарські',   price: 749,  image: 'img/gloves.svg',      tag: '' },
  { id: 5, category: 'Захист',          name: 'Щитки футбольні',         price: 349,  image: 'img/shinguards.svg',  tag: '' },
  { id: 6, category: 'Форма',           name: 'Гетри',                   price: 189,  image: 'img/socks.svg',       tag: '' },
  { id: 7, category: 'Уболівальникам',  name: 'Шарф уболівальника',      price: 299,  image: 'img/scarf.svg',       tag: 'Хіт' },
  { id: 8, category: 'Аксесуари',       name: 'Свисток арбітра',         price: 129,  image: 'img/whistle.svg',     tag: '' },
];

function findProduct(id) {
  return products.find((p) => p.id === id);
}

/* ---------- Корзина (localStorage) ---------- */
// корзина - це масив { id, qty }
function getCart() {
  try {
    const data = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Не вдалося зберегти корзину:', error);
  }
  updateCounter();
}

function addToCart(id, qty) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);

  if (item) {
    item.qty = Math.min(item.qty + qty, 99);
  } else {
    cart.push({ id: id, qty: qty });
  }
  saveCart(cart);
}

/* ---------- Лічильник біля іконки ---------- */
// показуємо кількість найменувань, а не штук
function updateCounter() {
  const counter = document.getElementById('cart-count');
  const count = getCart().length;

  counter.textContent = count;
  counter.hidden = count === 0;
}

/* ---------- Модальне вікно ---------- */
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalButtons = document.getElementById('modal-buttons');

// buttons: [{ text, onClick, light }]
function openModal(title, bodyElement, buttons) {
  modalTitle.textContent = title;
  modalBody.replaceChildren();
  if (bodyElement) modalBody.append(bodyElement);

  modalButtons.replaceChildren();
  buttons.forEach((b) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn ' + (b.light ? 'btn--light' : 'btn--yellow');
    btn.textContent = b.text;
    btn.addEventListener('click', b.onClick);
    modalButtons.append(btn);
  });

  modal.hidden = false;
}

function closeModal() {
  modal.hidden = true;
}

// закриття: клік по темному фону або Esc
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

/* ---------- Іконка корзини ---------- */
document.getElementById('cart-btn').addEventListener('click', () => {
  if (getCart().length === 0) {
    openModal('Корзина пуста', null, [{ text: 'Закрити', onClick: closeModal, light: true }]);
  } else {
    window.location.href = 'cart.html';
  }
});

updateCounter();

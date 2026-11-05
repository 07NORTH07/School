'use strict';

/* ==========================================================
   Сторінка корзини
   - зміна кількості, видалення, сума
   ========================================================== */

const cartContent = document.getElementById('cart-content');
const emptyMessage = document.getElementById('empty-message');
const cartBody = document.getElementById('cart-body');
const cartTotal = document.getElementById('cart-total');
const payLink = document.getElementById('pay-link');

function renderCart() {
  const cart = getCart();

  // порожня корзина
  if (cart.length === 0) {
    cartContent.hidden = true;
    emptyMessage.hidden = false;
    return;
  }
  cartContent.hidden = false;
  emptyMessage.hidden = true;

  let rows = '';
  let total = 0;

  cart.forEach((item, index) => {
    const product = findProduct(item.id);
    const sum = product.price * item.qty;
    total += sum;

    rows +=
      '<tr>' +
        '<td>' + (index + 1) + '.</td>' +
        '<td>' + product.name + '</td>' +
        '<td>' + product.price.toFixed(2) + '</td>' +
        '<td>' +
          '<button type="button" class="link-btn" data-action="minus" data-id="' + item.id + '" aria-label="Зменшити">−</button> ' +
          '<span class="qty-value">' + item.qty + '</span> ' +
          '<button type="button" class="link-btn" data-action="plus" data-id="' + item.id + '" aria-label="Збільшити">+</button>' +
        '</td>' +
        '<td>' + sum.toFixed(2) + '</td>' +
        '<td><button type="button" class="link-btn link-btn--danger" data-action="delete" data-id="' + item.id + '">(видалити)</button></td>' +
      '</tr>';
  });

  cartBody.innerHTML = rows;
  cartTotal.textContent = total.toFixed(2) + ' грн.';
}

/* ---------- Кнопки в таблиці ---------- */
cartBody.addEventListener('click', (event) => {
  const btn = event.target.closest('button');
  if (!btn) return;

  const id = Number(btn.dataset.id);
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;

  if (btn.dataset.action === 'plus' && item.qty < 99) {
    item.qty++;
    saveCart(cart);
  } else if (btn.dataset.action === 'minus' && item.qty > 1) {
    item.qty--;
    saveCart(cart);
  } else if (btn.dataset.action === 'delete') {
    saveCart(cart.filter((i) => i.id !== id));
  }

  renderCart();
});

/* ---------- Оплатити ---------- */
payLink.addEventListener('click', (event) => {
  event.preventDefault();

  openModal('Дякуємо за замовлення!', null, [
    {
      text: 'До покупок',
      onClick: () => {
        saveCart([]);
        window.location.href = 'index.html';
      },
    },
  ]);
});

renderCart();

'use strict';

/* ==========================================================
   Сторінка зі списком товарів
   ========================================================== */

const productList = document.getElementById('product-list');

/* ---------- Список товарів ---------- */
function createCard(product) {
  const card = document.createElement('article');
  card.className = 'card';

  let tag = '';
  if (product.tag) {
    tag = '<span class="card__tag">' + product.tag + '</span>';
  }

  card.innerHTML =
    tag +
    '<p class="card__category">' + product.category + '</p>' +
    '<img class="card__img" src="' + product.image + '" alt="' + product.name + '">' +
    '<h3 class="card__name">' + product.name + '</h3>' +
    '<p class="card__price">' + product.price + ' грн</p>' +
    '<button type="button" class="btn btn--yellow card__btn" data-id="' + product.id + '">Додати у корзину</button>';

  return card;
}

products.forEach((product) => {
  productList.append(createCard(product));
});

/* ---------- Вікно "Вкажіть кількість" ---------- */
function askQuantity(product) {
  const body = document.createElement('div');
  body.className = 'qty';
  body.innerHTML =
    '<p class="qty__name">' + product.name + '</p>' +
    '<div class="qty__row">' +
      '<button type="button" class="qty__btn" id="qty-minus">−</button>' +
      '<input type="number" id="qty-input" class="qty__input" value="1" min="1" max="99">' +
      '<button type="button" class="qty__btn" id="qty-plus">+</button>' +
    '</div>' +
    '<p id="qty-error" class="qty__error"></p>';

  openModal('Вкажіть кількість:', body, [
    { text: 'Додати до корзини', onClick: () => confirmAdd(product) },
  ]);

  const input = document.getElementById('qty-input');

  document.getElementById('qty-minus').addEventListener('click', () => {
    if (Number(input.value) > 1) input.value = Number(input.value) - 1;
  });
  document.getElementById('qty-plus').addEventListener('click', () => {
    if (Number(input.value) < 99) input.value = Number(input.value) + 1;
  });
  input.focus();
}

function confirmAdd(product) {
  const qty = Number(document.getElementById('qty-input').value);

  if (!Number.isInteger(qty) || qty < 1 || qty > 99) {
    document.getElementById('qty-error').textContent = 'Введіть ціле число від 1 до 99';
    return;
  }

  addToCart(product.id, qty);
  showAdded();
}

/* ---------- Вікно "Товар додано" ---------- */
function showAdded() {
  openModal('Товар додано', null, [
    { text: 'Перейти у корзину', onClick: () => { window.location.href = 'cart.html'; } },
    { text: 'Повернутись до покупок', onClick: closeModal, light: true },
  ]);
}

/* ---------- Кліки по кнопках ---------- */
productList.addEventListener('click', (event) => {
  const btn = event.target.closest('.card__btn');
  if (!btn) return;
  askQuantity(findProduct(Number(btn.dataset.id)));
});

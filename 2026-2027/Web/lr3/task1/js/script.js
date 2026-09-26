// Функція-генератор: у нескінченному циклі повертає випадкове число в межах [min, max]
function* randomGenerator(min, max) {
  while (true) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    yield num;
  }
}

// Питаємо межі один раз при завантаженні сторінки
const min = Number(prompt("Введіть мінімальне значення:"));
const max = Number(prompt("Введіть максимальне значення:"));

// Створюємо екземпляр генератора з цими межами
const generator = randomGenerator(min, max);

const btn = document.getElementById("next");
const out = document.getElementById("out");

// При кожному кліку — беремо наступне значення з генератора (next() продовжує з місця, де зупинився yield)
btn.addEventListener("click", () => {
  const result = generator.next().value;
  out.textContent = result;
});
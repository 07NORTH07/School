// Генератор приймає символи через next(value) і накопичує пароль.
// yield повертає поточний стан пароля назовні (можна ігнорувати),
// а те, що передали в наступний next(), приходить назад як результат yield.
function* passwordGenerator() {
  let password = "";
  while (true) {
    const char = yield password; // призупиняємось тут, чекаємо на next(char)
    if (char === "done") {
      return password; // завершує генератор, result.done стане true
    }
    password += char;
  }
}

const btn = document.getElementById("start");
const out = document.getElementById("out");

btn.addEventListener("click", () => {
  const gen = passwordGenerator();
  gen.next(); // перший виклик — просто "запускає" генератор до першого yield, значення не передаємо

  let result;
  while (true) {
    const char = prompt('Введіть символ (або "done" щоб завершити):');
    result = gen.next(char);
    if (result.done) break;
  }

  out.textContent = "Пароль: " + result.value;
  alert("Готовий пароль: " + result.value);
});
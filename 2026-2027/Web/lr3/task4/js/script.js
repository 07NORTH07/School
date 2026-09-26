const name = prompt("Введіть ваше ім'я:");

const user = {
  name: name,
  say() {
    // this всередині say() працює тільки якщо метод викликаний як user.say()
    alert(`Hello, ${this.name}`);
  }
};

const btn = document.getElementById("hello");
const out = document.getElementById("out");

// --- ПОГАНИЙ варіант (закоментований, для демонстрації втрати контексту) ---
// btn.addEventListener("click", user.say);
// Тут say() передається "сам по собі", без прив'язки до user.
// this всередині say() стане undefined (strict mode) або посилатиметься
// на btn/window — тому this.name буде undefined, а не ім'я користувача.

// --- ПРАВИЛЬНИЙ варіант №1: обгортка в стрілкову функцію ---
btn.addEventListener("click", () => user.say());
// Стрілкова функція не має власного this, тому всередині неї
// user.say() викликається як метод об'єкта user — контекст зберігається.

// --- ПРАВИЛЬНИЙ варіант №2 (альтернатива): .bind() ---
// const boundSay = user.say.bind(user);
// btn.addEventListener("click", boundSay);
// bind() жорстко "прив'язує" this до user назавжди, незалежно від того, як викликати функцію далі.

out.textContent = "Натисни кнопку — має з'явитись правильне ім'я: " + name;
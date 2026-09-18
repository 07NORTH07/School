// Завдання 1: функція calculate() і блочна область видимості
// Всередині функції оголошуємо змінну result через let.
// Всередині блоку if оголошуємо ІНШУ змінну result (вона видима лише
// всередині цього блоку і не змінює зовнішню result).
// У консоль виводимо обидва значення, щоб показати різницю.

function calculate() {
  let result = 10;
  console.log('result поза if:', result);

  if (true) {
    let result = 99;
    console.log('result всередині if:', result);
  }

  console.log('result після if (не змінилась):', result);
}

const calcBtn = document.getElementById('calcBtn');
calcBtn.addEventListener('click', () => {
  calculate();
});


// Завдання 2: секретне число
// Номер у журналі - 27 (заміни на свій за потреби).
// secretNumber - залишок від ділення номера у журналі на 10.
// Користувач вводить число від 0 до 9 через prompt.
// Якщо число співпало з secretNumber - alert("Correct!"), інакше - alert("Wrong!").

const journalNumber = 27;
const secretNumber = journalNumber % 10;

const secretBtn = document.getElementById('secretBtn');
secretBtn.addEventListener('click', () => {
  const answer = Number(prompt('Введіть число від 0 до 9'));

  if (answer === secretNumber) {
    alert('Correct!');
  } else {
    alert('Wrong!');
  }
});


// Завдання 3: сума двох чисел
// Запитуємо ім'я користувача та два числа.
// Виводимо у консоль повідомлення у форматі:
// "Hello, John! The sum of 5 and 7 is 12" через конкатенацію рядків (+).

const sumBtn = document.getElementById('sumBtn');
sumBtn.addEventListener('click', () => {
  const userName = prompt("Введіть ваше ім'я");
  const num1 = Number(prompt('Введіть перше число'));
  const num2 = Number(prompt('Введіть друге число'));
  const sum = num1 + num2;

  console.log('Hello, ' + userName + '! The sum of ' + num1 + ' and ' + num2 + ' is ' + sum);
});

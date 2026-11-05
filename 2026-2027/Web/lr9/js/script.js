'use strict';

/* ==========================================================
   Лабораторна робота: Promise API
   ========================================================== */

const loader = document.getElementById('loader');
const result = document.getElementById('result');

/* ---------- Лоадер і результат (завдання 0) ---------- */
function showLoader() {
  loader.style.display = 'block';
  result.textContent = '';
  result.className = '';
}

function hideLoader() {
  loader.style.display = 'none';
}

function showResult(text) {
  hideLoader();
  result.textContent = text;
  result.className = 'ok';
}

function showError(text) {
  hideLoader();
  result.textContent = text;
  result.className = 'error';
}

/* ---------- Завдання 1 ---------- */
function runTask1() {
  showLoader();

  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Hello, World!');
    }, 2000);
  });

  promise.then((message) => showResult(message));
}

/* ---------- Завдання 2 ---------- */
function checkNumber(num) {
  return new Promise((resolve, reject) => {
    if (num > 10) {
      resolve('Число більше 10');
    } else {
      reject('Число менше або дорівнює 10');
    }
  });
}

function runTask2() {
  const num = Number(document.getElementById('num2').value);
  showLoader();

  checkNumber(num)
    .then((message) => showResult(message))
    .catch((error) => showError(error));
}

/* ---------- Завдання 3 ---------- */
function randomNumber() {
  const time = Math.floor(Math.random() * 3000) + 1000; // 1000-3999 мс
  const start = Date.now();

  return new Promise((resolve) => {
    setTimeout(() => {
      const number = Math.floor(Math.random() * 100) + 1;
      resolve({ number: number, time: Date.now() - start });
    }, time);
  });
}

function runTask3() {
  showLoader();

  randomNumber().then((data) => {
    showResult('Число: ' + data.number + ', час роботи: ' + data.time + ' мс');
  });
}

/* ---------- Завдання 4 ---------- */
function compareNumbers(num1, num2) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (num1 > num2) {
        resolve('Перше число більше');
      } else if (num1 < num2) {
        resolve('Друге число більше');
      } else {
        reject('Числа рівні');
      }
    }, 1000);
  });
}

function runTask4() {
  const num1 = Number(document.getElementById('num4a').value);
  const num2 = Number(document.getElementById('num4b').value);
  showLoader();

  compareNumbers(num1, num2)
    .then((message) => showResult(message))
    .catch((error) => showError(error));
}

/* ---------- Завдання 5 ---------- */
function delayedRandom(seconds) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.floor(Math.random() * 10) + 1);
    }, seconds * 1000);
  });
}

function runTask5() {
  showLoader();

  Promise.all([delayedRandom(1), delayedRandom(2), delayedRandom(3)])
    .then((values) => {
      const sum = values[0] + values[1] + values[2];
      showResult('Значення: ' + values.join(', ') + '. Сума: ' + sum);
    })
    .catch((error) => showError('Помилка: ' + error));
}

/* ---------- Кнопки ---------- */
document.getElementById('btn1').addEventListener('click', runTask1);
document.getElementById('btn2').addEventListener('click', runTask2);
document.getElementById('btn3').addEventListener('click', runTask3);
document.getElementById('btn4').addEventListener('click', runTask4);
document.getElementById('btn5').addEventListener('click', runTask5);

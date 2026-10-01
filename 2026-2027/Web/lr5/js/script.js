// допоміжна функція: випадкове ціле число від min до max
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// ===== Завдання 1: Температура =====
function fahrenheitToCelsius() {
  let f = document.getElementById("fahrenheit").value;
  let celsius = document.getElementById("celsius");

  if (f === "" || isNaN(f)) {
    celsius.value = "";
    return;
  }
  celsius.value = (5 / 9 * (f - 32)).toFixed(2);
}

function celsiusToFahrenheit() {
  let c = document.getElementById("celsius").value;
  let fahrenheit = document.getElementById("fahrenheit");

  if (c === "" || isNaN(c)) {
    fahrenheit.value = "";
    return;
  }
  fahrenheit.value = (c * 9 / 5 + 32).toFixed(2);
}

document.getElementById("fahrenheit").addEventListener("input", fahrenheitToCelsius);
document.getElementById("celsius").addEventListener("input", celsiusToFahrenheit);


// ===== Завдання 2: Таблиця множення (текстове поле) =====
let correct2 = 0;
let total2 = 0;
let a2 = 0;
let b2 = 0;

function showScore2() {
  let percent = total2 === 0 ? 0 : Math.round(correct2 / total2 * 100);
  document.getElementById("score2").textContent =
    `Загальний рахунок ${percent}% (${correct2} правильних відповідей з ${total2})`;
}

function nextTask2() {
  a2 = randomNumber(2, 9);
  b2 = randomNumber(2, 9);
  document.getElementById("task2").textContent = `${a2} × ${b2} =`;
  document.getElementById("answer2").value = "";
  document.getElementById("result2").textContent = "";
  document.getElementById("check2").disabled = false;
}

function checkAnswer2() {
  let answer = document.getElementById("answer2").value;
  let result = document.getElementById("result2");

  if (answer === "") {
    result.textContent = "Введіть відповідь";
    return;
  }

  total2++;
  if (+answer === a2 * b2) {
    correct2++;
    result.textContent = "Правильно";
  } else {
    result.textContent = `Помилка, правильна відповідь «${a2 * b2}»`;
  }

  document.getElementById("check2").disabled = true;
  showScore2();
}

document.getElementById("next2").addEventListener("click", nextTask2);
document.getElementById("check2").addEventListener("click", checkAnswer2);
showScore2();
nextTask2();


// ===== Завдання 3: Таблиця множення (радіокнопки) =====
let correct3 = 0;
let total3 = 0;
let a3 = 0;
let b3 = 0;

function showScore3() {
  let percent = total3 === 0 ? 0 : Math.round(correct3 / total3 * 100);
  document.getElementById("score3").textContent =
    `Загальний рахунок ${percent}% (${correct3} правильних відповідей з ${total3})`;
}

function nextTask3() {
  a3 = randomNumber(2, 9);
  b3 = randomNumber(2, 9);
  document.getElementById("task3").textContent = `${a3} × ${b3} =`;
  document.getElementById("result3").textContent = "";

  // правильна відповідь + 3 випадкові неправильні
  let answers = [a3 * b3];
  while (answers.length < 4) {
    let n = randomNumber(4, 81);
    if (!answers.includes(n)) {
      answers.push(n);
    }
  }
  answers.sort(() => Math.random() - 0.5);

  let box = document.getElementById("options3");
  box.textContent = "";
  answers.forEach(value => {
    let label = document.createElement("label");
    label.style.display = "block";

    let radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer3";
    radio.value = value;
    radio.addEventListener("change", checkAnswer3);

    label.append(radio, " " + value);
    box.append(label);
  });
}

function checkAnswer3(event) {
  let chosen = +event.target.value;
  let result = document.getElementById("result3");

  total3++;
  if (chosen === a3 * b3) {
    correct3++;
    result.textContent = "Правильно";
  } else {
    result.textContent = `Помилка, правильна відповідь «${a3 * b3}»`;
  }

  // тільки одна спроба — блокуємо всі радіокнопки
  document.querySelectorAll('input[name="answer3"]').forEach(radio => {
    radio.disabled = true;
  });
  showScore3();
}

document.getElementById("next3").addEventListener("click", nextTask3);
showScore3();
nextTask3();


// ===== Завдання 4: Ротатор фотографій (квіти) =====
let imagesArray = [
  {
    path: 'images/001.jpg',
    title: 'Троянда',
    description: 'Червона троянда в саду'
  },
  {
    path: 'images/002.jpg',
    title: 'Тюльпан',
    description: 'Жовті тюльпани навесні'
  },
  {
    path: 'images/003.jpg',
    title: 'Соняшник',
    description: 'Соняшник у полі'
  }
];

function initPhotoRotator(id, images) {
  let box = document.getElementById(id);
  let current = 0;

  box.style.display = "flex";
  box.style.alignItems = "center";
  box.style.width = "560px";
  box.style.border = "1px solid #ccc";

  // посилання «Назад»
  let back = document.createElement("a");
  back.href = "#";
  back.textContent = "Назад";
  back.style.width = "60px";
  back.style.textAlign = "center";

  // центральна частина
  let center = document.createElement("div");
  center.style.width = "440px";
  center.style.textAlign = "center";

  let counter = document.createElement("div");
  counter.style.padding = "5px";

  let img = document.createElement("img");
  img.style.width = "420px";
  img.style.height = "300px";
  img.style.objectFit = "cover";

  let title = document.createElement("div");
  title.style.fontWeight = "bold";
  title.style.marginTop = "5px";

  let description = document.createElement("div");
  description.style.marginBottom = "5px";

  center.append(counter, img, title, description);

  // посилання «Вперед»
  let forward = document.createElement("a");
  forward.href = "#";
  forward.textContent = "Вперед";
  forward.style.width = "60px";
  forward.style.textAlign = "center";

  function showImage() {
    counter.textContent = `Фотографія ${current + 1} з ${images.length}`;
    img.src = images[current].path;
    img.alt = images[current].title;
    title.textContent = images[current].title;
    description.textContent = images[current].description;

    // visibility, щоб сторінка не "стрибала"
    back.style.visibility = current === 0 ? "hidden" : "visible";
    forward.style.visibility = current === images.length - 1 ? "hidden" : "visible";
  }

  back.addEventListener("click", function (event) {
    event.preventDefault();
    current--;
    showImage();
  });

  forward.addEventListener("click", function (event) {
    event.preventDefault();
    current++;
    showImage();
  });

  box.append(back, center, forward);
  showImage();
}

initPhotoRotator('rotator', imagesArray);


// ===== Завдання 5: Captcha =====
// малюнки цифр 3x5 пікселів (1 — зафарбований піксель)
let digitPatterns = {
  0: ["111", "101", "101", "101", "111"],
  1: ["010", "110", "010", "010", "111"],
  2: ["111", "001", "111", "100", "111"],
  3: ["111", "001", "111", "001", "111"],
  4: ["101", "101", "111", "001", "001"],
  5: ["111", "100", "111", "001", "111"],
  6: ["111", "100", "111", "101", "111"],
  7: ["111", "001", "001", "001", "001"],
  8: ["111", "101", "111", "101", "111"],
  9: ["111", "101", "111", "001", "111"]
};

function initCaptcha(id, length) {
  let box = document.getElementById(id);

  // генеруємо випадкове число з потрібною кількістю цифр
  let number = "";
  for (let i = 0; i < length; i++) {
    number += randomNumber(0, 9);
  }

  let title = document.createElement("div");
  title.textContent = "Введіть число";
  title.style.marginBottom = "10px";

  // блок з "пікселів"
  let pixels = document.createElement("div");
  pixels.style.display = "flex";
  pixels.style.width = "fit-content";
  pixels.style.border = "1px solid #999";
  pixels.style.padding = "5px";

  for (let digit of number) {
    let digitBox = document.createElement("div");
    digitBox.style.display = "grid";
    digitBox.style.gridTemplateColumns = "repeat(3, 8px)";
    digitBox.style.marginRight = "8px";

    for (let row of digitPatterns[digit]) {
      for (let cell of row) {
        let pixel = document.createElement("span");
        pixel.style.width = "8px";
        pixel.style.height = "8px";
        pixel.style.background = cell === "1" ? "red" : "white";
        digitBox.append(pixel);
      }
    }
    pixels.append(digitBox);
  }

  let input = document.createElement("input");
  input.type = "text";
  input.maxLength = length;
  input.style.marginTop = "5px";

  let message = document.createElement("div");
  message.style.marginTop = "5px";

  // перевірка, коли введено потрібну кількість цифр
  input.addEventListener("input", function () {
    if (input.value.length < length) {
      message.textContent = "";
      return;
    }
    if (input.value === number) {
      message.textContent = "Правильно";
      message.style.color = "green";
    } else {
      message.textContent = "Помилка";
      message.style.color = "red";
    }
  });

  box.append(title, pixels, input, message);
}

initCaptcha('captcha', 4);
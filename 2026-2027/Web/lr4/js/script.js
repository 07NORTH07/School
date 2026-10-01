// ===== Завдання 1: Робота з об'єктами =====
let magazine = {
  title: "National Geographic",
  topic: "Наука і природа",
  periodicity: "Щомісяця",
  price: 850,
  isActive: true,
  magazineInfo() {
    console.log(`Назва: ${this.title}, Тематика: ${this.topic}, Періодичність: ${this.periodicity}, Ціна підписки: ${this.price} грн, Підписка активна: ${this.isActive ? "Так" : "Ні"}`);
  },
  // додаткове завдання: метод markAsRead (для варіанту — активація підписки)
  markAsRead() {
    this.isActive = true;
  }
};

console.log("--- Task 1 ---");
magazine.magazineInfo();

magazine.isActive = !magazine.isActive;
magazine.magazineInfo();

magazine.markAsRead();
magazine.magazineInfo();


// ===== Завдання 2: Робота з масивами та об'єктами =====
// функція для створення журналу (щоб кожен об'єкт мав методи)
function createMagazine(title, topic, periodicity, price, isActive) {
  return {
    title,
    topic,
    periodicity,
    price,
    isActive,
    magazineInfo() {
      console.log(`Назва: ${this.title}, Тематика: ${this.topic}, Періодичність: ${this.periodicity}, Ціна підписки: ${this.price} грн, Підписка активна: ${this.isActive ? "Так" : "Ні"}`);
    },
    markAsRead() {
      this.isActive = true;
    }
  };
}

let library = [
  createMagazine("National Geographic", "Наука і природа", "Щомісяця", 850, true),
  createMagazine("Forbes", "Бізнес", "Щомісяця", 1200, false),
  createMagazine("Wired", "Технології", "Щомісяця", 950, true)
];

function displayLibrary() {
  library.forEach(magazine => {
    magazine.magazineInfo();
  });
}

console.log("--- Task 2 ---");
displayLibrary();

library.push(createMagazine("Time", "Новини", "Щотижня", 600, false));
console.log("Після додавання нового журналу:");
displayLibrary();


// ===== Завдання 3: Робота з методами масивів =====
console.log("--- Task 3 ---");

// сортування за ціною підписки (зростання)
library.sort((a, b) => a.price - b.price);
console.log("Відсортовані журнали за ціною:", library);

// журнали з неактивною підпискою
let inactiveMagazines = library.filter(magazine => !magazine.isActive);
console.log("Журнали з неактивною підпискою:", inactiveMagazines);

// пошук журналу за тематикою
let techMagazine = library.find(magazine => magazine.topic === "Технології");
console.log("Журнал про технології:", techMagazine);


// ===== Додаткове завдання: середня ціна підписки =====
function calculateAveragePrice() {
  let sum = 0;
  library.forEach(magazine => {
    sum += magazine.price;
  });
  return sum / library.length;
}

console.log("Середня ціна підписки:", calculateAveragePrice());


// ===== Завдання 4: Взаємодія з користувачем =====
function addMagazineToLibrary() {
  let title = prompt("Введіть назву журналу:");
  let topic = prompt("Введіть тематику журналу:");
  let periodicity = prompt("Введіть періодичність (наприклад, щомісяця):");
  let price = +prompt("Введіть ціну підписки:");
  let isActive = confirm("Чи активна підписка?");

  library.push(createMagazine(title, topic, periodicity, price, isActive));
  displayLibrary();
}

document.getElementById("addBtn").addEventListener("click", addMagazineToLibrary);
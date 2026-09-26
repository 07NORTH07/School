// ===================== Завдання 1: filter(), find() =====================

const products = [
  { name: "Ноутбук", category: "Електроніка", price: 25000, inStock: 3 },
  { name: "Мишка", category: "Електроніка", price: 500, inStock: 0 },
  { name: "Стіл", category: "Меблі", price: 3000, inStock: 5 },
  { name: "Стілець", category: "Меблі", price: 1200, inStock: 0 },
];

function getAvailableProducts(products) {
  return products.filter((p) => p.inStock > 0);
}

function findProductByName(products, name) {
  const found = products.find((p) => p.name === name);
  return found ? found : "Товар не знайдено";
}

console.log("--- Завдання 1 ---");
console.log("Товари в наявності:", getAvailableProducts(products));
console.log("Пошук 'Стіл':", findProductByName(products, "Стіл"));
console.log("Пошук 'Диван':", findProductByName(products, "Диван"));


// ===================== Завдання 2: reduce(), push(), sort() =====================

const students = [
  { name: "Іван", age: 20, grade: 85, group: "IT-21" },
  { name: "Марія", age: 21, grade: 92, group: "IT-22" },
  { name: "Олег", age: 20, grade: 78, group: "IT-21" },
  { name: "Ганна", age: 22, grade: 95, group: "IT-22" },
];

function groupBy(students) {
  return students.reduce((acc, student) => {
    if (!acc[student.group]) {
      acc[student.group] = [];
    }
    acc[student.group].push(student);
    return acc;
  }, {});
}

function sortStudentsByGrade(students) {
  // копіюємо масив ([...students]), щоб не мутувати оригінал
  return [...students].sort((a, b) => b.grade - a.grade);
}

console.log("--- Завдання 2 ---");
console.log("Групування за group:", groupBy(students));
console.log("Сортування за оцінкою (спадання):", sortStudentsByGrade(students));


// ===================== Завдання 3: reduce() =====================

const employees = [
  { name: "Петро", position: "Розробник", salary: 30000, years: 3 },
  { name: "Світлана", position: "Дизайнер", salary: 25000, years: 5 },
  { name: "Андрій", position: "Менеджер", salary: 35000, years: 7 },
];

function getAverageSalary(employees) {
  const total = employees.reduce((sum, emp) => sum + emp.salary, 0);
  return total / employees.length;
}

function findMostExperiencedEmployee(employees) {
  return employees.reduce((mostExp, emp) =>
    emp.years > mostExp.years ? emp : mostExp
  );
}

console.log("--- Завдання 3 ---");
console.log("Середня зарплата:", getAverageSalary(employees));
console.log("Найдосвідченіший працівник:", findMostExperiencedEmployee(employees));


// ===================== Завдання 4: reduce(), sort() =====================

const books = [
  { title: "Кобзар", author: "Шевченко", year: 1840, rating: 5, isRead: true },
  { title: "Тіні забутих предків", author: "Коцюбинський", year: 1911, rating: 4.5, isRead: false },
  { title: "Захар Беркут", author: "Франко", year: 1883, rating: 4.2, isRead: false },
  { title: "Мойсей", author: "Франко", year: 1905, rating: 3.9, isRead: true },
];

function getUnreadBooks(books) {
  return books.filter((b) => !b.isRead).map((b) => b.title);
}

function getBooksByAuthor(books, author) {
  return books
    .filter((b) => b.author === author)
    .sort((a, b) => a.year - b.year);
}

function getTopRatedBooks(books) {
  return books
    .filter((b) => b.rating > 4)
    .sort((a, b) => b.rating - a.rating);
}

console.log("--- Завдання 4 ---");
console.log("Непрочитані книги:", getUnreadBooks(books));
console.log("Книги Франка (за роком):", getBooksByAuthor(books, "Франко"));
console.log("Топ книги (рейтинг > 4):", getTopRatedBooks(books));


// ===================== Завдання 5: reduce(), filter() =====================

const orders = [
  {
    orderId: 1,
    customer: { name: "Іван", email: "ivan@mail.com" },
    items: ["Ноутбук", "Мишка"],
    total: 25500,
  },
  {
    orderId: 2,
    customer: { name: "Марія", email: "maria@mail.com" },
    items: ["Стіл"],
    total: 3000,
  },
  {
    orderId: 3,
    customer: { name: "Іван", email: "ivan@mail.com" },
    items: ["Стілець"],
    total: 1200,
  },
];

function getTotalSpentByCustomer(orders, customerName) {
  return orders
    .filter((order) => order.customer.name === customerName)
    .reduce((sum, order) => sum + order.total, 0);
}

console.log("--- Завдання 5 ---");
console.log("Всього витратив Іван:", getTotalSpentByCustomer(orders, "Іван"));


// ===================== Завдання 6: reduce(), find() =====================

const productsList = [
  { productId: 1, name: "Ноутбук", price: 25000 },
  { productId: 2, name: "Мишка", price: 500 },
  { productId: 3, name: "Стіл", price: 3000 },
];

const purchases = [
  { purchaseId: 1, productId: 1, quantity: 2 },
  { purchaseId: 2, productId: 2, quantity: 5 },
  { purchaseId: 3, productId: 1, quantity: 1 },
  { purchaseId: 4, productId: 3, quantity: 3 },
];

function getTotalSales(productsList, purchases) {
  return purchases.reduce((sales, purchase) => {
    const product = productsList.find((p) => p.productId === purchase.productId);
    if (!product) return sales;

    const revenue = product.price * purchase.quantity;
    sales[product.name] = (sales[product.name] || 0) + revenue;
    return sales;
  }, {});
}

console.log("--- Завдання 6 ---");
console.log("Загальний дохід по товарах:", getTotalSales(productsList, purchases));
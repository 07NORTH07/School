// Завдання 1: список літер імені
// Кожна літера імені додається у список <ul>, і при наведенні на неї
// показується alert з цією літерою.

const myName = 'Андрій';
const nameList = document.getElementById('nameList');

for (const letter of myName) {
  const li = document.createElement('li');
  li.textContent = letter;

  li.addEventListener('mouseover', () => {
    alert(letter);
  });

  nameList.appendChild(li);
}


// Завдання 2: введення прізвищ та імен через prompt
// Цикл продовжується, поки користувач не натисне "Відміна" (тоді prompt поверне null).
// Кожне введене ім'я одразу виводиться у вікно браузера.

const startBtn = document.getElementById('startBtn');
const output2 = document.getElementById('output2');

startBtn.addEventListener('click', () => {
  output2.innerHTML = '';

  while (true) {
    const fullName = prompt("Введіть прізвище та ім'я студента (Відміна - щоб завершити)");

    // якщо натиснули "Відміна", prompt повертає null
    if (fullName === null) {
      break;
    }

    const p = document.createElement('p');
    p.textContent = fullName;
    output2.appendChild(p);
  }

  alert('Введення завершено');
});


// Завдання 3: блоки з літерами прізвища
// Перше натискання кнопки - створює блоки для кожної літери прізвища.
// При наведенні на блок показується alert з цією літерою.
// Друге натискання - очищує контейнер.

const showBtn = document.getElementById('showBtn');
const lettersBox = document.getElementById('letters');
const mySurname = 'Ребіженко';

let blocksVisible = false;

showBtn.addEventListener('click', () => {
  if (!blocksVisible) {
    for (const letter of mySurname) {
      const div = document.createElement('div');
      div.classList.add('letter-block');
      div.textContent = letter;

      div.addEventListener('mouseover', () => {
        alert(`Це літера ${letter}`);
      });

      lettersBox.appendChild(div);
    }
    blocksVisible = true;
  } else {
    lettersBox.innerHTML = '';
    blocksVisible = false;
  }
});

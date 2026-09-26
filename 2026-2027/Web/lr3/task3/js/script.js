// Генератор веде "діалог" по кроках. Кожен yield — це питання боту.
// Відповідь користувача повертається назад через next(answer) і стає значенням yield.
function* chatBot() {
  const name = yield "Hi! What is your name?";
  yield `Nice to meet you, ${name}! How are you?`;
  return "Goodbye!";
}

const btn = document.getElementById("start");
const out = document.getElementById("out");

btn.addEventListener("click", () => {
  const bot = chatBot();

  // перший next() — запускає генератор до першого yield, повертає перше питання
  let step = bot.next();
  let log = "";

  while (!step.done) {
    log += "Bot: " + step.value + "\n";
    out.textContent = log;

    const answer = prompt(step.value);
    step = bot.next(answer); // передаємо відповідь назад у генератор
  }

  // step.done === true, step.value — це те, що повернув return у генераторі
  log += "Bot: " + step.value;
  out.textContent = log;
});
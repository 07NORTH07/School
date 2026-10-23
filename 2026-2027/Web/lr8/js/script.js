'use strict';

/* ==========================================================
   ToDo List
   - додавання (Enter), видалення (хрестик)
   - виконання (checkbox), редагування (подвійний клік)
   - фільтр і сортування
   - збереження стану в localStorage
   ========================================================== */

const STORAGE_KEY = 'todo-list-v1';

/* ---------- DOM ---------- */
const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');
const emptyMessage = document.getElementById('empty-message');
const counter = document.getElementById('counter');
const filterButtons = document.querySelectorAll('.filters__btn');
const sortSelect = document.getElementById('sort-select');

/* ---------- Стан ---------- */
const state = {
  tasks: [],        // { id, text, createdAt, done }
  filter: 'all',    // all | active | done
  sort: 'newest',   // newest | oldest | active-first | done-first
  editingId: null,
};

/* ---------- Збереження ---------- */
function saveState() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        tasks: state.tasks,
        filter: state.filter,
        sort: state.sort,
      })
    );
  } catch (error) {
    console.error('Не вдалося зберегти дані:', error);
  }
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const data = JSON.parse(raw);
    if (Array.isArray(data.tasks)) state.tasks = data.tasks;
    if (['all', 'active', 'done'].includes(data.filter)) state.filter = data.filter;
    if (['newest', 'oldest', 'active-first', 'done-first'].includes(data.sort)) {
      state.sort = data.sort;
    }
  } catch (error) {
    console.error('Не вдалося прочитати дані:', error);
  }
}

/* ---------- Допоміжні функції ---------- */
function formatDate(timestamp) {
  // приклад результату: 12.12.22, 16:09
  return new Date(timestamp).toLocaleString('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function getVisibleTasks() {
  const filtered = state.tasks.filter((task) => {
    if (state.filter === 'active') return !task.done;
    if (state.filter === 'done') return task.done;
    return true;
  });

  const byNewest = (a, b) => b.createdAt - a.createdAt;
  const byOldest = (a, b) => a.createdAt - b.createdAt;

  switch (state.sort) {
    case 'oldest':
      return filtered.sort(byOldest);
    case 'active-first':
      return filtered.sort((a, b) => a.done - b.done || byNewest(a, b));
    case 'done-first':
      return filtered.sort((a, b) => b.done - a.done || byNewest(a, b));
    default:
      return filtered.sort(byNewest);
  }
}

/* ---------- Рендер ---------- */
function createTaskElement(task) {
  const item = document.createElement('li');
  item.className = 'task' + (task.done ? ' task--done' : '');
  item.dataset.id = task.id;

  // checkbox (для виконаних зникає, лишається порожнє місце)
  if (task.done) {
    const slot = document.createElement('span');
    slot.className = 'task__check-slot';
    item.append(slot);
  } else {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task__check';
    checkbox.setAttribute('aria-label', 'Позначити виконаним');
    item.append(checkbox);
  }

  // текст + дата або поле редагування
  const body = document.createElement('div');
  body.className = 'task__body';

  if (state.editingId === task.id) {
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'task__edit';
    editInput.value = task.text;
    editInput.maxLength = 200;
    editInput.setAttribute('aria-label', 'Редагувати завдання');
    body.append(editInput);
  } else {
    const text = document.createElement('span');
    text.className = 'task__text';
    text.textContent = task.text;

    const date = document.createElement('time');
    date.className = 'task__date';
    date.dateTime = new Date(task.createdAt).toISOString();
    date.textContent = formatDate(task.createdAt);

    body.append(text, date);
  }
  item.append(body);

  // повернути у невиконані
  if (task.done) {
    const restore = document.createElement('button');
    restore.type = 'button';
    restore.className = 'task__restore';
    restore.textContent = 'Повернути';
    item.append(restore);
  }

  // хрестик видалення
  const del = document.createElement('button');
  del.type = 'button';
  del.className = 'task__delete';
  del.setAttribute('aria-label', 'Видалити завдання');
  del.textContent = '✕';
  item.append(del);

  return item;
}

function render() {
  const visible = getVisibleTasks();

  list.replaceChildren(...visible.map(createTaskElement));
  emptyMessage.hidden = visible.length > 0;

  filterButtons.forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.filter === state.filter));
  });
  sortSelect.value = state.sort;

  const left = state.tasks.filter((task) => !task.done).length;
  counter.textContent = `Залишилось виконати: ${left} із ${state.tasks.length}`;

  const editField = list.querySelector('.task__edit');
  if (editField) {
    editField.focus();
    editField.setSelectionRange(editField.value.length, editField.value.length);
  }
}

function update() {
  saveState();
  render();
}

/* ---------- Дії над завданнями ---------- */
function addTask(text) {
  const now = Date.now();
  state.tasks.push({ id: String(now) + Math.random().toString(16).slice(2, 6), text, createdAt: now, done: false });
  update();
}

function setDone(id, done) {
  const task = state.tasks.find((t) => t.id === id);
  if (!task) return;
  task.done = done;
  update();
}

function deleteTask(id) {
  state.tasks = state.tasks.filter((t) => t.id !== id);
  if (state.editingId === id) state.editingId = null;
  update();
}

function startEditing(id) {
  const task = state.tasks.find((t) => t.id === id);
  if (!task || task.done) return;
  state.editingId = id;
  render();
}

function finishEditing(id, newText) {
  if (state.editingId !== id) return; // захист від повторного виклику (Enter + blur)
  state.editingId = null;

  const text = newText.trim();
  const task = state.tasks.find((t) => t.id === id);
  if (task && text) task.text = text;
  update();
}

function cancelEditing() {
  state.editingId = null;
  render();
}

/* ---------- Обробники подій ---------- */
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Enter у полі = submit форми
  const text = input.value.trim();
  if (!text) return;
  addTask(text);
  input.value = '';
  input.focus();
});

list.addEventListener('click', (event) => {
  const item = event.target.closest('.task');
  if (!item) return;
  const id = item.dataset.id;

  if (event.target.closest('.task__delete')) deleteTask(id);
  else if (event.target.closest('.task__restore')) setDone(id, false);
});

list.addEventListener('change', (event) => {
  if (!event.target.matches('.task__check')) return;
  setDone(event.target.closest('.task').dataset.id, event.target.checked);
});

list.addEventListener('dblclick', (event) => {
  const body = event.target.closest('.task__body');
  if (!body || event.target.closest('.task__edit')) return;
  startEditing(body.closest('.task').dataset.id);
});

list.addEventListener('keydown', (event) => {
  if (!event.target.matches('.task__edit')) return;
  const id = event.target.closest('.task').dataset.id;

  if (event.key === 'Enter') finishEditing(id, event.target.value);
  else if (event.key === 'Escape') cancelEditing();
});

list.addEventListener('focusout', (event) => {
  if (!event.target.matches('.task__edit')) return;
  finishEditing(event.target.closest('.task').dataset.id, event.target.value);
});

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    state.filter = btn.dataset.filter;
    update();
  });
});

sortSelect.addEventListener('change', () => {
  state.sort = sortSelect.value;
  update();
});

/* ---------- Старт ---------- */
loadState();
render();

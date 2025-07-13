const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const formMessage = document.getElementById("formMessage");
const darkModeToggle = document.getElementById("darkModeToggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(addTaskToDOM);

// Appliquer dark-mode si activé
if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  darkModeToggle.textContent = "☀️";
}

darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const dark = document.body.classList.contains("dark-mode");
  darkModeToggle.textContent = dark ? "☀️" : "🌙";
  localStorage.setItem("darkMode", dark ? "enabled" : "disabled");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    const now = new Date().toLocaleString();
    const task = { text, done: false, createdAt: now };
    tasks.push(task);
    addTaskToDOM(task);
    saveTasks();
    input.value = "";
    showMessage("✅ Tâche ajoutée !");
  }
});

function addTaskToDOM(task) {
  const li = document.createElement("li");
  if (task.done) li.classList.add("completed");

  const span = document.createElement("span");
  span.textContent = task.text;
  li.appendChild(span);

  const small = document.createElement("small");
  small.textContent = `Ajouté le : ${task.createdAt}`;
  li.appendChild(small);

  li.addEventListener("click", () => {
    task.done = !task.done;
    li.classList.toggle("completed");
    saveTasks();
  });

  const del = document.createElement("button");
  del.innerHTML = '<i class="fas fa-trash-alt"></i>';
  del.setAttribute("aria-label", "Supprimer cette tâche");
  del.addEventListener("click", (e) => {
    e.stopPropagation();
    list.removeChild(li);
    tasks = tasks.filter((t) => t !== task);
    saveTasks();
  });

  li.appendChild(del);
  list.appendChild(li);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function filterTasks(filter) {
  list.innerHTML = "";
  const filtered = tasks.filter(task => {
    if (filter === "done") return task.done;
    if (filter === "todo") return !task.done;
    return true;
  });
  filtered.forEach(addTaskToDOM);
}

function clearAllTasks() {
  if (confirm("Voulez-vous vraiment tout supprimer ?")) {
    tasks = [];
    list.innerHTML = "";
    saveTasks();
    showMessage("🗑️ Toutes les tâches ont été supprimées.");
  }
}

function showMessage(msg) {
  formMessage.textContent = msg;
  setTimeout(() => {
    formMessage.textContent = "";
  }, 2000);
}

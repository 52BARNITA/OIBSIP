const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const pendingTasksEl = document.getElementById("pendingTasks");
const completedTasksEl = document.getElementById("completedTasks");

let pendingList = [];
let completedList = [];

/* ---------- SAVE & LOAD ---------- */

function saveTasks() {
  localStorage.setItem("pendingList", JSON.stringify(pendingList));
  localStorage.setItem("completedList", JSON.stringify(completedList));
}

function loadTasks() {
  pendingList = JSON.parse(localStorage.getItem("pendingList")) || [];
  completedList = JSON.parse(localStorage.getItem("completedList")) || [];

  pendingList.forEach(task => renderTask(task, "pending"));
  completedList.forEach(task => renderTask(task, "completed"));
}

/* ---------- ADD TASK ---------- */

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  pendingList.push(taskText);
  saveTasks();
  renderTask(taskText, "pending");

  taskInput.value = "";
}

/* ---------- RENDER TASK ---------- */

function renderTask(taskText, status) {
  const li = document.createElement("li");
  li.textContent = taskText;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑";
  deleteBtn.classList.add("delete-btn")

  deleteBtn.addEventListener("click", () => {
    if (status === "pending") {
      pendingList = pendingList.filter(t => t !== taskText);
    } else {
      completedList = completedList.filter(t => t !== taskText);
    }
    saveTasks();
    li.remove();
  });

  li.appendChild(deleteBtn);

  if (status === "pending") {
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "✔";
    completeBtn.classList.add("complete-btn")

    completeBtn.addEventListener("click", () => {
      pendingList = pendingList.filter(t => t !== taskText);
      completedList.push(taskText);
      saveTasks();
      li.remove();
      renderTask(taskText, "completed");
    });

    li.appendChild(completeBtn);
    pendingTasksEl.appendChild(li);
  } else {
    completedTasksEl.appendChild(li);
  }
}

/* ---------- EVENTS ---------- */

addTaskBtn.addEventListener("click", addTask);
document.addEventListener("DOMContentLoaded", loadTasks);
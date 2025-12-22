const input = document.getElementById("todoInput");
const button = document.getElementById("addBtn");
const errorMsg = document.getElementById("errorMsg");
const todoList = document.getElementById("todoList");

const deleteModal = document.getElementById("deleteModal");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");

let taskToDelete = null;

button.addEventListener("click", () => {
  const value = input.value.trim();

  if (value === "") {
    errorMsg.textContent = "task can not be empty";
    return;
  }
  if (!isNaN(value[0])) {
    errorMsg.textContent = "Task can not start with number";
    return;
  }
  if (value.length < 5) {
    errorMsg.textContent = "Task can not be less than 5 characters";
    return;
  }

  errorMsg.textContent = "";

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = value;

  const actions = document.createElement("div");
  actions.classList.add("actions-container");

  
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");
  checkbox.addEventListener("change", () => {
    span.style.textDecoration = checkbox.checked ? "line-through" : "none";
  });

  
  const editBtn = document.createElement("button");
  editBtn.innerHTML = '<i class="fas fa-edit"></i>';
  editBtn.classList.add("icon-btn");
  editBtn.addEventListener("click", () => {
    const newValue = prompt("Edit your task:", span.textContent);
    if (newValue && newValue.trim().length >= 5) {
      span.textContent = newValue.trim();
      checkbox.checked = false;
      span.style.textDecoration = "none";
    }
  });

  
});

const input = document.getElementById("todoInput");
const button = document.getElementById("addBtn");
const errorMsg = document.getElementById("errorMsg");
const todoList = document.getElementById("todoList");

button.addEventListener("click", function () {
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
    errorMsg.textContent = "Task can not be less then 5 char";
    return;
  }

  errorMsg.textContent = "";

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = value;

  const actionsContainer = document.createElement("div");
  actionsContainer.classList.add("actions-container");

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
    if (newValue) {
      span.textContent = newValue;
      checkbox.checked = false;
      span.style.textDecoration = "none";
    }
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.classList.add("icon-btn");
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

  actionsContainer.appendChild(checkbox);
  actionsContainer.appendChild(editBtn);
  actionsContainer.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actionsContainer);

  todoList.appendChild(li);
  input.value = ""; 
});
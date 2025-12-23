const input = document.getElementById("todoInput");
const button = document.getElementById("addBtn");
const errorMsg = document.getElementById("errorMsg");
const todoList = document.getElementById("todoList");

const deleteModal = document.getElementById("deleteModal");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");

const doneBtn = document.getElementById("doneBtn");
const todoBtn = document.getElementById("todoBtn");
const allBtn = document.getElementById("allBtn");

const editModal = document.getElementById("editModal");
const editInput = document.getElementById("editInput");
const confirmEdit = document.getElementById("confirmEdit");
const cancelEdit = document.getElementById("cancelEdit");

let taskToDelete = null;
let savedStates = [];

let taskToEdit = null;
let spanToEdit = null;
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
editBtn.addEventListener("click",() => {
  taskToEdit = li;
  spanToEdit = span;
  editInput.value = span.textContent;
  editModal.style.display="flex";
});
  const deleteBtn = document.createElement("button");
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  deleteBtn.classList.add("icon-btn");
  deleteBtn.addEventListener("click", () => {
    taskToDelete = li;
    deleteModal.style.display = "flex";
  });

  actions.appendChild(checkbox);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  li.appendChild(span);
  li.appendChild(actions);
  todoList.appendChild(li);

  input.value = "";
});

confirmDelete.addEventListener("click", () => {
  if (taskToDelete) {
    taskToDelete.remove();
    taskToDelete = null;
  }
  deleteModal.style.display = "none";
});

cancelDelete.addEventListener("click", () => {
  deleteModal.style.display = "none";
  taskToDelete = null;
});

function saveCurrentStates() {
  savedStates = [];
  document.querySelectorAll("#todoList li").forEach(task => {
    const checkbox = task.querySelector(".task-checkbox");
    savedStates.push({
      task: task,
      checked: checkbox.checked
    });
  });
}

doneBtn.addEventListener("click", () => {
  saveCurrentStates();
  document.querySelectorAll("#todoList li").forEach(task => {
    const checkbox = task.querySelector(".task-checkbox");
    const text = task.querySelector("span");
    checkbox.checked = true;
    text.style.textDecoration = "line-through";
  });
});

todoBtn.addEventListener("click", () => {
  saveCurrentStates();
  document.querySelectorAll("#todoList li").forEach(task => {
    const checkbox = task.querySelector(".task-checkbox");
    const text = task.querySelector("span");
    checkbox.checked = false;
    text.style.textDecoration = "none";
  });
});

allBtn.addEventListener("click", () => {
  savedStates.forEach(item => {
    const checkbox = item.task.querySelector(".task-checkbox");
    const text = item.task.querySelector("span");
    checkbox.checked = item.checked;
    text.style.textDecoration = item.checked ? "line-through" : "none";
  });
});

confirmEdit.addEventListener("click" , () => {
const newValue = editInput.value.trim();
if(newValue.length >=5) {
  spanToEdit.textContent=newValue;
  editModal.style.display = "none";
}
});

cancelEdit.addEventListener("click", () =>{
editModal.style.display="none";
});

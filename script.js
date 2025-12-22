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

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "✔";
  doneBtn.addEventListener("click", () => {
    span.style.textDecoration = span.style.textDecoration === "line-through" ? "none" : "line-through";
  });


  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => {
    const newValue = prompt("Edit your task:", span.textContent);
    if (newValue) {
      span.textContent = newValue;
    }
  });


  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });

 
  li.appendChild(span);
  li.appendChild(doneBtn);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  todoList.appendChild(li);
  input.value = ""; 
});

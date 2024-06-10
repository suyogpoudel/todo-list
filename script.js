const form = document.querySelector(".main-form");
const input = document.querySelector(".input-box");

const todos = document.querySelector(".todos");
// const todo = document.querySelectorAll(".todo");
let todoArr = [];

const renderTasks = function (task) {
  let html = `
  <li class="todo">
    ${task}
    <div class="icons">
      <ion-icon
        class="icon icon--done"
        name="checkmark-circle"
      ></ion-icon>
      <ion-icon
        class="icon icon--remove"
        name="close-circle"
      ></ion-icon>
    </div>
  </li>
  `;

  todos.insertAdjacentHTML("beforeend", html);
};

const setLocalStorage = function (task) {
  localStorage.setItem("todos", JSON.stringify(task));
};

const getLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem("todos"));

  // console.log(data);

  if (!data) return;

  todoArr = data;

  todoArr.forEach((task) => {
    renderTasks(task);
  });
};

const reset = () => localStorage.removeItem("todos");

// const getLocalStorage = function () {
//   const data = JSON.parse(localStorage.getItem("todos"));
//   if (!data) return;

//   todoArr = data;

//   todoArr.forEach((todo) => renderTasks(todo));
// };

getLocalStorage();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const task = input.value;
  if (!task) return;

  console.log(task);

  todoArr.push(task);

  renderTasks(task);

  input.value = "";

  setLocalStorage(todoArr);
});

todos.addEventListener("click", function (e) {
  const todo = e.target.closest(".todo");

  // console.log(todo);

  if (
    !e.target.classList.contains("icon--done") &&
    !e.target.classList.contains("icon--remove")
  )
    return;

  if (e.target.classList.contains("icon--done")) todo.classList.toggle("done");

  if (e.target.classList.contains("icon--remove")) todo.remove();
});

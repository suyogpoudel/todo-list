const form = document.querySelector(".main-form");
const input = document.querySelector(".input-box");

const todos = document.querySelector(".todos");
// const todo = document.querySelectorAll(".todo");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const task = input.value;
  if (!task) return;

  console.log(task);

  todos.insertAdjacentHTML(
    "beforeend",
    `
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
    `
  );

  input.value = "";
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

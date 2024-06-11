"use strict";

// Tasks
class Todo {
  isDone = false;
  #element;
  id = (Date.now() + "").slice(-10);
  constructor(task) {
    this.task = task; // Written in input field
  }

  _setDone(todoItem) {
    // if()
  }
}

const form = document.querySelector(".main-form");
const input = document.querySelector(".input-box");

const todos = document.querySelector(".todos");

class App {
  #todoArr = [];

  constructor() {
    form.addEventListener("submit", this._newTask.bind(this));

    todos.addEventListener("click", this._getListClicks.bind(this));

    this._getLocalStorage();
  }

  _newTask(e) {
    e.preventDefault();

    const task = input.value;
    let todo;
    // if valid input create todo object
    if (!task) return;

    todo = new Todo(task);
    // add new task to todo array
    this.#todoArr.push(todo);

    // render task
    this._renderTask(todo);

    // clear input
    input.value = "";

    // set local storage
    this._setLocalStorage();
  }

  _renderTask(todo) {
    let html = `
    <li class="todo ${todo.isDone ? "done" : ""}" data-id="${todo.id}">
      ${todo.task}
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

    todos.insertAdjacentHTML("afterbegin", html);
  }

  _getListClicks(e) {
    const clickedBtn = e.target;
    const taskEl = e.target.closest(".todo");

    if (!taskEl) return;

    // console.log(taskEl);

    const localStorageSub = JSON.parse(localStorage.getItem("todos"));
    const index = localStorageSub.findIndex(
      (data) => data.id === taskEl.dataset.id
    );

    if (clickedBtn.classList.contains("icon--done")) {
      taskEl.classList.toggle("done");
      this.#todoArr[index].isDone = !this.#todoArr[index].isDone;
      console.log(this.#todoArr[index].isDone);
      this._setLocalStorage();
    }

    if (clickedBtn.classList.contains("icon--remove")) {
      taskEl.remove();

      localStorageSub.splice(index, 1);
      this.#todoArr = localStorageSub;
      this._setLocalStorage();
      console.log(localStorageSub);
    }
  }

  _setClassesInTask(todo) {}

  _removeFromLocalStorage() {}

  _setLocalStorage() {
    localStorage.setItem("todos", JSON.stringify(this.#todoArr));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("todos"));

    if (!data) return;

    this.#todoArr = data;

    this.#todoArr.forEach((task) => {
      this._renderTask(task);
    });
  }
}

const app = new App();

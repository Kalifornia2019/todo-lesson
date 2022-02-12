import "../styles/index.css";
import "../index.html";

import { getTodoItem } from "./addTodoItem";
import { saveTodoToSStorage, getTodosFromSStorage } from "./sessionStorage";
import { filterTodoItems } from "./filterTodoItems";
import {
  clearTodoInput,
  getTodoInputItems,
  validateTodoInput,
  todoEnter,
} from "./todoInput";

const todoInputWrapper = document.querySelector(".todo-input-wrapper");
const { todoInput, todoButton } = getTodoInputItems(todoInputWrapper);
const todoList = document.querySelector(".todo-list");
const todoSelect = document.querySelector(".todo-select");
const todoHelper = todoInputWrapper.querySelector(".todo-helper");
document.addEventListener("DOMContentLoaded", onDOMLoaded);
todoInput.addEventListener("input", () => validateTodoInput(todoInputWrapper));
todoButton.addEventListener("click", addTodo);
todoSelect.addEventListener("change", filterTodos);

// 3. when todoInput is not in focus, helper text should not be displayed
todoInput.onblur = () => {
  todoHelper.innerHTML = "";
};
todoInput.onfocus = () => {
  todoHelper.innerHTML = "Minimum length is 3 characters";
};

// 2. forbid form submit with enter key, when input value is less than 3 characters
todoInput.addEventListener("keypress", (event) => todoEnter(event, todoInput));

function onDOMLoaded() {
  renderTodosFromSStorage();
  inActiveSelect();
  validateTodoInput(todoInputWrapper);
}

function renderTodosFromSStorage() {
  const todos = JSON.parse(sessionStorage.getItem("todos"));

  todos.forEach((todoValue) => {
    const todoItem = getTodoItem(todoValue);

    // Add todo item to list
    todoList.appendChild(todoItem);
  });
}

function addTodo(event) {
  event.preventDefault();

  //if addtodo select active
  const todoRenderItem = { name: todoInput.value, isCompleted: false };
  todoSelect.disabled = false;
  saveTodoToSStorage(todoRenderItem);

  const todoItem = getTodoItem(todoRenderItem);
  todoList.appendChild(todoItem);

  clearTodoInput(todoInputWrapper);
}

function filterTodos(e) {
  const todoItems = todoList.childNodes;

  console.log(e.target.value);
  filterTodoItems(todoItems, e.target.value);
}

// 1. select should be disabled when no option is displayed
function inActiveSelect() {
  let todos = getTodosFromSStorage();

  if (!todos.length) {
    todoSelect.disabled = true;
  }
}
todoValidationMessage();

function todoValidationMessage() {
  if (!todoInput.checkValidity()) {
    document.querySelector(".todo-helper").innerHTML =
      todoInput.validationMessage;
  }
}

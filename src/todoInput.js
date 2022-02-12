export function getTodoInputItems(todoInputWrapper) {
  const todoInput = todoInputWrapper.querySelector(".todo-input");
  const todoHelper = todoInputWrapper.querySelector(".todo-helper");
  const todoButton = todoInputWrapper.querySelector(".todo-button");

  return {
    todoInput,
    todoHelper,
    todoButton,
  };
}

export function validateTodoInput(todoInputWrapper) {
  const { todoInput, todoHelper, todoButton } =
    getTodoInputItems(todoInputWrapper);
  //todoInput.onblur = () => { todoHelper.innerHTML = ""; };

  if (todoInput.value.length >= 3) {
    todoButton.classList.remove("todo-button_disabled");
    todoHelper.classList.remove("todo-helper_visible");
  } else {
    //todoHelper.innerHTML = "Minimum length is 3 characters";
    todoButton.classList.add("todo-button_disabled");
    todoHelper.classList.add("todo-helper_visible");
  }
}

export function clearTodoInput(todoInputWrapper) {
  const { todoInput, todoHelper, todoButton } =
    getTodoInputItems(todoInputWrapper);

  todoInput.value = "";
  todoButton.classList.add("todo-button_disabled");
  todoHelper.classList.add("todo-helper_visible");
}

export function todoEnter(event, input) {
  if (event.key === "Enter" && input.value.length < 3) {
    event.preventDefault();
  }
}

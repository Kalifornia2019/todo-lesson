const TODOS = "todos";

export function removeTodoFromSStorage(todoItem) {
  let todos = getTodosFromSStorage();

  if (!todos.length) {
    document.querySelector(".todo-select").disabled = true;
  }

  const todoText = Array.from(todoItem.childNodes).find((node) =>
    node.classList.contains("todo-text")
  );

  if (todoText) {
    const filtredTodos = todos.filter(
      (item) => item.name !== todoText.innerText
    );

    sessionStorage.setItem(TODOS, JSON.stringify(filtredTodos));
  }
}

export function saveTodoToSStorage(todo) {
  let todos = getTodosFromSStorage();

  todos.push(todo);

  sessionStorage.setItem(TODOS, JSON.stringify(todos));
}

export function getTodosFromSStorage() {
  const storageTodos = sessionStorage.getItem(TODOS);

  return storageTodos ? JSON.parse(storageTodos) : [];
}

// 4. save to session storage todo state: completed, not completed
export function todoChangeSStorageComleted(todo) {
  let todos = getTodosFromSStorage();

  const todoText = Array.from(todo.childNodes).find((node) =>
    node.classList.contains("todo-text")
  );

  if (todoText) {
    const todosCompleted = todos.map((completeStatus) => {
      completeStatus.isCompleted =
        completeStatus.name == todoText.innerText
          ? !completeStatus.isCompleted
          : completeStatus.isCompleted;
      return completeStatus;
    });
    sessionStorage.setItem(TODOS, JSON.stringify(todosCompleted));
  }
}

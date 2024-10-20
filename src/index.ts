interface Todo {
  text: string;
  completed: boolean;
}

const btn = document.getElementById("btn")! as HTMLButtonElement;
const input = document.getElementById("todoinput")! as HTMLInputElement;
const form = document.querySelector("form")!;
const list = document.getElementById("todolist")!;
const errorMsg = document.getElementById("errorMsg")! as HTMLParagraphElement;

const todos: Todo[] = readTodos();
todos.forEach(createTodo);

function readTodos(): Todo[] {
  const todoJSON = localStorage.getItem("todos");
  if (todoJSON == null) return [];
  return JSON.parse(todoJSON);
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function handleSubmit(e: SubmitEvent) {
  if (input.value.length > 0) {
    errorMsg.innerHTML = "";
    e.preventDefault();
    const newTodo: Todo = {
      text: input.value,
      completed: false,
    };
    createTodo(newTodo);
    todos.push(newTodo);
    saveTodos();
    input.value = "";
  } else {
    e.preventDefault();
    errorMsg.innerHTML = "Please Enter Todo !";
  }
}

function createTodo(todo: Todo) {
  const newLi = document.createElement("li");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "checkBox";
  checkbox.checked = todo.completed;

  if (todo.completed) {
    newLi.classList.add("done");
  }

  checkbox.addEventListener("change", function () {
    todo.completed = checkbox.checked;
    saveTodos();

    if (checkbox.checked) {
      newLi.classList.add("done");

      setTimeout(() => {
        const index = todos.indexOf(todo);

        if (index > -1) {
          todos.splice(index, 1);
          saveTodos();
        }

        newLi.remove();
      }, 1000);
    } else {
      newLi.classList.remove("done");
    }
  });

  newLi.append(todo.text);
  newLi.append(checkbox);
  list.append(newLi);
}

form.addEventListener("submit", handleSubmit);

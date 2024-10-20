"use strict";
var btn = document.getElementById("btn");
var input = document.getElementById("todoinput");
var form = document.querySelector("form");
var list = document.getElementById("todolist");
var errorMsg = document.getElementById("errorMsg");
var todos = readTodos();
todos.forEach(createTodo);
function readTodos() {
    var todoJSON = localStorage.getItem("todos");
    if (todoJSON == null)
        return [];
    return JSON.parse(todoJSON);
}
function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
function handleSubmit(e) {
    if (input.value.length > 0) {
        errorMsg.innerHTML = "";
        e.preventDefault();
        var newTodo = {
            text: input.value,
            completed: false,
        };
        createTodo(newTodo);
        todos.push(newTodo);
        saveTodos();
        input.value = "";
    }
    else {
        e.preventDefault();
        errorMsg.innerHTML = "Please Enter Todo !";
    }
}
function createTodo(todo) {
    var newLi = document.createElement("li");
    var checkbox = document.createElement("input");
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
            setTimeout(function () {
                var index = todos.indexOf(todo);
                if (index > -1) {
                    todos.splice(index, 1);
                    saveTodos();
                }
                newLi.remove();
            }, 1000);
        }
        else {
            newLi.classList.remove("done");
        }
    });
    newLi.append(todo.text);
    newLi.append(checkbox);
    list.append(newLi);
}
form.addEventListener("submit", handleSubmit);

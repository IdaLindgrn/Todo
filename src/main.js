
  const todoForm = document.querySelector(".todo-form")
  const todoInput = document.querySelector(".todo-input")
  const todoItemsList = document.querySelector(".todo-items")
  
  
  let todos =[];

  //lyssnar efter submit
  todoForm.addEventListener("submit", 
  function(event){
    event.preventDefault();
    addTodo(todoInput.value);
  });

  //funktion som lägger till todo
  function addTodo(item){
    if (item !== ""){
        //todo objekt 
        const todo ={
            id: Date.now(),
            name: item,
            completed: false
        };

        //lägger till todos till listan
        todos.push(todo);
        addToLocalStorage(todos); //sparas

        todoInput.value =""; //bort med dig
    }
  }

  function renderTodos(todos){
    todoItemsList.innerHTML = "";
    todos.forEach(function(item){
        const checked = item.completed ? "checked" : null;
        const li = document.createElement("li");
        li.setAttribute("class", "item"); //<li class="item"></li>
        li.setAttribute("data-key", item.id);  

        if(item.completed === true) {
            li.class.add("checked");
        }

        li.innerHTML = `
        <input type="checkbox" class="checkbox" ${checked}>
        ${item.name}
        <button class="delete-button">X</button>
        `;

        todoItemsList.append(li); // lägger till <li> till <ul>
    });    
  }
  //funktion för local storage
  function addToLocalStorage(todos){
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos(todos);
  }
  function getFromLocalStorage(){
    const reference = localStorage.getItem("todos");
    if(reference){ //konverterar
        todos = JSON.parse(reference);
        renderTodos(todos);
    }
  }
  function toggle(id){
    todos.forEach(function(item){
        if(item.id == id){ //olika datatyper 
            item.completed = !item.completed;
        }
    });

    addToLocalStorage(todos);
}

function deleteTodo(id){
    todos = todos.filter(function(item){
        return item.id != id;
    });

    addToLocalStorage();
}

getFromLocalStorage();

todoItemsList.addEventListener("click", function(event){
    if(event.target.type === "checkbox"){
        toggle(event.target.parentElement.getAttribute("data-key"));
    }

    if(event.target.classList.container("delete-button")){
        deleteTodo(event.target.parentElement.getAttribute("data-key"));
    }
});
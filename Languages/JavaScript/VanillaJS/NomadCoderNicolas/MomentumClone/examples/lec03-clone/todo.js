const toDoForm = document.querySelector(".js-toDoForm"),
        toDoInput = toDoForm.querySelector("input"),
        toDoList = document.querySelector(".js-toDoList");

const TODOS_LS= "toDos";
let toDos = [];

function deleteToDO (event) {
    // console.log(event.target.parentNode.id);
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter( function (toDo) {
        return toDo.id !== parseInt(li.id);
    } ) ;
    // console.log(cleanToDos);
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos  () {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDO);
    const span = document.createElement("span");
    span.innerHTML = `${text}  `;
    const newId = toDos.length + 1;    
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
        text : text,
        id : newId,
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if  (loadedToDos !== null ) {
        const parsedToDos = JSON.parse(loadedToDos);
        // console.log(parsedToDos);
        parsedToDos.forEach(function (toDo) {
            // console.log(toDo.text);
            paintToDo(toDo.text);
        })
    } 
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit );
}

init();
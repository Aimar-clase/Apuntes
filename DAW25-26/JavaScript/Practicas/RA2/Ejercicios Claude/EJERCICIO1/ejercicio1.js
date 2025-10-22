const delBtn = document.getElementById("delBtn");
const addBtn = document.getElementById("addBtn");
let inputTarea = document.getElementById("tarea");
let listaTareas = document.getElementById("listaTareas");

addBtn.addEventListener("click", function(){

    if (inputTarea.value.trim().length === 0){
        alert("NO PUEDE ESTAR VACIO");
    }else {
        let newLi = document.createElement("li");
        newLi.style.display = "flex";
        newLi.style.justifyContent = "space-between";
        newLi.style.alignItems = "center";
        let removeTareaIndividual = document.createElement("button");
        removeTareaIndividual.textContent  = "❌";
        removeTareaIndividual.style.float = "right";
        let tareaTexto = document.createTextNode(inputTarea.value);
        newLi.appendChild(tareaTexto);
        listaTareas.appendChild(newLi);
        newLi.appendChild(removeTareaIndividual);
        inputTarea.value = "";

        removeTareaIndividual.addEventListener("click", function(){
            removeTareaIndividual.parentElement.remove();
        })

    }



})

delBtn.addEventListener("click", function(){
    listaTareas.innerHTML = ""
})


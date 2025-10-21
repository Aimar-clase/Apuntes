const delBtn = document.getElementById("delBtn");
const addBtn = document.getElementById("addBtn");
let inputTarea = document.getElementById("tarea");
let listaTareas = document.getElementById("listaTareas");

addBtn.addEventListener("click", function(){

    if (inputTarea.value.trim().length === 0){
        alert("NO PUEDE ESTAR VACIO");
    }else {
        let newLi = document.createElement("li");
        let removeTareaIndividual = document.createElement("button");
        let tareaTexto = document.createTextNode(inputTarea.value);
        newLi.appendChild(tareaTexto);
        listaTareas.appendChild(newLi);
        newLi.appendChild(removeTareaIndividual);
        
        inputTarea.value = "";
    }

})

delBtn.addEventListener("click", function(){
    listaTareas.innerHTML = ""
})


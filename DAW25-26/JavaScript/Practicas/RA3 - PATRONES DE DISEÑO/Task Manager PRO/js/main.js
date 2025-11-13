'use strict';

import { TaskManager } from "./patterns/task-manager.js";

const btnSubmit = document.getElementById("btnSubmitTarea");
const listaTareas = document.getElementById("lista-tareas");
const btnFiltrar = document.getElementById("btnFiltrar");


document.addEventListener("DOMContentLoaded", function () {
    TaskManager.renderDOM();
});


btnSubmit.addEventListener("click", TaskManager.addTask);

if (listaTareas) {
    listaTareas.addEventListener("click", function (event) {
        if (event.target.classList.contains("btnBorrar")) {
            const idTarea = event.target.dataset.id;
            TaskManager.removeTask(idTarea);
        }
    });

    listaTareas.addEventListener("click", function (event) {
        if (event.target.classList.contains("checkCompleted")) {
            const idTarea = event.target.dataset.id;
            const isChecked = event.target.checked;
            TaskManager.changeStatus(idTarea, isChecked);
            TaskManager.renderDOM();
        }
    });

}

btnFiltrar.addEventListener("click", TaskManager.searchTask);




'use strict';

import { TaskManager } from "./patterns/task-manager.js";

const btnSubmit = document.getElementById("btnSubmitTarea");
const listaTareas = document.getElementById("lista-tareas");
const filtro = document.getElementById("filtro");

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
}

filtro.addEventListener("input", function () {
    TaskManager.searchTask(filtro.value);
});


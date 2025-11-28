'use strict';

import { Tarea } from "../models/Tarea.js";
import { StorageManager } from "../utils/storage.js";
import { validationTask } from "../utils/valid.js";
import { DomFacade } from "./dom-facade.js";


export class TaskManager {
    constructor() {
        if (TaskManager.instancia) return TaskManager.instancia
        TaskManager.instancia = this;
    }


    addTask() {
        const tarea = new Tarea(DomFacade.getTaskFromForm());
        const validacion = validationTask.validDesc(tarea.descripcion);

        if (validacion === true) {
            StorageManager.addTaskToStorage(tarea);
        } else {
            alert("La descripcion no puede estar vacia")
        }
    }

    renderTaskList() {
        const tasks = StorageManager.getTaskFromStorage();
        DomFacade.renderTaskList(tasks);
    }
}
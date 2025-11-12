// singleton
'use strict';
import { addErrorToStorage, addTaskToStorage, getErrors, removeErrorFromStorage, removeTaskFromStorage, getTaskFromStorage } from "../localstorage/storage.js";
import { Task } from "../models/task.js";
import { getDOMValues, renderTaskList, renderErrors } from "../ui/dom-facade.js";
import { isValid } from "../validation/task-validation.js";
import { Filtro } from "./filtro.js";

export class TaskManager {

    constructor() {
        if (TaskManager.instancia) return TaskManager.instancia;
        TaskManager.instancia = this;
    }


    static addTask() {
        const tarea = new Task(getDOMValues());
        const validacion = isValid(tarea);

        if (validacion === true) {
            addTaskToStorage(tarea);
            removeErrorFromStorage();
        } else {
            addErrorToStorage(validacion);
        }
    }

    static removeTask(id) {
        removeTaskFromStorage(id);
        this.renderDOM();
    }

    static renderDOM() {
        renderTaskList(getTaskFromStorage());
        renderErrors(getErrors());
    }

    static searchTask(input) {
        const tareasFiltradas = Filtro.filtrarTarea(input, getTaskFromStorage());
        renderTaskList(tareasFiltradas);
    }


}
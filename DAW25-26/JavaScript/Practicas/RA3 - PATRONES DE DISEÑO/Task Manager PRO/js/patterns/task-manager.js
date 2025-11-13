// singleton y a la vez es un factory pattern
'use strict';
import { StorageManager } from "../localstorage/storage.js";
import { Task } from "../models/task.js";
import { DOMFacade } from "../ui/dom-facade.js";
import { isValid } from "../validation/task-validation.js";
import { Filtro, FiltrarPorEstado, FiltrarPorEstadoYPrioridad, FiltrarPorPrioridad } from "./filtro.js";

export class TaskManager {

    constructor() {
        if (TaskManager.instancia) return TaskManager.instancia;
        TaskManager.instancia = this;
    }


    static addTask() {
        const tarea = new Task(DOMFacade.getDOMValues());
        const validacion = isValid(tarea);

        if (validacion === true) {
            StorageManager.addTaskToStorage(tarea);
            StorageManager.removeErrorFromStorage();
        } else {
            StorageManager.addErrorToStorage(validacion);
        }
    }

    static removeTask(id) {
        StorageManager.removeTaskFromStorage(id);
        this.renderDOM();
    }

    static renderDOM() {
        DOMFacade.renderTaskList(StorageManager.getTaskFromStorage());
        DOMFacade.renderErrors(StorageManager.getErrors());
    }

    static searchTask() {
        const { estado, prioridad } = DOMFacade.getValuesFiltro();
        const filtro = new Filtro();
        let tareasFiltradas;

        if (estado && prioridad) {
            filtro.setStrategy(new FiltrarPorEstadoYPrioridad());
            tareasFiltradas = filtro.filtrarTarea(estado, prioridad, StorageManager.getTaskFromStorage());
            DOMFacade.renderTaskList(tareasFiltradas);
        } else if (estado) {
            filtro.setStrategy(new FiltrarPorEstado());
            tareasFiltradas = filtro.filtrarTarea(estado, prioridad, StorageManager.getTaskFromStorage());
            DOMFacade.renderTaskList(tareasFiltradas);
        } else if (prioridad) {
            filtro.setStrategy(new FiltrarPorPrioridad());
            tareasFiltradas = filtro.filtrarTarea(estado, prioridad, StorageManager.getTaskFromStorage());
            DOMFacade.renderTaskList(tareasFiltradas);
        } else {
            DOMFacade.renderTaskList(StorageManager.getTaskFromStorage());
        }
    }

    static changeStatus(idTarea, isChecked) {
        StorageManager.changeStatusFromStorage(idTarea, isChecked);
        this.renderDOM;
    }
}
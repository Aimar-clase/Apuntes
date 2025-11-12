// singleton
'use strict';
import { addErrorToStorage, addTaskToStorage, getErrors, removeErrorFromStorage, removeTaskFromStorage, getTaskFromStorage } from "../localstorage/storage.js";
import { Task } from "../models/task.js";
import { getDOMValues, renderTaskList, renderErrors, getValuesFiltro } from "../ui/dom-facade.js";
import { isValid } from "../validation/task-validation.js";
import { Filtro, FiltrarPorEstado, FiltrarPorEstadoYPrioridad, FiltrarPorPrioridad } from "./filtro.js";

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

    static searchTask() {
        const { estado, prioridad } = getValuesFiltro();
        const filtro = new Filtro();
        let tareasFiltradas;

        if (estado && prioridad ) {
            filtro.setStrategy(new FiltrarPorEstadoYPrioridad());
            tareasFiltradas = filtro.filtrarTarea(estado, prioridad, getTaskFromStorage());
            renderTaskList(tareasFiltradas);
        } else if (estado) {
            filtro.setStrategy(new FiltrarPorEstado());
            tareasFiltradas = filtro.filtrarTarea(estado,prioridad, getTaskFromStorage());
            renderTaskList(tareasFiltradas);
        } else if (prioridad){
            filtro.setStrategy(new FiltrarPorPrioridad());
            tareasFiltradas = filtro.filtrarTarea(estado,prioridad, getTaskFromStorage());
            renderTaskList(tareasFiltradas);
        } else {
            renderTaskList(getTaskFromStorage());
        }
    }
    
    static changeStatus(idTarea){
        changeStatusFromStorage(idTarea);
        this.renderDOM;

    }
}
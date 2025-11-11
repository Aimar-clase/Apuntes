// singleton
'use strict';
import { addTaskToStorage } from "../localstorage/storage.js";
import { Task } from "../models/task.js";
import { getDOMValues, renderTaskList } from "../ui/dom-facade.js";
import { isValid } from "../validation/task-validation.js";

export class TaskManager {

    constructor() {
        if (TaskManager.instancia) return TaskManager.instancia;
        TaskManager.instancia = this;
    }


    static addTask(){
        const tarea = new Task(getDOMValues());
        const validacion = isValid(tarea);

        if(validacion === true){
        addTaskToStorage(tarea);
        } else {
            alert(validacion);
        }
    }

    static renderDOM(){
        renderTaskList()
    }


}
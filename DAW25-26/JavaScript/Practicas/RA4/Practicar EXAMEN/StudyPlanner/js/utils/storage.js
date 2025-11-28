'use strict';


export class StorageManager {

    static addTaskToStorage(task) {
        let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
        tareas.push(task);
        localStorage.setItem('tareas', JSON.stringify(tareas));
    }

    static getTaskFromStorage() {
        return JSON.parse(localStorage.getItem('tareas')) || []
    }


}
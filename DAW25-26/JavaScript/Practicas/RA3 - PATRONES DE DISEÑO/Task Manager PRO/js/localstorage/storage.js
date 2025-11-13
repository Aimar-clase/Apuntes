'use strict';
export class StorageManager {

    static addTaskToStorage(tarea) {
        let arrayTareas = JSON.parse(localStorage.getItem('Lista-Tareas')) || [];
        arrayTareas.push(tarea);
        localStorage.setItem('Lista-Tareas', JSON.stringify(arrayTareas));
    }


    static removeTaskFromStorage(id) {
        let arrayTareas = JSON.parse(localStorage.getItem('Lista-Tareas'));
        const idNumber = Number(id);
        if (arrayTareas.length > 1) {
            arrayTareas = arrayTareas.filter(objeto => objeto.id !== idNumber);
            localStorage.setItem('Lista-Tareas', JSON.stringify(arrayTareas));
        } else {
            localStorage.removeItem('Lista-Tareas');
        }

    }

    static getTaskFromStorage() {
        return JSON.parse(localStorage.getItem('Lista-Tareas'));
    }

    static changeStatusFromStorage(id, isChecked) {
        let arrayTareas = JSON.parse(localStorage.getItem('Lista-Tareas'));
        const idNumber = Number(id);
        let indiceTarea = arrayTareas.findIndex(objeto => objeto.id == idNumber);
        let tareaParaCambiarElEstado = arrayTareas[indiceTarea];
        tareaParaCambiarElEstado.hecho = isChecked.toString();
        arrayTareas.splice(indiceTarea, 1, tareaParaCambiarElEstado);
        localStorage.setItem('Lista-Tareas', JSON.stringify(arrayTareas));
    }


    static addErrorToStorage(error) {
        sessionStorage.setItem('Errores', error);
    }

    static removeErrorFromStorage() {
        sessionStorage.removeItem('Errores');
    }
    static getErrors() {
        return sessionStorage.getItem('Errores');
    }

}

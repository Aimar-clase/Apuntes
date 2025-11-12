'use strict';

export function addTaskToStorage(tarea) {
    let arrayTareas = JSON.parse(localStorage.getItem('Lista-Tareas')) || [];
    arrayTareas.push(tarea);
    localStorage.setItem('Lista-Tareas', JSON.stringify(arrayTareas));
}


export function removeTaskFromStorage(id) {
    let arrayTareas = JSON.parse(localStorage.getItem('Lista-Tareas'));
    const idNumber = Number(id);
    if (arrayTareas.length > 1){
        arrayTareas = arrayTareas.filter(objeto => objeto.id !== idNumber)
        localStorage.setItem('Lista-Tareas', JSON.stringify(arrayTareas));
    }else {
        localStorage.removeItem('Lista-Tareas');
    }

}

export function getTaskFromStorage() {
    return JSON.parse(localStorage.getItem('Lista-Tareas'));
}

export function changeStatusFromStorage(id){
    let arrayTareas = JSON.parse(localStorage.getItem('Lista-Tareas'));
    const idNumber = Number(id);


}


export function addErrorToStorage(error) {
    sessionStorage.setItem('Errores', error);
}

export function removeErrorFromStorage() {
    sessionStorage.removeItem('Errores');
}
export function getErrors() {
    return sessionStorage.getItem('Errores');
}
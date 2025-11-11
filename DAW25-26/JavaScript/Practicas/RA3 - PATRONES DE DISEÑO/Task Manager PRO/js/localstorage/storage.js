'use strict';

export function addTaskToStorage(tarea) {
    let arrayTareas = JSON.parse(localStorage.getItem('Lista-Tareas')) || [];
    arrayTareas.unshifht(tarea);
    localStorage.setItem('Lista-Tareas', JSON.stringify(arrayTareas));
}


export function removeTask(tarea) {
    if (JSON.parse(localStorage.getItem('Lista-Tareas'))) {
        let arrayTareas = JSON.parse(localStorage.getItem('Lista-Tareas')) || [];
        const inidiceTarea = arrayTareas.findIndex(elemento => JSON.stringify(elemento) === JSON.stringify(tarea));

        if (inidiceTarea != -1) {
            arrayTareas.splice(inidiceTarea, 1);
        }
        return arrayTareas;
    }
}

// export function updateTask(tarea){

// }
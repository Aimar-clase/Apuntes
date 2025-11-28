
export function almacenarTarea(tarea) {

    let arrayTarea = JSON.parse(localStorage.getItem('tareas')) || [];
    arrayTarea.unshift(tarea);
    localStorage.setItem('tareas', JSON.stringify(arrayTarea));

}
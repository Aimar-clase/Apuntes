'use strict';

export function getDOMValues(){

    const titulo = document.getElementById("titulo-tarea").value;
    const descripcion = document.getElementById("descripcion-tarea").value;
    const prioridad = document.getElementById("prioridad-tarea").value;
    
    return {titulo, descripcion, prioridad};

}

export function renderTaskList(){
    const arrayTareas = JSON.parse(localStorage.getItem('Lista-Tareas'));
    const listaTareas = document.getElementById("lista-tareas");

    arrayTareas.forEach(tarea => {

        const divTarea = document.createElement("article");
        const tituloTarea = document.createElement("h2");
        const parrafoDescripcion = document.createElement("p");
        const parrafoPrioridad = document.createElement("p");
        const checkTarea = document.createElement("checkbox");
        const fechaCreacion = document.createElement("p");

        tituloTarea.textContent = tarea.titulo;
        divTarea.appendChild(tituloTarea);

        parrafoDescripcion.textContent = tarea.descripcion;
        divTarea.appendChild(parrafoDescripcion);
        
        parrafoPrioridad.textContent = tarea.prioridad;
        divTarea.appendChild(parrafoPrioridad);

        divTarea.appendChild(checkTarea);

        fechaCreacion.textContent = tarea.fechaCreacion;
        divTarea.appendChild(fechaCreacion);
        listaTareas.appendChild(divTarea);

        
    });

    

}
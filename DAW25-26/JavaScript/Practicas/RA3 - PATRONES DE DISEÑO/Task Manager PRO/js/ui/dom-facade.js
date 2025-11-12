'use strict';

export function getDOMValues() {
    const titulo = document.getElementById("titulo-tarea").value;
    const descripcion = document.getElementById("descripcion-tarea").value;
    const prioridad = document.getElementById("prioridad-tarea").value;
    return { titulo, descripcion, prioridad };
}

export function getValuesFiltro(){
    const estado = document.getElementById("select-filtro-estado-tarea").value;
    const prioridad = document.getElementById("select-filtro-prioridad-tarea").value;

    return { estado, prioridad };
}

export function renderErrors(error) {
    const formularioTarea = document.getElementById("formulario-tarea");
    const mensajeError = document.createElement("small");
    mensajeError.textContent = error;
    formularioTarea.appendChild(mensajeError);
};


export function renderTaskList(tareas) {

    const arrayTareas = tareas;
    const listaTareas = document.getElementById("lista-tareas");
    listaTareas.innerHTML = '';
    if (!tareas) {
        tareas = JSON.parse(localStorage.getItem('Lista-Tareas')) || [];
    }

    if (tareas.length === 0) return;
    arrayTareas.forEach(tarea => {

        const divTarea = document.createElement("article");
        const tituloTarea = document.createElement("h2");
        const parrafoDescripcion = document.createElement("p");
        const parrafoPrioridad = document.createElement("p");
        const checkTarea = document.createElement("input");
        const fechaCreacion = document.createElement("p");
        const btnBorrar = document.createElement("button");

        tituloTarea.textContent = "Titulo: " + tarea.titulo;
        divTarea.appendChild(tituloTarea);

        parrafoDescripcion.textContent = "Descripcion: " + tarea.descripcion;
        divTarea.appendChild(parrafoDescripcion);

        parrafoPrioridad.textContent = "Prioridad: " + tarea.prioridad;
        divTarea.appendChild(parrafoPrioridad);

        fechaCreacion.textContent = "Fecha de creacion: " + tarea.fechaDeCreacion;
        divTarea.appendChild(fechaCreacion);

        checkTarea.type = "checkbox";
        checkTarea.dataset.id = tarea.id
        checkTarea.classList.add("checkCompleted");
        divTarea.appendChild(checkTarea);


        btnBorrar.textContent = "Borrar";
        btnBorrar.classList.add("btnBorrar");
        btnBorrar.dataset.id = tarea.id;
        divTarea.appendChild(btnBorrar);

        divTarea.id = "div-tareas";
        listaTareas.appendChild(divTarea);
    });
}
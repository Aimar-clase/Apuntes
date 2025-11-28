'use strict';


export class DOMFacade {

    static getDOMValues() {
        const titulo = document.getElementById("titulo-tarea").value;
        const descripcion = document.getElementById("descripcion-tarea").value;
        const prioridad = document.getElementById("prioridad-tarea").value;
        return { titulo, descripcion, prioridad };
    }

    static getValuesFiltro() {
        const estado = document.getElementById("select-filtro-estado-tarea").value;
        const prioridad = document.getElementById("select-filtro-prioridad-tarea").value;
        return { estado, prioridad };
    }

    static renderErrors(error) {
        const formularioTarea = document.getElementById("formulario-tarea");
        const mensajeError = document.createElement("small");
        mensajeError.textContent = error;
        formularioTarea.appendChild(mensajeError);
    };


    static renderTaskList(tareas) {

        const arrayTareas = tareas;
        const listaTareas = document.getElementById("lista-tareas");
        listaTareas.innerHTML = '';
        if (!tareas) {
            tareas = [];
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

            checkTarea.type = "checkbox";
            checkTarea.checked = tarea.hecho === "true";
            if (checkTarea.checked) {
                divTarea.style.backgroundColor = "green";
            }
            checkTarea.dataset.id = tarea.id
            checkTarea.classList.add("checkCompleted");
            divTarea.appendChild(checkTarea);

            tituloTarea.textContent = tarea.titulo;
            divTarea.appendChild(tituloTarea);

            parrafoDescripcion.textContent = tarea.descripcion;
            divTarea.appendChild(parrafoDescripcion);

            parrafoPrioridad.textContent = "Prioridad: " + tarea.prioridad;
            divTarea.appendChild(parrafoPrioridad);

            fechaCreacion.textContent = "Fecha de creacion: " + tarea.fechaDeCreacion;
            divTarea.appendChild(fechaCreacion);


            btnBorrar.textContent = "Borrar";
            btnBorrar.classList.add("btnBorrar");
            btnBorrar.dataset.id = tarea.id;
            divTarea.appendChild(btnBorrar);

            divTarea.id = "div-tareas";
            listaTareas.appendChild(divTarea);
        });
    }
}
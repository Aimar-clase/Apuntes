'use strict';

export class DomFacade {

    static getTaskFromForm() {
        const descripcion = document.getElementById("descripcion-tarea").value;
        const asignatura = document.getElementById("select-asignatura").value;
        const prioridad = document.getElementById("select-prioridad").value;

        return { descripcion, asignatura, prioridad };
    }


    static renderTaskList(tasks) {


        const contenedorTareas = document.getElementById("contenedor-tareas");

        tasks.forEach(tarea => {
            const articuloTarea = document.createElement("article");
            const descripcionTarea = document.createElement("p");
            const asignaturaTarea = document.createElement("p");
            const prioridadTarea = document.createElement("p");
            const btnCompleted = document.createElement("button");


            descripcionTarea.textContent = "Descripcion: " + tarea.descripcion;
            asignaturaTarea.textContent = "Asignatura: " + tarea.asignatura;
            prioridadTarea.textContent = "Prioridad: " + tarea.prioridad;
            btnCompleted.textContent = "Completar";

            btnCompleted.addEventListener("click", function(){
                btnCompleted.textContent = "Completar";
            })

            articuloTarea.append(descripcionTarea, asignaturaTarea, prioridadTarea, btnCompleted);
            contenedorTareas.appendChild(articuloTarea);

        });
    }


}
// strategy
'use strict';
export class Filtro {


    static filtrarTarea(input, tareas) {
        if (!input || input.trim() === '') return tareas;
        const inputLowerCase = input.toLowerCase().trim();

        return tareas.filter(tarea => {
            const estaEnTitulo = tarea.titulo.toLowerCase().includes(inputLowerCase);
            const estaEnDescripcion = tarea.descripcion.toLowerCase().includes(inputLowerCase);
            const estaEnPrioridad = tarea.prioridad.toLowerCase().includes(inputLowerCase);

            return estaEnTitulo || estaEnDescripcion || estaEnPrioridad;
        });


    }







}
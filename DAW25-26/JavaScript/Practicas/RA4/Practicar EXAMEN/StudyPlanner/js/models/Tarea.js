'use strict';


export class Tarea {

    constructor({ descripcion, asignatura, prioridad }) {
        this.id = new Date().getTime();
        this.descripcion = descripcion;
        this.asignatura = asignatura;
        this.prioridad = prioridad;
        this.estado = "pendiente";
    }
}
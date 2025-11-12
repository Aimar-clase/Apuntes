'use strict';

export class Task {
    constructor( { titulo, descripcion, prioridad }) {
        this.id = Date.now();
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        this.hecho = "false";
        this.fechaDeCreacion = new Date().toLocaleDateString();
    }
}

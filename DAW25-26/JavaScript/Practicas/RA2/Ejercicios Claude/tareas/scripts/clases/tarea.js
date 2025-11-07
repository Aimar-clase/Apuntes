export class Tarea {
    constructor(titulo, descripcion, prioridad, completada = false) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.prioridad = prioridad;
        this.completada = completada;
    }
}
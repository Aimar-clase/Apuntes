export class Nota {
    constructor(titulo, descripcion, categoria, fecha, leido = false) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.fecha = fecha;
        this.leido = leido;
    }
}
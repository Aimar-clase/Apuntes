export class Libro {
    static instancia = null;

    constructor({ titulo, autor, genero, isbn, añoPublicacion, copiasDisponibles }) {

        if (Libro.instancia) return Libro.instancia;
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.isbn = isbn;
        this.añoPublicacion = añoPublicacion;
        this.copiasDisponibles = copiasDisponibles;
        this.fecha = new Date().toLocaleDateString();

        Libro.instancia = this;
    }


}
// models/Libro.js
// Clase Libro - Define la estructura de un libro
// NO usa Singleton porque necesitamos múltiples instancias de libros

export class Libro {
    constructor(titulo, autor, genero, isbn, añoPublicacion, copiasTotal) {
        this.id = Date.now(); // ID único basado en timestamp
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.isbn = isbn;
        this.añoPublicacion = añoPublicacion;
        this.copiasTotal = copiasTotal;
        this.copiasDisponibles = copiasTotal;
        this.fechaRegistro = new Date().toLocaleDateString();
        this.prestamos = []; // Array para guardar el historial de préstamos
    }

    // Método para verificar si hay copias disponibles
    hayDisponibilidad() {
        return this.copiasDisponibles > 0;
    }

    // Método para prestar una copia
    prestar() {
        if (this.hayDisponibilidad()) {
            this.copiasDisponibles--;
            return true;
        }
        return false;
    }

    // Método para devolver una copia
    devolver() {
        if (this.copiasDisponibles < this.copiasTotal) {
            this.copiasDisponibles++;
            return true;
        }
        return false;
    }

    // Método para validar el ISBN
    static validarISBN(isbn) {
        // Formato: XXX-X-XXXXX-XXX-X
        isbn = isbn.trim();
        if (isbn.length !== 17) return false;

        // Verificar posiciones de los guiones
        if (isbn.charAt(3) !== '-' || isbn.charAt(5) !== '-' ||
            isbn.charAt(11) !== '-' || isbn.charAt(15) !== '-') {
            return false;
        }

        // Verificar que el resto sean números
        for (let i = 0; i < isbn.length; i++) {
            if (i !== 3 && i !== 5 && i !== 11 && i !== 15) {
                if (isbn.charAt(i) < '0' || isbn.charAt(i) > '9') {
                    return false;
                }
            }
        }

        return true;
    }
}
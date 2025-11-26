



export class Libro {
    constructor(titulo, autor, genero, isbn, añoPublicacion, copiasTotal) {
        this.id = Date.now(); 
        this.titulo = titulo;
        this.autor = autor;
        this.genero = genero;
        this.isbn = isbn;
        this.añoPublicacion = añoPublicacion;
        this.copiasTotal = copiasTotal;
        this.copiasDisponibles = copiasTotal;
        this.fechaRegistro = new Date().toLocaleDateString();
        this.prestamos = []; 
    }

    
    hayDisponibilidad() {
        return this.copiasDisponibles > 0;
    }

    
    prestar() {
        if (this.hayDisponibilidad()) {
            this.copiasDisponibles--;
            return true;
        }
        return false;
    }

    
    devolver() {
        if (this.copiasDisponibles < this.copiasTotal) {
            this.copiasDisponibles++;
            return true;
        }
        return false;
    }

    
    static validarISBN(isbn) {
        
        isbn = isbn.trim();
        if (isbn.length !== 17) return false;

        
        if (isbn.charAt(3) !== '-' || isbn.charAt(5) !== '-' ||
            isbn.charAt(11) !== '-' || isbn.charAt(15) !== '-') {
            return false;
        }

        
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
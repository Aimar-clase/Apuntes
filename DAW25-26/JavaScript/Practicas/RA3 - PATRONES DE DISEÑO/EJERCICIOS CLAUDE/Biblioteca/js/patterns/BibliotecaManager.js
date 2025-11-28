



import { Observable } from './Observer.js';
import { Libro } from '../models/Libro.js';
import { Prestamo } from '../models/Prestamo.js';

export class BibliotecaManager extends Observable {
    
    static instance = null;

    constructor() {
        
        if (BibliotecaManager.instance) {
            return BibliotecaManager.instance;
        }

        
        super();

        
        this.libros = [];
        this.prestamos = [];

        
        this.cargarDatosDesdeLocalStorage();

        
        BibliotecaManager.instance = this;
    }

    
    static getInstance() {
        if (!BibliotecaManager.instance) {
            BibliotecaManager.instance = new BibliotecaManager();
        }
        return BibliotecaManager.instance;
    }

    
    agregarLibro(datosLibro) {
        try {
            
            const errores = this.validarDatosLibro(datosLibro);
            if (errores.length > 0) {
                return { exito: false, errores };
            }

            
            const nuevoLibro = new Libro(
                datosLibro.titulo,
                datosLibro.autor,
                datosLibro.genero,
                datosLibro.isbn,
                datosLibro.añoPublicacion,
                datosLibro.copiasDisponibles
            );

            
            this.libros.push(nuevoLibro);

            
            this.guardarEnLocalStorage();

            
            this.notify('libro-agregado', nuevoLibro);

            return { exito: true, libro: nuevoLibro };
        } catch (error) {
            return { exito: false, errores: [error.message] };
        }
    }

    
    realizarPrestamo(datosPrestamo) {
        try {
            
            const libro = this.libros.find(l => l.isbn === datosPrestamo.libroISBN);

            if (!libro) {
                return { exito: false, mensaje: 'Libro no encontrado' };
            }

            if (!libro.hayDisponibilidad()) {
                return { exito: false, mensaje: 'No hay copias disponibles' };
            }

            
            const nuevoPrestamo = new Prestamo(
                libro.id,
                datosPrestamo.usuario,
                datosPrestamo.diasPrestamo
            );

            
            libro.prestar();
            libro.prestamos.push(nuevoPrestamo.id);

            
            this.prestamos.push(nuevoPrestamo);

            
            this.guardarEnLocalStorage();

            
            this.notify('prestamo-realizado', nuevoPrestamo);

            return {
                exito: true,
                prestamo: nuevoPrestamo,
                evento: nuevoPrestamo.estado
            };
        } catch (error) {
            return { exito: false, mensaje: error.message };
        }
    }

    
    buscarLibros(termino) {
        termino = termino.toLowerCase();
        return this.libros.filter(libro =>
            libro.titulo.toLowerCase().includes(termino) ||
            libro.autor.toLowerCase().includes(termino) ||
            libro.isbn.includes(termino)
        );
    }

    
    obtenerLibros() {
        return this.libros;
    }

    
    obtenerEstadisticas() {
        const totalLibros = this.libros.length;
        const librosPrestados = this.prestamos.filter(p => !p.devuelto).length;
        const librosDisponibles = this.libros.reduce((acc, libro) =>
            acc + libro.copiasDisponibles, 0
        );

        return {
            totalLibros,
            librosPrestados,
            librosDisponibles,
            prestamosVencidos: this.obtenerPrestamosVencidos().length
        };
    }

    
    obtenerPrestamosVencidos() {
        return this.prestamos.filter(p => p.estaVencido());
    }

    
    eliminarTodosLosLibros() {
        this.libros = [];
        this.prestamos = [];
        this.guardarEnLocalStorage();
        this.notify('libros-borrados', null);
    }

    
    validarDatosLibro(datos) {
        const errores = [];

        if (!datos.titulo || datos.titulo.trim().length < 3) {
            errores.push('El título debe tener al menos 3 caracteres');
        }

        if (!datos.autor || datos.autor.trim().length < 3) {
            errores.push('El autor debe tener al menos 3 caracteres');
        }

        if (!Libro.validarISBN(datos.isbn)) {
            errores.push('El ISBN debe tener formato XXX-X-XXXXX-XXX-X');
        }

        const año = parseInt(datos.añoPublicacion);
        if (isNaN(año) || año < 1900 || año > 2025) {
            errores.push('El año debe estar entre 1900 y 2025');
        }

        const copias = parseInt(datos.copiasDisponibles);
        if (isNaN(copias) || copias < 1 || copias > 10) {
            errores.push('Las copias deben estar entre 1 y 10');
        }

        
        if (this.libros.some(libro => libro.isbn === datos.isbn)) {
            errores.push('Ya existe un libro con ese ISBN');
        }

        return errores;
    }

    
    guardarEnLocalStorage() {
        localStorage.setItem('biblioteca_libros', JSON.stringify(this.libros));
        localStorage.setItem('biblioteca_prestamos', JSON.stringify(this.prestamos));
    }

    
    cargarDatosDesdeLocalStorage() {
        const librosGuardados = localStorage.getItem('biblioteca_libros');
        const prestamosGuardados = localStorage.getItem('biblioteca_prestamos');

        if (librosGuardados) {
            const librosData = JSON.parse(librosGuardados);
            this.libros = librosData.map(data => {
                const libro = new Libro(
                    data.titulo,
                    data.autor,
                    data.genero,
                    data.isbn,
                    data.añoPublicacion,
                    data.copiasTotal
                );
                
                libro.id = data.id;
                libro.copiasDisponibles = data.copiasDisponibles;
                libro.fechaRegistro = data.fechaRegistro;
                libro.prestamos = data.prestamos || [];
                return libro;
            });
        }

        if (prestamosGuardados) {
            const prestamosData = JSON.parse(prestamosGuardados);
            this.prestamos = prestamosData.map(data => {
                const prestamo = new Prestamo(
                    data.libroId,
                    data.usuario,
                    data.diasPrestamo
                );
                
                prestamo.id = data.id;
                prestamo.fechaPrestamo = new Date(data.fechaPrestamo);
                prestamo.fechaDevolucion = new Date(data.fechaDevolucion);
                prestamo.estado = data.estado;
                prestamo.devuelto = data.devuelto;
                return prestamo;
            });
        }
    }
}
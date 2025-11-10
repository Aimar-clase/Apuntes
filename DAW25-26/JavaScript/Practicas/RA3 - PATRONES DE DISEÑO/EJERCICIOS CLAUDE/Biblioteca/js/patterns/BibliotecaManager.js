// patterns/BibliotecaManager.js
// Patrón Singleton - Una única instancia que gestiona toda la biblioteca
// Hereda de Observable para notificar cambios

import { Observable } from './Observer.js';
import { Libro } from '../models/Libro.js';
import { Prestamo } from '../models/Prestamo.js';

export class BibliotecaManager extends Observable {
    // Variable estática para guardar la única instancia
    static instance = null;

    constructor() {
        // Si ya existe una instancia, devolverla
        if (BibliotecaManager.instance) {
            return BibliotecaManager.instance;
        }

        // Llamar al constructor padre (Observable)
        super();

        // Inicializar los arrays de datos
        this.libros = [];
        this.prestamos = [];

        // Cargar datos desde localStorage si existen
        this.cargarDatosDesdeLocalStorage();

        // Guardar la instancia
        BibliotecaManager.instance = this;
    }

    // Método estático para obtener la instancia (Singleton)
    static getInstance() {
        if (!BibliotecaManager.instance) {
            BibliotecaManager.instance = new BibliotecaManager();
        }
        return BibliotecaManager.instance;
    }

    // Método para agregar un libro
    agregarLibro(datosLibro) {
        try {
            // Validar los datos
            const errores = this.validarDatosLibro(datosLibro);
            if (errores.length > 0) {
                return { exito: false, errores };
            }

            // Crear nueva instancia de Libro
            const nuevoLibro = new Libro(
                datosLibro.titulo,
                datosLibro.autor,
                datosLibro.genero,
                datosLibro.isbn,
                datosLibro.añoPublicacion,
                datosLibro.copiasDisponibles
            );

            // Agregar al array
            this.libros.push(nuevoLibro);

            // Guardar en localStorage
            this.guardarEnLocalStorage();

            // Notificar a los observadores
            this.notify('libro-agregado', nuevoLibro);

            return { exito: true, libro: nuevoLibro };
        } catch (error) {
            return { exito: false, errores: [error.message] };
        }
    }

    // Método para realizar un préstamo
    realizarPrestamo(datosPrestamo) {
        try {
            // Buscar el libro por ISBN
            const libro = this.libros.find(l => l.isbn === datosPrestamo.libroISBN);

            if (!libro) {
                return { exito: false, mensaje: 'Libro no encontrado' };
            }

            if (!libro.hayDisponibilidad()) {
                return { exito: false, mensaje: 'No hay copias disponibles' };
            }

            // Crear el préstamo
            const nuevoPrestamo = new Prestamo(
                libro.id,
                datosPrestamo.usuario,
                datosPrestamo.diasPrestamo
            );

            // Reducir copias disponibles
            libro.prestar();
            libro.prestamos.push(nuevoPrestamo.id);

            // Agregar el préstamo al array
            this.prestamos.push(nuevoPrestamo);

            // Guardar cambios
            this.guardarEnLocalStorage();

            // Notificar observadores
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

    // Método para buscar libros
    buscarLibros(termino) {
        termino = termino.toLowerCase();
        return this.libros.filter(libro =>
            libro.titulo.toLowerCase().includes(termino) ||
            libro.autor.toLowerCase().includes(termino) ||
            libro.isbn.includes(termino)
        );
    }

    // Método para obtener todos los libros
    obtenerLibros() {
        return this.libros;
    }

    // Método para obtener estadísticas
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

    // Obtener préstamos vencidos
    obtenerPrestamosVencidos() {
        return this.prestamos.filter(p => p.estaVencido());
    }

    // Eliminar todos los libros
    eliminarTodosLosLibros() {
        this.libros = [];
        this.prestamos = [];
        this.guardarEnLocalStorage();
        this.notify('libros-borrados', null);
    }

    // Validar datos del libro
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

        // Verificar si el ISBN ya existe
        if (this.libros.some(libro => libro.isbn === datos.isbn)) {
            errores.push('Ya existe un libro con ese ISBN');
        }

        return errores;
    }

    // Guardar en localStorage
    guardarEnLocalStorage() {
        localStorage.setItem('biblioteca_libros', JSON.stringify(this.libros));
        localStorage.setItem('biblioteca_prestamos', JSON.stringify(this.prestamos));
    }

    // Cargar desde localStorage
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
                // Restaurar propiedades adicionales
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
                // Restaurar propiedades adicionales
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
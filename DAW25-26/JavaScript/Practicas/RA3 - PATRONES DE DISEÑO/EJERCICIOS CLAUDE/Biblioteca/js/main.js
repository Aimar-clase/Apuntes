// main.js - Punto de entrada de la aplicación
// Importa todos los módulos necesarios y conecta todo

import { BibliotecaManager } from './patterns/BibliotecaManager.js';
import DOMFacade from './patterns/DOMFacade.js';
import { EstadisticasObserver, CatalogoObserver } from './patterns/Observer.js';

// Obtener la instancia única del BibliotecaManager (Singleton)
const bibliotecaManager = BibliotecaManager.getInstance();

// Crear observadores
const estadisticasObserver = new EstadisticasObserver();
const catalogoObserver = new CatalogoObserver();

// Suscribir observadores al BibliotecaManager
bibliotecaManager.subscribe(estadisticasObserver);
bibliotecaManager.subscribe(catalogoObserver);

// Función para inicializar la aplicación
function inicializarAplicacion() {
    console.log('Inicializando BiblioTech...');

    // Cargar datos iniciales
    cargarDatosIniciales();

    // Configurar event listeners
    configurarEventListeners();

    console.log('BiblioTech iniciado correctamente');
}

// Cargar y mostrar datos iniciales
function cargarDatosIniciales() {
    // Obtener libros del manager
    const libros = bibliotecaManager.obtenerLibros();

    // Renderizar libros
    DOMFacade.renderizarListaLibros(libros);

    // Actualizar selector de préstamos
    DOMFacade.actualizarSelectorLibros(libros);

    // Actualizar estadísticas iniciales
    const stats = bibliotecaManager.obtenerEstadisticas();
    DOMFacade.actualizarEstadistica('total-libros', stats.totalLibros);
    DOMFacade.actualizarEstadistica('libros-prestados', stats.librosPrestados);
    DOMFacade.actualizarEstadistica('libros-disponibles', stats.librosDisponibles);
}

// Configurar todos los event listeners
function configurarEventListeners() {

    // Formulario de agregar libro
    const formLibro = document.getElementById('form-libro');
    if (formLibro) {
        formLibro.addEventListener('submit', manejarAgregarLibro);
    }

    // Formulario de préstamo
    const formPrestamo = document.getElementById('form-prestamo');
    if (formPrestamo) {
        formPrestamo.addEventListener('submit', manejarRealizarPrestamo);
    }

    // Botón de borrar todos los libros
    const btnBorrar = document.getElementById('btnBorrar');
    if (btnBorrar) {
        btnBorrar.addEventListener('click', manejarBorrarTodos);
    }

    // Búsqueda de libros
    const btnBuscar = document.getElementById('btnBuscar');
    if (btnBuscar) {
        btnBuscar.addEventListener('click', manejarBusqueda);
    }

    // Búsqueda en tiempo real (opcional)
    const inputBuscar = document.getElementById('buscar-input');
    if (inputBuscar) {
        inputBuscar.addEventListener('input', manejarBusquedaTiempoReal);
    }
}

// Manejador para agregar libro
function manejarAgregarLibro(evento) {
    evento.preventDefault();

    console.log('Agregando nuevo libro...');

    // Obtener datos del formulario usando el Facade
    const datosLibro = DOMFacade.obtenerDatosFormularioLibro();

    // Intentar agregar el libro
    const resultado = bibliotecaManager.agregarLibro(datosLibro);

    if (resultado.exito) {
        // Mostrar mensaje de éxito
        DOMFacade.mostrarMensaje('✅ Libro agregado correctamente', 'exito', 'mensaje-libro');

        // Limpiar formulario
        DOMFacade.limpiarFormulario('form-libro');

        // Actualizar selector de préstamos
        DOMFacade.actualizarSelectorLibros(bibliotecaManager.obtenerLibros());

        console.log('Libro agregado:', resultado.libro);
    } else {
        // Mostrar errores
        const mensajeError = resultado.errores.join('\n');
        DOMFacade.mostrarMensaje(mensajeError, 'error', 'mensaje-libro');
        console.error('Errores al agregar libro:', resultado.errores);
    }
}

// Manejador para realizar préstamo
function manejarRealizarPrestamo(evento) {
    evento.preventDefault();

    console.log('Realizando préstamo...');

    // Obtener datos del formulario
    const datosPrestamo = DOMFacade.obtenerDatosFormularioPrestamo();

    // Validar que se hayan llenado los campos
    if (!datosPrestamo.usuario || !datosPrestamo.libroISBN) {
        DOMFacade.mostrarMensaje('Por favor complete todos los campos', 'error', 'mensaje-prestamo');
        return;
    }

    // Realizar el préstamo
    const resultado = bibliotecaManager.realizarPrestamo(datosPrestamo);

    if (resultado.exito) {
        // Mostrar resultado del préstamo con evento aleatorio
        DOMFacade.mostrarResultadoPrestamo(resultado);

        // Limpiar formulario
        DOMFacade.limpiarFormulario('form-prestamo');

        // Actualizar selector de libros
        DOMFacade.actualizarSelectorLibros(bibliotecaManager.obtenerLibros());

        console.log('Préstamo realizado:', resultado.prestamo);
    } else {
        DOMFacade.mostrarMensaje(resultado.mensaje, 'error', 'mensaje-prestamo');
        console.error('Error en préstamo:', resultado.mensaje);
    }
}

// Manejador para borrar todos los libros
function manejarBorrarTodos() {
    // Confirmar acción
    if (confirm('¿Está seguro de que desea eliminar todos los libros? Esta acción no se puede deshacer.')) {
        bibliotecaManager.eliminarTodosLosLibros();

        // Actualizar selector de préstamos
        DOMFacade.actualizarSelectorLibros([]);

        DOMFacade.mostrarMensaje('Todos los libros han sido eliminados', 'exito', 'mensaje-libro');
        console.log('Todos los libros eliminados');
    }
}

// Manejador para búsqueda
function manejarBusqueda() {
    const input = document.getElementById('buscar-input');
    const termino = input.value.trim();

    if (termino === '') {
        // Si no hay término, mostrar todos los libros
        DOMFacade.renderizarListaLibros(bibliotecaManager.obtenerLibros());
    } else {
        // Buscar libros
        const resultados = bibliotecaManager.buscarLibros(termino);
        DOMFacade.renderizarResultadosBusqueda(resultados);

        console.log(`Búsqueda de "${termino}": ${resultados.length} resultados`);
    }
}

// Manejador para búsqueda en tiempo real
let timeoutBusqueda;
function manejarBusquedaTiempoReal(evento) {
    // Cancelar timeout anterior
    clearTimeout(timeoutBusqueda);

    // Esperar 300ms antes de buscar
    timeoutBusqueda = setTimeout(() => {
        const termino = evento.target.value.trim();

        if (termino === '') {
            DOMFacade.renderizarListaLibros(bibliotecaManager.obtenerLibros());
        } else {
            const resultados = bibliotecaManager.buscarLibros(termino);
            DOMFacade.renderizarResultadosBusqueda(resultados);
        }
    }, 300);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', inicializarAplicacion);

// Exportar el manager para debugging (opcional)
window.bibliotecaManager = bibliotecaManager;
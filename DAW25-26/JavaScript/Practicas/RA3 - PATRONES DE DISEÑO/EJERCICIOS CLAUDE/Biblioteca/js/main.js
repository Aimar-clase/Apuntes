


import { BibliotecaManager } from './patterns/BibliotecaManager.js';
import DOMFacade from './patterns/DOMFacade.js';
import { EstadisticasObserver, CatalogoObserver } from './patterns/Observer.js';


const bibliotecaManager = BibliotecaManager.getInstance();


const estadisticasObserver = new EstadisticasObserver();
const catalogoObserver = new CatalogoObserver();


bibliotecaManager.subscribe(estadisticasObserver);
bibliotecaManager.subscribe(catalogoObserver);


function inicializarAplicacion() {
    console.log('Inicializando BiblioTech...');

    
    cargarDatosIniciales();

    
    configurarEventListeners();

    console.log('BiblioTech iniciado correctamente');
}


function cargarDatosIniciales() {
    
    const libros = bibliotecaManager.obtenerLibros();

    
    DOMFacade.renderizarListaLibros(libros);

    
    DOMFacade.actualizarSelectorLibros(libros);

    
    const stats = bibliotecaManager.obtenerEstadisticas();
    DOMFacade.actualizarEstadistica('total-libros', stats.totalLibros);
    DOMFacade.actualizarEstadistica('libros-prestados', stats.librosPrestados);
    DOMFacade.actualizarEstadistica('libros-disponibles', stats.librosDisponibles);
}


function configurarEventListeners() {

    
    const formLibro = document.getElementById('form-libro');
    if (formLibro) {
        formLibro.addEventListener('submit', manejarAgregarLibro);
    }

    
    const formPrestamo = document.getElementById('form-prestamo');
    if (formPrestamo) {
        formPrestamo.addEventListener('submit', manejarRealizarPrestamo);
    }

    
    const btnBorrar = document.getElementById('btnBorrar');
    if (btnBorrar) {
        btnBorrar.addEventListener('click', manejarBorrarTodos);
    }

    
    const btnBuscar = document.getElementById('btnBuscar');
    if (btnBuscar) {
        btnBuscar.addEventListener('click', manejarBusqueda);
    }

    
    const inputBuscar = document.getElementById('buscar-input');
    if (inputBuscar) {
        inputBuscar.addEventListener('input', manejarBusquedaTiempoReal);
    }
}


function manejarAgregarLibro(evento) {
    evento.preventDefault();

    console.log('Agregando nuevo libro...');

    
    const datosLibro = DOMFacade.obtenerDatosFormularioLibro();

    
    const resultado = bibliotecaManager.agregarLibro(datosLibro);

    if (resultado.exito) {
        
        DOMFacade.mostrarMensaje('✅ Libro agregado correctamente', 'exito', 'mensaje-libro');

        
        DOMFacade.limpiarFormulario('form-libro');

        
        DOMFacade.actualizarSelectorLibros(bibliotecaManager.obtenerLibros());

        console.log('Libro agregado:', resultado.libro);
    } else {
        
        const mensajeError = resultado.errores.join('\n');
        DOMFacade.mostrarMensaje(mensajeError, 'error', 'mensaje-libro');
        console.error('Errores al agregar libro:', resultado.errores);
    }
}


function manejarRealizarPrestamo(evento) {
    evento.preventDefault();

    console.log('Realizando préstamo...');

    
    const datosPrestamo = DOMFacade.obtenerDatosFormularioPrestamo();

    
    if (!datosPrestamo.usuario || !datosPrestamo.libroISBN) {
        DOMFacade.mostrarMensaje('Por favor complete todos los campos', 'error', 'mensaje-prestamo');
        return;
    }

    
    const resultado = bibliotecaManager.realizarPrestamo(datosPrestamo);

    if (resultado.exito) {
        
        DOMFacade.mostrarResultadoPrestamo(resultado);

        
        DOMFacade.limpiarFormulario('form-prestamo');

        
        DOMFacade.actualizarSelectorLibros(bibliotecaManager.obtenerLibros());

        console.log('Préstamo realizado:', resultado.prestamo);
    } else {
        DOMFacade.mostrarMensaje(resultado.mensaje, 'error', 'mensaje-prestamo');
        console.error('Error en préstamo:', resultado.mensaje);
    }
}


function manejarBorrarTodos() {
    
    if (confirm('¿Está seguro de que desea eliminar todos los libros? Esta acción no se puede deshacer.')) {
        bibliotecaManager.eliminarTodosLosLibros();

        
        DOMFacade.actualizarSelectorLibros([]);

        DOMFacade.mostrarMensaje('Todos los libros han sido eliminados', 'exito', 'mensaje-libro');
        console.log('Todos los libros eliminados');
    }
}


function manejarBusqueda() {
    const input = document.getElementById('buscar-input');
    const termino = input.value.trim();

    if (termino === '') {
        
        DOMFacade.renderizarListaLibros(bibliotecaManager.obtenerLibros());
    } else {
        
        const resultados = bibliotecaManager.buscarLibros(termino);
        DOMFacade.renderizarResultadosBusqueda(resultados);

        console.log(`Búsqueda de "${termino}": ${resultados.length} resultados`);
    }
}


let timeoutBusqueda;
function manejarBusquedaTiempoReal(evento) {
    
    clearTimeout(timeoutBusqueda);

    
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


document.addEventListener('DOMContentLoaded', inicializarAplicacion);


window.bibliotecaManager = bibliotecaManager;
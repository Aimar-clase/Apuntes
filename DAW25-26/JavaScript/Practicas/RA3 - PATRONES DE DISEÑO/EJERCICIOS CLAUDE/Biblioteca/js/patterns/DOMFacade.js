// patterns/DOMFacade.js
// Patrón Facade - Simplifica las operaciones del DOM

class DOMFacade {
    // Obtener datos del formulario de libro
    static obtenerDatosFormularioLibro() {
        return {
            titulo: document.getElementById('titulo-libro').value,
            autor: document.getElementById('autor').value,
            genero: document.getElementById('select-genero').value,
            isbn: document.getElementById('isbn').value,
            añoPublicacion: document.getElementById('año-publicacion').value,
            copiasDisponibles: document.getElementById('copias-disponibles').value
        };
    }

    // Obtener datos del formulario de préstamo
    static obtenerDatosFormularioPrestamo() {
        return {
            usuario: document.getElementById('usuario-prestamo').value,
            libroISBN: document.getElementById('seleccionar-libro').value,
            diasPrestamo: document.getElementById('seleccionar-dias').value
        };
    }

    // Limpiar formulario
    static limpiarFormulario(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.reset();
        }
    }

    // Mostrar mensaje temporal
    static mostrarMensaje(mensaje, tipo, elementoId) {
        const elemento = document.getElementById(elementoId);
        if (!elemento) return;

        // Limpiar clases anteriores
        elemento.className = 'mensaje';

        // Añadir clase según el tipo
        if (tipo === 'exito') {
            elemento.classList.add('mensaje-exito');
        } else if (tipo === 'error') {
            elemento.classList.add('mensaje-error');
        } else if (tipo === 'advertencia') {
            elemento.classList.add('mensaje-advertencia');
        }

        // Mostrar el mensaje
        elemento.textContent = mensaje;
        elemento.style.display = 'block';

        // Ocultar después de 3 segundos
        setTimeout(() => {
            elemento.style.display = 'none';
        }, 3000);
    }

    // Renderizar un libro individual
    static crearElementoLibro(libro) {
        const divLibro = document.createElement('div');
        divLibro.className = 'libro-card';

        // Añadir clase según disponibilidad
        if (!libro.hayDisponibilidad()) {
            divLibro.classList.add('sin-disponibilidad');
        }

        divLibro.innerHTML = `
            <h3>${libro.titulo}</h3>
            <p class="autor">Por ${libro.autor}</p>
            <div class="libro-detalles">
                <p><strong>Género:</strong> ${libro.genero}</p>
                <p><strong>ISBN:</strong> ${libro.isbn}</p>
                <p><strong>Año:</strong> ${libro.añoPublicacion}</p>
                <p><strong>Disponibles:</strong> 
                    <span class="${libro.hayDisponibilidad() ? 'disponible' : 'no-disponible'}">
                        ${libro.copiasDisponibles}/${libro.copiasTotal}
                    </span>
                </p>
                <p class="fecha-registro">Registrado: ${libro.fechaRegistro}</p>
            </div>
        `;

        return divLibro;
    }

    // Renderizar lista completa de libros
    static renderizarListaLibros(libros) {
        const contenedor = document.getElementById('lista-libros');
        if (!contenedor) return;

        // Limpiar contenedor
        contenedor.innerHTML = '';

        if (libros.length === 0) {
            contenedor.innerHTML = '<p class="sin-libros">No hay libros en el catálogo</p>';
            return;
        }

        // Crear y añadir cada libro
        libros.forEach(libro => {
            const elementoLibro = this.crearElementoLibro(libro);
            contenedor.appendChild(elementoLibro);
        });
    }

    // Actualizar selector de libros para préstamo
    static actualizarSelectorLibros(libros) {
        const selector = document.getElementById('seleccionar-libro');
        if (!selector) return;

        // Guardar valor actual
        const valorActual = selector.value;

        // Limpiar opciones existentes (excepto la primera)
        selector.innerHTML = '<option value="" disabled selected>Selecciona un libro</option>';

        // Añadir libros disponibles
        libros.filter(libro => libro.hayDisponibilidad()).forEach(libro => {
            const option = document.createElement('option');
            option.value = libro.isbn;
            option.textContent = `${libro.titulo} - ${libro.autor} (${libro.copiasDisponibles} disponibles)`;
            selector.appendChild(option);
        });

        // Restaurar valor si aún existe
        if (valorActual) {
            selector.value = valorActual;
        }
    }

    // Renderizar resultado de préstamo
    static mostrarResultadoPrestamo(resultado) {
        const contenedorMensaje = document.getElementById('mensaje-prestamo');
        if (!contenedorMensaje) return;

        contenedorMensaje.innerHTML = '';

        if (resultado.exito) {
            const divResultado = document.createElement('div');
            divResultado.className = `resultado-prestamo ${resultado.evento.tipo}`;

            divResultado.innerHTML = `
                <h4>${resultado.evento.emoji} ${resultado.evento.mensaje}</h4>
                <p>Préstamo realizado por ${resultado.prestamo.diasPrestamo} días</p>
                <p>Fecha de devolución: ${resultado.prestamo.fechaDevolucion.toLocaleDateString()}</p>
            `;

            contenedorMensaje.appendChild(divResultado);

            // Ocultar después de 5 segundos
            setTimeout(() => {
                contenedorMensaje.innerHTML = '';
            }, 5000);
        } else {
            this.mostrarMensaje(resultado.mensaje || 'Error al realizar el préstamo', 'error', 'mensaje-prestamo');
        }
    }

    // Actualizar una estadística específica
    static actualizarEstadistica(elementId, valor) {
        const elemento = document.getElementById(elementId);
        if (elemento) {
            elemento.textContent = valor;
        }
    }

    // Renderizar búsqueda
    static renderizarResultadosBusqueda(libros) {
        const contenedor = document.getElementById('lista-libros');
        if (!contenedor) return;

        if (libros.length === 0) {
            contenedor.innerHTML = '<p class="sin-resultados">No se encontraron resultados</p>';
            return;
        }

        this.renderizarListaLibros(libros);
    }
}

export default DOMFacade;
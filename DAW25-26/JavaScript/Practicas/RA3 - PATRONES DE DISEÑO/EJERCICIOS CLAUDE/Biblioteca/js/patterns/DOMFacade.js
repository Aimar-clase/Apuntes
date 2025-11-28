


class DOMFacade {
    
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

    
    static obtenerDatosFormularioPrestamo() {
        return {
            usuario: document.getElementById('usuario-prestamo').value,
            libroISBN: document.getElementById('seleccionar-libro').value,
            diasPrestamo: document.getElementById('seleccionar-dias').value
        };
    }

    
    static limpiarFormulario(formId) {
        const form = document.getElementById(formId);
        if (form) {
            form.reset();
        }
    }

    
    static mostrarMensaje(mensaje, tipo, elementoId) {
        const elemento = document.getElementById(elementoId);
        if (!elemento) return;

        
        elemento.className = 'mensaje';

        
        if (tipo === 'exito') {
            elemento.classList.add('mensaje-exito');
        } else if (tipo === 'error') {
            elemento.classList.add('mensaje-error');
        } else if (tipo === 'advertencia') {
            elemento.classList.add('mensaje-advertencia');
        }

        
        elemento.textContent = mensaje;
        elemento.style.display = 'block';

        
        setTimeout(() => {
            elemento.style.display = 'none';
        }, 3000);
    }

    
    static crearElementoLibro(libro) {
        const divLibro = document.createElement('div');
        divLibro.className = 'libro-card';

        
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

    
    static renderizarListaLibros(libros) {
        const contenedor = document.getElementById('lista-libros');
        if (!contenedor) return;

        
        contenedor.innerHTML = '';

        if (libros.length === 0) {
            contenedor.innerHTML = '<p class="sin-libros">No hay libros en el catálogo</p>';
            return;
        }

        
        libros.forEach(libro => {
            const elementoLibro = this.crearElementoLibro(libro);
            contenedor.appendChild(elementoLibro);
        });
    }

    
    static actualizarSelectorLibros(libros) {
        const selector = document.getElementById('seleccionar-libro');
        if (!selector) return;

        
        const valorActual = selector.value;

        
        selector.innerHTML = '<option value="" disabled selected>Selecciona un libro</option>';

        
        libros.filter(libro => libro.hayDisponibilidad()).forEach(libro => {
            const option = document.createElement('option');
            option.value = libro.isbn;
            option.textContent = `${libro.titulo} - ${libro.autor} (${libro.copiasDisponibles} disponibles)`;
            selector.appendChild(option);
        });

        
        if (valorActual) {
            selector.value = valorActual;
        }
    }

    
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

            
            setTimeout(() => {
                contenedorMensaje.innerHTML = '';
            }, 5000);
        } else {
            this.mostrarMensaje(resultado.mensaje || 'Error al realizar el préstamo', 'error', 'mensaje-prestamo');
        }
    }

    
    static actualizarEstadistica(elementId, valor) {
        const elemento = document.getElementById(elementId);
        if (elemento) {
            elemento.textContent = valor;
        }
    }

    
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
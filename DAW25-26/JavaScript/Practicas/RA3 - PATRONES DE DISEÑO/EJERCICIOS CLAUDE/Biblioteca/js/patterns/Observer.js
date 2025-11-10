// patterns/Observer.js
// Patrón Observer - Permite que objetos se suscriban a eventos y sean notificados

export class Observable {
    constructor() {
        this.observadores = [];
    }

    // Método para agregar un observador
    subscribe(observador) {
        // Verificar que el observador tenga el método update
        if (typeof observador.update === 'function') {
            this.observadores.push(observador);
            console.log('Observador agregado');
        } else {
            console.error('El observador debe tener un método update');
        }
    }

    // Método para quitar un observador
    unsubscribe(observador) {
        const index = this.observadores.indexOf(observador);
        if (index > -1) {
            this.observadores.splice(index, 1);
            console.log('Observador eliminado');
        }
    }

    // Método para notificar a todos los observadores
    notify(evento, datos) {
        console.log(`Notificando evento: ${evento}`);
        this.observadores.forEach(observador => {
            observador.update(evento, datos);
        });
    }
}

// Observador de Estadísticas
export class EstadisticasObserver {
    update(evento, datos) {
        switch (evento) {
            case 'libro-agregado':
                this.actualizarEstadisticasLibros();
                break;
            case 'prestamo-realizado':
                this.actualizarEstadisticasPrestamos();
                break;
            case 'libros-borrados':
                this.resetearEstadisticas();
                break;
        }
    }

    actualizarEstadisticasLibros() {
        // Importamos BibliotecaManager aquí para evitar dependencia circular
        import('./BibliotecaManager.js').then(module => {
            const manager = module.BibliotecaManager.getInstance();
            const stats = manager.obtenerEstadisticas();

            document.getElementById('total-libros').textContent = stats.totalLibros;
            document.getElementById('libros-disponibles').textContent = stats.librosDisponibles;
        });
    }

    actualizarEstadisticasPrestamos() {
        import('./BibliotecaManager.js').then(module => {
            const manager = module.BibliotecaManager.getInstance();
            const stats = manager.obtenerEstadisticas();

            document.getElementById('libros-prestados').textContent = stats.librosPrestados;
            document.getElementById('libros-disponibles').textContent = stats.librosDisponibles;
        });
    }

    resetearEstadisticas() {
        document.getElementById('total-libros').textContent = '0';
        document.getElementById('libros-prestados').textContent = '0';
        document.getElementById('libros-disponibles').textContent = '0';
    }
}

// Observador del Catálogo
export class CatalogoObserver {
    update(evento, datos) {
        switch (evento) {
            case 'libro-agregado':
                this.renderizarCatalogo();
                break;
            case 'prestamo-realizado':
                this.renderizarCatalogo();
                break;
            case 'libros-borrados':
                this.limpiarCatalogo();
                break;
        }
    }

    renderizarCatalogo() {
        import('./BibliotecaManager.js').then(module => {
            const manager = module.BibliotecaManager.getInstance();
            const libros = manager.obtenerLibros();

            import('./DOMFacade.js').then(domModule => {
                domModule.default.renderizarListaLibros(libros);
            });
        });
    }

    limpiarCatalogo() {
        const listaLibros = document.getElementById('lista-libros');
        listaLibros.innerHTML = '';
    }
}
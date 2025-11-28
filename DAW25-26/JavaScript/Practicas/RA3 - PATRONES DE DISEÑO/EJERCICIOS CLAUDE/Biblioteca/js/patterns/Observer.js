


export class Observable {
    constructor() {
        this.observadores = [];
    }

    
    subscribe(observador) {
        
        if (typeof observador.update === 'function') {
            this.observadores.push(observador);
            console.log('Observador agregado');
        } else {
            console.error('El observador debe tener un método update');
        }
    }

    
    unsubscribe(observador) {
        const index = this.observadores.indexOf(observador);
        if (index > -1) {
            this.observadores.splice(index, 1);
            console.log('Observador eliminado');
        }
    }

    
    notify(evento, datos) {
        console.log(`Notificando evento: ${evento}`);
        this.observadores.forEach(observador => {
            observador.update(evento, datos);
        });
    }
}


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
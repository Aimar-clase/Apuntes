


export class Prestamo {
    constructor(libroId, usuario, diasPrestamo) {
        this.id = Date.now();
        this.libroId = libroId;
        this.usuario = usuario;
        this.fechaPrestamo = new Date();
        this.diasPrestamo = parseInt(diasPrestamo);
        this.fechaDevolucion = this.calcularFechaDevolucion();
        this.estado = this.generarEventoAleatorio();
        this.devuelto = false;
    }

    
    calcularFechaDevolucion() {
        const fecha = new Date();
        fecha.setDate(fecha.getDate() + this.diasPrestamo);
        return fecha;
    }

    
    generarEventoAleatorio() {
        const random = Math.random();

        if (random < 0.7) {
            return {
                tipo: 'exitoso',
                mensaje: '✅ Préstamo exitoso',
                emoji: '📚'
            };
        } else if (random < 0.9) {
            return {
                tipo: 'advertencia',
                mensaje: '⚠️ Usuario con retraso en devolución anterior - Requiere aprobación',
                emoji: '⏰'
            };
        } else {
            return {
                tipo: 'espera',
                mensaje: '📋 Libro reservado por otro usuario - En lista de espera',
                emoji: '⏳'
            };
        }
    }

    
    estaVencido() {
        return new Date() > this.fechaDevolucion && !this.devuelto;
    }

    
    diasRestantes() {
        if (this.devuelto) return 0;

        const hoy = new Date();
        const diferencia = this.fechaDevolucion - hoy;
        const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));

        return dias;
    }

    
    marcarComoDevuelto() {
        this.devuelto = true;
        this.fechaDevolucionReal = new Date();
    }
}
'use strict';



export class TiendaValidacion {

    static ValidName(nombre) {
        const nombreLimpio = nombre.trim()

        if (nombreLimpio.length === 0) {
            return false;
        }

        return true;

    }

    static validPrecio(precio) {
        const precioNumber = Number(precio);
        if (precio <= 0) {
            return false;
        }
        return true;
    }

    static validCantidad(cantidad) {
        const cantidadNumber = Number(cantidad);
        if (cantidad <= 0) {
            return false;
        }
        return true;
    }


}
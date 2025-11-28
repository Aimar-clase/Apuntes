'use strict';


export class Producto {
    constructor({ nombre, categoria, precio, cantidad }) {
        this.id = new Date().getTime();
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;
        this.cantidad = cantidad;
    }


}
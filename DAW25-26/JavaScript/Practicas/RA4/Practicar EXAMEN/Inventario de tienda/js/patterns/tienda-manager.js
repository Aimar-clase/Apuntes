'use strict';

import { StorageManager } from "../utils/Storage.js";
import { DomFacade } from "./DomFacade.js";
import { Producto } from "../models/Producto.js";
import { TiendaValidacion } from "../utils/Valid.js";


export class TiendaManager {
    constructor() {
        if (TiendaManager.instancia) return TiendaManager.instancia
        TiendaManager.instancia = this;
    }


    addProduct() {
        const producto = new Producto(DomFacade.get());
        const validarNombre = TiendaValidacion.ValidName(producto.nombre);
        const validarPrecio = TiendaValidacion.validPrecio(producto.precio);
        const validarCantidad = TiendaValidacion.validCantidad(producto.cantidad);

        if (validarNombre && validarPrecio && validarCantidad) {
            StorageManager.add(producto);
        } else {
            alert("El nombre no puede estar vacio y no puedes poner ningun numero negativo");
        }
    }

    renderList() {
        const productos = StorageManager.get();
        DomFacade.renderList(productos);
    }



}



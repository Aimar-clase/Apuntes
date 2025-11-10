import { esValido } from "../utils/validar.js";
import { añadirLibroLocalStorage, eliminarLibrosLocalStorage, obtenerLibrosLocalStorage } from "../storage/storageLibros.js"
import { Libro } from "../models/Libro.js";
import { infoFormLibro, infoFormPrestamo } from "./DOMFacade.js";
import { Prestamo } from "../models/Prestamo.js";

export function añadirLibro() {

    let libro = new Libro(infoFormLibro());
    const resultado = esValido(libro);

    if (resultado === true) {
        añadirLibroLocalStorage(libro);
    } else {
        alert(resultado);
    }
}

export function eliminarLibros() {
    eliminarLibrosLocalStorage();
    window.location.reload();
}

export function añadirPrestamo() {
    let prestamo = new Prestamo(infoFormPrestamo());
    alert(JSON.stringify(prestamo));
}

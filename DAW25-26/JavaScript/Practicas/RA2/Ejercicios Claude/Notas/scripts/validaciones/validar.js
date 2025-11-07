import { storageNotas } from "../localstorage/storageNotas.js";

export function validarDatos(nota) {

    


    if (nota.titulo.trim() === "" || nota.descripcion.trim() === "" || nota.categoria === "" || nota.fecha.trim() === "") {
        alert("Tienes un campo vacio");
    }else {
        storageNotas(nota);
    }
} 
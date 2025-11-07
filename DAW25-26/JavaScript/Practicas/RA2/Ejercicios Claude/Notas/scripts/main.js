import { Nota } from "./class/nota.js";
import { storageNotas } from "./localstorage/storageNotas.js";
import { validarDatos } from "./validaciones/validar.js";
const btnSubmit = document.getElementById("btn-submit");

btnSubmit.addEventListener("click", function () {

    const tituloNota = document.getElementById("titulo-nota").value;
    const descripcionNota = document.getElementById("descripcion").value;
    const categoria = document.getElementById("seleccion-categoria").value;
    const fechaVencimiento = document.getElementById("fecha-vencimiento").value;
    let nota = new Nota(tituloNota, descripcionNota, categoria, fechaVencimiento);
    storageNotas(nota);
    validarDatos(nota);

})
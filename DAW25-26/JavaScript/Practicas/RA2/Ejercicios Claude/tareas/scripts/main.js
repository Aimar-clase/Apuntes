'use strict';

import { Tarea } from "./clases/tarea.js";
import { almacenarTarea } from "./localStorage/almacenarTarea.js";
import { crearDomTarea } from "./ui/crearDOMTarea.js";
import { validarDatos } from "./validarDatos/validar.js";

const tituloTarea = document.getElementById("Titulo-Tarea");
const descripcionTarea = document.getElementById("Descripcion");
const prioridadTarea = document.getElementById("prioridad");
const btnSubmit = document.getElementById("btnSubmit");

window.addEventListener("load", function () {
    if (!(JSON.parse(localStorage.getItem('tareas')) === null)) {
        crearDomTarea();
    }
});


btnSubmit.addEventListener("click", function () {
    if (validarDatos(tituloTarea.value.trim(), descripcionTarea.value.trim())) {
        alert("INTRODUCE DATOS EN TODOS LOS CAMPOS");
    } else {
        let tarea = new Tarea(tituloTarea.value, descripcionTarea.value, prioridadTarea.value);
        almacenarTarea(tarea);
    }
});
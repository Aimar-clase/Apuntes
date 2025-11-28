'use strict';

import { GastosManager } from "./patterns/gastos-manager.js";

const btnSubmit = document.getElementById("btnSubmit");
const gestor = new GastosManager();
const filtro = document.getElementById("filtro");


btnSubmit.addEventListener("click", function () {
    gestor.addGasto();
});

document.addEventListener("DOMContentLoaded", function () {
    gestor.renderErrors();
    gestor.renderListGastos();
    gestor.renderStats();
});



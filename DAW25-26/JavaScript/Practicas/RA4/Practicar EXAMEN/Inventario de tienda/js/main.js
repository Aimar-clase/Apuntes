'use strict';

import { TiendaManager } from "./patterns/tienda-manager.js";

const btnSubmit = document.getElementById("btnSubmit");
const gestor = new TiendaManager();

btnSubmit.addEventListener("click", function () {
    gestor.addProduct();
})

document.addEventListener("DOMContentLoaded", function () {
    gestor.renderList();
});
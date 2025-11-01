"use strict";
import { analyzeNumbers } from "./scripts/analyzeNumbers.js";

window.addEventListener("load", function(){
    let numerosUsuario = prompt("Dame unos numeros separados por comas:");
    numerosUsuario = numerosUsuario.split(",");
    let objetoResultado = analyzeNumbers(numerosUsuario);

    const lista = document.createElement("ul");
    
    document.body.appendChild(lista);
    objetoResultado.forEach(function(objetos, clave){
        let li = document.createElement("li");
        li.textContent = clave + " : " + objetos;
        lista.appendChild(li);
    });
    
})
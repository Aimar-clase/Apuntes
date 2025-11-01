"use strict";
import {numeroValido} from "./validacionNumeros.js";
import { paresImpares } from "./paresImpares.js";
import { numerosUnicos } from "./unicos.js";
import { ordenar } from "./ordenar.js";
import { sumarNumeros } from "./sumaNumeros.js";

export function analyzeNumbers(numerosUsuario){
    let error = false;
    if (numeroValido(numerosUsuario) === true){
        numerosUsuario = numerosUsuario.map(Number);
        
    } else {
        alert(numeroValido(numerosUsuario));
        error = true;
    }
    if (!error) {
        const listaOriginal = numerosUsuario;
        let objetoResultado = new Map([
            ["Lista original", listaOriginal ],
            ["Pares", paresImpares(listaOriginal)[0]],
            ["Impares", paresImpares(listaOriginal)[1]],
            ["Unicos", numerosUnicos(listaOriginal)],
            ["Ordenados", ordenar(listaOriginal)],
            ["Suma", sumarNumeros(listaOriginal)]
        ]);

    return objetoResultado;
    }

}
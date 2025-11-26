'use strict';

export class DomFacade {


    static getValuesFromForm() {
        const usuario = document.getElementById("usuario").value;
        const password = document.getElementById("password").value;
        return { usuario, password };
    }

    static errorLoginInValidation() {
        const inputPass = document.getElementById("password");
        inputPass.setCustomValidity("");
        inputPass.setCustomValidity("Usuario o contraseña incorrectos");
        inputPass.reportValidity();
    };

    static errorUserEmpty() {
        const inputUsuario = document.getElementById("usuario")
        inputUsuario.setCustomValidity("");
        inputUsuario.setCustomValidity("El usuario no puede estar vacio");
    };

    static errorPasswordEmpty() {
        const inputPass = document.getElementById("usuario")
        inputPass.setCustomValidity("");
        inputPass.setCustomValidity("La contraseña no puede estar vacia");
    }


    static createWordInScreen(word){
        const parrafoPalabra = document.createElement("p");
        parrafoPalabra.style.position = "absolute";
        // parrafo.style.top = "50px";
        parrafo.style.left = "100px";
    }



}
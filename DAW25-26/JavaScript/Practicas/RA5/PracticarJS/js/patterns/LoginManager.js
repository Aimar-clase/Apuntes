'use strict';

import { Usuario } from "../models/usuario.js";
import { StorageManager } from "../storage/StorageManager.js";
import { DomFacade } from "./DomFacade.js";


export class LoginManager {
    constructor() {
        if (LoginManager.instancia) return LoginManager.instancia
        LoginManager.instancia = this;
    }

    checkIfUserExist() {
        const datos = DomFacade.getValuesFromForm();

        if (StorageManager.checkStorage() == true) {
            const usuarioValido = StorageManager.getUser();
            if (datos.usuario == usuarioValido.usuario && datos.password == usuarioValido.password) {
                window.location.replace('AtrapaLaPalabra.html');
            } else {
                DomFacade.errorLoginInValidation();
            }

        } else {
            let errores = 0;
            if (datos.usuario.trim().length === 0) {
                DomFacade.errorUserEmpty();
                errores++;
            }
            if (datos.password.trim().length === 0) {
                DomFacade.errorPasswordEmpty();
                errores++;
            }

            if (errores == 0) {
                const usuario = new Usuario(datos.usuario.trim(), datos.password.trim());
                StorageManager.addUserToLocalStorage(usuario);
            }
        }

    };

}
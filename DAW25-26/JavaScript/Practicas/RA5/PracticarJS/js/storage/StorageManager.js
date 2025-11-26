'use strict';

export class StorageManager {

    static getUser() {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        return usuario;
    }

    static checkStorage() {
        if (localStorage.getItem('usuario') != null) {
            return true;
        }
        return false;
    }

    static addUserToLocalStorage(usuario) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
    }

}
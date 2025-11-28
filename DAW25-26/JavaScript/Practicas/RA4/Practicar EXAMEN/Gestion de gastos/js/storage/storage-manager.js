'use strict';

export class StorageManager {

    static addGastoToStorage(gasto) {
        let gastos = JSON.parse(localStorage.getItem('gastos')) || [];
        gastos.push(gasto);
        localStorage.setItem('gastos', JSON.stringify(gastos));
    }

    static getGastosFromStorage() {
        return JSON.parse(localStorage.getItem('gastos')) || [];
    }

    static addErrors(errores) {
        sessionStorage.setItem('errores', JSON.stringify(errores));
    }

    static getErrors() {
        return JSON.parse(sessionStorage.getItem('errores')) || [];
    }

    static deleteErrors() {
        sessionStorage.removeItem('errores');
    }
}
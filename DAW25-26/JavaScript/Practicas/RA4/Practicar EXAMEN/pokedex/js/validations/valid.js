'use strict';


export class Validation {

    static nameValid(nombre) {

        if (nombre.trim().length === 0) {
            return false;
        }

        return true;
    }

    static levelValid(nivel) {
        let nivelNumber = Number(nivel);

        if (nivelNumber <= 0 || nivelNumber > 100) {
            return false;
        }

        return true;

    }

}

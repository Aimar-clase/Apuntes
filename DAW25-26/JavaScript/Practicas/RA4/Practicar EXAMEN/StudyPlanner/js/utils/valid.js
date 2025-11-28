'use strict';

export class validationTask {

    static validDesc(descripcion) {
        const descripcionLimpio = descripcion.trim();
        if (descripcionLimpio.length === 0) {
            return false;
        }
        return true;
    }

}
'use strict';

export class ValidGasto {


    static valid(gasto) {
        let errores = [];
        let conceptoLimpio = gasto.concepto.trim();
        let importeNumber = gasto.importe;
        if (conceptoLimpio.length === 0) {
            errores.push("El concepto no puede estar vacio");
        }

        if (importeNumber < 0) {
            errores.push("El importe tiene que ser positivo");
        }

        if (errores.length === 0) {
            return true;
        } else {
            return errores;
        }
    }
}
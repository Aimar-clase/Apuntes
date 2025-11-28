'use strict';

import { Gasto } from "../models/Gasto.js";
import { StorageManager } from "../storage/storage-manager.js";
import { statsByCategory } from "../utils/stadistics.js";
import { ValidGasto } from "../utils/validation.js";
import { DomFacade } from "./dom-facade.js";

export class GastosManager {
    constructor() {
        if (GastosManager.instancia) return GastosManager.instancia
        GastosManager.instancia = this;
    }

    addGasto() {
        let gasto = new Gasto(DomFacade.getValuesFromForm());
        let validacion = ValidGasto.valid(gasto);

        if (validacion === true) {
            StorageManager.addGastoToStorage(gasto);
            StorageManager.deleteErrors();

        } else {
            StorageManager.addErrors(validacion);
        }
    }

    renderErrors() {
        DomFacade.renderErrors(StorageManager.getErrors());
    }

    renderListGastos() {
        DomFacade.renderListGastos(StorageManager.getGastosFromStorage());
    }

    renderStats() {
        const datos = statsByCategory(StorageManager.getGastosFromStorage());
        DomFacade.renderStats(datos);
    }



}
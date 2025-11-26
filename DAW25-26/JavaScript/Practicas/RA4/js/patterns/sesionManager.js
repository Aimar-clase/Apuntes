'use strict';
export class sesionManager {
    constructor() {
        if (sesionManager.instancia) return sesionManager.instancia
        sesionManager.instancia = this;
    }
}
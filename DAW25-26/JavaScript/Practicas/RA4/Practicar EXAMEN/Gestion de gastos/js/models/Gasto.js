'use strict';

export class Gasto {
    constructor({ concepto, categoria, importe }) {
        this.id = new Date().getTime();
        this.concepto = concepto;
        this.categoria = categoria;
        this.importe = importe;
        this.fecha = new Date().toLocaleDateString();
    }

}
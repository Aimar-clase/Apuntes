'use strict';

export class DomFacade {


    static getValuesFromForm() {
        const concepto = document.getElementById("concepto").value;
        const categoria = document.getElementById("categoria").value;
        const importe = Number(document.getElementById("importe").value);
        return { concepto, categoria, importe };
    }

    static renderListGastos(gastos) {
        const contenedorGastos = document.getElementById("contenedor-gastos");
        let datos = gastos;
        gastos.forEach((gasto, indice) => {

            const articuloGasto = document.createElement("article");
            const conceptoEtiqueta = document.createElement("h2");
            const categoriaEtiqueta = document.createElement("p");
            const importeEtiqueta = document.createElement("p");
            const fechaEtiqueta = document.createElement("p");
            const btnBorrar = document.createElement("button");

            conceptoEtiqueta.textContent = "Concepto:" + " " + gasto.concepto;
            categoriaEtiqueta.textContent = "Categoria:" + " " + gasto.categoria;
            importeEtiqueta.textContent = "Importe:" + " " + gasto.importe;
            fechaEtiqueta.textContent = "Fecha:" + " " + gasto.fecha;
            btnBorrar.textContent = "Borrar";
            btnBorrar.classList.add("btnBorrar");
            btnBorrar.id = "btnBorrar";

            articuloGasto.append(conceptoEtiqueta, categoriaEtiqueta, importeEtiqueta, fechaEtiqueta, btnBorrar);
            contenedorGastos.appendChild(articuloGasto);
        });
    }

    static renderErrors(errores) {
        const formularioGastos = document.getElementById("Formulario-Gastos");
        errores.forEach(error => {
            const spanError = document.createElement("span");
            spanError.textContent = error;
            formularioGastos.appendChild(spanError);
        });
    }

    static renderStats(stats) {
        const contenedorEstadisticas = document.getElementById("contenedor-estadisticas");

        stats.forEach(stat => {
            const etiquetaEstadistica = document.createElement("p");
            etiquetaEstadistica.textContent = "Categoria: " + stat[0] + " " + "Total: " + stat[1];
            contenedorEstadisticas.appendChild(etiquetaEstadistica);
        })
    }




}
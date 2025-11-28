'use strict';


export function statsByCategory(datos) {
    let mapaDatos = new Map();
    let arrayDatosProcesados = [];
    datos.forEach(dato => {
        if (mapaDatos.has(dato.categoria)) {
            mapaDatos.set(dato.categoria, mapaDatos.get(dato.categoria) + dato.importe)
        } else {
            mapaDatos.set(dato.categoria, dato.importe);
        }
    });

    mapaDatos.forEach((importe, categoria) => {
        arrayDatosProcesados.push([categoria, importe]);
    })

    return arrayDatosProcesados;
}

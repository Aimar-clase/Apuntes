"use strict";
export function ordenar(nums){

    let ordenados = [...nums];
    return ordenados.sort((a, b) => b - a);

}
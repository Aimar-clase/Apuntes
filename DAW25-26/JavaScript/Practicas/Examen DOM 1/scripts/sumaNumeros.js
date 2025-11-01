"use strict";
export function sumarNumeros(nums) {
    let sumados = 0;
    for (let i = 0; i < nums.length; i++) {
        sumados += nums[i];
    }
    return sumados;
}
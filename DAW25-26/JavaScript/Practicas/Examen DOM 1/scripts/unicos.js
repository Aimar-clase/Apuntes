"use strict";
export function numerosUnicos(nums) {
    let unicos = new Set(nums);
    return [...unicos];
}
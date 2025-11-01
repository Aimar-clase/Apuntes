"use strict";
export function paresImpares(nums) {
     
    let pares = [];
    let impares = [];

    for (let i = 0; i < nums.length; i++) {

        if (nums[i] % 2 === 0) {
            pares.push(nums[i]);
        }else{
            impares.push(nums[i]);
        }
        
    }

    return [pares, impares];
}
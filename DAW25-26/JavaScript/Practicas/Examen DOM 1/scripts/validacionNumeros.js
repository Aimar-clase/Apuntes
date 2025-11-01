"use strict";
export function numeroValido(nums){

    for (let i = 0; i < nums.length; i++) {
        if (isNaN(nums[i])) {
            return "ERROR el " + nums[i] + " no es un numero"
        }
        
    }
    return true;

}
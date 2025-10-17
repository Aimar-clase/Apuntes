
// Se te da un arreglo de enteros nums y un entero target. Debes encontrar
// dos números distintos en nums cuya suma sea igual a target. Devuelve sus
// índices como un arreglo [i, j]. Se asume que existe exactamente una
// solución.

// Objetivo:
// Encontrar los índices i y j donde nums[i] + nums[j] === target.

function buscarTarget(nums, target){

    let encontrado = false;
    let indicesEncontrados = [];
    
        for (let i = 0; i < nums.length; i++) {
            while(!encontrado){
                for (let j = 0; j < nums.length; j++) {
                    if (nums[i] + nums[j] === target){
                        encontrado = true;
                        indicesEncontrados.push(i, j);
                    }
                }    
            }
            
        }
    

    return indicesEncontrados;
}

console.log(buscarTarget([1,7,5,2],6));
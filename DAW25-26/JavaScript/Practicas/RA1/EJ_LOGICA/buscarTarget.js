








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
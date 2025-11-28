const nums = [12, 23, 31, 45, 100];
console.log(digitosPrimos(nums));

function digitosPrimos(nums){
    let arrayPrimos = [];

    
    for (let i = 0; i < nums.length; i++) {
        let numeroToString = nums[i].toString();
        let sumaDigitos = 0;
        
        
        for (let j = 0; j < numeroToString.length; j++) {
            sumaDigitos += Number(numeroToString.charAt(j));
        }
        
        
        if (esPrimo(sumaDigitos)) {
            arrayPrimos.push(nums[i]);
        }
    }

    
    arrayPrimos.sort((a, b) => a - b);
    
    return arrayPrimos;
}

function esPrimo(numero) {
    
    if (numero <= 1) return false;
    if (numero === 2) return true;
    if (numero % 2 === 0) return false;
    
    
    let limite = Math.floor(Math.sqrt(numero));
    
    
    for (let i = 3; i <= limite; i += 2) {
        if (numero % i === 0) {
            return false; 
        }
    }
    
    return true; 
}
const nums = [12, 23, 31, 45, 100];
console.log(digitosPrimos(nums));

function digitosPrimos(nums){
    let arrayPrimos = [];

    // Recorrer cada número del array
    for (let i = 0; i < nums.length; i++) {
        let numeroToString = nums[i].toString();
        let sumaDigitos = 0;
        
        // Sumar todos los dígitos
        for (let j = 0; j < numeroToString.length; j++) {
            sumaDigitos += Number(numeroToString.charAt(j));
        }
        
        // Verificar si la suma es un número primo
        if (esPrimo(sumaDigitos)) {
            arrayPrimos.push(nums[i]);
        }
    }

    // Ordenar de menor a mayor
    arrayPrimos.sort((a, b) => a - b);
    
    return arrayPrimos;
}

function esPrimo(numero) {
    // Casos especiales
    if (numero <= 1) return false;
    if (numero === 2) return true;
    if (numero % 2 === 0) return false;
    
    // Calcular el límite (raíz cuadrada)
    let limite = Math.floor(Math.sqrt(numero));
    
    // Comprobar divisibilidad desde 3 hasta el límite (solo impares)
    for (let i = 3; i <= limite; i += 2) {
        if (numero % i === 0) {
            return false; // Encontró un divisor, NO es primo
        }
    }
    
    return true; // No encontró divisores, ES primo
}
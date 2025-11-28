function productoDigito(num){
    let numeroString = num.toString();
    let contadorPasos = 0;
    
    if (num < 10) return 0;

    while (numeroString.length > 1){
        let arrayDigitos = [];  
        let digito = 1;          
        
        contadorPasos++;
        
        for (let i = 0; i < numeroString.length; i++) {
            arrayDigitos.push(Number(numeroString.charAt(i)));
        }

        for (let j = 0; j < arrayDigitos.length; j++) {
            digito *= arrayDigitos[j];
        }
        
        
        
        numeroString = digito.toString();
    }
    
    return contadorPasos;
}
console.log(productoDigito(999));
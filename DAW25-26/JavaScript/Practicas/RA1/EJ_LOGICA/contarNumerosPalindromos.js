


function esPalindromo(cadena){
    
    let esPalindromo = true;

    if (cadena.length === 1){
        esPalindromo = true;

    }else{
            for (let i = 0; i <= cadena.length / 2; i++) {

                if (!(cadena.charAt(i) === cadena.charAt(cadena.length - 1 - i))){
                    esPalindromo = false;
                }
            }
    }



    return esPalindromo;
}


function contarPalindromos(numero){
    
    let contador = 0;
    for (let i = 1; i < numero; i++) {
        if (esPalindromo(i.toString())){
            contador++;
        }
        
    }
    return contador;
}
console.log(contarPalindromos(111)); 
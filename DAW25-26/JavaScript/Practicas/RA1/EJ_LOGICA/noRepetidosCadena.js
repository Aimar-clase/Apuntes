// Subcadena más Larga sin Caracteres Repetidos
// LeetCode #3
// Descripción:
// Dada una cadena s, encuentra la longitud de la subcadena más larga que
// no tenga caracteres repetidos.
// Objetivo:
// Devolver la longitud máxima de una subcadena con todos los caracteres
// únicos.



function noRepetidos(s){
    let subcadena = "";
    let cadenaMaxima = "";
    let contador = 0;
    let contadorMaximo = 0;
    for (let i = 0; i < s.length; i++) {
        subcadena = s.charAt(i);
        for (let j = i + 1; j < s.length; j++) {
            if (contador > contadorMaximo){
                contadorMaximo = contador;
                cadenaMaxima = subcadena;
            }
            
            if (subcadena.includes(s.charAt(j))){
                contador = 0;
                subcadena = "";
            } else {
                subcadena = subcadena.concat(s.charAt(j));
                contador++;
            }
            
        }

    }
    return contadorMaximo + " " + cadenaMaxima;
}
console.log(noRepetidos("abcabcbb"));
console.log(noRepetidos("pwwkew"));  // esperado: 3 ("wke")
console.log(noRepetidos("aab"));    // esperado: 2 ("ab")
console.log(noRepetidos("dvdf"));   // esperado: 3 ("vdf")


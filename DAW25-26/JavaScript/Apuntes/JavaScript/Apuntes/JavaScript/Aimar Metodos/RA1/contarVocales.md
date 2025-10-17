

```js
/*  Haz una función que calcule y devuelva el número de vocales en la

cadena dada. Consideraremos a, e, i, o, u como vocales. La cadena de

entrada sólo consta de letras minúsculas y/o espacios. */

  

function contarVocales(texto){

  

    let vocales = ['a','e','i','o','u'];

    let contador = 0;

  

    for(i = 0; i <= texto.length; i++){

        if(vocales.includes(texto.charAt(i))){

            contador++;

        }

    }

  
  

    return contador;

}

  

console.log(contarVocales("Aimar"));



```
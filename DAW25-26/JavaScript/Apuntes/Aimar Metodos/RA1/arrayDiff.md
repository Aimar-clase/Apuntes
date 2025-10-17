```js
/*

Implementa una función de diferencia, que devuelva un array que

tenga todos los valores de la lista pasada como primer parámetro

que no están presentes en la lista b manteniendo su orden. Si un

valor está presente en b, todas sus apariciones deben ser eliminadas

de la otra:

arrayDiff([1,2],[1]) == [2]

arrayDiff([1,2,2,2,3],[2]) == [1,3]

  

*/

  

function arrayDiff(arrayA, arrayB){

  

    let arrayDiff = [];

    for(let i = 0; i < arrayA.length; i++){

        if (!arrayB.includes(arrayA[i])) {

            arrayDiff.push(arrayA[i]);

        }

        }

        return arrayDiff;

    }

console.log(arrayDiff([1,2,2,3], [1,3,2]));
```
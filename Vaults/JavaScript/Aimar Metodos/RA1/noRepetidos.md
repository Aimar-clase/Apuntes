```js
/*

Implementar la función que toma como argumento una secuencia de

enteros o string y devuelve una lista de elementos sin ningún

elemento repetido y preservando el orden original de los elementos.

*/


function noRepetidos(...array){

    return noDuplicados = [...new Set(array)]

}


console.log(noRepetidos('a', 1, 'a', 3, 2, 'b', 'c', 2, 1));
```
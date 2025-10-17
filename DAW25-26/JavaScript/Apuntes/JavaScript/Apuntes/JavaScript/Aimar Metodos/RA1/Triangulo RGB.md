```js
/*

13.Ejercicio colorear triángulo

Un triángulo de color se crea a partir de una fila de colores, cada uno de los

cuales es rojo, verde o azul. Las filas sucesivas, cada una con un color

menos que la anterior, se generan considerando los dos colores que se

tocan en la fila anterior.

Si estos colores son idénticos, se utiliza el mismo color en la nueva fila. Si

son diferentes, se utiliza el color que falta en la nueva fila. Así se continúa

hasta que se genera la última fila, con un solo color.

*/

  

function trianguloRGB(cadena) {

  

let colores = ["R", "G", "B"];

let arrayFila = [];

let arrayFilaActual = cadena;

let arrayTodasLasFilas = [];

  

arrayTodasLasFilas.push(arrayFilaActual);

while (arrayFilaActual.length > 1) {

    arrayFila = [];

    for (let i = 0; i < arrayFilaActual.length - 1; i++) {

    let a = arrayFilaActual[i];

    let b = arrayFilaActual[i + 1];

    if (a === b ){

        arrayFila.push(a);

    } else {

        for (let color of colores){

            if (! [a,b].includes(color)){

                arrayFila.push(color);

            }

        }

    }

}

arrayFilaActual = arrayFila.join("")

console.log(arrayFilaActual);

arrayTodasLasFilas.push(arrayFilaActual);

}

  

}

  
  

console.log(trianguloRGB("RRGBRGBB"));
```
/*

Dada un array de enteros, encuentra todo los números que aparecen

un número impar de veces.

 */

function repeticionesNumero(array) {
  let contador = 0;

  let numRepeticion = [];

  for (let i = 0; i < array.length; i++) {
    contador = 0;

    for (let j = 0; j < array.length; j++) {
      if (array[i] == array[j]) {
        contador++;
      }
    }

    let existeNumero = numRepeticion.find((rep) => rep[0] === array[i]);

    if (!existeNumero) {
      numRepeticion.push([array[i], contador]);
    }
  }

  return numRepeticion;
}

function repeticionesImpares(array) {
  let repetidosImpares = [];

  for (let i = 0; i < array.length; i++) {
    let numero = array[i][1];

    if (numero % 2 == 1) {
      repetidosImpares.push(array[i]);
    }
  }

  return repetidosImpares;
}

console.log(
  repeticionesImpares(repeticionesNumero([1, 2, 3, 4, 1, 1, 2, 3, 4, 5, 2]))
);

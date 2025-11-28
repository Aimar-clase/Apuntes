

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

function menorNumero(array) {
  let menorNumero = 0;

  let menorRepeticion = 0;

  for (let i = 0; i < array.length; i++) {
    let numero = array[i][0];

    let repeticiones = array[i][1];

    if (
      i === 0 ||
      repeticiones < menorRepeticion ||
      (repeticiones === menorRepeticion && numero < menorNumero)
    ) {
      menorNumero = numero;

      menorRepeticion = repeticiones;
    }
  }

  return menorNumero + "," + menorRepeticion;
}

console.log(menorNumero(repeticionesNumero([1, 3, 1, 2, 1, 3, 2, 2])));

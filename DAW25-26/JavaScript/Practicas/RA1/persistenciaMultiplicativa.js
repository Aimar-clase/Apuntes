/*

Escribe una función que tome un parámetro positivo num y devuelva

su persistencia multiplicativa, que es el número de veces que debes

multiplicar los dígitos de num hasta llegar a un solo dígito.

*/

function persistenciaMultiplicativa(num) {
  if (num < 0) {
    return "ERROR";
  }

  num = String(num);

  let contador = 0;

  while (num.length > 1) {
    let numerosMultiplicativos = 1;

    let digitos = [];

    for (let i = 0; i < num.length; i++) {
      digitos.push(num.charAt(i));
    }

    for (let j = 0; j < digitos.length; j++) {
      numerosMultiplicativos *= Number(digitos[j]);
    }

    num = String(numerosMultiplicativos);

    contador++;
  }

  return contador;
}

console.log(persistenciaMultiplicativa(4));

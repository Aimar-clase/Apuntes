/*

Escriba una función que tome un número decimal como entrada, y

devuelva el número de bits que son iguales a uno en la

representación binaria de ese número. Comprueba que la entrada no

sea negativa.

*/

function contarBinario(decimal) {
  if (decimal >= 0) {
    let binario = decimal.toString(2);

    let bits = 0;

    for (let i = 0; i < binario.length; i++) {
      if (binario.charAt(i) == 1) {
        bits++;
      }
    }

    return bits;
  } else {
    return "ERROR";
  }
}

console.log(contarBinario(25));

console.log(contarBinario(-1));

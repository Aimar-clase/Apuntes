

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

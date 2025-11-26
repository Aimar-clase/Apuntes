

function contarVocales(texto) {
  let vocales = ["a", "e", "i", "o", "u"];

  let contador = 0;

  for (i = 0; i <= texto.length; i++) {
    if (vocales.includes(texto.charAt(i))) {
      contador++;
    }
  }

  return contador;
}

console.log(contarVocales("Aimar"));

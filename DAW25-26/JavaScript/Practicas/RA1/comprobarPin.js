/*

Los cajeros automáticos permiten códigos PIN de 4 o 6 dígitos y los

códigos PIN no pueden contener más que exactamente 4 dígitos o

exactamente 6 dígitos. Si a la función se le pasa una cadena de PIN

válida, devuelve true, de lo contrario devuelve false.

*/

function comprobarPin(codigoPin) {
  codigoPin = codigoPin.toString();

  let pinValido = false;

  let contador = 0;

  for (let i = 0; i < codigoPin.length; i++) {
    if (codigoPin.charAt(i) >= 0 && codigoPin.charAt(i) <= 9) {
      contador++;
    }
  }

  if (contador == 4 || contador == 6) {
    pinValido = true;
  }

  return pinValido;
}

console.log(comprobarPin(1334));



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

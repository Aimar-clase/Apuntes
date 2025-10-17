/*

Escribe una función que tenga como parámetro un array de números

enteros. Tu trabajo es tomar esa array y encontrar un índice N en el

que la suma de los enteros a la izquierda de N sea igual a la suma de

los enteros a la derecha de N. Si no hay ningún índice que haga que

esto ocurra, devuelve -1. Si se le da un array con múltiples

respuestas, devuelve el menor índice correcto.

  

*/

function izquierdaDerecha(array) {
  let arrayList = array;

  let parteIzquierda = 0;

  let parteDerecha;

  let sumaTotal = 0;

  let sonIguales = false;

  for (let i = 0; i < arrayList.length; i++) {
    sumaTotal += arrayList[i];
  }

  for (let j = 0; j < arrayList.length; j++) {
    parteDerecha = sumaTotal - parteIzquierda - arrayList[j];

    if (parteIzquierda === parteDerecha) {
      sonIguales = true;
    }

    parteIzquierda += arrayList[j];
  }

  return sonIguales;
}

console.log(izquierdaDerecha([1, 2, 3, 4, 3, 2, 1]));



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

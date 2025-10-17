// Descripción:
// Se te da un arreglo de enteros no negativos donde cada valor representa la
// altura de una línea vertical sobre el eje X. El objetivo es encontrar dos líneas
// que, junto con el eje X, formen un contenedor que pueda contener la mayor
// cantidad posible de agua.
// Objetivo:
// Maximizar el área formada por dos líneas y el eje X.

function putoCubo(heights) {
  if (!Array.isArray(heights) || heights.length < 2) return 0;

  let i = 0;
  let j = heights.length - 1;
  let max = 0;

  while (i < j) {
    const h = heights[i] < heights[j] ? heights[i] : heights[j];
    const width = j - i;
    const area = h * width;

    if (area > max) {
      max = area;
    }

    if (heights[i] < heights[j]) {
      i += 1;
    } else if (heights[i] > heights[j]) {
      j -= 1;
    } else {
      j -= 1;
    }
  }

  return max;
}

// Caso clásico
console.log(putoCubo([1, 8, 6, 2, 5, 4, 8, 3, 7])); // -> 49
// Mínimo tamaño válido
console.log(putoCubo([1, 1])); // -> 1
// Bordes altos iguales
console.log(putoCubo([4, 3, 2, 1, 4])); // -> 16
// Pico en el centro
console.log(putoCubo([1, 2, 1])); // -> 2
// Alturas muy desiguales en el centro
console.log(putoCubo([2, 3, 4, 5, 18, 17, 6])); // -> 17
// Todos iguales
console.log(putoCubo([2, 2, 2, 2, 2])); // -> 8
// Todos ceros
console.log(putoCubo([0, 0, 0, 0])); // -> 0
// Creciente
console.log(putoCubo([0, 1, 2, 3, 4, 5])); // -> 6
// Decreciente
console.log(putoCubo([5, 4, 3, 2, 1, 0])); // -> 6
// Array de tamaño 1 (sin contenedor posible)
console.log(putoCubo([3])); // -> 0
// Mixto con máximo lejos
console.log(putoCubo([3, 9, 3, 4, 7, 2, 12, 6])); // -> 45
// Pico muy alto al final
console.log(putoCubo([1, 3, 2, 5, 25, 24, 5])); // -> 24
// Alturas variadas
console.log(putoCubo([6, 9, 3, 4, 5, 8])); // -> 32

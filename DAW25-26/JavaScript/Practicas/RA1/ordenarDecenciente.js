/*

Haz una función que pueda tomar cualquier número entero no

negativo como argumento y devolverlo con sus dígitos en orden

descendente. Esencialmente, reordenar los dígitos para crear el

mayor número posible.

*/

function ordenarDecenciente(num) {
  let numToString = String(num);

  let arrayDescendiente = [];

  let numDescendiente = "";

  for (let i = 0; i < numToString.length; i++) {
    arrayDescendiente.push(numToString.charAt(i));
  }

  arrayDescendiente.sort((a, b) => b - a);

  numDescendiente = arrayDescendiente.join("");

  return Number(numDescendiente);
}

console.log(ordenarDecenciente(849672935633));

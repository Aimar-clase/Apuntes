

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

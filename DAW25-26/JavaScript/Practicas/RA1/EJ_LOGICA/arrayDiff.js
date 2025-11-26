

function arrayDiff(arrayA, arrayB) {
  let arrayDiff = [];

  for (let i = 0; i < arrayA.length; i++) {
    if (!arrayB.includes(arrayA[i])) {
      arrayDiff.push(arrayA[i]);
    }
  }

  return arrayDiff;
}

console.log(arrayDiff([1, 2, 2, 2, 3], [2]));

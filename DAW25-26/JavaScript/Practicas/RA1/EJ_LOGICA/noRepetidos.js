

function noRepetidos(...array) {
  return (noDuplicados = [...new Set(array)]);
}

console.log(noRepetidos("a", 1, "a", 3, 2, "b", "c", 2, 1));

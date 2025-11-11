let array = [[1, 2], [3, 4], [5, 6]]
let numero = [3, 4];

const indice = array.findIndex(
    Element => JSON.stringify(Element) === JSON.stringify(numero)
);

if (indice !== -1) {
    array.splice(indice, 1);
}

console.log(array);

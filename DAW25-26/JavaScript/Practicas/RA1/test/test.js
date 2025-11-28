function elementoAleatorio(array) {
    return array[Math.floor(Math.random() * array.length)];
}

const colores = ["rojo", "verde", "azul", "amarillo"];
console.log(elementoAleatorio(colores)); 
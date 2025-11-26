const palabras = [
    "manzana", "bicicleta", "elefante", "guitarra", "montaña",
    "océano", "teclado", "universo", "chocolate", "mariposa",
    "aventura", "silencio", "esperanza", "brújula", "camino",
    "destino", "horizonte", "misterio", "recuerdo", "felicidad"
];


function palabrasRandom(diccionario) {
    return Math.floor(Math.random() * diccionario.length)
}

console.log(palabras[palabrasRandom(palabras)]);
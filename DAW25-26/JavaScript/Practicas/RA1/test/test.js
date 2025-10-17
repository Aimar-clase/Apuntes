function contarVocales(cadena) {

    let vocales = ["a", "e","i","o","u"];
    let contador = 0;
    for (let i = 0; i < cadena.length; i++) {
        if (vocales.includes(cadena.charAt(i)))
            contador++;
    }
    return contador;
}

console.log(contarVocales("Aimar"));

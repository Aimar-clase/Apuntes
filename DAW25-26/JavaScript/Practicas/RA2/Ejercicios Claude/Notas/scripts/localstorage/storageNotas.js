export function storageNotas(nota) {

    let arrayNotas = JSON.parse(localStorage.getItem('notas')) || [];
    arrayNotas.unshift(nota);
    localStorage.setItem('notas', JSON.stringify(arrayNotas));

} 
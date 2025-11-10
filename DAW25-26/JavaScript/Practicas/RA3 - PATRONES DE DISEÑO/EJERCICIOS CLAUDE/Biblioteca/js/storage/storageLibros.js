export function añadirLibroLocalStorage(libro) {
    let arrayLibros = JSON.parse(localStorage.getItem('libros')) || [];
    arrayLibros.push(libro);
    localStorage.setItem('libros', JSON.stringify(arrayLibros));
}

export function eliminarLibrosLocalStorage() {
    localStorage.removeItem('libros');
}

export function obtenerLibrosLocalStorage() {
    return JSON.parse(localStorage.getItem('libros'));
}

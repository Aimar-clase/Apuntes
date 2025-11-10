
export function infoFormLibro() {
    const titulo = document.getElementById("titulo-libro").value;
    const autor = document.getElementById("autor").value;
    const genero = document.getElementById("select-genero").value;
    const isbn = document.getElementById("isbn").value;
    const añoPublicacion = document.getElementById("año-publicacion").value;
    const copiasDisponibles = document.getElementById("copias-disponibles").value;
    return { titulo, autor, genero, isbn, añoPublicacion, copiasDisponibles };
}

document.addEventListener("DOMContentLoaded", () => {
    crearListado();
    crearSeleccionPrestamo()
});

function crearListado() {
    if (localStorage.getItem('libros')) {
        const seccionCatalogo = document.getElementById("catalogo");
        const libros = JSON.parse(localStorage.getItem('libros'));

        libros.forEach(libro => {
            const contenedorLibro = document.createElement("div");
            contenedorLibro.classList.add("libro");


            const etiquetaTitulo = document.createElement("h2");
            etiquetaTitulo.textContent = libro.titulo;
            contenedorLibro.appendChild(etiquetaTitulo);


            for (const key in libro) {
                if (key !== 'titulo') {
                    const etiqueta = document.createElement("p");
                    etiqueta.textContent = `${key}: ${libro[key]}`;
                    contenedorLibro.appendChild(etiqueta);
                }
            }
            seccionCatalogo.appendChild(contenedorLibro);
        });
    }
}


// DOM DEL PRESTAMO

export function infoFormPrestamo() {
    const usuario = document.getElementById("usuario-prestamo").value;
    const libro = document.getElementById("seleccionar-libro").value;
    const diasPrestamo = document.getElementById("seleccionar-dias").value;
    return { usuario, libro, diasPrestamo };
}

function crearSeleccionPrestamo() {
    const libroSeleccionado = document.getElementById("seleccionar-libro");
    const libros = JSON.parse(localStorage.getItem('libros'));

    libros.forEach(libro => {
        const opcion = document.createElement("option");
        opcion.textContent = libro.titulo;
        opcion.value = libro.titulo;
        libroSeleccionado.appendChild(opcion);
    })

}


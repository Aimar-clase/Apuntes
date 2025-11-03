const seccionLibros = document.getElementById("seccionLibros");
addEventListener("DOMContentLoaded", function () {

    let datos = JSON.parse(localStorage.getItem('libros'));


    datos.forEach(function (libro) {
        const divLibro = document.createElement("div");
        seccionLibros.appendChild(divLibro);
        divLibro.classList.add("divLibro");

        const TituloLibro = document.createElement("h2");
        divLibro.appendChild(TituloLibro);
        TituloLibro.textContent = libro.nombre;
        TituloLibro.classList.add("TituloLibro");

        const numeroPaginas = document.createElement("p");
        divLibro.appendChild(numeroPaginas);
        numeroPaginas.textContent = "Numero de paginas: " + libro.numPaginas;
        numeroPaginas.classList.add("numeroPaginas");

        const prestado = document.createElement("p");
        divLibro.appendChild(prestado);
        prestado.textContent = "¿Ha sido prestado? " + libro.prestado;
        prestado.classList.add("prestado");
    });





})
import { Libro } from './Clases/Libro.js'

let btnEnviar = document.getElementById("btnEnviarDatos");
let inputNombreLibro = document.getElementById("inputNombre");
let inputNumPaginas = document.getElementById("inputNumPaginas");
let inputPrestado = document.getElementById("inputPrestado");

btnEnviar.addEventListener("click", function () {


    let nombreLibro = inputNombreLibro.value;

    let numPaginas = inputNumPaginas.value;
    let prestado = inputPrestado.checked;
    let libro = new Libro(nombreLibro, numPaginas, prestado);

    let libros = JSON.parse(localStorage.getItem('libros')) || [];
    libros.push(libro);

    localStorage.setItem('libros', JSON.stringify(libros));
})
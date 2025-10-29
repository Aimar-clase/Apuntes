import {Libro} from './Clases/Libro.js'

let btnEnviar = document.getElementById("btnEnviarDatos");
let inputNombreLibro = document.getElementById("inputNombre");
let inputNumPaginas = document.getElementById("inputNumPaginas");
let inputPrestado = document.getElementById("inputPrestado");

btnEnviar.addEventListener("click", function(){

    let libro = new Libro();
    let nombreLibro = inputNombreLibro.value;

    let numPaginas = inputNumPaginas.value;
    let prestado = inputPrestado.checked;
    
    libro.nombre = nombreLibro;
    libro.numPaginas = numPaginas;
    libro.prestado = prestado;
    localStorage.setItem('libro', JSON.stringify(libro))
})
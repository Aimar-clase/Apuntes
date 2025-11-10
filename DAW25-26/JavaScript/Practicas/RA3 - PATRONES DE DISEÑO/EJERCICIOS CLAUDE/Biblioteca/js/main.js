import { añadirLibro, eliminarLibros, añadirPrestamo } from "./patterns/BibliotecaManager.js";



const btnSubmit = document.getElementById("btnSubmit");
const btnBorrar = document.getElementById("btnBorrar");
const btnPrestamo = document.getElementById("btnPrestamo");

btnSubmit.addEventListener("click", añadirLibro);
btnBorrar.addEventListener("click", eliminarLibros);
btnPrestamo.addEventListener("click", añadirPrestamo);
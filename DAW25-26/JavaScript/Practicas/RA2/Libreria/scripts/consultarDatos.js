
let contenedorLibros = document.getElementById("contenedorLibros");

addEventListener("DOMContentLoaded", function(){

    let datos = JSON.parse(localStorage.getItem('libro'));
    let parrafo = document.createElement("p");
    contenedorLibros.appendChild(parrafo);
    
    let tabla = document.createElement("table");

    alert(datos.nombre);

})
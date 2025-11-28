'use strict';


export class DomFacade {

    static get() {
        const nombre = document.getElementById("nombre-producto").value;
        const categoria = document.getElementById("select-categoria").value;
        const precio = Number(document.getElementById("precio-producto").value);
        const cantidad = Number(document.getElementById("cantidad-producto").value);

        return { nombre, categoria, precio, cantidad };
    }


    static renderList(productos) {
        const divListado = document.getElementById("div-listado");
        if (productos.length === 0) {
            const emptyList = document.createElement("span");
            emptyList.textContent = "No hay ningun producto";
            divListado.appendChild(emptyList);
        } else {

            productos.forEach(producto => {
                const articuloProducto = document.createElement("article");
                const nombreEtiqueta = document.createElement("h2");
                const categoriaEtiqueta = document.createElement("p");
                const precioEtiqueta = document.createElement("p");
                const cantidadEtiqueta = document.createElement("p");

                nombreEtiqueta.textContent = "Nombre: " + producto.nombre;
                categoriaEtiqueta.textContent = "Categoria: " + producto.categoria;
                precioEtiqueta.textContent = "Precio: " + producto.precio;
                cantidadEtiqueta.textContent = "Cantidad: " + producto.cantidad;

                articuloProducto.append(nombreEtiqueta, categoriaEtiqueta, precioEtiqueta, cantidadEtiqueta);
                divListado.appendChild(articuloProducto);
            });
        }

    }


}
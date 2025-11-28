'use strict';



export class DomFacade {


    static getPokemonFromForm() {
        const nombre = document.getElementById("nombrePokemon").value;
        const tipo = document.getElementById("tipoPokemon").value;
        const nivel = document.getElementById("nivelPokemon").value;

        return { nombre, tipo, nivel };
    }


    static displayErrors(errores) {
        const divFormulario = document.getElementById("div-formulario");
        errores.forEach(error => {
            const pError = document.createElement("p");
            pError.textContent = error;
            divFormulario.appendChild(pError);
        });
    }


    static displayPokemons(pokemons) {
        const divPokemons = document.getElementById("div-pokemons");

        pokemons.forEach(pokemon => {
            const pokemonArticulo = document.createElement("article");
            const nombreEtiqueta = document.createElement("h2");
            const tipoEtiqueta = document.createElement("p");
            const nivelEtiqueta = document.createElement("p");
            const fechaEtiqueta = document.createElement("p");

            nombreEtiqueta.textContent = pokemon.nombre;
            tipoEtiqueta.textContent = pokemon.tipo;
            nivelEtiqueta.textContent = pokemon.nivel;
            fechaEtiqueta.textContent = pokemon.fechaCapturado;

            pokemonArticulo.append(nombreEtiqueta, tipoEtiqueta, nivelEtiqueta, fechaEtiqueta);
            divPokemons.appendChild(pokemonArticulo);
        })


    }


    static displayStadistics(pokemons) {
        const divEstadisticas = document.getElementById("div-estadisticas");
        pokemons.forEach(tipo => {
            const etiquetaTipo = document.createElement("p");
            etiquetaTipo.textContent = tipo[0] + " Promedio: " + tipo[1]
            divEstadisticas.appendChild(etiquetaTipo);
        })

    }
}
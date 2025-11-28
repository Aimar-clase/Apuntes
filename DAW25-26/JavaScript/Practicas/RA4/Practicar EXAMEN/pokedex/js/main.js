
import { PokemonManger } from "./patterns/pokemon-manager.js";

const btnEnviar = document.getElementById("btnEnviar");
const pokemonManger = new PokemonManger();


btnEnviar.addEventListener("click", function () {
    pokemonManger.addPokemon();
});


document.addEventListener("DOMContentLoaded", function () {
    pokemonManger.displayErrors();
    pokemonManger.displayPokemons();
    pokemonManger.displayStadistics();
});


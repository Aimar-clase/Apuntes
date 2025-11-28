'use strict';

import { Pokemon } from "../models/pokemon.js";
import { StorageManager } from "../storage/storage-manager.js";
import { promedioPokemons } from "../utils/utils.js";
import { Validation } from "../validations/valid.js";
import { DomFacade } from "./dom-facade.js";


export class PokemonManger {
    constructor() {
        if (PokemonManger.instancia) return PokemonManger.instancia;
        PokemonManger.instancia = this;
    }

    addPokemon() {
        let pokemon = new Pokemon(DomFacade.getPokemonFromForm());
        let errores = [];

        if (Validation.nameValid(pokemon.nombre) != true) {
            errores.push("El nombre no puede estar vacio");
        }

        if (Validation.levelValid(pokemon.nivel) != true) {
            errores.push("El nivel tiene que ser mayor que 1 y menor que 100");
        }

        if (errores.length != 0) {
            StorageManager.addErrorToStorage(errores);
        } else {
            StorageManager.addErrorToStorage(errores);
            StorageManager.addToStorage(pokemon)
        }


    }

    displayPokemons() {
        const pokemons = StorageManager.getPokemons();
        DomFacade.displayPokemons(pokemons);
    }

    displayErrors() {
        let errores = StorageManager.getErrors();
        DomFacade.displayErrors(errores);
    }

    displayStadistics() {
        const pokemons = StorageManager.getPokemons();
        const promedio = promedioPokemons(pokemons);
        DomFacade.displayStadistics(promedio);
    }

}
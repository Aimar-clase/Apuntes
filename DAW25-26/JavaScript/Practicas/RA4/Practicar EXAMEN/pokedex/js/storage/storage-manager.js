'use strict';



export class StorageManager {

    static addToStorage(pokemon) {
        let pokemons = JSON.parse(localStorage.getItem('pokemons')) || [];
        pokemons.push(pokemon);
        localStorage.setItem('pokemons', JSON.stringify(pokemons));
    }

    static addErrorToStorage(errores) {
        sessionStorage.setItem('errores', JSON.stringify(errores));
    }

    static getErrors() {
        return JSON.parse(sessionStorage.getItem('errores')) || [];
    }

    static getPokemons() {
        return JSON.parse(localStorage.getItem('pokemons'));
    }





}
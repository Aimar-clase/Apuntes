'use strict';



export function promedioPokemons(pokemons) {
    const mapaPokemon = new Map();
    const totalPokemons = pokemons.length;
    let promedios = [];
    pokemons.forEach(pokemon => {
        if (mapaPokemon.has(pokemon.tipo)) {
            mapaPokemon.set(pokemon.tipo, mapaPokemon.get(pokemon.tipo) + 1)
        } else {
            mapaPokemon.set(pokemon.tipo, 1)
        }
    })

    mapaPokemon.forEach((valor, tipo) => {
        let promedio = valor / totalPokemons;
        promedios.push([tipo, promedio]);
    });

    return promedios;
}

'use strict';

export class GameManager {
    words = [
        'algoritmo', 'programacion', 'javascript', 'navegador', 'servidor',
        'variable', 'constante', 'funcion', 'desarrollo', 'frontend',
        'backend', 'base', 'datos', 'interfaz', 'usuario',
        'tecnologia', 'ordenador', 'teclado', 'pantalla', 'internet',
        'sistema', 'memoria', 'codigo', 'proyecto', 'consola',
        'depuracion', 'evento', 'objeto', 'array', 'bucle'
    ];
    
    constructor(){
        if(GameManager.instancia) return GameManager.instancia
        GameManager.instancia = this;
    }

    displayRandomWordInScreen(){
        const word = this.randomWord();
        
    }


    randomWord(){
        const randomNumber = Math.floor(Math.random() * this.words.length);
        return this.words[randomNumber];
    }
    





}
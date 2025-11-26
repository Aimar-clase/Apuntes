/**
 * INPUT-FACTORY.JS
 * 
 * Genera inputs que caen.
 * Patrón de Diseño: FACTORY
 */

window.App = window.App || {};

window.App.InputFactory = (function() {
    
    const { getRandomInt, createElement } = window.App.Utils;

    const WORDS = ["HTML", "CSS", "JS", "DOM", "API", "LET", "VAR", "CONST", "IF", "FOR"];

    /**
     * Crea un input
     */
    function createInput(containerWidth) {
        const word = WORDS[getRandomInt(0, WORDS.length - 1)];
        
        const el = createElement('input', 'falling-input');
        el.type = 'text';
        el.placeholder = word;
        el.dataset.targetWord = word;
        
        // Random Position
        const maxLeft = containerWidth - 150; // approx width
        const left = getRandomInt(10, maxLeft > 0 ? maxLeft : 10);
        
        el.style.left = `${left}px`;
        el.style.top = '-50px';
        
        let inputData = {
            element: el,
            top: -50,
            speed: getRandomInt(1, 2),
            intervalId: null, // To store the falling interval
            targetWord: word
        };

        return inputData;
    }

    return {
        createInput
    };

})();

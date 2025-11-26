/**
 * WORD-FACTORY.JS
 * 
 * Se encarga de la creación de las palabras que caerán en el juego.
 * Patrón de Diseño: FACTORY (Fábrica)
 */

window.App = window.App || {};

window.App.WordFactory = (function() {
    
    // Importamos dependencias del namespace global
    const { getRandomInt, createElement } = window.App.Utils;

    const WORDS_LIST = [
        "JAVASCRIPT", "HTML", "CSS", "DOM", "VARIABLE", "FUNCION", "ARRAY", 
        "OBJETO", "EVENTO", "BUCLE", "PROMESA", "CLASE", "MODULO", "API",
        "BROWSER", "SERVER", "CLIENTE", "DEBUG", "CODIGO", "SYNTAX",
        "REACT", "ANGULAR", "VUE", "NODE", "EXPRESS", "MONGO", "SQL",
        "GIT", "GITHUB", "COMMIT", "PUSH", "PULL", "MERGE", "BRANCH"
    ];

    /**
     * Crea un nuevo elemento DOM que representa una palabra.
     */
    function createWordElement(containerWidth) {
        // 1. Seleccionar texto aleatorio
        const text = WORDS_LIST[getRandomInt(0, WORDS_LIST.length - 1)];
        
        // 2. Crear elemento DOM
        const wordEl = createElement('div', 'word');
        wordEl.textContent = text;
        
        // 3. Posición aleatoria en X
        const maxLeft = containerWidth - 120; 
        const randomLeft = getRandomInt(10, maxLeft > 0 ? maxLeft : 0);
        
        wordEl.style.left = `${randomLeft}px`;
        wordEl.style.top = '-50px'; 
        
        wordEl.dataset.word = text;
        
        return wordEl;
    }

    return {
        createWordElement
    };

})();

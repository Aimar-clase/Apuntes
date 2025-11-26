/**
 * BUBBLE-FACTORY.JS
 * 
 * Se encarga de la creación de las burbujas.
 * Patrón de Diseño: FACTORY (Fábrica)
 */

window.App = window.App || {};

window.App.BubbleFactory = (function() {
    
    const { getRandomInt, createElement } = window.App.Utils;

    /**
     * Crea una burbuja (Normal o Trampa)
     */
    function createBubble(containerWidth) {
        const isTrap = Math.random() > 0.8; // 20% chance of trap
        const type = isTrap ? 'trap' : 'normal';
        
        const el = createElement('div', `bubble ${type}`);
        
        // Posición aleatoria en X
        const maxLeft = containerWidth - 60; // 60px bubble size
        const left = getRandomInt(10, maxLeft > 0 ? maxLeft : 10);
        
        el.style.left = `${left}px`;
        el.style.bottom = '-60px'; // Start below screen
        el.style.width = '60px';
        el.style.height = '60px';
        
        let bubbleData = {
            element: el,
            type: type,
            bottom: -60,
            speed: getRandomInt(1, 3), // Rising speed
            isPaused: false
        };

        return bubbleData;
    }

    return {
        createBubble
    };

})();

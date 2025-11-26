/**
 * ASTEROID-FACTORY.JS
 * 
 * Genera asteroides.
 * Patrón de Diseño: FACTORY
 */

window.App = window.App || {};

window.App.AsteroidFactory = (function() {
    
    const { getRandomInt, createElement } = window.App.Utils;

    /**
     * Crea un asteroide
     */
    function createAsteroid(containerWidth) {
        const el = createElement('div', 'asteroid');
        
        // Random Position
        const size = getRandomInt(30, 60);
        const maxLeft = containerWidth - size;
        const left = getRandomInt(0, maxLeft > 0 ? maxLeft : 0);
        
        el.style.left = `${left}px`;
        el.style.top = `-${size}px`;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        
        let asteroidData = {
            element: el,
            top: -size,
            speed: getRandomInt(2, 5),
            size: size
        };

        return asteroidData;
    }

    return {
        createAsteroid
    };

})();

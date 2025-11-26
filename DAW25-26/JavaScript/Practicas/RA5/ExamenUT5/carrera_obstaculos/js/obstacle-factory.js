/**
 * OBSTACLE-FACTORY.JS
 * 
 * Genera obstáculos para el runner.
 * Patrón de Diseño: FACTORY
 */

window.App = window.App || {};

window.App.ObstacleFactory = (function() {
    
    const { getRandomInt, createElement } = window.App.Utils;

    /**
     * Crea un obstáculo
     */
    function createObstacle(containerWidth, containerHeight) {
        const el = createElement('div', 'obstacle');
        
        // Random height/position
        // It can be a "Wall" (full height with gap?) or just blocks?
        // Let's make simple blocks at random Y positions.
        
        const size = getRandomInt(40, 80);
        const top = getRandomInt(0, containerHeight - size);
        
        el.style.left = `${containerWidth}px`; // Start off-screen right
        el.style.top = `${top}px`;
        el.style.width = '30px';
        el.style.height = `${size}px`;
        
        let obstacleData = {
            element: el,
            left: containerWidth,
            speed: 3, // Horizontal speed
            width: 30,
            height: size,
            top: top
        };

        return obstacleData;
    }

    return {
        createObstacle
    };

})();

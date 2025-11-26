/**
 * TARGET-FACTORY.JS
 * 
 * Genera el objetivo escurridizo.
 * Patrón de Diseño: FACTORY
 */

window.App = window.App || {};

window.App.TargetFactory = (function() {
    
    const { getRandomInt, createElement } = window.App.Utils;

    /**
     * Crea un objetivo
     */
    function createTarget(containerWidth, containerHeight) {
        const el = createElement('div', 'target');
        
        // Random Position
        const size = 60;
        const maxLeft = containerWidth - size;
        const maxTop = containerHeight - size;
        
        const left = getRandomInt(0, maxLeft > 0 ? maxLeft : 0);
        const top = getRandomInt(0, maxTop > 0 ? maxTop : 0);
        
        el.style.left = `${left}px`;
        el.style.top = `${top}px`;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        
        let targetData = {
            element: el,
            size: size,
            isCoolingDown: false
        };

        return targetData;
    }

    return {
        createTarget
    };

})();

/**
 * DATA-FACTORY.JS
 * 
 * Genera datos para validar (Emails, etc.)
 * Patrón de Diseño: FACTORY
 */

window.App = window.App || {};

window.App.DataFactory = (function() {
    
    const { getRandomInt, createElement } = window.App.Utils;

    const VALID_EMAILS = [
        "juan@gmail.com", "test@site.org", "admin@sys.net", "user.name@co.uk",
        "info@web.com", "contact@me.io", "support@help.biz", "dev@code.js"
    ];

    const INVALID_EMAILS = [
        "juan@", "@gmail.com", "test.site.org", "admin@sys", "user name@co.uk",
        "info@web", "contact@.io", "support@help.", "dev@code"
    ];

    /**
     * Crea un elemento de datos
     */
    function createDataItem(containerWidth, containerHeight) {
        const isValid = Math.random() > 0.5;
        const text = isValid 
            ? VALID_EMAILS[getRandomInt(0, VALID_EMAILS.length - 1)]
            : INVALID_EMAILS[getRandomInt(0, INVALID_EMAILS.length - 1)];
        
        const el = createElement('div', 'data-item');
        el.textContent = text;
        
        // Posición aleatoria
        const maxLeft = containerWidth - 200; // approx width
        const maxTop = containerHeight - 100;
        
        const left = getRandomInt(20, maxLeft > 0 ? maxLeft : 20);
        const top = getRandomInt(50, maxTop > 0 ? maxTop : 50);
        
        el.style.left = `${left}px`;
        el.style.top = `${top}px`;
        el.style.opacity = '1';
        
        let dataItem = {
            element: el,
            text: text,
            isValid: isValid,
            opacity: 1,
            fadeSpeed: 0.005 + (Math.random() * 0.005) // Random fade speed
        };

        return dataItem;
    }

    return {
        createDataItem
    };

})();

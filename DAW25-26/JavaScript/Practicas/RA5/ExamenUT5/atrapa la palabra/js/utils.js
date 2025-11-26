/**
 * UTILS.JS
 * 
 * Este archivo contiene funciones de utilidad genéricas.
 * 
 * CAMBIO: Para funcionar sin servidor (file://), usamos el patrón Namespace
 * en lugar de ES6 Modules. Todo se guarda en window.App.Utils.
 */

// Aseguramos que el namespace global existe
window.App = window.App || {};

window.App.Utils = (function() {
    
    /**
     * Genera un número entero aleatorio entre min y max (ambos incluidos).
     */
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Selecciona un elemento del DOM.
     */
    function $(selector) {
        return document.querySelector(selector);
    }

    /**
     * Crea un elemento DOM con clases opcionales.
     */
    function createElement(tag, className = '') {
        const element = document.createElement(tag);
        if (className) {
            element.className = className;
        }
        return element;
    }

    /**
     * Espera una cantidad de milisegundos (Promesa).
     */
    function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // API Pública
    return {
        getRandomInt,
        $,
        createElement,
        wait
    };

})();

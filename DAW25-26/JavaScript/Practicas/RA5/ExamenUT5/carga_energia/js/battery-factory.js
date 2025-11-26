/**
 * BATTERY-FACTORY.JS
 * 
 * Genera baterías para cargar.
 * Patrón de Diseño: FACTORY
 */

window.App = window.App || {};

window.App.BatteryFactory = (function() {
    
    const { getRandomInt, createElement } = window.App.Utils;
    const KEYS = "ASDFGHJKL"; // Keys to use

    /**
     * Crea una batería
     */
    function createBattery(containerWidth, containerHeight) {
        const char = KEYS[getRandomInt(0, KEYS.length - 1)];
        
        const el = createElement('div', 'battery');
        
        // Structure: 
        // <div class="battery">
        //    <div class="progress-bar"></div>
        //    <span class="label">A</span>
        // </div>
        
        const progressBar = createElement('div', 'progress-bar');
        const label = createElement('span', 'label');
        label.textContent = char;
        
        el.appendChild(progressBar);
        el.appendChild(label);
        
        // Random Position
        const maxLeft = containerWidth - 80; 
        const maxTop = containerHeight - 120;
        
        const left = getRandomInt(20, maxLeft > 0 ? maxLeft : 20);
        const top = getRandomInt(20, maxTop > 0 ? maxTop : 20);
        
        el.style.left = `${left}px`;
        el.style.top = `${top}px`;
        
        let batteryData = {
            element: el,
            progressBar: progressBar,
            key: char,
            progress: 0,
            isCharging: false
        };

        return batteryData;
    }

    return {
        createBattery
    };

})();

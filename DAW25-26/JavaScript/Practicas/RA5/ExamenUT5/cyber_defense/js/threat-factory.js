/**
 * THREAT-FACTORY.JS
 * 
 * Se encarga de la creación de las amenazas (Virus y Bugs).
 * Patrón de Diseño: FACTORY (Fábrica)
 */

window.App = window.App || {};

window.App.ThreatFactory = (function() {
    
    const { getRandomInt, createElement } = window.App.Utils;

    const VIRUS_WORDS = [
        "TROJAN", "MALWARE", "SPYWARE", "RANSOM", "PHISHING", "DDOS", 
        "WORM", "ROOTKIT", "BOTNET", "EXPLOIT", "BACKDOOR", "LOGIC",
        "KEYLOG", "SPOOF", "SNIFF", "INJECT", "SCRIPT", "MACRO"
    ];

    /**
     * Crea una amenaza (Virus o Bug)
     */
    function createThreat(containerWidth, containerHeight) {
        const isVirus = Math.random() > 0.5;
        const type = isVirus ? 'virus' : 'bug';
        
        const el = createElement('div', `threat ${type}`);
        
        // Posición aleatoria
        // Asumimos un tamaño inicial de 20px y un máximo de 150px
        // Dejamos margen para que no nazca fuera
        const maxLeft = containerWidth - 150;
        const maxTop = containerHeight - 150;
        
        const left = getRandomInt(10, maxLeft > 0 ? maxLeft : 10);
        const top = getRandomInt(10, maxTop > 0 ? maxTop : 10);
        
        el.style.left = `${left}px`;
        el.style.top = `${top}px`;
        el.style.width = '20px';
        el.style.height = '20px';
        
        let threatData = {
            element: el,
            type: type,
            size: 20,
            maxSize: 150,
            growthRate: getRandomInt(1, 3) // Píxeles por tick
        };

        if (isVirus) {
            const text = VIRUS_WORDS[getRandomInt(0, VIRUS_WORDS.length - 1)];
            el.textContent = text;
            el.dataset.word = text;
            threatData.text = text;
        } else {
            // Bug: No text, maybe an icon via CSS or empty
            el.dataset.type = 'bug';
        }

        return threatData;
    }

    return {
        createThreat
    };

})();

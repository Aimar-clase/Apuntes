/**
 * STORAGE.JS
 * 
 * Módulo encargado de la persistencia de datos usando LocalStorage.
 * Patrón de Diseño: FACADE (Fachada)
 */

window.App = window.App || {};

window.App.Storage = (function() {
    
    const KEYS = {
        USER: 'atrapa_palabra_user',
        BEST_SCORE: 'atrapa_palabra_best_score',
        LAST_SCORE: 'atrapa_palabra_last_score'
    };

    /**
     * Guarda un objeto en LocalStorage. (Privado)
     */
    function _save(key, data) {
        try {
            const serialized = JSON.stringify(data);
            localStorage.setItem(key, serialized);
        } catch (error) {
            console.error('Error guardando en LocalStorage:', error);
        }
    }

    /**
     * Recupera un objeto de LocalStorage. (Privado)
     */
    function _get(key) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : null;
        } catch (error) {
            console.error('Error leyendo de LocalStorage:', error);
            return null;
        }
    }

    // --- API PÚBLICA (La Fachada) ---

    function saveUser(username, password) {
        _save(KEYS.USER, { username, password });
    }

    function getUser() {
        return _get(KEYS.USER);
    }

    function saveBestScore(score) {
        const currentBest = getBestScore();
        if (score > currentBest) {
            _save(KEYS.BEST_SCORE, score);
        }
        _save(KEYS.LAST_SCORE, score);
    }

    function getBestScore() {
        return _get(KEYS.BEST_SCORE) || 0;
    }

    function getLastScore() {
        return _get(KEYS.LAST_SCORE) || 0;
    }

    function hasUser() {
        return !!getUser();
    }

    return {
        saveUser,
        getUser,
        saveBestScore,
        getBestScore,
        getLastScore,
        hasUser
    };

})();

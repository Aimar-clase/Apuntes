/**
 * MAIN.JS
 * 
 * Punto de entrada de la aplicación.
 * Patrón de Diseño: MEDIATOR / CONTROLLER
 */

// Esperamos a que todo cargue
document.addEventListener('DOMContentLoaded', () => {
    
    // Alias para facilitar acceso
    const { $ } = window.App.Utils;
    const Auth = window.App.Auth;
    const Game = window.App.Game;

    const loginScreen = $('#login-screen');
    const gameScreen = $('#game-screen');
    const gameOverScreen = $('#game-over-screen');
    const restartBtn = $('#restart-btn');
    const logoutBtn = $('#logout-btn');
    const playerNameSpan = $('#player-name');

    function initApp() {
        console.log('Iniciando Atrapa la Palabra (Modo Sin Servidor)...');
        
        Auth.init(onLoginSuccess);
        
        Game.init();
        
        restartBtn.addEventListener('click', startGame);
        logoutBtn.addEventListener('click', () => location.reload()); 
    }

    function onLoginSuccess(username) {
        loginScreen.classList.remove('active');
        setTimeout(() => loginScreen.classList.add('hidden'), 300); 
        
        playerNameSpan.textContent = username;
        
        gameScreen.classList.remove('hidden');
        void gameScreen.offsetWidth; 
        gameScreen.classList.add('active');
        
        startGame();
    }

    function startGame() {
        if (gameOverScreen.classList.contains('active')) {
            gameOverScreen.classList.remove('active');
            setTimeout(() => gameOverScreen.classList.add('hidden'), 300);
            
            gameScreen.classList.remove('hidden');
            setTimeout(() => gameScreen.classList.add('active'), 300);
        }

        Game.start();
    }

    initApp();
});

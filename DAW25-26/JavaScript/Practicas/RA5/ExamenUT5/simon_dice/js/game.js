/**
 * GAME.JS
 * 
 * Motor principal del juego.
 * Patrón de Diseño: SINGLETON (Única Instancia)
 */

window.App = window.App || {};

window.App.Game = (function() {

    const { $, createElement, getRandomInt } = window.App.Utils;
    const Storage = window.App.Storage;

    // Objeto Singleton
    const GameInstance = {
        state: {
            isPlaying: false,
            score: 0, // Level
            sequence: [],
            userStep: 0,
            isUserTurn: false,
            colors: ['red', 'blue', 'green', 'yellow']
        },

        dom: {
            gameArea: null,
            scoreDisplay: null,
            livesDisplay: null, // Not used, but kept for HUD compatibility
            bestScoreDisplay: null,
            finalScoreDisplay: null,
            bestScoreFinalDisplay: null,
            gameScreen: null,
            gameOverScreen: null,
            buttons: {}
        },

        init() {
            this.dom.gameArea = $('#game-area');
            this.dom.scoreDisplay = $('#score');
            this.dom.livesDisplay = $('#lives');
            this.dom.bestScoreDisplay = $('#best-score-display');
            this.dom.finalScoreDisplay = $('#final-score');
            this.dom.bestScoreFinalDisplay = $('#best-score-final');
            this.dom.gameScreen = $('#game-screen');
            this.dom.gameOverScreen = $('#game-over-screen');
        },

        start() {
            this.state.isPlaying = true;
            this.state.score = 0;
            this.state.sequence = [];
            this.state.userStep = 0;
            this.state.isUserTurn = false;
            
            this.dom.gameArea.innerHTML = '';
            this.createBoard();
            this.updateHUD();
            
            this.dom.bestScoreDisplay.textContent = Storage.getBestScore();

            // Start first round
            setTimeout(() => this.nextRound(), 1000);
        },

        createBoard() {
            // Create 4 buttons
            const board = createElement('div', 'simon-board');
            
            this.state.colors.forEach(color => {
                const btn = createElement('div', `simon-btn ${color}`);
                btn.dataset.color = color;
                
                btn.addEventListener('click', () => {
                    if (this.state.isPlaying && this.state.isUserTurn) {
                        this.handleUserClick(color);
                    }
                });
                
                this.dom.buttons[color] = btn;
                board.appendChild(btn);
            });
            
            this.dom.gameArea.appendChild(board);
        },

        nextRound() {
            this.state.score++;
            this.updateHUD();
            this.state.userStep = 0;
            this.state.isUserTurn = false;
            
            // Add new color
            const nextColor = this.state.colors[getRandomInt(0, 3)];
            this.state.sequence.push(nextColor);
            
            this.playSequence();
        },

        playSequence() {
            let i = 0;
            const interval = setInterval(() => {
                if (i >= this.state.sequence.length) {
                    clearInterval(interval);
                    this.state.isUserTurn = true;
                    return;
                }
                
                const color = this.state.sequence[i];
                this.flashButton(color);
                i++;
            }, 800); // Speed of sequence
        },

        flashButton(color) {
            const btn = this.dom.buttons[color];
            btn.classList.add('active');
            // Sound could go here
            setTimeout(() => {
                btn.classList.remove('active');
            }, 400);
        },

        handleUserClick(color) {
            this.flashButton(color);
            
            const expectedColor = this.state.sequence[this.state.userStep];
            
            if (color === expectedColor) {
                this.state.userStep++;
                if (this.state.userStep >= this.state.sequence.length) {
                    // Round complete
                    this.state.isUserTurn = false;
                    setTimeout(() => this.nextRound(), 1000);
                }
            } else {
                // Wrong color
                this.gameOver();
            }
        },

        updateHUD() {
            this.dom.scoreDisplay.textContent = this.state.score;
            this.dom.livesDisplay.textContent = 1; // 1 Life
        },

        gameOver() {
            this.state.isPlaying = false;
            Storage.saveBestScore(this.state.score);

            this.dom.finalScoreDisplay.textContent = this.state.score;
            this.dom.bestScoreFinalDisplay.textContent = Storage.getBestScore();
            
            this.dom.gameScreen.classList.remove('active');
            this.dom.gameScreen.classList.add('hidden');
            
            this.dom.gameOverScreen.classList.remove('hidden');
            setTimeout(() => this.dom.gameOverScreen.classList.add('active'), 50); 
        }
    };

    return GameInstance;

})();

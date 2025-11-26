/**
 * GAME.JS
 * 
 * Motor principal del juego.
 * Patrón de Diseño: SINGLETON (Única Instancia)
 */

window.App = window.App || {};

window.App.Game = (function() {

    const { $, getRandomInt } = window.App.Utils;
    const InputFactory = window.App.InputFactory;
    const Storage = window.App.Storage;

    // Objeto Singleton
    const GameInstance = {
        state: {
            isPlaying: false,
            score: 0,
            lives: 3,
            inputs: [], 
            spawnRate: 2500, 
            lastSpawnTime: 0,
            animationId: null,
            difficultyTimer: null
        },

        dom: {
            gameArea: null,
            scoreDisplay: null,
            livesDisplay: null,
            bestScoreDisplay: null,
            finalScoreDisplay: null,
            bestScoreFinalDisplay: null,
            gameScreen: null,
            gameOverScreen: null
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
            this.state.lives = 3;
            this.state.inputs = [];
            this.state.spawnRate = 2500;
            this.state.lastSpawnTime = 0;
            
            this.dom.gameArea.innerHTML = '';
            this.updateHUD();
            
            this.dom.bestScoreDisplay.textContent = Storage.getBestScore();

            this.loop(0);

            this.startDifficultyTimer();
        },

        loop(timestamp) {
            if (!this.state.isPlaying) return;

            if (timestamp - this.state.lastSpawnTime > this.state.spawnRate) {
                this.spawnInput();
                this.state.lastSpawnTime = timestamp;
            }

            // We don't need a global update loop for movement if we use setInterval per input as requested.
            // "Cada input debe tener su ID de intervalo guardado... para poder detenerlo"
            // However, managing 20 intervals can be messy. 
            // But the requirement says: "Cada input debe tener su ID de intervalo...".
            // So I will implement individual intervals for movement.
            // This loop is just for spawning and game over checks if needed.
            
            this.state.animationId = requestAnimationFrame((t) => this.loop(t));
        },

        spawnInput() {
            const containerWidth = this.dom.gameArea.clientWidth;
            const containerHeight = this.dom.gameArea.clientHeight;
            
            const inputData = InputFactory.createInput(containerWidth);
            
            // Start Falling Interval
            this.startFalling(inputData, containerHeight);

            // Interaction: Focus (Pause)
            inputData.element.addEventListener('focus', () => {
                if (!this.state.isPlaying) return;
                this.pauseFalling(inputData);
            });

            // Interaction: Blur (Resume if not empty/validated)
            inputData.element.addEventListener('blur', () => {
                if (!this.state.isPlaying) return;
                // If user leaves, resume falling
                this.startFalling(inputData, containerHeight);
            });

            // Interaction: Keydown (Enter to validate)
            inputData.element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    this.validateInput(inputData);
                }
            });
            
            this.dom.gameArea.appendChild(inputData.element);
            this.state.inputs.push(inputData);
        },

        startFalling(inputData, containerHeight) {
            if (inputData.intervalId) return; // Already falling

            inputData.intervalId = setInterval(() => {
                if (!this.state.isPlaying) {
                    clearInterval(inputData.intervalId);
                    return;
                }

                inputData.top += inputData.speed;
                inputData.element.style.top = `${inputData.top}px`;

                if (inputData.top > containerHeight - 30) {
                    this.handleMiss(inputData);
                }
            }, 20); // 50fps approx
        },

        pauseFalling(inputData) {
            if (inputData.intervalId) {
                clearInterval(inputData.intervalId);
                inputData.intervalId = null;
            }
        },

        validateInput(inputData) {
            const val = inputData.element.value.trim().toUpperCase();
            const target = inputData.targetWord.toUpperCase();

            if (val === target) {
                this.handleSuccess(inputData);
            } else {
                // Wrong word? Maybe shake or red border?
                inputData.element.style.borderColor = 'red';
                setTimeout(() => inputData.element.style.borderColor = '', 500);
            }
        },

        handleSuccess(inputData) {
            this.pauseFalling(inputData);
            
            const index = this.state.inputs.indexOf(inputData);
            if (index > -1) {
                this.state.inputs.splice(index, 1);
            }

            inputData.element.classList.add('hit'); // Green flash
            this.state.score += 10;
            this.updateHUD();

            setTimeout(() => inputData.element.remove(), 200);
        },

        handleMiss(inputData) {
            this.pauseFalling(inputData);
            
            const index = this.state.inputs.indexOf(inputData);
            if (index > -1) {
                this.state.inputs.splice(index, 1);
            }
            
            inputData.element.classList.add('missed');
            this.state.lives--;
            this.updateHUD();
            
            setTimeout(() => inputData.element.remove(), 200);

            if (this.state.lives <= 0) {
                this.gameOver();
            }
        },

        updateHUD() {
            this.dom.scoreDisplay.textContent = this.state.score;
            this.dom.livesDisplay.textContent = this.state.lives;
        },

        startDifficultyTimer() {
            this.state.difficultyTimer = setInterval(() => {
                if (!this.state.isPlaying) return;
                this.state.spawnRate = Math.max(1000, this.state.spawnRate - 200);
            }, 10000);
        },

        gameOver() {
            this.state.isPlaying = false;
            cancelAnimationFrame(this.state.animationId);
            clearInterval(this.state.difficultyTimer);
            
            // Clear all intervals
            this.state.inputs.forEach(i => clearInterval(i.intervalId));

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

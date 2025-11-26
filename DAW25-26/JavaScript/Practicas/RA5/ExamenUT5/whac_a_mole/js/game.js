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
            score: 0,
            lives: 3,
            gridSize: 9, // 3x3
            activeMoleIndex: -1,
            spawnRate: 1000, 
            moleDuration: 800,
            lastSpawnTime: 0,
            animationId: null,
            difficultyTimer: null,
            moleTimeout: null
        },

        dom: {
            gameArea: null,
            scoreDisplay: null,
            livesDisplay: null,
            bestScoreDisplay: null,
            finalScoreDisplay: null,
            bestScoreFinalDisplay: null,
            gameScreen: null,
            gameOverScreen: null,
            cells: []
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
            this.state.spawnRate = 1000;
            this.state.moleDuration = 800;
            this.state.activeMoleIndex = -1;
            
            this.dom.gameArea.innerHTML = '';
            this.createGrid();
            this.updateHUD();
            
            this.dom.bestScoreDisplay.textContent = Storage.getBestScore();

            this.loop(0);

            this.startDifficultyTimer();
        },

        createGrid() {
            const grid = createElement('div', 'mole-grid');
            this.dom.cells = [];

            for (let i = 0; i < this.state.gridSize; i++) {
                const cell = createElement('div', 'mole-cell');
                cell.dataset.index = i;
                
                // Event Bubbling could be used on parent, but direct listener is fine too.
                // Let's use direct listener for simplicity with the 'active' class check.
                cell.addEventListener('mousedown', () => {
                    if (this.state.isPlaying && i === this.state.activeMoleIndex) {
                        this.whackMole(i);
                    }
                });

                this.dom.cells.push(cell);
                grid.appendChild(cell);
            }
            
            this.dom.gameArea.appendChild(grid);
        },

        loop(timestamp) {
            if (!this.state.isPlaying) return;

            // Spawn Logic (using setInterval-like logic inside loop or just setInterval)
            // The prompt suggests "Cada X segundos aparece un topo".
            // Let's use a timer check.
            if (timestamp - this.state.lastSpawnTime > this.state.spawnRate) {
                if (this.state.activeMoleIndex === -1) { // Only spawn if none active? Or overwrite? 
                    // Usually Whac-A-Mole has one at a time or multiple. Let's do one at a time.
                    this.spawnMole();
                    this.state.lastSpawnTime = timestamp;
                }
            }

            this.state.animationId = requestAnimationFrame((t) => this.loop(t));
        },

        spawnMole() {
            // Pick random cell
            let index;
            do {
                index = getRandomInt(0, this.state.gridSize - 1);
            } while (index === this.state.activeMoleIndex && this.state.gridSize > 1);

            this.state.activeMoleIndex = index;
            const cell = this.dom.cells[index];
            cell.classList.add('mole');

            // Schedule disappearance
            this.state.moleTimeout = setTimeout(() => {
                if (this.state.isPlaying && this.state.activeMoleIndex === index) {
                    this.handleMiss(index);
                }
            }, this.state.moleDuration);
        },

        whackMole(index) {
            // Clear timeout to prevent miss
            clearTimeout(this.state.moleTimeout);
            
            const cell = this.dom.cells[index];
            cell.classList.remove('mole');
            cell.classList.add('hit'); // Visual feedback
            
            setTimeout(() => cell.classList.remove('hit'), 200);

            this.state.activeMoleIndex = -1;
            this.state.score += 10;
            this.updateHUD();
        },

        handleMiss(index) {
            const cell = this.dom.cells[index];
            cell.classList.remove('mole');
            
            this.state.activeMoleIndex = -1;
            this.state.lives--;
            this.updateHUD();

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
                this.state.spawnRate = Math.max(500, this.state.spawnRate - 50);
                this.state.moleDuration = Math.max(400, this.state.moleDuration - 50);
            }, 5000);
        },

        gameOver() {
            this.state.isPlaying = false;
            cancelAnimationFrame(this.state.animationId);
            clearInterval(this.state.difficultyTimer);
            clearTimeout(this.state.moleTimeout);

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

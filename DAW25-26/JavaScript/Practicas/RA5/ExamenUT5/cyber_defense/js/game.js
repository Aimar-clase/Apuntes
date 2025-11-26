/**
 * GAME.JS
 * 
 * Motor principal del juego.
 * Patrón de Diseño: SINGLETON (Única Instancia)
 */

window.App = window.App || {};

window.App.Game = (function() {

    const { $, getRandomInt } = window.App.Utils;
    const ThreatFactory = window.App.ThreatFactory;
    const Storage = window.App.Storage;

    // Objeto Singleton
    const GameInstance = {
        state: {
            isPlaying: false,
            score: 0,
            lives: 3,
            threats: [], 
            spawnRate: 2000, 
            lastSpawnTime: 0,
            animationId: null,
            difficultyTimer: null
        },

        dom: {
            gameArea: null,
            scoreDisplay: null,
            livesDisplay: null,
            input: null, // Hidden input for typing
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
            this.dom.input = $('#word-input');
            this.dom.bestScoreDisplay = $('#best-score-display');
            this.dom.finalScoreDisplay = $('#final-score');
            this.dom.bestScoreFinalDisplay = $('#best-score-final');
            this.dom.gameScreen = $('#game-screen');
            this.dom.gameOverScreen = $('#game-over-screen');

            // Keyboard Event for Viruses
            document.addEventListener('keydown', (e) => {
                if (!this.state.isPlaying) return;
                
                // Focus hidden input to capture typing if needed, 
                // or just build a buffer. Here we use the existing input.
                this.dom.input.focus();
                
                if (e.key === 'Enter') {
                    this.checkInput(this.dom.input.value.trim().toUpperCase());
                    this.dom.input.value = ''; 
                }
            });
        },

        start() {
            this.state.isPlaying = true;
            this.state.score = 0;
            this.state.lives = 3;
            this.state.threats = [];
            this.state.spawnRate = 2000;
            this.state.lastSpawnTime = 0;
            
            this.dom.gameArea.innerHTML = '';
            this.updateHUD();
            this.dom.input.value = '';
            this.dom.input.focus();
            
            this.dom.bestScoreDisplay.textContent = Storage.getBestScore();

            this.loop(0);

            this.startDifficultyTimer();
        },

        loop(timestamp) {
            if (!this.state.isPlaying) return;

            if (timestamp - this.state.lastSpawnTime > this.state.spawnRate) {
                this.spawnThreat();
                this.state.lastSpawnTime = timestamp;
            }

            this.updateThreats();

            this.state.animationId = requestAnimationFrame((t) => this.loop(t));
        },

        spawnThreat() {
            const containerWidth = this.dom.gameArea.clientWidth;
            const containerHeight = this.dom.gameArea.clientHeight;
            
            const threatData = ThreatFactory.createThreat(containerWidth, containerHeight);
            
            // Mouse Event for Bugs (Double Click)
            if (threatData.type === 'bug') {
                threatData.element.addEventListener('dblclick', (e) => {
                    e.stopPropagation(); // Prevent bubbling if needed
                    if (!this.state.isPlaying) return;
                    this.destroyThreat(threatData, 5); // 5 points for bugs
                });
            }
            
            this.dom.gameArea.appendChild(threatData.element);
            this.state.threats.push(threatData);
        },

        updateThreats() {
            for (let i = this.state.threats.length - 1; i >= 0; i--) {
                const threat = this.state.threats[i];
                
                // Growth Logic
                threat.size += 0.5; // Grow by 0.5px per frame (adjust for speed)
                threat.element.style.width = `${threat.size}px`;
                threat.element.style.height = `${threat.size}px`;
                
                // Center text if it's a virus
                if (threat.type === 'virus') {
                    threat.element.style.lineHeight = `${threat.size}px`;
                    threat.element.style.fontSize = `${Math.max(10, threat.size / 4)}px`;
                }

                if (threat.size >= threat.maxSize) {
                    this.handleBreach(i);
                }
            }
        },

        handleBreach(index) {
            const threat = this.state.threats[index];
            
            threat.element.classList.add('exploded');
            
            this.state.lives--;
            this.updateHUD();
            
            // Remove after animation
            setTimeout(() => threat.element.remove(), 200);
            this.state.threats.splice(index, 1);

            if (this.state.lives <= 0) {
                this.gameOver();
            }
        },

        checkInput(text) {
            if (!text) return;
            
            // Find matching Virus
            const matchIndex = this.state.threats.findIndex(t => t.type === 'virus' && t.text === text);

            if (matchIndex !== -1) {
                this.destroyThreat(this.state.threats[matchIndex], 10); // 10 points for virus
            }
        },

        destroyThreat(threat, points) {
            // Remove from array first to prevent double triggering
            const index = this.state.threats.indexOf(threat);
            if (index > -1) {
                this.state.threats.splice(index, 1);
            }

            threat.element.classList.add('neutralized');
            this.state.score += points;
            this.updateHUD();

            setTimeout(() => threat.element.remove(), 200);
        },

        updateHUD() {
            this.dom.scoreDisplay.textContent = this.state.score;
            this.dom.livesDisplay.textContent = this.state.lives;
        },

        startDifficultyTimer() {
            this.state.difficultyTimer = setInterval(() => {
                if (!this.state.isPlaying) return;
                this.state.spawnRate = Math.max(500, this.state.spawnRate - 200);
            }, 10000);
        },

        gameOver() {
            this.state.isPlaying = false;
            cancelAnimationFrame(this.state.animationId);
            clearInterval(this.state.difficultyTimer);

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

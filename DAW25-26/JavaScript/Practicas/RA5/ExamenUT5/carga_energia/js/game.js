/**
 * GAME.JS
 * 
 * Motor principal del juego.
 * Patrón de Diseño: SINGLETON (Única Instancia)
 */

window.App = window.App || {};

window.App.Game = (function() {

    const { $, getRandomInt } = window.App.Utils;
    const BatteryFactory = window.App.BatteryFactory;
    const Storage = window.App.Storage;

    // Objeto Singleton
    const GameInstance = {
        state: {
            isPlaying: false,
            score: 0,
            lives: 3,
            batteries: [], 
            spawnRate: 3000, 
            lastSpawnTime: 0,
            animationId: null,
            difficultyTimer: null,
            activeKeys: {} // Track keys currently held down
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

            // Global Key Listeners
            document.addEventListener('keydown', (e) => {
                if (!this.state.isPlaying) return;
                const key = e.key.toUpperCase();
                
                // Prevent repeat events if already active
                if (this.state.activeKeys[key]) return;
                
                this.state.activeKeys[key] = true;
            });

            document.addEventListener('keyup', (e) => {
                if (!this.state.isPlaying) return;
                const key = e.key.toUpperCase();
                this.state.activeKeys[key] = false;
                
                // Reset progress for any battery matching this key?
                // "Si suelta la tecla antes de llenarse, la barra baja rápidamente a cero."
                // We handle this in the update loop.
            });
        },

        start() {
            this.state.isPlaying = true;
            this.state.score = 0;
            this.state.lives = 3;
            this.state.batteries = [];
            this.state.spawnRate = 3000;
            this.state.lastSpawnTime = 0;
            this.state.activeKeys = {};
            
            this.dom.gameArea.innerHTML = '';
            this.updateHUD();
            
            this.dom.bestScoreDisplay.textContent = Storage.getBestScore();

            this.loop(0);

            this.startDifficultyTimer();
        },

        loop(timestamp) {
            if (!this.state.isPlaying) return;

            // Spawn Logic
            if (timestamp - this.state.lastSpawnTime > this.state.spawnRate) {
                this.spawnBattery();
                this.state.lastSpawnTime = timestamp;
            }

            // Update Logic
            this.updateBatteries();

            this.state.animationId = requestAnimationFrame((t) => this.loop(t));
        },

        spawnBattery() {
            const containerWidth = this.dom.gameArea.clientWidth;
            const containerHeight = this.dom.gameArea.clientHeight;
            
            const batteryData = BatteryFactory.createBattery(containerWidth, containerHeight);
            
            this.dom.gameArea.appendChild(batteryData.element);
            this.state.batteries.push(batteryData);
        },

        updateBatteries() {
            // Iterate backwards to allow removal
            for (let i = this.state.batteries.length - 1; i >= 0; i--) {
                const battery = this.state.batteries[i];
                const key = battery.key;

                // Check if key is held
                if (this.state.activeKeys[key]) {
                    // Charging
                    battery.progress += 2; // Charge speed
                    battery.element.classList.add('charging');
                } else {
                    // Discharging
                    battery.progress -= 5; // Discharge speed (fast)
                    battery.element.classList.remove('charging');
                }

                // Clamp progress
                if (battery.progress < 0) battery.progress = 0;
                
                // Update visual
                battery.progressBar.style.width = `${battery.progress}%`;

                // Check Completion
                if (battery.progress >= 100) {
                    this.handleSuccess(i);
                }

                // Timeout/Fail condition? 
                // The prompt says "Aparecen baterías vacías... que deben cargarse antes de desaparecer".
                // So they should have a lifetime.
                // Let's add a lifetime property or just fade them out?
                // Let's assume they fade out or have a timer.
                // I'll add a simple lifetime counter here.
                if (!battery.lifetime) battery.lifetime = 0;
                battery.lifetime++;
                
                // If too old, remove and lose life
                if (battery.lifetime > 600) { // ~10 seconds at 60fps
                    this.handleMiss(i);
                }
            }
        },

        handleSuccess(index) {
            const battery = this.state.batteries[index];
            
            battery.element.classList.add('charged');
            this.state.score += 20;
            this.updateHUD();

            this.state.batteries.splice(index, 1);
            setTimeout(() => battery.element.remove(), 200);
        },

        handleMiss(index) {
            const battery = this.state.batteries[index];
            
            battery.element.classList.add('expired');
            this.state.lives--;
            this.updateHUD();
            
            this.state.batteries.splice(index, 1);
            setTimeout(() => battery.element.remove(), 200);

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

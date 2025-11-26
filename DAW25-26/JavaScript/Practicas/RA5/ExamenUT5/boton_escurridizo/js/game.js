/**
 * GAME.JS
 * 
 * Motor principal del juego.
 * Patrón de Diseño: SINGLETON (Única Instancia)
 */

window.App = window.App || {};

window.App.Game = (function() {

    const { $, getRandomInt } = window.App.Utils;
    const TargetFactory = window.App.TargetFactory;
    const Storage = window.App.Storage;

    // Objeto Singleton
    const GameInstance = {
        state: {
            isPlaying: false,
            score: 0,
            lives: 3, // Maybe lives are time based? Or misses? Let's stick to standard lives on miss click?
                      // Prompt says: "El objetivo se teletransporta... El usuario debe ser rápido... Si haces clic, explota".
                      // Doesn't mention losing lives, but let's keep it for consistency if they click background.
            targets: [], 
            spawnRate: 2000, // Not really used if we only have one target at a time
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

            // Click on background = Miss
            this.dom.gameArea.addEventListener('click', (e) => {
                if (!this.state.isPlaying) return;
                if (e.target === this.dom.gameArea) {
                    this.handleMiss();
                }
            });
        },

        start() {
            this.state.isPlaying = true;
            this.state.score = 0;
            this.state.lives = 3;
            this.state.targets = [];
            
            this.dom.gameArea.innerHTML = '';
            this.updateHUD();
            
            this.dom.bestScoreDisplay.textContent = Storage.getBestScore();

            this.spawnTarget(); // Start with one target

            this.loop(0);
        },

        loop(timestamp) {
            if (!this.state.isPlaying) return;
            // No continuous update needed for this game, it's event driven mostly.
            // But we keep the loop structure for consistency or future animations.
            this.state.animationId = requestAnimationFrame((t) => this.loop(t));
        },

        spawnTarget() {
            const containerWidth = this.dom.gameArea.clientWidth;
            const containerHeight = this.dom.gameArea.clientHeight;
            
            const targetData = TargetFactory.createTarget(containerWidth, containerHeight);
            
            // Interaction: MouseEnter (Teleport)
            targetData.element.addEventListener('mouseenter', () => {
                if (!this.state.isPlaying) return;
                
                if (!targetData.isCoolingDown) {
                    this.teleportTarget(targetData);
                }
            });

            // Interaction: Click (Capture)
            targetData.element.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!this.state.isPlaying) return;
                this.captureTarget(targetData);
            });
            
            this.dom.gameArea.appendChild(targetData.element);
            this.state.targets.push(targetData);
        },

        teleportTarget(target) {
            const containerWidth = this.dom.gameArea.clientWidth;
            const containerHeight = this.dom.gameArea.clientHeight;
            
            const maxLeft = containerWidth - target.size;
            const maxTop = containerHeight - target.size;
            
            const newLeft = getRandomInt(0, maxLeft > 0 ? maxLeft : 0);
            const newTop = getRandomInt(0, maxTop > 0 ? maxTop : 0);
            
            target.element.style.left = `${newLeft}px`;
            target.element.style.top = `${newTop}px`;
            
            // Cooldown logic: Stop teleporting for 1 second after moving
            target.isCoolingDown = true;
            target.element.classList.add('vulnerable'); // Visual cue
            
            setTimeout(() => {
                if (target.element) { // Check if still exists
                    target.isCoolingDown = false;
                    target.element.classList.remove('vulnerable');
                }
            }, 1000); // 1 second window to click
        },

        captureTarget(target) {
            const index = this.state.targets.indexOf(target);
            if (index > -1) {
                this.state.targets.splice(index, 1);
            }

            target.element.classList.add('exploded');
            this.state.score += 10;
            this.updateHUD();

            setTimeout(() => {
                target.element.remove();
                if (this.state.isPlaying) {
                    this.spawnTarget(); // Spawn next one
                }
            }, 200);
        },

        handleMiss() {
            this.state.lives--;
            this.updateHUD();
            
            // Visual feedback on background?
            this.dom.gameArea.style.backgroundColor = 'rgba(255,0,0,0.1)';
            setTimeout(() => this.dom.gameArea.style.backgroundColor = '', 100);

            if (this.state.lives <= 0) {
                this.gameOver();
            }
        },

        updateHUD() {
            this.dom.scoreDisplay.textContent = this.state.score;
            this.dom.livesDisplay.textContent = this.state.lives;
        },

        gameOver() {
            this.state.isPlaying = false;
            cancelAnimationFrame(this.state.animationId);

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

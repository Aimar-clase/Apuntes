/**
 * GAME.JS
 * 
 * Motor principal del juego.
 * Patrón de Diseño: SINGLETON (Única Instancia)
 */

window.App = window.App || {};

window.App.Game = (function() {

    const { $, createElement } = window.App.Utils;
    const AsteroidFactory = window.App.AsteroidFactory;
    const Storage = window.App.Storage;

    // Objeto Singleton
    const GameInstance = {
        state: {
            isPlaying: false,
            score: 0,
            lives: 1, // One hit = Game Over
            asteroids: [], 
            spawnRate: 1000, 
            lastSpawnTime: 0,
            animationId: null,
            difficultyTimer: null,
            
            // Player State
            player: {
                element: null,
                x: 0,
                speed: 8,
                width: 50,
                height: 50,
                isMovingLeft: false,
                isMovingRight: false
            }
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

            // Player Movement Controls
            document.addEventListener('keydown', (e) => {
                if (!this.state.isPlaying) return;
                if (e.key === 'ArrowLeft') this.state.player.isMovingLeft = true;
                if (e.key === 'ArrowRight') this.state.player.isMovingRight = true;
            });

            document.addEventListener('keyup', (e) => {
                if (e.key === 'ArrowLeft') this.state.player.isMovingLeft = false;
                if (e.key === 'ArrowRight') this.state.player.isMovingRight = false;
            });
        },

        start() {
            this.state.isPlaying = true;
            this.state.score = 0;
            this.state.lives = 1;
            this.state.asteroids = [];
            this.state.spawnRate = 1000;
            this.state.lastSpawnTime = 0;
            
            this.dom.gameArea.innerHTML = '';
            this.createPlayer();
            this.updateHUD();
            
            this.dom.bestScoreDisplay.textContent = Storage.getBestScore(); // Might need separate key for this game

            this.loop(0);

            this.startDifficultyTimer();
        },

        createPlayer() {
            const playerEl = createElement('div', 'player-ship');
            this.dom.gameArea.appendChild(playerEl);
            
            const containerWidth = this.dom.gameArea.clientWidth;
            const containerHeight = this.dom.gameArea.clientHeight;
            
            this.state.player.element = playerEl;
            this.state.player.width = 40;
            this.state.player.height = 40;
            this.state.player.x = (containerWidth / 2) - (this.state.player.width / 2);
            
            // Initial Position
            playerEl.style.left = `${this.state.player.x}px`;
            playerEl.style.bottom = '20px'; // Fixed bottom
        },

        loop(timestamp) {
            if (!this.state.isPlaying) return;

            // Spawn
            if (timestamp - this.state.lastSpawnTime > this.state.spawnRate) {
                this.spawnAsteroid();
                this.state.lastSpawnTime = timestamp;
            }

            // Update Player
            this.updatePlayer();

            // Update Asteroids & Collision
            this.updateAsteroids();

            this.state.animationId = requestAnimationFrame((t) => this.loop(t));
        },

        updatePlayer() {
            const containerWidth = this.dom.gameArea.clientWidth;

            if (this.state.player.isMovingLeft) {
                this.state.player.x -= this.state.player.speed;
            }
            if (this.state.player.isMovingRight) {
                this.state.player.x += this.state.player.speed;
            }

            // Boundaries
            if (this.state.player.x < 0) this.state.player.x = 0;
            if (this.state.player.x > containerWidth - this.state.player.width) {
                this.state.player.x = containerWidth - this.state.player.width;
            }

            this.state.player.element.style.left = `${this.state.player.x}px`;
        },

        spawnAsteroid() {
            const containerWidth = this.dom.gameArea.clientWidth;
            const asteroidData = AsteroidFactory.createAsteroid(containerWidth);
            
            this.dom.gameArea.appendChild(asteroidData.element);
            this.state.asteroids.push(asteroidData);
        },

        updateAsteroids() {
            const gameHeight = this.dom.gameArea.clientHeight;

            for (let i = this.state.asteroids.length - 1; i >= 0; i--) {
                const asteroid = this.state.asteroids[i];
                
                asteroid.top += asteroid.speed;
                asteroid.element.style.top = `${asteroid.top}px`;

                // Collision Check
                if (this.checkCollision(this.state.player.element, asteroid.element)) {
                    this.gameOver();
                    return;
                }

                // Pass Check (Score)
                if (asteroid.top > gameHeight) {
                    this.handlePass(i);
                }
            }
        },

        checkCollision(a, b) {
            const rectA = a.getBoundingClientRect();
            const rectB = b.getBoundingClientRect();

            return !(rectA.right < rectB.left || 
                     rectA.left > rectB.right || 
                     rectA.bottom < rectB.top || 
                     rectA.top > rectB.bottom);
        },

        handlePass(index) {
            const asteroid = this.state.asteroids[index];
            asteroid.element.remove();
            this.state.asteroids.splice(index, 1);
            
            this.state.score += 1;
            this.updateHUD();
        },

        updateHUD() {
            this.dom.scoreDisplay.textContent = this.state.score;
            this.dom.livesDisplay.textContent = this.state.lives;
        },

        startDifficultyTimer() {
            this.state.difficultyTimer = setInterval(() => {
                if (!this.state.isPlaying) return;
                this.state.spawnRate = Math.max(200, this.state.spawnRate - 100);
            }, 5000);
        },

        gameOver() {
            this.state.isPlaying = false;
            cancelAnimationFrame(this.state.animationId);
            clearInterval(this.state.difficultyTimer);

            // Use specific key for this variant if possible, but Storage is shared.
            // Let's just overwrite for now or use a prefix if Storage supported it.
            // Given the constraints, we use the standard method.
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

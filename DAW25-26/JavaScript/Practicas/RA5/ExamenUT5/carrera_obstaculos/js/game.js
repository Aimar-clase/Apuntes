/**
 * GAME.JS
 * 
 * Motor principal del juego.
 * Patrón de Diseño: SINGLETON (Única Instancia)
 */

window.App = window.App || {};

window.App.Game = (function() {

    const { $, getRandomInt } = window.App.Utils;
    const ObstacleFactory = window.App.ObstacleFactory;
    const Storage = window.App.Storage;

    // Objeto Singleton
    const GameInstance = {
        state: {
            isPlaying: false,
            score: 0,
            lives: 3,
            obstacles: [], 
            spawnRate: 1500, 
            lastSpawnTime: 0,
            animationId: null,
            difficultyTimer: null,
            
            // Player State
            player: {
                element: null,
                y: 200,
                velocity: 0,
                speed: 5,
                height: 40,
                width: 40
            },
            keys: {
                ArrowUp: false,
                ArrowDown: false
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
            gameOverScreen: null,
            player: null
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

            // Keyboard Events (Continuous)
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    this.state.keys[e.key] = true;
                    this.updatePlayerVelocity();
                }
            });

            document.addEventListener('keyup', (e) => {
                if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                    this.state.keys[e.key] = false;
                    this.updatePlayerVelocity();
                }
            });
        },

        updatePlayerVelocity() {
            if (this.state.keys.ArrowUp && !this.state.keys.ArrowDown) {
                this.state.player.velocity = -this.state.player.speed;
            } else if (this.state.keys.ArrowDown && !this.state.keys.ArrowUp) {
                this.state.player.velocity = this.state.player.speed;
            } else {
                this.state.player.velocity = 0;
            }
        },

        start() {
            this.state.isPlaying = true;
            this.state.score = 0;
            this.state.lives = 3;
            this.state.obstacles = [];
            this.state.spawnRate = 1500;
            this.state.lastSpawnTime = 0;
            
            this.dom.gameArea.innerHTML = '';
            
            // Create Player
            this.createPlayer();
            
            this.updateHUD();
            
            this.dom.bestScoreDisplay.textContent = Storage.getBestScore();

            this.loop(0);

            this.startDifficultyTimer();
        },

        createPlayer() {
            const el = document.createElement('div');
            el.className = 'player';
            el.style.width = '40px';
            el.style.height = '40px';
            el.style.backgroundColor = '#facc15'; // Yellow
            el.style.position = 'absolute';
            el.style.left = '50px';
            el.style.top = '200px';
            el.style.borderRadius = '4px';
            
            this.dom.gameArea.appendChild(el);
            this.state.player.element = el;
            this.state.player.y = 200;
            this.state.player.velocity = 0;
        },

        loop(timestamp) {
            if (!this.state.isPlaying) return;

            if (timestamp - this.state.lastSpawnTime > this.state.spawnRate) {
                this.spawnObstacle();
                this.state.lastSpawnTime = timestamp;
            }

            this.updatePlayer();
            this.updateObstacles();
            this.checkCollisions();

            // Score increases over time or per obstacle passed?
            // Let's increase score slowly over time for a runner
            if (timestamp % 60 < 17) { // Approx every second (60 frames)
                 this.state.score += 1;
                 this.updateHUD();
            }

            this.state.animationId = requestAnimationFrame((t) => this.loop(t));
        },

        updatePlayer() {
            const player = this.state.player;
            const gameHeight = this.dom.gameArea.clientHeight;
            
            player.y += player.velocity;
            
            // Boundaries
            if (player.y < 0) player.y = 0;
            if (player.y > gameHeight - player.height) player.y = gameHeight - player.height;
            
            player.element.style.top = `${player.y}px`;
        },

        spawnObstacle() {
            const containerWidth = this.dom.gameArea.clientWidth;
            const containerHeight = this.dom.gameArea.clientHeight;
            
            const obstacleData = ObstacleFactory.createObstacle(containerWidth, containerHeight);
            
            this.dom.gameArea.appendChild(obstacleData.element);
            this.state.obstacles.push(obstacleData);
        },

        updateObstacles() {
            for (let i = this.state.obstacles.length - 1; i >= 0; i--) {
                const obs = this.state.obstacles[i];
                
                obs.left -= obs.speed;
                obs.element.style.left = `${obs.left}px`;

                if (obs.left < -50) {
                    obs.element.remove();
                    this.state.obstacles.splice(i, 1);
                }
            }
        },

        checkCollisions() {
            const playerRect = this.state.player.element.getBoundingClientRect();
            
            for (let i = this.state.obstacles.length - 1; i >= 0; i--) {
                const obs = this.state.obstacles[i];
                const obsRect = obs.element.getBoundingClientRect();
                
                if (this.isColliding(playerRect, obsRect)) {
                    this.handleCollision(i);
                }
            }
        },

        isColliding(rect1, rect2) {
            return !(rect1.right < rect2.left || 
                     rect1.left > rect2.right || 
                     rect1.bottom < rect2.top || 
                     rect1.top > rect2.bottom);
        },

        handleCollision(index) {
            const obs = this.state.obstacles[index];
            
            obs.element.classList.add('hit'); // Flash red
            this.state.lives--;
            this.updateHUD();
            
            obs.element.remove();
            this.state.obstacles.splice(index, 1);

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
                this.state.spawnRate = Math.max(800, this.state.spawnRate - 100);
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

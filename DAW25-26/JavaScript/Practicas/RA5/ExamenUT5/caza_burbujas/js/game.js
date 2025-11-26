/**
 * GAME.JS
 * 
 * Motor principal del juego.
 * Patrón de Diseño: SINGLETON (Única Instancia)
 */

window.App = window.App || {};

window.App.Game = (function() {

    const { $, getRandomInt } = window.App.Utils;
    const BubbleFactory = window.App.BubbleFactory;
    const Storage = window.App.Storage;

    // Objeto Singleton
    const GameInstance = {
        state: {
            isPlaying: false,
            score: 0,
            lives: 3,
            bubbles: [], 
            spawnRate: 1500, 
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
            this.state.bubbles = [];
            this.state.spawnRate = 1500;
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
                this.spawnBubble();
                this.state.lastSpawnTime = timestamp;
            }

            this.updateBubbles();

            this.state.animationId = requestAnimationFrame((t) => this.loop(t));
        },

        spawnBubble() {
            const containerWidth = this.dom.gameArea.clientWidth;
            
            const bubbleData = BubbleFactory.createBubble(containerWidth);
            
            // Interaction: Click
            bubbleData.element.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!this.state.isPlaying) return;
                
                if (bubbleData.type === 'trap') {
                    this.handleTrapClick(bubbleData);
                } else {
                    this.popBubble(bubbleData, 10);
                }
            });

            // Interaction: Hover (MouseEnter / MouseLeave)
            bubbleData.element.addEventListener('mouseenter', () => {
                bubbleData.isPaused = true;
                bubbleData.element.style.opacity = '0.5'; // Visual feedback
            });

            bubbleData.element.addEventListener('mouseleave', () => {
                bubbleData.isPaused = false;
                bubbleData.element.style.opacity = '1';
            });
            
            this.dom.gameArea.appendChild(bubbleData.element);
            this.state.bubbles.push(bubbleData);
        },

        updateBubbles() {
            const gameHeight = this.dom.gameArea.clientHeight;

            for (let i = this.state.bubbles.length - 1; i >= 0; i--) {
                const bubble = this.state.bubbles[i];
                
                if (!bubble.isPaused) {
                    bubble.bottom += bubble.speed;
                    bubble.element.style.bottom = `${bubble.bottom}px`;
                }

                // Check if out of bounds (Top)
                if (bubble.bottom > gameHeight) {
                    // If it's a normal bubble and escapes, maybe lose points? 
                    // Or just remove. Let's just remove for now, or lose life if requested.
                    // Requirement says: "Las burbujas suben... hasta salir por arriba". 
                    // Doesn't explicitly say you lose life if they escape, but usually yes.
                    // Let's assume no penalty for escape unless specified, but usually "Caza" implies you must catch them.
                    // Let's remove them silently for now to keep it simple, or maybe -1 score.
                    this.removeBubble(i);
                }
            }
        },

        popBubble(bubble, points) {
            const index = this.state.bubbles.indexOf(bubble);
            if (index > -1) {
                this.state.bubbles.splice(index, 1);
            }

            bubble.element.classList.add('popped');
            this.state.score += points;
            this.updateHUD();

            setTimeout(() => bubble.element.remove(), 200);
        },

        handleTrapClick(bubble) {
            const index = this.state.bubbles.indexOf(bubble);
            if (index > -1) {
                this.state.bubbles.splice(index, 1);
            }

            bubble.element.classList.add('exploded'); // Different animation
            this.state.lives--;
            this.updateHUD();
            
            setTimeout(() => bubble.element.remove(), 200);

            if (this.state.lives <= 0) {
                this.gameOver();
            }
        },

        removeBubble(index) {
            const bubble = this.state.bubbles[index];
            bubble.element.remove();
            this.state.bubbles.splice(index, 1);
        },

        updateHUD() {
            this.dom.scoreDisplay.textContent = this.state.score;
            this.dom.livesDisplay.textContent = this.state.lives;
        },

        startDifficultyTimer() {
            this.state.difficultyTimer = setInterval(() => {
                if (!this.state.isPlaying) return;
                this.state.spawnRate = Math.max(500, this.state.spawnRate - 100);
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

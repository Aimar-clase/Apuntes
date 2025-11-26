/**
 * GAME.JS
 * 
 * Motor principal del juego.
 * Patrón de Diseño: SINGLETON (Única Instancia)
 */

window.App = window.App || {};

window.App.Game = (function() {

    const { $, getRandomInt } = window.App.Utils;
    const WordFactory = window.App.WordFactory;
    const Storage = window.App.Storage;

    // Objeto Singleton
    const GameInstance = {
        state: {
            isPlaying: false,
            score: 0,
            lives: 3,
            words: [], 
            speed: 1,  
            spawnRate: 2000, 
            lastSpawnTime: 0,
            animationId: null,
            difficultyTimer: null
        },

        dom: {
            gameArea: null,
            scoreDisplay: null,
            livesDisplay: null,
            input: null,
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

            this.dom.input.addEventListener('keydown', (e) => {
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
            this.state.words = [];
            this.state.speed = 1.5; 
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
                this.spawnWord();
                this.state.lastSpawnTime = timestamp;
            }

            this.updateWords();

            this.state.animationId = requestAnimationFrame((t) => this.loop(t));
        },

        spawnWord() {
            const containerWidth = this.dom.gameArea.clientWidth;
            const wordEl = WordFactory.createWordElement(containerWidth);
            
            wordEl.addEventListener('mousedown', () => {
                if (!this.state.isPlaying) return;
                this.captureWord(wordEl.dataset.word, 2);
            });
            
            this.dom.gameArea.appendChild(wordEl);
            
            this.state.words.push({
                element: wordEl,
                y: -50, 
                text: wordEl.dataset.word
            });
        },

        updateWords() {
            const gameHeight = this.dom.gameArea.clientHeight;

            for (let i = this.state.words.length - 1; i >= 0; i--) {
                const word = this.state.words[i];
                
                word.y += this.state.speed;
                word.element.style.top = `${word.y}px`;

                if (word.y > gameHeight - 30) {
                    this.handleMiss(i);
                }
            }
        },

        handleMiss(index) {
            const word = this.state.words[index];
            
            word.element.classList.add('missed');
            
            this.state.lives--;
            this.updateHUD();
            
            word.element.remove();
            this.state.words.splice(index, 1);

            if (this.state.lives <= 0) {
                this.gameOver();
            }
        },

        checkInput(text) {
            if (!text) return;
            this.captureWord(text, 1); 
        },

        captureWord(text, points) {
            const matchIndex = this.state.words.findIndex(w => w.text === text);

            if (matchIndex !== -1) {
                const word = this.state.words[matchIndex];
                
                word.element.classList.add('hit');
                
                this.state.score += points;
                this.updateHUD();

                this.state.words.splice(matchIndex, 1);
                
                setTimeout(() => word.element.remove(), 200);
            }
        },

        updateHUD() {
            this.dom.scoreDisplay.textContent = this.state.score;
            this.dom.livesDisplay.textContent = this.state.lives;
        },

        startDifficultyTimer() {
            this.state.difficultyTimer = setInterval(() => {
                if (!this.state.isPlaying) return;
                this.state.speed += 0.2;
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

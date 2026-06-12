// Инициализация игры
let gameState = {
    board: Array(4).fill(null).map(() => Array(4).fill(null)),
    score: 0,
    bestScore: 0
};


// Функция для инициализации игры
function initGame() {
    gameState.board = Array(4).fill(null).map(() => Array(4).fill(null));
    gameState.score = 0;
    gameState.bestScore = 0;
    renderBoard();
    addNewTile();
    addNewTile();
}

// Функция для добавления новой плитки
function addNewTile() {
    let emptyCells = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (gameState.board[i][j] === null) {
                emptyCells.push({ x: i, y: j });
            }
        }
    }
    if (emptyCells.length > 0) {
        let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        gameState.board[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4;
    }
}

// Функция для рендеринга игрового поля
function renderBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.classList.add(`tile-${gameState.board[i][j] || '0'}`);
            tile.textContent = gameState.board[i][j] || '';
            gameBoard.appendChild(tile);
        }
    }
}

// Функция для рендеринга счета и лучшего счета
function renderScores() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `Счет: ${gameState.score}`;

    const bestScoreElement = document.getElementById('best-score');
    bestScoreElement.textContent = `Лучший счет: ${gameState.bestScore}`;
}

// Функция для проверки окончания игры
function isGameOver() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (gameState.board[i][j] === null) {
                return false;
            }
        }
    }
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (gameState.board[i][j] === gameState.board[i][j + 1] || gameState.board[j][i] === gameState.board[j + 1][i]) {
                return false;
            }
        }
    }
    return true;
}

// Функция для перемещения плиток вверх
function moveUp() {
    for (let j = 0; j < 4; j++) {
        let column = [];
        for (let i = 0; i < 4; i++) {
            if (gameState.board[i][j] !== null) {
                column.push(gameState.board[i][j]);
            }
        }
        column = column.reduce((acc, val) => {
            if (acc.length === 0 || acc[acc.length - 1] !== val) {
                acc.push(val);
            } else {
                acc[acc.length - 1] *= 2;
                gameState.score += acc[acc.length - 1];
            }
            return acc;
        }, []);
        column = column.concat(Array(4 - column.length).fill(null));
        for (let i = 0; i < 4; i++) {
            gameState.board[i][j] = column[i];
        }
    }
    addNewTile();
    renderBoard();
    renderScores();
    if (isGameOver()) {
        alert('Игра окончена!');
    }
}

// Функция для перемещения плиток вниз
function moveDown() {
    for (let j = 0; j < 4; j++) {
        let column = [];
        for (let i = 3; i >= 0; i--) {
            if (gameState.board[i][j] !== null) {
                column.push(gameState.board[i][j]);
            }
        }
        column = column.reduce((acc, val) => {
            if (acc.length === 0 || acc[acc.length - 1] !== val) {
                acc.push(val);
            } else {
                acc[acc.length - 1] *= 2;
                gameState.score += acc[acc.length - 1];
            }
            return acc;
        }, []);
        column = Array(4 - column.length).fill(null).concat(column);
        for (let i = 0; i < 4; i++) {
            gameState.board[i][j] = column[i];
        }
    }
    addNewTile();
    renderBoard();
    renderScores();
    if (isGameOver()) {
        alert('Игра окончена!');
    }
}

// Функция для перемещения плиток влево
function moveLeft() {
    for (let i = 0; i < 4; i++) {
        let row = [];
        for (let j = 0; j < 4; j++) {
            if (gameState.board[i][j] !== null) {
                row.push(gameState.board[i][j]);
            }
        }
        row = row.reduce((acc, val) => {
            if (acc.length === 0 || acc[acc.length - 1] !== val) {
                acc.push(val);
            } else {
                acc[acc.length - 1] *= 2;
                gameState.score += acc[acc.length - 1];
            }
            return acc;
        }, []);
        row = row.concat(Array(4 - row.length).fill(null));
        for (let j = 0; j < 4; j++) {
            gameState.board[i][j] = row[j];
        }
    }
    addNewTile();
    renderBoard();
    renderScores();
    if (isGameOver()) {
        alert('Игра окончена!');
    }
}

// Функция для перемещения плиток вправо
function moveRight() {
    for (let i = 0; i < 4; i++) {
        let row = [];
        for (let j = 3; j >= 0; j--) {
            if (gameState.board[i][j] !== null) {
                row.push(gameState.board[i][j]);
            }
        }
        row = row.reduce((acc, val) => {
            if (acc.length === 0 || acc[acc.length - 1] !== val) {
                acc.push(val);
            } else {
                acc[acc.length - 1] *= 2;
                gameState.score += acc[acc.length - 1];
            }
            return acc;
        }, []);
        row = Array(4 - row.length).fill(null).concat(row);
        for (let j = 0; j < 4; j++) {
            gameState.board[i][j] = row[j];
        }
    }
    addNewTile();
    renderBoard();
    renderScores();
    if (isGameOver()) {
        alert('Игра окончена!');
    }
}

// Обработчики событий для клавиш
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowRight':
            moveRight();
            break;
    }
});

// Обработчик события для кнопки "Новая игра"
document.getElementById('new-game-btn').addEventListener('click', initGame);

// Инициализация игры при загрузке страницы
initGame();

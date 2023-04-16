const GAME_BOARD_WIDTH = 10;
const GAME_BOARD_HEIGHT = 20;

const SHAPES = [
    // I shape
    [[1, 1, 1, 1]],
    // L shape
    [[1, 1, 1], [1, 0, 0]],
    // J shape
    [[1, 1, 1], [0, 0, 1]],
    // O shape
    [[1, 1], [1, 1]],
    // S shape
    [[0, 1, 1], [1, 1, 0]],
    // T shape
    [[1, 1, 1], [0, 1, 0]],
    // Z shape
    [[1, 1, 0], [0, 1, 1]],
];

let gameBoard = [];
let currentShape = null;
let currentShapeX = null;
let currentShapeY = null;
let isGameOver = false;

function startGame() {
    gameBoard = new Array(GAME_BOARD_HEIGHT).fill().map(() => new Array(GAME_BOARD_WIDTH).fill(0));
    currentShape = getRandomShape();
    currentShapeX = Math.floor(GAME_BOARD_WIDTH / 2) - Math.floor(currentShape[0].length / 2);
    currentShapeY = 0;
    isGameOver = false;
    drawGameBoard();
    drawShape();
}

function getRandomShape() {
    return SHAPES[Math.floor(Math.random() * SHAPES.length)];
}

function drawGameBoard() {
    const gameBoardElement = document.getElementById("game-board");
    gameBoardElement.innerHTML = "";
    for (let y = 0; y < GAME_BOARD_HEIGHT; y++) {
        for (let x = 0; x < GAME_BOARD_WIDTH; x++) {
            const square = document.createElement("div");
            square.className = gameBoard[y][x] ? "square filled" : "square";
            gameBoardElement.appendChild(square);
        }
    }
}

function drawShape() {
    currentShape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                const gameBoardElement = document.getElementById("game-board");
                const square = document.createElement("div");
                square.className = "square filled";
                square.style.top = (currentShapeY + y) * 30 + "px";
                square.style.left = (currentShapeX + x) * 30 + "px";
                gameBoardElement.appendChild(square);
            }
        });
    });
}

function clearShape() {
    const gameBoardElement = document.getElementById("game-board");
    const filledSquares = gameBoardElement.querySelectorAll(".filled");
    filledSquares.forEach((square) => square.remove());
}

function moveDown() {
    clearShape();
    currentShapeY++;
    if (hasCollisions()) {
        currentShapeY--;
        placeShape();
    }
    drawShape();
}

function moveLeft() {
    clearShape();
    currentShapeX--;
    if (hasCollisions()) {
        currentShapeX++;
    }
    drawShape();
}
function moveRight() {
    clearShape();
    currentShapeX++;
    if (hasCollisions()) {
        currentShapeX--;
    }
    drawShape();
}

function rotateShape() {
    clearShape();
    const previousShape = currentShape;
    currentShape = rotateMatrix(currentShape);
    if (hasCollisions()) {
        currentShape = previousShape;
    }
    drawShape();
}

function rotateMatrix(matrix) {
    const newMatrix = [];
    for (let x = 0; x < matrix[0].length; x++) {
        const newRow = [];
        for (let y = matrix.length - 1; y >= 0; y--) {
            newRow.push(matrix[y][x]);
        }
        newMatrix.push(newRow);
    }
    return newMatrix;
}

function hasCollisions() {
    for (let y = 0; y < currentShape.length; y++) {
        for (let x = 0; x < currentShape[y].length; x++) {
            if (
                currentShape[y][x] &&
                (currentShapeX + x < 0 ||
                    currentShapeX + x >= GAME_BOARD_WIDTH ||
                    currentShapeY + y >= GAME_BOARD_HEIGHT ||
                    gameBoard[currentShapeY + y][currentShapeX + x])
            ) {
                return true;
            }
        }
    }
    return false;
}

function placeShape() {
    currentShape.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value) {
                gameBoard[currentShapeY + y][currentShapeX + x] = value;
            }
        });
    });
    checkRows();
    currentShape = getRandomShape();
    currentShapeX = Math.floor(GAME_BOARD_WIDTH / 2) - Math.floor(currentShape[0].length / 2);
    currentShapeY = 0;
    if (hasCollisions()) {
        isGameOver = true;
        alert("Game over!");
    }
}

function checkRows() {
    for (let y = 0; y < GAME_BOARD_HEIGHT; y++) {
        if (gameBoard[y].every((value) => value)) {
            gameBoard.splice(y, 1);
            gameBoard.unshift(new Array(GAME_BOARD_WIDTH).fill(0));
        }
    }
}

document.addEventListener("keydown", (event) => {
    if (isGameOver) {
        return;
    }
    if (event.code === "ArrowDown") {
        moveDown();
    } else if (event.code === "ArrowLeft") {
        moveLeft();
    } else if (event.code === "ArrowRight") {
        moveRight();
    } else if (event.code === "ArrowUp") {
        rotateShape();
    }
});

startGame();
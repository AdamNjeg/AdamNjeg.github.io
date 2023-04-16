// Define the canvas and context
const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

// Set the width and height of each block
const blockWidth = 24;
const blockHeight = 24;

// Define the game board
const boardWidth = 10;
const boardHeight = 20;
const board = [];

for (let row = 0; row < boardHeight; row++) {
    board[row] = [];
    for (let col = 0; col < boardWidth; col++) {
        board[row][col] = 0;
    }
}

// Define the Tetromino shapes
const shapes = [
    [1, 1, 1, 1],
    [1, 1, 1, 0,
        1],
    [1, 1, 1, 0,
        0, 0, 1],
    [1, 1, 0, 0,
        1, 1],
    [1, 1, 0, 0,
        0, 1, 1],
    [0, 1, 1, 0,
        1, 1],
    [0, 1, 0, 0,
        1, 1, 1]
];

// Define the Tetromino colors
const colors = [
    "#FF0D72",
    "#0DC2FF",
    "#0DFF72",
    "#F538FF",
    "#FF8E0D",
    "#FFE138",
    "#3877FF"
];

// Define the current Tetromino
let currentShape = shapes[0];
let currentColor = colors[0];
let currentX = 3;
let currentY = 0;

// Define the game loop
function gameLoop() {
    clearCanvas();
    drawBoard();
    drawShape(currentShape, currentColor, currentX, currentY);
}

// Clear the canvas
function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

// Draw the game board
function drawBoard() {
    for (let row = 0; row < boardHeight; row++) {
        for (let col = 0; col < boardWidth; col++) {
            drawBlock(col, row, board[row][col]);
        }
    }
}

// Draw a Tetromino shape
function drawShape(shape, color, x, y) {
    for (let row = 0; row < shape.length; row++) {
        for (let col = 0; col < shape[row].length; col++) {
            if (shape[row][col]) {
                drawBlock(x + col, y + row, color);
            }
        }
    }
}

// Draw a single block
function drawBlock(x, y, color) {
    context.fillStyle = color;
    context.fillRect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
    context.strokeStyle = "#000";
    context.strokeRect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
}

// Start the game loop
setInterval(gameLoop, 1000 / 60);

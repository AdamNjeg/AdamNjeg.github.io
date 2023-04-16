const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set the canvas dimensions to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ROWS = 20;
const COLS = 10;
const board = [];

for (let row = 0; row < ROWS; row++) {
    board[row] = [];

    for (let col = 0; col < COLS; col++) {
        board[row][col] = 0; // Set all cells to empty
    }
}

function drawBoard() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = board[row][col];

            // Set the fill color based on the cell value
            switch (cell) {
                case 0:
                    ctx.fillStyle = '#000';
                    break;
                // Add more cases for different block colors/shapes
            }

            // Draw a rectangle for the cell
            ctx.fillRect(col * CELL_SIZE, row * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
    }
}

document.addEventListener('keydown', event => {
    switch (event.key) {
        case 'ArrowLeft':
            // Move the current block left
            break;
        case 'ArrowRight':
            // Move the current block right
            break;
    }
});

const FPS = 60;
const INTERVAL = 1000 / FPS;

let lastTime = 0;

function gameLoop(timestamp) {
    // Calculate the time elapsed since the last frame
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    // Update the game state
    update(deltaTime);

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the game board and current block
    drawBoard();
    drawCurrentBlock();

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

function update(deltaTime) {
    // Update the current block position based on user input
    // and gravity
}

function drawCurrentBlock() {
    // Draw the current block on top of the game board
}

// Start the game loop
requestAnimationFrame(gameLoop);


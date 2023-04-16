const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const ROW = 20;
const COL = 10;
const SQ = 30;
const VACANT = "#fff";

// draw a square
function drawSquare(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

    ctx.strokeStyle = "#000";
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

// create the board
let board = [];
for (r = 0; r < ROW; r++) {
    board[r] = [];
    for (c = 0; c < COL; c++) {
        board[r][c] = VACANT;
    }
}

// draw the board
function drawBoard() {
    for (r = 0; r < ROW; r++) {
        for (c = 0; c < COL; c++) {
            drawSquare(c, r, board[r][c]);
        }
    }
}

drawBoard();

// create the pieces
const PIECES = [[Z, "red"],
[S, "green"],
[T, "purple"],
[O, "yellow"],
[L, "orange"],
[I, "cyan"],
[J, "blue"]
];

// generate random pieces
function randomPiece() {
    let r = Math.floor(Math.random() * PIECES.length)
    return new Piece(PIECES[r][0], PIECES[r][1]);
}

let p = randomPiece();

// the Object Piece
function Piece(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;

    this.tetrominoN = 0; // start from the first pattern
    this.activeTetromino = this.tetromino[this.tetrominoN];

    // draw the piece
    this.draw = function () {
        for (r = 0; r < this.activeTetromino.length; r++) {
            for (c = 0; c < this.activeTetromino.length; c++) {
                // draw only occupied squares
                if (this.activeTetromino[r][c]) {
                    drawSquare(this.x + c, this.y + r, this.color);
                }
            }
        }
    }

    // undraw the piece
    this.unDraw = function () {
        for (r = 0; r < this.activeTetromino.length; r++) {
            for (c = 0; c < this.activeTetromino.length; c++) {
                // draw only occupied
            }
        }
    }
    // move down the piece
    this.moveDown = function () {
        if (!this.collision(0, 1, this.activeTetromino)) {
            this.unDraw();
            this.y++;
            this.draw();
        } else {
            // lock the piece and generate a new one
            this.lock();
            p = randomPiece();
        }
    }

    // move right the piece
    this.moveRight = function () {
        if (!this.collision(1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x++;
            this.draw();
        }
    }

    // move left the piece
    this.moveLeft = function () {
        if (!this.collision(-1, 0, this.activeTetromino)) {
            this.unDraw();
            this.x--;
            this.draw();
        }
    }

    // rotate the piece
    this.rotate = function () {
        let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
        let kick = 0;

        if (this.collision(0, 0, nextPattern)) {
            if (this.x > COL / 2) {
                kick = -1;
            } else {
                kick = 1;
            }
        }

        if (!this.collision(kick, 0, nextPattern)) {
            this.unDraw();
            this.x += kick;
            this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
            this.activeTetromino = this.tetromino[this.tetrominoN];
            this.draw();
        }
    }

    // lock the piece
    this.lock = function () {
        for (r = 0; r < this.activeTetromino.length; r++) {
            for (c = 0; c < this.activeTetromino.length; c++) {
                // skip the vacant squares
                if (!this.activeTetromino[r][c]) {
                    continue;
                }

                // game over if the piece is locked at the top
                if (this.y + r < 0) {
                    alert("Game Over");
                    // stop the animation
                    gameOver = true;
                    break;
                }

                // lock the piece
                board[this.y + r][this.x + c] = this.color;
            }
        }

        // remove full rows
        for (r = 0; r < ROW; r++) {
            let isRowFull = true;
            for (c = 0; c < COL; c++) {
                isRowFull = isRowFull && (board[r][c] != VACANT);
            }
            if (isRowFull) {
                // move down the rows above the removed one
                for (y = r; y > 1; y--) {
                    for (c = 0; c < COL; c++) {
                        board[y][c] = board[y - 1][c];
                    }
                }

                // the top row has no row above it
                for (c = 0; c < COL; c++) {
                    board[0][c] = VACANT;
                }

                // increase the score
                score += 10;
            }
        }

        // update the board
        drawBoard();

        // update the score
        scoreElement.innerHTML = score;
    }

}
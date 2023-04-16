const GAME_BOARD_WIDTH = 10;
const GAME_BOARD_HEIGHT = 20;
let gameBoard = [];

function createGameBoard() {
    for (let y = 0; y < GAME_BOARD_HEIGHT; y++) {
        let row = [];
        for (let x = 0; x < GAME_BOARD_WIDTH; x++) {
            row.push(0);
        }
        gameBoard.push(row);
    }
}
function drawGameBoard() {
    const gameBoardElement = document.getElementById("gameBoard");
    gameBoardElement.innerHTML = "";
    for (let y = 0; y < GAME_BOARD_HEIGHT; y++) {
        for (let x = 0; x < GAME_BOARD_WIDTH; x++) {
            const square = document.createElement("div");
            square.className = gameBoard[y][x] ? "squareFilled" : "square";
            gameBoardElement.appendChild(square);

        }
    }
}
createGameBoard();
drawGameBoard();
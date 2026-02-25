const boardElement = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
const cells = document.querySelectorAll('.cell');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // Ignore click if cell is taken or game is over
    if (gameState[clickedCellIndex] !== "" || !gameActive) return;

    updateCell(clickedCell, clickedCellIndex);
    checkResult();
}

function updateCell(cell, index) {
    gameState[index] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase()); // For styling
}

function checkResult() {
    let roundWon = false;

    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerText = "It's a Draw!";
        gameActive = false;
        return;
    }

    // Switch player
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerText = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerText = "Player X's Turn";
    cells.forEach(cell => {
        cell.innerText = "";
        // ADD THIS LINE: It removes the color classes from the previous game
        cell.classList.remove("x", "o"); 
    });
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
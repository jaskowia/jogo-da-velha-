const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add(currentPlayer);

    checkResult();
};

const checkResult = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDiv.innerHTML = `Jogador ${currentPlayer} Venceu!`;
        gameActive = false;
        return;
    }

    let roundDraw = !board.includes('');
    if (roundDraw) {
        statusDiv.innerHTML = 'Empate!';
        gameActive = false;
        return;
    }

    handlePlayerChange();
};

const handlePlayerChange = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDiv.innerHTML = `Vez do ${currentPlayer}`;
};

const handleResetGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    statusDiv.innerHTML = 'Vez do X';
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('X', 'O');
    });
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleResetGame);
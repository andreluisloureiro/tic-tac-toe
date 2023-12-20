import { removeMenu, appearBoard, removeBoard, returnBoard, setDisplay, putMenuBack, cleanGame } from "./animations.js"

var player = "X";

var gameEnd = false;

var game = '';

var victoryCount = { X: 0, O: 0 };

var pointsToWin;

var pointsX = document.getElementById("pointsX");

var pointsO = document.getElementById("pointsO");

var diagonalArrays;

document.getElementById("startBasicTicTacToe").addEventListener('click', () => { createBoard(3) });

document.getElementById("startTicTacToe2").addEventListener('click', () => { createBoard(6) });

function createBoard(cellAmount) {
    if (cellAmount === 6) {
        pointsToWin = 4;
    } else {
        pointsToWin = 3;
    }
    var board = "";
    var boardCode = [];
    for (var o = 0; o < cellAmount; o++) {
        boardCode.push([])
        for (var i = 0; i < cellAmount; i++) {
            board += `<div cell-index="${i}" row="${o}" class="cell"></div>`
            boardCode[o].push('')
        }
    }
    game = boardCode;
    printBoard(board, cellAmount);
    calculateDiagonalArrays()
}

function printBoard(boardHTML, cellAmount) {
    var container = document.createElement('div');
    container.classList.add("gameContainer");
    container.innerHTML = boardHTML;
    container.style.width = `${(cellAmount * 100) + (cellAmount * 8)}px`;
    container.style.gridTemplateColumns = `repeat(${cellAmount}, auto)`;
    document.getElementById("gameBoard").append(container);
    if (cellAmount === 6) {
        container.style.width = `${(cellAmount * 50) + (cellAmount * 8)}px`;
        for (var cell = 0; cell < 36; cell++) {
            var currentCell = document.getElementsByClassName("cell")[cell]
            currentCell.classList.add("ticTacToeTwo")
        }
    }
    const timeOut = setTimeout(appearBoard, 600);
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleClick));
    removeMenu();
}

function calculateDiagonalArrays() {
    diagonalArrays = [[], [], [], []];
    for (let i = 0; i < game.length; i++) {
        for (let j = 0; j <= i; j++) {
            diagonalArrays[0].push(j);
        }
    }
    for (let k = 1; k < game.length; k++) {
        for (let l = k; l < game.length; l++) {
            diagonalArrays[0].push(l);
        }
    }
    for (let x = game.length - 1; x > -1; x--) {
        for (let o = x; o < game.length; o++) {
            diagonalArrays[1].push(o)
        }
    }
    for (let x = game.length - 1; x > -1; x--) {
        for (let o = 0; o < x; o++) {
            diagonalArrays[1].push(o)
        }
    }
    for (let x = 0; x < game.length; x++) {
        for (let o = x; o > -1; o--) {
            diagonalArrays[2].push(o)
        }
    }
    for (let x = 0; x < game.length + 1; x++) {
        for (let o = game.length - 1; o > x; o--) {
            diagonalArrays[2].push(o)
        }
    }
    diagonalArrays[3] = [...Array(game.length).keys()].map(i => i + 1).concat([...Array(game.length - 1).keys()].map(i => game.length - i - 1));
}

function setArraysForChecking() {
    let squareNumbers = game.length;
    let xPoints = 0;
    let oPoints = 0;
    checkGame(squareNumbers, xPoints, oPoints)
}

function checkGame(squareNumbers, xPoints, oPoints) {
    checkHorizontal(squareNumbers, xPoints, oPoints)
    checkVertical(squareNumbers, xPoints, oPoints)
    checkDiagonalPositive(xPoints, oPoints, diagonalArrays)
    checkDiagonalNegative(xPoints, oPoints, diagonalArrays)
    checkDraw()
}

function checkHorizontal(squareNumbers, xPoints, oPoints) {
    for (let column = 0; column < squareNumbers; column++) {
        for (let row = 0; row < squareNumbers; row++) {
            if (game[column][row] === 'X') {
                xPoints += 1;
                oPoints = 0;
            } else if (game[column][row] === 'O') {
                xPoints = 0;
                oPoints += 1;
            } else {
                xPoints = 0;
                oPoints = 0;
            }
            if (xPoints === pointsToWin || oPoints === pointsToWin) {
                endGame()
                return
            }
        }
        xPoints = 0;
        oPoints = 0;
    }
}

function checkVertical(squareNumbers, xPoints, oPoints) {
    for (var column = 0; column < squareNumbers; column++) {
        for (var row = 0; row < squareNumbers; row++) {
            if (game[row][column] === 'X') {
                xPoints += 1;
                oPoints = 0;
            } else if (game[row][column] === 'O') {
                xPoints = 0;
                oPoints += 1;
            } else {
                xPoints = 0;
                oPoints = 0;
            }
            if (xPoints === pointsToWin || oPoints === pointsToWin) {
                endGame()
                return
            }
        }
        xPoints = 0;
        oPoints = 0;
    }
}

function checkDiagonalPositive(xPoints, oPoints, diagonalArrays) {
    calculateDiagonalArrays()
    for (let x = 1; x < game.length * game.length; x++) {
        let currentCellLines = diagonalArrays[0].splice(0, diagonalArrays[3][x - 1]);
        let currentCellIndex = diagonalArrays[1].splice(0, diagonalArrays[3][x - 1]);
        for (let o = 0; o < currentCellLines.length; o++) {
            if (game[currentCellLines[o]][currentCellIndex[o]] === 'X') {
                xPoints += 1;
                oPoints = 0;
            } else if (game[currentCellLines[o]][currentCellIndex[o]] === 'O') {
                xPoints = 0;
                oPoints += 1;
            } else {
                xPoints = 0;
                oPoints = 0;
            } if (xPoints === pointsToWin || oPoints === pointsToWin) {
                endGame();
                return
            }
        }
        xPoints = 0;
        oPoints = 0;
    }
}

function checkDiagonalNegative(xPoints, oPoints, diagonalArrays) {
    calculateDiagonalArrays()
    for (let x = 1; x < game.length * game.length; x++) {
        let currentCellLines = diagonalArrays[0].splice(0, diagonalArrays[3][x - 1]);
        let currentCellIndex = diagonalArrays[2].splice(0, diagonalArrays[3][x - 1]);
        for (let o = 0; o < currentCellLines.length; o++) {
            if (game[currentCellLines[o]][currentCellIndex[o]] === 'X') {
                xPoints += 1;
                oPoints = 0;
            } else if (game[currentCellLines[o]][currentCellIndex[o]] === 'O') {
                xPoints = 0;
                oPoints += 1;
            } else {
                xPoints = 0;
                oPoints = 0;
            } if (xPoints === pointsToWin || oPoints === pointsToWin) {
                endGame();
                return
            }
        }
        xPoints = 0;
        oPoints = 0;
    }
}

function checkDraw() {
    var occupiedSpaces = 0;
    for (let row = 0; row < game.length; row++) {
        for (let column = 0; column < game.length; column++) {
            if (game[row][column] === "X" || game[row][column] === "O") {
                occupiedSpaces += 1
            }
        }
    }
    if (occupiedSpaces === game.length * game.length) {
        endGame("draw")
    }
}

function handleBoard(clickedCell, clickedCellIndex, row) {
    if (game[row][clickedCellIndex] != '') {
        setArraysForChecking()
        return
    } else {
        game[row][clickedCellIndex] = player;
        clickedCell.innerHTML = player;
        var colour = player === "X" ? "#d86c23" : "#04c0b2";
        clickedCell.style.color = colour;
    }
    player = player === "X" ? "O" : "X";
    setArraysForChecking()
}

function handleClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('cell-index'));
    const row = parseInt(clickedCell.getAttribute('row'));
    if (gameEnd === false) {
        handleBoard(clickedCell, clickedCellIndex, row);
    } else {
        return;
    }
}


function endGame(result) {
    document.getElementById("scoreBoard").classList.add("appear");
    if (result === 'draw') {
        return
    } else {
        if (player === "O") {
            victoryCount.X += 1;
            pointsX.innerHTML = victoryCount.X;
            document.getElementById("squareX").classList.add("win");
        } else if (player === "X") {
            victoryCount.O += 1;
            pointsO.innerHTML = victoryCount.O;
            document.getElementById("squareO").classList.add("win");
        }
    };
    gameEnd = true;
}

document.getElementById("restartGameButton").addEventListener("click", eraseBoard);

document.getElementById("menuButton").addEventListener('click', returnToMenu);

function eraseBoard() {
    removeBoard()
    setTimeout(() => { cleanGame(game) }, "600");
    setTimeout(() => { returnBoard() }, "800");
    gameEnd = false;
}

function returnToMenu() {
    removeBoard()
    setTimeout(() => { setDisplay() }, "600");
    setTimeout(() => { putMenuBack(victoryCount, pointsX, pointsO) }, "900");
    setTimeout(() => { cleanGame(game, gameEnd) }, "600");
    gameEnd = false;
}



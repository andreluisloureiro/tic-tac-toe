import { removeMenu, appearBoard, removeBoard, returnBoard, setDisplay, putMenuBack, cleanGame } from "./animations.js"

var player = "X";

var bot = false;

var currentPlayerCell = [];

var gameEnd = false;

var game = '';

var victoryCount = { X: 0, O: 0 };

var pointsToWin;

var currentLine = [];

var diagonalArrays;

document.getElementById("startBasicTicTacToe").addEventListener('click', () => { createBoard(3) });

document.getElementById("startTicTacToe2").addEventListener('click', () => { createBoard(6) });


function createBoard(cellAmount) {
    currentPlayer()
    pointsToWin = cellAmount === 6 ? 4 : 3;
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
    document.getElementById("gameBoard").append(container);
    if (cellAmount === 6) {
        document.getElementsByClassName("gameContainer")[0].classList.add("longWay")
        // container.style.width = `${(cellAmount * 50) + (cellAmount * 8)}px`;
        for (var cell = 0; cell < 36; cell++) {
            var currentCell = document.getElementsByClassName("cell")[cell]
            currentCell.classList.add("ticTacToeTwo")
        }
    } else {
        document.getElementsByClassName("gameContainer")[0].classList.remove("longWay")
    }
    const timeOut = setTimeout(appearBoard, 1000);
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleClick));
    removeMenu(pointsToWin);
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
    let boardSize = game.length;
    let xPoints = 0;
    let oPoints = 0;
    checkGame(boardSize, xPoints, oPoints)
}

function checkGame(boardSize, xPoints, oPoints) {
    checkHorizontal(boardSize, xPoints, oPoints)
    checkVertical(boardSize, xPoints, oPoints)
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
                drawLine("horizontal", column)  
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
                drawLine("vertical", column)  
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
                drawLine("negative")
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
                drawLine("positive")
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

    // Count the occupied spaces on the game board
    for (let row = 0; row < game.length; row++) {
        for (let column = 0; column < game[row].length; column++) {
            if (["X", "O"].includes(game[row][column])) {
                occupiedSpaces++;
            }
        }
    }

    // Check for a draw
    if (occupiedSpaces === game.length * game.length) {
        endGame("draw");
        return; // No need to continue if it's a draw
    }

    // If the current player is "X" or the game is already a draw, return
    if (player === "X" || occupiedSpaces === game.length * game.length) {
        return;
    }

    // If the player is "O" and it's not a draw, and if it's a game with a bot, call the randomized function
    if (bot === true) {
        randomized();
    }
}


function handleBoard(clickedCell, clickedCellIndex, row) {
    if (game[row][clickedCellIndex] != '') {
        return
    } else {
        game[row][clickedCellIndex] = player;
        clickedCell.innerHTML = player;
        var colour = player === "X" ? "#d86c23" : "#04c0b2";
        clickedCell.style.color = colour;
        player = player === "X" ? "O" : "X";
    }
    setArraysForChecking()
}

function randomized() {
    for (var i = 0; i < game.length * game.length; i++) {
        var botCell = document.getElementsByClassName("cell")[i]
        var botClickedCellIndex = parseInt(botCell.getAttribute('cell-index'));
        var botRow = parseInt(botCell.getAttribute('row'));
        if (botClickedCellIndex != currentPlayerCell[1]) {

        } else {
            if (botCell.innerHTML === "X" || botCell.innerHTML === "O") {
                redraw()
                function redraw() {
                    botCell = document.getElementsByClassName("cell")[Math.floor(Math.random() * 9)]
                    if (botCell.innerHTML === "X" || botCell.innerHTML === "O") {
                        redraw();
                    } else {
                        botClickedCellIndex = parseInt(botCell.getAttribute('cell-index'));
                        botRow = parseInt(botCell.getAttribute('row'));
                    }
                }
            }
            handleBoard(botCell, botClickedCellIndex, botRow);
            i = game.length * game.length;
        }
    }
    currentPlayerCell = [];
}

function handleClick(clickedCellEvent) {
    if (bot) {
        player = "X";
    }

    if (gameEnd) {
        return;
    }

    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('cell-index'));
    const row = parseInt(clickedCell.getAttribute('row'));

    currentPlayerCell.push(clickedCell, clickedCellIndex, row);

    const squareX = document.getElementById("squareX");
    const squareO = document.getElementById("squareO");

    if (player === "O") {
        squareX.classList.add("current");
        squareO.classList.remove("current");
    } else {
        squareO.classList.add("current");
        squareX.classList.remove("current");
    }

    handleBoard(clickedCell, clickedCellIndex, row);
    handleVibration()
}



function endGame(result) {
    document.getElementById("squareX").classList.remove("current");
    document.getElementById("squareO").classList.remove("current");
    document.getElementById("scoreBoard").classList.add("appear");

    if (result === 'draw') {
        gameEnd = true;
        return
    } else {
        if (player === "O") {
            victoryCount.X += 1;
            document.getElementById("pointsX").innerHTML = victoryCount.X;
            document.getElementsByClassName("vl")[0].style.background = "rgb(221, 90, 3)";
            document.getElementById("squareX").classList.add("win");
        } else if (player === "X") {
            victoryCount.O += 1;
            document.getElementById("pointsO").innerHTML = victoryCount.O;
            document.getElementsByClassName("vl")[0].style.background = "rgb(4, 192, 178)";
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
    currentPlayer()
    gameEnd = false;
}

function returnToMenu() {
    removeBoard()
    setTimeout(() => { setDisplay() }, "600");
    setTimeout(() => { putMenuBack(victoryCount) }, "900");
    setTimeout(() => { cleanGame(game, gameEnd) }, "600");
    gameEnd = false;
}

function currentPlayer() {
    const squareX = document.getElementById("squareX");
    const squareO = document.getElementById("squareO");

    if (squareX && squareO) {
        squareX.classList.toggle("current", player === "X");
        squareO.classList.toggle("current", player === "O");
    }
}


function drawLine(direction, line) {
    if (pointsToWin === 3){
        const vlElement = document.getElementsByClassName("vl")[0];

        switch (direction) {
            case "horizontal":
                if (line >= 0 && line <= 2) {
                    vlElement.classList.add(`row${line + 1}`);
                }
                setTimeout(() => showLine(), 150);
                break;
    
            case "vertical":
                if (line === 0 || line === 2) {
                    vlElement.classList.add(`column${line + 1}`);
                }
                setTimeout(() => showLine(), 150);
                break;
    
            case "negative":
            case "positive":
                vlElement.classList.add(direction);
                setTimeout(() => showDiagonalLine(), 150);
                break;
        }
    
        function showLine() {
            vlElement.classList.add("appear");
        }
    
        function showDiagonalLine() {
            vlElement.classList.add("diagonal");
        }
    } else {
        return
    }
}

function handleVibration() {
    navigator.vibrate(200);
}
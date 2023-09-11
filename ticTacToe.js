var player = "X";

var gameEnd = false;

var game = '';

var victoryCount = {X: 0, O: 0}

var pointsToWin = 3;

var startBasicTicTacToe = document.getElementsByClassName("startBasicTicTacToe")[0];

var gameBoard = document.getElementsByClassName("gameBoard")[0]

var startMenu = document.getElementsByClassName("startMenu")[0];

var returnMenu = document.getElementsByClassName("returnMenu")[0];

var scoreBoard = document.getElementById("scoreBoard")

var pointsX = document.getElementById("pointsX")

var pointsO = document.getElementById("pointsO")

var squareX = document.getElementById("squareX")

var squareO = document.getElementById("squareO")

startBasicTicTacToe.addEventListener('click', () => { createBoard(3) });

function createBoard(cellAmount) {
    var board = ""
    var boardCount = []
    for (var o = 0; o < cellAmount; o++) {
        boardCount.push([])
        for (var i = 0; i < cellAmount; i++) {
            board += `<div cell-index="${i}" row="${o}" class="cell"></div>`
            boardCount[o].push('')
        }
    }
    game = boardCount
    printBoard(board, cellAmount)
}

function printBoard(boardHTML, cellAmount) {
    var container = document.createElement('div');
    container.classList.add("gameContainer");
    var content = boardHTML;
    container.innerHTML = content;
    gameBoard.append(container);
    container.style.gridTemplateColumns = `repeat(${cellAmount}, auto)`;
    container.style.width = `${(cellAmount * 100) + (cellAmount * 8)}px`;
    removeMenu();
    const timeOut = setTimeout(appearBoard, 600);
    document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleClick));
}

function removeMenu() {
    startMenu.classList.add("remove")
    gameBoard.classList.add("displayFlex")
}

function appearBoard() {
    startMenu.classList.add("displayNone")

    gameBoard.classList.add("appear")
}

function checkGame() {
    checkHorizontal()
    checkVertical()
    checkDiagonal()
    checkDraw()
}

function checkHorizontal() {
    var squaresForChecking = game.length;
    for (var column = 0; column < squaresForChecking; column++) {
        let line = [];
        let xPointsHorizontal = 0;
        let oPointsHorizontal = 0;
        for (var row = 0; row < squaresForChecking; row++) {
            line.push(game[column][row])
            if (line[row] === 'X') {
                xPointsHorizontal += 1;
                oPointsHorizontal = 0;
            } else if (line[row] === 'O') {
                xPointsHorizontal = 0;
                oPointsHorizontal += 1;
            } else {
                xPointsHorizontal = 0;
                oPointsHorizontal = 0;
            }
            if (xPointsHorizontal === pointsToWin || oPointsHorizontal === pointsToWin) {
                endGame()
            }
        }
    }
}

function checkVertical() {
    var squaresForChecking = game.length;
    for (var column = 0; column < squaresForChecking; column++) {
        let line = [];
        let xPointsVertical = 0;
        let oPointsVertical = 0;
        for (var row = 0; row < squaresForChecking; row++) {
            line.push(game[row][column])
            if (line[row] === 'X') {
                xPointsVertical += 1;
                oPointsVertical = 0;
            } else if (line[row] === 'O') {
                oPointsVertical += 1;
                xPointsVertical = 0;
            } else {
                xPointsVertical = 0;
                oPointsVertical = 0;
            }
            if (xPointsVertical === pointsToWin || oPointsVertical === pointsToWin) {
                endGame()
            }
        }
    }
}

function checkDiagonal() {
    var order = [];
    const reversedArr = [];
    for (x = 1; x < game.length + 1; x++) {
        order.push(x)
    }
    for (let i = order.length - 1; i >= 0; i--) {
        reversedArr.push(order[i]);
    }
    for (let i = 1; i < reversedArr.length; i++) {
        order.push(reversedArr[i]);
    }
    checkDiagonalPositive(order)
    checkDiagonalNegative(order)
}

function checkDiagonalPositive(order) {
    var cellLines = [];
    var cellIndex = [];
    for (let i = 0; i < game.length; i++) {
        for (let j = 0; j <= i; j++) {
            cellLines.push(j);
        }
    }
    for (let k = 1; k < game.length; k++) {
        for (let l = k; l < game.length; l++) {
            cellLines.push(l);
        }
    }
    for (x = game.length - 1; x > -1; x--) {
        for (o = x; o < game.length; o++) {
            cellIndex.push(o)
        }
    }
    for (x = game.length - 1; x > -1; x--) {
        for (o = 0; o < x; o++) {
            cellIndex.push(o)
        }
    }
    for (x = 1; x < game.length*game.length; x++) {
        var currentCellLines = cellLines.splice(0, order[x - 1]);
        var currentCellIndex = cellIndex.splice(0, order[x - 1]);
        var xPointsDiagonalPositive = 0;
        var oPointsDiagonalPositive = 0;
        for (o = 0; o < currentCellLines.length; o++) {
            if (game[currentCellLines[o]][currentCellIndex[o]] === 'X') {
                xPointsDiagonalPositive += 1;
                oPointsDiagonalPositive = 0;
            } else if (game[currentCellLines[o]][currentCellIndex[o]] === 'O') {
                xPointsDiagonalPositive = 0;
                oPointsDiagonalPositive += 1;
            } else {
                xPointsDiagonalPositive = 0;
                oPointsDiagonalPositive = 0;
            } if (xPointsDiagonalPositive === pointsToWin || oPointsDiagonalPositive === pointsToWin) {
                endGame();
            }
        }
    }
}

function checkDiagonalNegative(order) {
    var cellLines = [];
    var cellIndex = [];
    for (let i = 0; i < game.length; i++) {
        for (let j = 0; j <= i; j++) {
            cellLines.push(j);
        }
    }
    for (let k = 1; k < game.length; k++) {
        for (let l = k; l < game.length; l++) {
            cellLines.push(l);
        }
    }
    for (x = 0; x < game.length; x++) {
        for (o = x; o > -1; o--) {
            cellIndex.push(o)
        }
    }
    for (x = 0; x < game.length + 1; x++) {
        for (o = game.length - 1; o > x; o--) {
            cellIndex.push(o)
        }
    }
    for (x = 1; x < game.length*game.length; x++) {
        var currentCellLines = cellLines.splice(0, order[x - 1])
        var currentCellIndex = cellIndex.splice(0, order[x - 1])
        var xPointsDiagonalNegative = 0;
        var oPointsDiagonalNegative = 0;
        for (o = 0; o < currentCellLines.length; o++) {
            if (game[currentCellLines[o]][currentCellIndex[o]] === 'X') {
                xPointsDiagonalNegative += 1;
                oPointsDiagonalNegative = 0;
            } else if (game[currentCellLines[o]][currentCellIndex[o]] === 'O') {
                xPointsDiagonalNegative = 0;
                oPointsDiagonalNegative += 1;
            } else {
                xPointsDiagonalNegative = 0;
                oPointsDiagonalNegative = 0;
            } if (xPointsDiagonalNegative === pointsToWin || oPointsDiagonalNegative === pointsToWin) {
                endGame();
            }
        }
    }
}

function checkDraw(){
    var emptySpaces = 0;
    for (let row = 0; row < game.length; row++) {
        for (let column = 0; column < game.length; column++){
            if (game[row][column] === "X" || game[row][column] === "O"){
                emptySpaces+= 1
            }
        }
    }
    if (emptySpaces === game.length*game.length){
        endGame("draw")
    }
}

function handleBoard(clickedCell, clickedCellIndex, row) {
    if (game[row][clickedCellIndex] != '') {
        checkGame();
        return
    } else {
        game[row][clickedCellIndex] = player
        clickedCell.innerHTML = player
        var colour = player === "X" ? "#d86c23" : "#04c0b2";
        clickedCell.style.color = colour
    }
    player = player === "X" ? "O" : "X";
    checkGame();
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
    scoreBoard.classList.add("appear")
    returnMenu.classList.add("appear");
    returnMenu.classList.remove("opacity");
    if (result === 'draw'){
        draw()
    }else{
        if (player === "O"){
            victoryCount.X += 1
            pointsX.innerHTML = victoryCount.X
            squareX.classList.add("win")
        } else if (player === "X"){
            victoryCount.O += 1
            pointsO.innerHTML = victoryCount.O
            squareO.classList.add("win")
        }
    };
    console.log(victoryCount)
    gameEnd = true;
}

var restartGame = document.getElementById("restartGameButton")

restartGame.addEventListener('click', eraseBoard)

function eraseBoard() {
    removeBoard()
    scoreBoard.classList.remove("appear")
    squareX.classList.remove("win")
    squareO.classList.remove("win")
    const cleanG = setTimeout(cleanGame, 600);
    const returnB = setTimeout(returnBoard, 800);

    function removeBoard() {
        gameBoard.classList.add("restart")
        returnMenu.classList.add("opacity")
    }

    function cleanGame() {
        for (let row = 0; row < game.length; row++) {
            for (let column = 0; column < game.length; column++) {
                game[row][column] = ''
            }
        }
        for (let cellNumber = 0; cellNumber < game.length * game.length; cellNumber++) {
            var cell = document.getElementsByClassName("cell")[cellNumber]
            cell.innerHTML = ""
        }
        gameEnd = false;
        returnMenu.classList.remove("appear")
    }

    function returnBoard() {
        gameBoard.classList.remove("restart")
    }


}

var menuButton = document.getElementById("menuButton")

menuButton.addEventListener('click', returnToMenu)

function returnToMenu() {
    removeBoard()
    scoreBoard.classList.remove("appear")
    squareX.classList.remove("win")
    squareO.classList.remove("win")
    const setDisplayProperty = setTimeout(setDisplay, 600);
    const menuBack = setTimeout(putMenuBack, 900)

    function removeBoard() {
        player = "X";
        gameBoard.classList.add("restart")
        returnMenu.classList.add("opacity")
    }

    function setDisplay() {
        gameBoard.classList.remove("restart")
        gameBoard.classList.remove("appear")
        gameBoard.classList.remove("displayFlex")
        returnMenu.classList.remove("appear")
        startMenu.classList.remove("displayNone")
        pointsX.innerHTML = 0
        pointsO.innerHTML = 0
        victoryCount.X = 0
        victoryCount.O = 0
    }

    function putMenuBack() {
        for (let row = 0; row < game.length; row++) {
            for (let column = 0; column < game.length; column++) {
                game[row][column] = ''
            }
        }
        for (let cellNumber = 0; cellNumber < game.length * game.length; cellNumber++) {
            var cell = document.getElementsByClassName("cell")[cellNumber]
            cell.innerHTML = ""
        }
        gameEnd = false;
        var container = document.getElementsByClassName('gameContainer')[0]
        container.remove()
        startMenu.classList.remove("remove")
    }


}
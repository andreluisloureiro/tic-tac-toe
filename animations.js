var startMenu = document.getElementsByClassName("startMenu")[0];

var gameBoard = document.getElementById("gameBoard")

var returnMenu = document.getElementsByClassName("returnMenu")[0];

var squareX = document.getElementById("squareX");

var squareO = document.getElementById("squareO");

var container = document.getElementById("container")

export function removeMenu() {
    startMenu.classList.add("remove")
    gameBoard.classList.add("displayFlex")
}

export function appearBoard() {
    //container variable name == bad
    container.classList.add("appear")
    returnMenu.classList.remove("restart")
    returnMenu.classList.add("appear");
    returnMenu.classList.remove("opacity");
    startMenu.classList.add("displayNone")
    gameBoard.classList.add("appear")
}

export function removeBoard() {
    gameBoard.classList.add("restart")
    returnMenu.classList.add("restart")
    scoreBoard.classList.remove("appear")
    squareX.classList.remove("win")
    squareO.classList.remove("win")
}

export function returnBoard() {
    gameBoard.classList.remove("restart")
    returnMenu.classList.remove("restart")
}

export function setDisplay() {
    gameBoard.classList.remove("restart")
    gameBoard.classList.remove("appear")
    gameBoard.classList.remove("displayFlex")
    returnMenu.classList.remove("appear")
    startMenu.classList.remove("displayNone")
}

export function putMenuBack(victoryCount) {
    container.classList.remove("appear")
    var gameContainer = document.getElementsByClassName('gameContainer')[0];
    gameContainer.remove()
    startMenu.classList.remove("remove")
    victoryCount.X = 0;
    victoryCount.O = 0;
    pointsX.innerHTML = 0;
    pointsO.innerHTML = 0;
}

export function cleanGame(game) {
    for (let row = 0; row < game.length; row++) {
        for (let column = 0; column < game.length; column++) {
            game[row][column] = ''
        }
    }
    for (let cellNumber = 0; cellNumber < game.length * game.length; cellNumber++) {
        var cell = document.getElementsByClassName("cell")[cellNumber]
        cell.innerHTML = ""
    }
}


var backgroundLeft = document.getElementById("backgroundLeft");
var backgroundRight = document.getElementById("backgroundRight");
var startBasicTicTacToeButton = document.getElementById("startBasicTicTacToe");
var startTicTacToe2Button = document.getElementById("startTicTacToe2")
startBasicTicTacToeButton.addEventListener("mouseenter", (event) => {blurLeft()});
startBasicTicTacToeButton.addEventListener("mouseleave", (event) => {unblurLeft()});
startTicTacToe2Button.addEventListener("mouseenter", (event) => {blurRight()});
startTicTacToe2Button.addEventListener("mouseleave", (event) => {unblurRight()});
backgroundLeft.addEventListener("mouseenter", (event) => {blurLeft()});
backgroundLeft.addEventListener("mouseleave", (event) => {unblurLeft()});
backgroundRight.addEventListener("mouseenter", (event) => {blurRight()});
backgroundRight.addEventListener("mouseleave", (event) => {unblurRight()});

function blurLeft(){
    backgroundLeft.classList.add("hover")
}

function blurRight(){
    backgroundRight.classList.add("hover")
}

function unblurLeft(){
    backgroundLeft.classList.remove("hover")
}

function unblurRight(){
    backgroundRight.classList.remove("hover")
}


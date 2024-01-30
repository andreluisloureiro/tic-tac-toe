var startMenu = document.getElementsByClassName("startMenu")[0];

var gameBoard = document.getElementById("gameBoard")

var returnMenu = document.getElementsByClassName("returnMenu")[0];

var squareX = document.getElementById("squareX");

var squareO = document.getElementById("squareO");

var container = document.getElementById("container")

var body = document.getElementsByClassName("body")[0]

export function removeMenu(x) {
    if (x === 3){
        body.classList.remove("right")
        startMenu.classList.add("left")
    } else {
        body.classList.add("right")
        startMenu.classList.add("right")
    }
    gameBoard.classList.add("displayFlex")
}

export function appearBoard() {
    //container variable name == bad
    document.getElementById("scoreBoard").classList.add("appear");
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
    console.log("??")
    document.getElementsByClassName("vl")[0].className = 'vl';
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
    startMenu.classList.remove("left")
    startMenu.classList.remove("right")
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
backgroundLeft.addEventListener("mouseenter", (event) => {focusLeft()});
backgroundRight.addEventListener("mouseenter", (event) => {focusRight()});
backgroundLeft.addEventListener("mouseleave", (event) => {focusNone()});
backgroundRight.addEventListener("mouseleave", (event) => {focusNone()});

function focusLeft(){
    backgroundRight.classList.add("hover")
    backgroundLeft.classList.remove("hover")
}

function focusRight(){
    backgroundLeft.classList.add("hover")
    backgroundRight.classList.remove("hover")
}

function focusNone(){
    backgroundLeft.classList.remove("hover")
    backgroundRight.classList.remove("hover")
}

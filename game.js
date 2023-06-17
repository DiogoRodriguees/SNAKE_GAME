import Fruit from "./Fruit.js";
import Snake from "./Snake.js";

const btnStart = document.getElementById("start");
const btnFinish = document.getElementById("finish");

btnStart.addEventListener("click", startGame);
btnFinish.addEventListener("click", finishGame);

const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");

var interval;
const canvasSize = 600;
const sizePixelDefault = 20;
const timeUpdate = 80;

var snake;
var fruit;
var score = 0;
var gameRuning = false;

// Função para iniciar o jogo
function startGame() {
    if (!gameRuning) {
        gameRuning = true;
        document.getElementById("canvas").style.display = "flex";
        document.getElementById("finish").style.display = "block";
        document.getElementById("start").textContent = "Restart";

        snake = new Snake(
            canvasContext,
            canvasSize,
            sizePixelDefault,
            "blue",
            "green"
        );
        fruit = new Fruit(canvasContext, canvasSize, sizePixelDefault, "red");

        updateGraphic();
        interval = setInterval(updateGame, timeUpdate);
    } else {
        restartGame();
    }
}

function restartGame() {
    gameOver();
    startGame();
}

// Função que finaliza o game pelo botao finish
function finishGame() {
    document.getElementById("canvas").style.display = "none";
    document.getElementById("finish").style.display = "none";
    document.getElementById("start").textContent = "Start";

    gameOver();
}

// Função para finalizar o jogo
function gameOver() {
    score = 0;
    gameRuning = false;

    clearInterval(interval);
    canvasContext.font = "40px Arial";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Game Over", canvasSize / 2 - 110, canvasSize / 2);
}

// Função que atualiza o display(canvas)
function updateGame() {
    snake.update();

    if (!snake.checkColision()) {
        if (snake.eatFruit(fruit)) {
            score++;
            fruit.generate();
        }
        updateGraphic();
    } else {
        gameOver();
    }
}

// Função que atualiza o elementos do jogo
function updateGraphic() {
    canvasContext.clearRect(0, 0, canvasSize, canvasSize);
    snake.updateGraphic();
    fruit.updateGraphic();
    createGraphicScore();
}

// Função que atualiza o Score
function createGraphicScore() {
    canvasContext.font = "20px Arial";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Score : " + score, 15, 25);
}

const alternativeKeys = {
    a: "ArrowLeft",
    d: "ArrowRight",
    s: "ArrowDown",
    w: "ArrowUp",
    ArrowLeft: "ArrowLeft",
    ArrowRight: "ArrowRight",
    ArrowDown: "ArrowDown",
    ArrowUp: "ArrowUp",
};

// Função para escutar o teclado
document.addEventListener("keydown", (event) => {
    snake.changeDirection(alternativeKeys[event.key]);
});

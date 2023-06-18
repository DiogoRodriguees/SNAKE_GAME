import Fruit from "./Fruit.js";
import Snake from "./Snake.js";
import Interface from "./Interface.js";

const btnStart = document.getElementById("start");
const btnFinish = document.getElementById("finish");

btnStart.addEventListener("click", startGame);
btnFinish.addEventListener("click", finishGame);

const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");
const canvasSize = 600;

const canvasInterface = new Interface(canvasSize, canvasContext);

var interval;
const sizePixelDefault = 20;
const timeUpdate = 80;

var snake;
var fruit;
var score = 0;

// Função para iniciar o jogo
function startGame() {
    if (!interval) {
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

    clearInterval(interval);
    let x = canvasSize / 2 - 110;
    let y = canvasSize / 2;

    canvasInterface.createGraphicWithText(
        "40px Arial",
        "white",
        "Game Over",
        "",
        x,
        y
    );
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
    canvasInterface.createGraphicWithText(
        "20px Arial",
        "white",
        "Score: ",
        score,
        15,
        25
    );
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

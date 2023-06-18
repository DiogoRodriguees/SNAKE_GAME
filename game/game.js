import Fruit from "../classes/fruit.class.js";
import Snake from "../classes/snake.class.js";
import Interface from "../classes/interface.class.js";
import keyboardListener from "../classes/keyboard.class.js";

// Botoes
const btnStart = document.getElementById("start");
const btnFinish = document.getElementById("finish");

// Recebendo o canvas
const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");

// Limite do canvas e iniciando a interface
const canvasSize = 600;
const canvasInterface = new Interface(canvasSize, canvasContext);

// Intervalo de atualização
var interval;
const timeInterval = 80;

const sizePixelDefault = 20;
var snake;
var fruit;
var score = 0;

// Função para iniciar o jogo
function startGame() {
    if (!interval) {
        document.getElementById("canvas").style.display = "flex";
        document.getElementById("finish").style.display = "block";
        document.getElementById("start").textContent = "Restart";

        snake = new Snake(canvasContext, canvasSize, sizePixelDefault);
        fruit = new Fruit(canvasContext, canvasSize, sizePixelDefault, "red");
        keyboardListener(document, snake);

        updateGraphic();
        interval = setInterval(updateGame, timeInterval);
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

    canvasInterface.createGraphicWithText(40, "Game Over", "", x, y);
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
    canvasInterface.createGraphicWithText(20, "Score: ", score, 15, 25);
}

/* Eventos */
btnStart.addEventListener("click", startGame);
btnFinish.addEventListener("click", finishGame);

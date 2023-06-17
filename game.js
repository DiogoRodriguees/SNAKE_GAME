const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext("2d");

var interval;
var canvasSize = 600;
var sizePixelDefault = 20;

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

        snake = new Snake();
        fruit = new Fruit();

        createGraphic();
        interval = setInterval(updateGame, 100);
    } else {
        restartGame();
    }
}

function restartGame(game) {
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
    canvasContext.font = "20px Arial";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Game Over", canvasSize / 2 - 60, canvasSize / 2);
}

// Função que atualiza o display(canvas)
function updateGame() {
    snake.update();
    if (!snake.checkColision()) {
        snake.eatFruit();
        createGraphic();
    }
}

// Função que atualiza o elementos do jogo
function createGraphic() {
    canvasContext.clearRect(0, 0, canvasSize, canvasSize);
    snake.createGraphic();
    fruit.createGraphic();
    createGraphicScore();
}

// Função que atualiza o Score
function createGraphicScore() {
    canvasContext.font = "20px Arial";
    canvasContext.fillStyle = "white";
    canvasContext.fillText("Score : " + score, 15, 25);
}

// Função que gera uma cordenada aleatorio
function getRandomPosition() {
    return (
        Math.floor((Math.random() * canvasSize) / sizePixelDefault) *
        sizePixelDefault
    );
}
class Snake {
    constructor() {
        this.x = sizePixelDefault; // head in position X
        this.y = sizePixelDefault; // head in position Y
        this.tail = [];
        this.directionX = 1;
        this.directionY = 0;
        console.log("Snake generate in x:" + this.x + " y: " + this.y);
    }

    checkColision() {
        for (let i = 0; i < this.tail.length; i++) {
            if (this.tail[i].x == this.x) {
                if (this.tail[i].y == this.y) {
                    gameOver();
                    return true;
                }
            }
        }
        return false;
    }

    createGraphic() {
        canvasContext.fillStyle = "green";
        for (let i = 0; i < snake.tail.length; i++) {
            canvasContext.fillRect(
                this.tail[i].x,
                this.tail[i].y,
                sizePixelDefault - 1,
                sizePixelDefault - 1
            );
        }
        canvasContext.fillStyle = "blue";
        canvasContext.fillRect(
            this.x,
            this.y,
            sizePixelDefault - 1,
            sizePixelDefault - 1
        );
    }

    eatFruit() {
        if (this.x === fruit.x && this.y === fruit.y) {
            this.tail.push({ x: fruit.x, y: fruit.y });
            score++;
            fruit = new Fruit();
            console.log("comendo fruta");
        }
    }

    changeDirection(keyPress) {
        switch (keyPress) {
            case "ArrowLeft":
                if (this.directionX !== 1) {
                    this.directionX = -1;
                    this.directionY = 0;
                }
                break;
            case "ArrowUp":
                if (this.directionY !== 1) {
                    this.directionX = 0;
                    this.directionY = -1;
                }
                break;
            case "ArrowRight":
                if (this.directionX !== -1) {
                    this.directionX = 1;
                    this.directionY = 0;
                }
                break;
            case "ArrowDown":
                if (this.directionY !== -1) {
                    this.directionX = 0;
                    this.directionY = 1;
                }
                break;
        }
    }

    update() {
        let lastPosition = this.tail.length - 1;

        for (let i = 0; i < lastPosition; i++) {
            this.tail[i] = this.tail[i + 1];
        }

        this.tail[score - 1] = { x: this.x, y: this.y };

        // atualizando a posição da cabeça
        this.x += this.directionX * sizePixelDefault;
        this.y += this.directionY * sizePixelDefault;

        // verifica se a snake esta dentro do canvas para o eixo X
        if (this.x >= canvasSize) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = canvasSize - sizePixelDefault;
        }

        // verifica se a snake esta dentro do canvas para o eixo Y
        if (this.y >= canvasSize) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = canvasSize - sizePixelDefault;
        }
    }
}
class Fruit {
    constructor() {
        this.x = getRandomPosition();
        this.y = getRandomPosition();
        console.log("Fruit generate in x:" + this.x + " y: " + this.y);
    }

    createGraphic() {
        canvasContext.fillStyle = "red";
        canvasContext.fillRect(
            this.x,
            this.y,
            sizePixelDefault,
            sizePixelDefault
        );
    }
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

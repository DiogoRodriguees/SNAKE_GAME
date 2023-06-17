export default class Snake {
    constructor(canvasContext, borderLimit, sizePixel, headColor, color) {
        this.x = sizePixel; // head in position X
        this.y = sizePixel; // head in position Y
        this.tail = [];
        this.directionX = 1;
        this.directionY = 0;
        this.canvasContext = canvasContext;
        this.borderLimit = borderLimit;
        this.colorHead = headColor;
        this.color = color;
        this.sizePixel = sizePixel;
    }

    checkColision() {
        for (let i = 0; i < this.tail.length; i++) {
            if (this.tail[i].x == this.x) {
                if (this.tail[i].y == this.y) {
                    return true;
                }
            }
        }
        return false;
    }

    createGraphic() {
        this.canvasContext.fillStyle = this.color;
        for (let i = 0; i < this.tail.length; i++) {
            this.canvasContext.fillRect(
                this.tail[i].x,
                this.tail[i].y,
                this.sizePixel,
                this.sizePixel
            );
        }

        this.canvasContext.fillStyle = this.colorHead;

        this.canvasContext.fillRect(
            this.x,
            this.y,
            this.sizePixel,
            this.sizePixel
        );
    }

    eatFruit(fruit) {
        if (this.x === fruit.x && this.y === fruit.y) {
            this.tail.push({ x: fruit.x, y: fruit.y });
            return true;
        }

        return false;
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

    update(score) {
        let lastPosition = this.tail.length - 1;

        for (let i = 0; i < lastPosition; i++) {
            this.tail[i] = this.tail[i + 1];
        }

        this.tail[score - 1] = { x: this.x, y: this.y };

        // atualizando a posição da cabeça
        this.x += this.directionX * this.sizePixel;
        this.y += this.directionY * this.sizePixel;

        // verifica se a snake esta dentro do canvas para o eixo X
        if (this.x >= this.borderLimit) {
            this.x = 0;
        } else if (this.x < 0) {
            this.x = this.borderLimit - this.sizePixel;
        }

        // verifica se a snake esta dentro do canvas para o eixo Y
        if (this.y >= this.borderLimit) {
            this.y = 0;
        } else if (this.y < 0) {
            this.y = this.borderLimit - this.sizePixel;
        }
    }
}

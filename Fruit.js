export default class Fruit {
    constructor(ctx, borderLimit, sizeFruit, color) {
        this.borderLimit = borderLimit;
        this.ctx = ctx;
        this.sizeFruit = sizeFruit;
        this.color = color;

        this.x = this.getRandomPosition();
        this.y = this.getRandomPosition();
    }

    generate() {
        this.x = this.getRandomPosition();
        this.y = this.getRandomPosition();
    }

    createGraphic() {
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.sizeFruit, this.sizeFruit);
    }

    getRandomPosition() {
        return (
            Math.floor((Math.random() * this.borderLimit) / this.sizeFruit) *
            this.sizeFruit
        );
    }
}

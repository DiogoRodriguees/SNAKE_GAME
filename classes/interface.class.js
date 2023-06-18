export default class Interface {
    constructor(canvasSize, canvasContext) {
        this.canvasContext = canvasContext;
        this.canvasSize = canvasSize;
        this.color = "white";
    }

    createGraphicWithText(font, text, textAdd, x, y) {
        this.canvasContext.font = `${font}px Arial`;
        this.canvasContext.fillStyle = this.color;
        this.canvasContext.fillText(text + textAdd, x, y);
    }

    createGraphic() {}
}

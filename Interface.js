export default class Interface {
    constructor(canvasSize, canvasContext) {
        this.canvasContext = canvasContext;
        this.canvasSize = canvasSize;
    }

    createGraphicWithText(font, color, text, textAdd, x, y) {
        this.canvasContext.font = font;
        this.canvasContext.fillStyle = color;
        this.canvasContext.fillText(text + textAdd, x, y);
    }

    createGraphic() {
        
    }
}

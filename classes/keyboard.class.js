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

export default function keyboardListener(document, snake) {
    document.addEventListener("keydown", (event) => {
        snake.changeDirection(alternativeKeys[event.key]);
    });
}

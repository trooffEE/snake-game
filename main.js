"use strict";
const CANVAS_BACKGROUND_COLOUR = "black";
const CANVAS_BORDER_COLOR = "white";
const SNAKE_COLOUR = "#8fbe35";
const SNAKE_BORDER_COLOR = "#4b6618";
let foodX, foodY;

let gameCanvas = document.getElementById("gameCanvas");
let ctx = gameCanvas.getContext("2d");

gameCanvas.width = document.body.clientWidth - 4;
gameCanvas.height = document.body.clientHeight - 4;

let snake = [
    { x: gameCanvas.width / 2 - 0, y: gameCanvas.height / 2 },
    { x: gameCanvas.width / 2 - 20, y: gameCanvas.height / 2}, 
    { x: gameCanvas.width / 2 - 40, y: gameCanvas.height / 2},
    { x: gameCanvas.width / 2 - 60, y: gameCanvas.height / 2},
    { x: gameCanvas.width / 2 - 80, y: gameCanvas.height / 2},
];

let dx = 20; // horizontal velocity
let dy = 0; // vertical velocity


ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
ctx.strokeStyle = CANVAS_BORDER_COLOR;

ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);

function advanceSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    snake.pop();
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = "#8fbe35";
    ctx.strokeStyle = "#4b6618";
    ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
    ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const keyPressed = event.keyCode;
    const goingUp = dy === -20;
    const goingDown = dy === 20;
    const goingRight = dx === 20;
    const goingLeft = dx === -20;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -20;
        dy = 0;
    }
    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -20;
    }
    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 20;
        dy = 0;
    }
    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 20;
    }
}

function randomFoodCoords(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 20) * 20;
}

function createFood() {
    foodX = randomFoodCoords(0, gameCanvas.width - 20);
    foodY = randomFoodCoords(0, gameCanvas.height - 20);
    snake.forEach(part => {
        const foodIsOnSnake = part.x === foodX && part.y === foodY;
        if (foodIsOnSnake) {
            createFood();
        }
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "white";
    ctx.fillRect(foodX, foodY, 20, 20);
    ctx.strokeRect(foodX, foodY, 20, 20);
}

function clearCanvas() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

createFood();
changeDirection();
function main() {
    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
        main();
    }, 100);
}
main();
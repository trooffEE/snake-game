"use strict";
const CANVAS_BACKGROUND_COLOUR = "black";
const CANVAS_BORDER_COLOR = "white";
const SNAKE_COLOUR = "#8fbe35";
const SNAKE_BORDER_COLOR = "#4b6618";
const GAME_SPEED_PER_FRAME = 50;
let reset = false;
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
    let curPosX = Math.floor(snake[0].x);
    let curPosY = Math.floor(snake[0].y);
    let didEatFood = curPosX === foodX && curPosY === foodY;
    if (didEatFood) { 
        createFood();
    } else {
        snake.pop();
    }
}

function drawSnakePart(snakePart) {
    ctx.fillStyle = "#8fbe35";
    ctx.strokeStyle = "#4b6618";
    ctx.fillRect(snakePart.x, snakePart.y, 20, 20);
    ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);
    if (snakePart.x === snake[0].x && snakePart.y === snake[0].y)
    {
        ctx.fillStyle = "black";
        ctx.fillRect(snakePart.x + 9, snakePart.y + 2, 5, 5);
        ctx.fillRect(snakePart.x + 9, snakePart.y + 12, 5, 5);
    }
}

function drawSnake() {
    snake.forEach(drawSnakePart);
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const SPACE_KEY = 32;
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
    if (keyPressed === SPACE_KEY) reset = true;
}

function randomFoodCoords(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 20) * 20;
}

function createFood() {
    foodX = randomFoodCoords(0, gameCanvas.width - 20 - 4);
    foodY = randomFoodCoords(0, gameCanvas.height - 20 - 4);
    snake.forEach(part => {
        const foodIsOnSnake = part.x === foodX && part.y === foodY;
        if (foodIsOnSnake) {
            createFood();
        }
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "darkred";
    ctx.fillRect(foodX, foodY, 12, 12);
    ctx.strokeRect(foodX, foodY, 12, 12);
}

function clearCanvas() {
    ctx.fillStyle = "black";
    ctx.strokeStyle = "white";
    ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
    ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}

createFood(); 
function main() {
    setTimeout(function onTick() {
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
        if (reset) return;
        main();
    }, GAME_SPEED_PER_FRAME);
    return;
}
main();

document.addEventListener("keydown", changeDirection);
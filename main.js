let img;
let gameState;

function preload() {
    img = loadImage('waddles.png');
}

function setup() {
    createCanvas(800, 600);
    gameState = {
        playerPosition: {
            x: width / 2 - img.width / 2,
            y: height - img.height
        }
    }
}

function draw() {
    if (keyIsDown(LEFT_ARROW)) {
        gameState.playerPosition.x -= 1;
    } else if (keyIsDown(RIGHT_ARROW)) {
        gameState.playerPosition.x += 1;
    }

    background(220);
    image(img, gameState.playerPosition.x, gameState.playerPosition.y);
}
let img;
let gameState;
const iceWidth = 50;
const iceHeight = 100;

function rectCollision(x1, y1, w1, h1, x2, y2, w2, h2){
    return x1 < x2 + w2 &&
           x1 + w1 > x2 &&
           y1 < y2 + h2 &&
           h1 + y1 > y2;
}

function preload() {
    img = loadImage('waddles.png');
}

function setup() {
    createCanvas(800, 600);
    gameState = {
        playerPosition: {
            x: width / 2,
            y: height - img.height / 2
        },
        ices: [],
        framesPerNewIce: 12,
        score: 0,
        gameOver: false
    }
}

function draw() {
    if (!gameState.gameOver) {
        if (keyIsDown(LEFT_ARROW) && gameState.playerPosition.x > img.width / 2) {
            gameState.playerPosition.x -= 1;
        } else if (keyIsDown(RIGHT_ARROW) && gameState.playerPosition.x + img.width / 2 < width) {
            gameState.playerPosition.x += 1;
        }

        if (frameCount % gameState.framesPerNewIce == 0){
            gameState.ices.push({
                x: random(0, width),
                y: -iceHeight / 2,
                speed: 0
            })
            gameState.score += 1;
        }

        gameState.ices.forEach(function(ice){
            ice.speed += 0.1;
            ice.y += ice.speed;
        });

        gameState.ices = gameState.ices.filter(function(ice){
            return ice.y + iceHeight / 2 < height;
        });

        gameState.ices.forEach(function(ice){
            let collision = rectCollision(
                ice.x, ice.y, iceWidth, iceHeight,
                gameState.playerPosition.x, gameState.playerPosition.y, img.width, img.height
            );
            if (collision){
                gameState.gameOver = true;
            }
        });
    }

    imageMode(CENTER);
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(32);

    background(220);
    image(img, gameState.playerPosition.x, gameState.playerPosition.y);
    gameState.ices.forEach(function(ice){
        rect(ice.x, ice.y, iceWidth, iceHeight);
    });
    if (gameState.gameOver) {
        text(`Game over! Score: ${gameState.score}`, width / 2, height / 2);
    }
}
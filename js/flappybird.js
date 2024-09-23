//*board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;
let birdImg;

//*bird
let birdWidth = 34; //? width/height ratio = 408/228 = 17/12
let birdHeight = 24;
let birdX = boardWidth/8;
let birdY = boardHeight/2;

let bird = {
    x : birdX,
    y : birdY,
    width : birdWidth,
    height : birdHeight
}

//* pipes
let pipeArray = [];
let pipeWidth = 64; //? width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeIMG;
let bottomPipeIMG;

//* game physics
let velocityX = -2; //? the speed at which the pipes move left
let velocityY = 0; //? bird's jump speed
let gravity = 0.4;


window.onload = function() {
    board = document.getElementById("board")
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //? used for drawing  on the board

    //* draw flappy bird
    // context.fillStyle = "green";
    // context.fillRect(bird.x, bird.y, bird.width, bird.height);

    //* load images
    birdImg = new Image();
    birdImg.src = "flappyBirdMedia/flappybird.png";
    birdImg.onload = function(){
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    topPipeIMG = new Image();
    topPipeIMG.src = "flappyBirdMedia/toppipe.png";

    bottomPipeIMG = new Image();
    bottomPipeIMG.src = "flappyBirdMedia/bottompipe.png"

    requestAnimationFrame(update);
    setInterval(placePipes, 1500); //? every 1.5 seconds

    document.addEventListener("keydown", moveBird);
};

function update() {
    //* clears the previous frame/ frames will stack otherwise
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width, board.height);

    velocityY += gravity;
    // bird.y += velocityY;
    bird.y = Math.max(bird.y + velocityY, 0); //? apply gravity to bird.y, limits the bird.y to top of canvas
    //* draw bird over and over again for each frame
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

    //* draw pipes over and over again for each frame
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX; 
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);
    };
};

function placePipes() {
    //* (0-1) * pipeheight/2
    //* 0 -> -120px (pipeheight/4)
    //* 1 -> -128 - 256
    let randomPipeY = pipeY - pipeHeight / 4 - Math.random() * (pipeHeight/2);
    let openingSpace = board.height/4;

    let topPipe = {
        img : topPipeIMG,
        x : pipeX,
        y : randomPipeY,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }

    pipeArray.push(topPipe);

    let bottomPipe = {
        img : bottomPipeIMG,
        x : pipeX,
        y : randomPipeY + pipeHeight + openingSpace,
        width : pipeWidth,
        height : pipeHeight,
        passed : false
    }
    pipeArray.push(bottomPipe);
}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {
        //* jump
        velocityY = -6;
    }
};

function detectCollision() {
    
}


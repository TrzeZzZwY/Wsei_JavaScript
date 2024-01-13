const canvas = document.querySelector("#canvas");
const start = document.querySelector("#start");
const reset = document.querySelector("#reset");

start.addEventListener("click", e => {
    init();
    mainLoop();
})
reset.addEventListener("click", e => {
    init();
    mainLoop();
})

let ctx = canvas.getContext('2d');

let ballCount = 30;
let baseRadius = 15;
let balls;

function init(){
    balls = new Array();
    for(let i = 0; i < ballCount; i++){
        // x - random (0 - canvas.width);
        // y - random (0 - canvas.height);
        let x = getRandomPos(canvas.width + 1);
        let y = getRandomPos(canvas.height + 1);

        ctx.fillStyle = "#aabb62";
        ctx.beginPath();

        ctx.arc(x, y, baseRadius, 0, Math.PI * 2); // Outer circle

        ctx.fill();

        balls.push({
            id: Date.now(),
            x: x,
            y: y,
            radius: baseRadius,
            velX: getRandomVel(),
            velY: getRandomVel()
        })
    }

}

function mainLoop(){
    // clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // update the position of all the stuff in the animation
    balls = balls.map(ball =>{
        newBall = calcNewBallVel(ball);
        newBall = calcNewBallPos(newBall);

        console.dir({
            old: ball,
            new: newBall
        })

        ctx.fillStyle = "#aabb62";
        ctx.beginPath();

        ctx.arc(newBall.x, newBall.y, newBall.radius, 0, Math.PI * 2); // Outer circle

        ctx.fill();
        return newBall;
    });

    for(let i = 0; i < balls.length; i++){
        for(let j = 0; j < balls.length; j++){
            if(i == j){
                continue;
            }
            if(BallsAreClose(balls[i], balls[j], 150)){
                ctx.strokeStyle = "green";
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.stroke();
            }
        }
    }
    //console.dir(balls);
    
    // then request the next animation frame
    window.requestAnimationFrame( mainLoop ); // pase it the name of your main loop
    // the main loop is done. Exiting lets the browser know yo are done and 
    // it presents the redrawn canvas to the screen.
}

function BallsAreClose(ballA, ballB, acceptLength){
    let a = Math.max(ballA.x, ballB.x) - Math.min(ballA.x, ballB.x);
    let b = Math.max(ballA.y, ballB.y) - Math.min(ballA.y, ballB.y);

    return Math.sqrt((a * a) + (b * b)) < acceptLength;
}

function calcNewBallVel(ball){
    let newVelX = ball.velX;
    let newVelY = ball.velY;

    if(ball.x + newVelX < (0 + (ball.radius * 2)) || ball.x + newVelX > (800 - (ball.radius * 2))){
        newVelX = newVelX * -1;
    }
    if(ball.y + newVelY < (0 + ball.radius) || ball.y + newVelY > (800 - ball.radius)){
        newVelY = newVelY * -1;
    }

    //TODO Vel depens on radius

    newBall = {
        id: ball.id,
        x: ball.x,
        y: ball.y,
        radius: ball.radius,
        velX: newVelX,
        velY: newVelY
    }
    return newBall;
}

function calcNewBallPos(ball){
    newBall = {
        id: ball.id,
        x: ball.x + ball.velX,
        y: ball.y + ball.velY,
        radius: ball.radius,
        velX: ball.velX,
        velY: ball.velY
    }
    return newBall;
}

function getRandomPos(max) {
    return Math.floor(Math.random() * (max - baseRadius * 2)) + baseRadius;
  }
function getRandomVel(){
    return Math.random() * 2 - 1;
}

  
const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

// Create the pong paddle
const paddleWidth = 10,
      paddleHeight = 100,
      playerX = 0,
      computerX = canvas.width - paddleWidth,
      playerY = (canvas.height - paddleHeight) / 2,
      computerY = (canvas.height - paddleHeight) / 2;

// Create the pong ball
const ballSize = 10,
      ballX = canvas.width / 2,
      ballY = canvas.height / 2,
      ballSpeed = 4;

// Game variables
let playerScore = 0,
    computerScore = 0,
    ballSpeedX = ballSpeed,
    ballSpeedY = ballSpeed;

// Draw the paddles and the ball
function draw() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player paddle
    ctx.fillStyle = "#00f";
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
    
    // Draw computer paddle
    ctx.fillStyle = "#f00";
    ctx.fillRect(computerX, computerY, paddleWidth, paddleHeight);
    
    // Draw ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballSize, 0, Math.PI * 2);
    ctx.fillStyle = "#0f0";
    ctx.fill();
    ctx.closePath();
}

// Update the game state
function update() {
    // Move the ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Collision detection
    if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY; // Bounce off the top/bottom
    }
    if (ballX < playerX + paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX; // Bounce off player paddle
    }
    if (ballX > computerX && ballY > computerY && ballY < computerY + paddleHeight) {
        ballSpeedX = -ballSpeedX; // Bounce off computer paddle
    }
    
    // Reset ball if it goes out of bounds
    if (ballX < 0) {
        computerScore++;
        resetBall();
    } else if (ballX > canvas.width) {
        playerScore++;
        resetBall();
    }
}

// Reset the ball to the center
function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX; // Change direction
}

// Main game loop
function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();

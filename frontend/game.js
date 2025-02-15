const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let playerX = 300, botX = 300, ballX = 300, ballY = 0;
let playerScore = 0, botScore = 0;
let ws = new WebSocket("ws://localhost:8000/game");

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "blue";
    ctx.fillRect(playerX, 350, 50, 10);

    ctx.fillStyle = "red";
    ctx.fillRect(botX, 50, 50, 10);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
    ctx.fill();

    ballY += 5;

    if (ballY > 350 && ballX >= playerX && ballX <= playerX + 50) {
        botScore += 1;
        alert(`You got hit! Score: Player ${playerScore} - AI ${botScore}`);
        resetGame();
    }
    if (ballY < 50 && ballX >= botX && ballX <= botX + 50) {
        playerScore += 1;
        alert(`Bot got hit! Score: Player ${playerScore} - AI ${botScore}`);
        resetGame();
    }
}

function resetGame() {
    ballX = Math.random() * 600;
    ballY = 0;
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && playerX > 0) playerX -= 20;
    if (event.key === "ArrowRight" && playerX < 550) playerX += 20;
});

function updateBot() {
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ player_x: playerX, ball_x: ballX, ball_y: ballY }));
    }
}

ws.onmessage = (event) => {
    let data = JSON.parse(event.data);
    botX += data.bot_move * 20;
    botX = Math.max(0, Math.min(550, botX));
};

setInterval(draw, 50);
setInterval(updateBot, 200);

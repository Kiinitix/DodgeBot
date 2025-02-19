let playerX, bullets = [], aiPlayers = [];
let numTargets = 3;
let aiLevels = [1, 1, 1];
let bulletsFired = 0, aiDodges = 0, totalShots = 0;

function setup() {
    let canvas = createCanvas(600, 400);
    canvas.parent("gameContainer");
    playerX = width / 2;

    for (let i = 0; i < numTargets; i++) {
        aiPlayers.push(new AIPlayer());
    }

    // Mobile controls
    document.getElementById("leftBtn").addEventListener("click", () => movePlayer(-20));
    document.getElementById("rightBtn").addEventListener("click", () => movePlayer(20));
    document.getElementById("shootBtn").addEventListener("click", shootBullet);
}

function draw() {
    background(255);

    // Move player with screen boundary constraints
    if (keyIsDown(LEFT_ARROW)) playerX = max(20, playerX - 5);
    if (keyIsDown(RIGHT_ARROW)) playerX = min(width - 20, playerX + 5);

    // Draw player (shooting box)
    fill(0, 255, 0);
    rect(playerX - 20, height - 20, 40, 10);

    // Move bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= 7;
        fill(0, 0, 255);
        ellipse(bullets[i].x, bullets[i].y, 10, 10);

        // Check bullet collision with AI
        for (let j = 0; j < aiPlayers.length; j++) {
            let ai = aiPlayers[j];
            if (dist(bullets[i].x, bullets[i].y, ai.x, ai.y) < 20) {
                ai.learn();
                bullets.splice(i, 1);
                ai.respawn();
                checkLevelUp(j);
                totalShots++;
                break;
            }
        }
    }

    // Move AI
    for (let ai of aiPlayers) {
        ai.moveAdaptive(bullets);
        fill(255, 0, 0);
        ellipse(ai.x, ai.y, 40, 40);
    }

    updateStats();
    drawWatermark();
}

// Function to display watermark
function drawWatermark() {
    fill(100);
    textSize(14);
    textAlign(RIGHT);
    text("Made by Kabir", width - 10, height - 10);
}

function keyPressed() {
    if (keyCode === 32) { // SPACE to shoot
        shootBullet();
    }
}

function shootBullet() {
    bullets.push({ x: playerX, y: height - 20 });
    bulletsFired++;
    totalShots++;
}

function movePlayer(dir) {
    playerX = constrain(playerX + dir, 20, width - 20);
}

function checkLevelUp(index) {
    if (aiPlayers[index].dodgeSuccess % 5 === 0) {
        aiLevels[index]++;
        aiPlayers[index].speed += 1;
        console.log(`AI ${index + 1} Leveled Up! Now at Level ${aiLevels[index]}`);
    }
}

function updateStats() {
    let dodgeRate = totalShots > 0 ? (aiDodges / totalShots * 100).toFixed(2) : 0;
    document.getElementById("stats").innerText = `Bullets Fired: ${bulletsFired} | AI Dodge Rate: ${dodgeRate}%`;
}

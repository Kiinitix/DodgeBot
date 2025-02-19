class AIPlayer {
    constructor() {
        this.x = random(100, width - 100); // Random start position
        this.y = random(50, 200); // Fixed height for AI
        this.speed = 2; // AI movement speed
        this.dodgeSuccess = 0; // Tracks successful dodges
    }

    moveAdaptive(bullets) {
        let dangerZone = false;
        let closestBullet = null;
        let minDist = Infinity;

        // Find the closest bullet
        for (let bullet of bullets) {
            let d = dist(this.x, this.y, bullet.x, bullet.y);
            if (d < minDist) {
                minDist = d;
                closestBullet = bullet;
            }
        }

        // If a bullet is within 100 pixels, try to dodge
        if (closestBullet && minDist < 100) {
            dangerZone = true;
            if (closestBullet.x < this.x) {
                this.x += this.speed; // Move right to dodge
            } else {
                this.x -= this.speed; // Move left to dodge
            }
        }

        // If the AI successfully dodges, increase dodge count
        if (dangerZone && minDist > 50) {
            this.dodgeSuccess++;
            aiDodges++;
        }

        // Keep AI within screen bounds
        this.x = constrain(this.x, 20, width - 20);
    }

    learn() {
        totalShots++; // Track shots for dodge rate calculation
    }

    respawn() {
        this.x = random(100, width - 100); // Respawn AI at a new position
    }
}

// Enemies our player must avoid
let allEnemies = [];
var player = new Player(200, 380, 50);

var Enemy = function(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.dog = ['images/dog.png', 'images/dog2.png'];
        this.sprite;
        this.getRandomDog();
};
  for (let i = 0; i < 3; i++){
  let enemyY = 65 + 80 * i;
  let enemyX = Math.floor(Math.random() * 30);
  let enemySpeed = 50 + Math.floor(Math.random() * 150);
  allEnemies.push(new Enemy(enemyX, enemyY, enemySpeed));
}

Enemy.prototype.getRandomDog = function () {
  this.randomDog = Math.floor(Math.random() * this.dog.length);
  this.sprite = this.dog[this.randomDog];
}
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    // when off canvas, reset position of enemy to move across again
    if (this.x > 600) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 650);
    }
    // Check for collision between player and enemies
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/cat.png';
};


Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};
Player.prototype.update = function() {
    // Prevent player from moving beyond canvas wall boundaries
    if (this.y > 380) {
        this.y = 380;
    }
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }
    // Check for player reaching top of canvas and winning the game
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
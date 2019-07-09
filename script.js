
// General section
let score = 0

///////////////////////////////////////////////////////////////
// Coin intitiated
class Coin {
    constructor(positionX, positionY, width, height, img, callback) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.onload = callback;
        this.img.src = img;
    }
}

/////////////////////////////////////////////////////////////////
// Obstacle 
class Obstacle {
    constructor(positionX, positionY, width, height, img, callback) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.onload = callback;
        this.img.src = img;
    }
}



////////////////////////////////////////////////////////////////////
// Constructor functions
class Player {
    constructor(name, positionX, positionY , width, height, character, callback) {
        this.name = name;
        this.positionX = positionX;
        this.width = width;
        this.height = height;
        this.positionY = positionY;
        this.character = new Image();
        this.character.onload = callback;
        this.character.src = character;
        
    }
}
////////////////////////////////////////////////////////////////////
// game 
window.onload = function() {
    let game = new Game();   
    
    onkeydown = function(e) {
        game.savedPosition();
        switch (e.keyCode) {
            case 38: game.moveUp();    console.log('up'); break;
            case 40: game.moveDown();  console.log('down'); break;
            case 37: game.moveLeft();  console.log('left'); break;
            case 39: game.moveRight(); console.log('right'); break;
        }
        game.checkForCollisionCoin();
        game.checkForCollisionObstacle();
        game.updateCanvas();
    };
}

class Game {
    constructor() {
        this.player = new Player("player1", 0, 0, 30, 30,"sprites-players.png", this.createCoin.bind(this));
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
    }

    createCoin() {
        this.coin = new Coin (200, 100, 30, 30, "coin_2.png", this.createObstacle.bind(this));
    }

    createObstacle() {
        this.obstacle = new Obstacle (0, 50, 50, 50, "box.png", this.start.bind(this));
    }

    savedPosition(){
        this.currentX = this.player.positionX;
        this.currentY = this.player.positionY;
    }

    start() {
        this.intervalId = setInterval(this.updateCanvas.bind(this), 100)
    }
  
    draw() {
        this.ctx.drawImage(this.coin.img, this.coin.positionX, this.coin.positionY, 30, 30);
        this.ctx.drawImage(this.player.character, 0, 0, 30, 30, this.player.positionX, this.player.positionY, 30, 30);

        this.ctx.drawImage(this.obstacle.img, this.obstacle.positionX, this.obstacle.positionY, 50, 50);
    }

    updateCanvas() {
        this.clearCanvas();
        this.draw();
    }

    clearCanvas(){
        this.ctx.clearRect(0,0,500,400);
    }

    checkForCollisionCoin() {
        if (this.player.positionX < this.coin.positionX + this.coin.width &&
            this.player.positionX + this.player.width > this.coin.positionX &&
            this.player.positionY < this.coin.positionY + this.coin.height && 
            this.player.positionY + this.player.height > this.coin.positionY){
                console.log("you got a coin! Good job!");
                score += 1;
                document.getElementById("score").innerText = score;
                this.moveCoin();
            }
    }

    checkForCollisionObstacle() {
        if (this.player.positionX < this.obstacle.positionX + this.obstacle.width &&
            this.player.positionX + this.player.width > this.obstacle.positionX &&
            this.player.positionY < this.obstacle.positionY + this.obstacle.height && 
            this.player.positionY + this.player.height > this.obstacle.positionY){
                this.player.positionX = this.currentX;
                this.player.positionY = this.currentY;
                return true;
            }
    }

    moveCoin(){
        this.coin.positionX = Math.floor(Math.random() * (this.canvas.width - this.coin.width)); 
        this.coin.positionY = Math.floor(Math.random() * (this.canvas.height - this.coin.width)); 
    }

    moveUp() {      
        if(this.player.positionY  - this.player.height  < 0){
        this.player.positionY = 0;
        }else{
         this.player.positionY -= 20 }
        };

    moveDown() { 
        if(this.player.positionY  + this.player.height >= this.canvas.height) {
            this.player.positionY = this.canvas.height - this.player.height;
        }else{
        this.player.positionY += 20} 
        };

    moveLeft() {
        if(this.player.positionX - this.player.width < 0){
            this.player.positionX = 0;
        }else{
         this.player.positionX -= 20 }
        };

    moveRight() { 
        if(this.player.positionX + this.player.width >= this.canvas.width) {
            this.player.positionX = this.canvas.width - this.player.width;
        }else{
        this.player.positionX += 20 }
        };

}


   






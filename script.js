
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

///////////////////////////////////////////////////////////////////
// Green monster
class chaser {
    constructor(positionX, positionY, width, height, img, callback) {
        this.positionX = positionX;
        this.positionY = positionY;
        this.width = width;
        this.height = height;
        this.img = new Image();
        //this.img.onload = callback;
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
    
    window.addEventListener("keydown", game.keyDown.bind(game));
    window.addEventListener("keyup", game.keyUp.bind(game));
}

class Game {
    constructor() {
        this.player = new Player("player1", 0, 0, 30, 30,"sprites-players.png", this.createCoin.bind(this));
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.currentKey = undefined;
        this.spritePositionX = 0;
        this.spritePositionY = 0;
    }

    createCoin() {
        this.coin = new Coin (200, 100, 30, 30, "coin_2.png", this.createObstacle.bind(this));
    }

    createObstacle() {
        let i = 0;
        this.obstacle = [
            new Obstacle (0, 50, 50, 50,    "box.png", this.start.bind(this)),
            new Obstacle (50, 50, 50, 50,   "box.png", this.start.bind(this)),
            new Obstacle (200, 300, 50, 50, "box.png", this.start.bind(this)),
            new Obstacle (200, 350, 50, 50, "box.png", this.start.bind(this)),
            new Obstacle (250, 350, 50, 50, "box.png", this.start.bind(this)),
            new Obstacle (50, 350, 50, 50,  "box.png", this.start.bind(this)),
            new Obstacle (50, 300, 50, 50,  "box.png", this.start.bind(this)),
            new Obstacle (100, 300, 50, 50, "box.png", this.start.bind(this)),
            new Obstacle (350, 50, 50, 50,  "box.png", this.start.bind(this)),
            new Obstacle (350, 100, 50, 50, "box.png", this.start.bind(this)),
            new Obstacle (400, 50, 50, 50,  "box.png", this.start.bind(this)),
            new Obstacle (300, 200, 50, 50, "box.png", this.start.bind(this)),
            new Obstacle (250, 200, 50, 50, "box.png", this.start.bind(this)),
            new Obstacle (50, 200, 50, 50,  "box.png", this.start.bind(this))
        ]
    }

    savedPosition(){
        this.currentX = this.player.positionX;
        this.currentY = this.player.positionY;
    }

    start() {
        this.intervalId = setInterval(this.updateCanvas.bind(this), 20)
    }
  
    draw() {
        this.ctx.drawImage(this.coin.img, this.coin.positionX, this.coin.positionY, 30, 30);
        this.ctx.drawImage(this.player.character, this.spritePositionX, this.spritePositionY, 32, 32, this.player.positionX, this.player.positionY, 32, 32);

        let i = 0;
        for(i = 0; i < this.obstacle.length; i++){
            this.ctx.drawImage(this.obstacle[i].img, this.obstacle[i].positionX, this.obstacle[i].positionY, 50, 50);
        }
        
    }

    collisionDetection() {
        this.checkForCollisionCoin();
        this.checkForCollisionObstacle();
    };

    updateCanvas() {
        this.clearCanvas();
        this.savedPosition();
        switch (this.currentKey) {
            case 38: this.moveUp();    console.log('up'); break;
            case 40: this.moveDown();  console.log('down'); break;
            case 37: this.moveLeft();  console.log('left'); break;
            case 39: this.moveRight(); console.log('right'); break;
        }
        this.collisionDetection();
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
        for(let i = 0; i < this.obstacle.length; i++){
            if (this.player.positionX < this.obstacle[i].positionX + this.obstacle[i].width &&
                this.player.positionX + this.player.width > this.obstacle[i].positionX &&
                this.player.positionY < this.obstacle[i].positionY + this.obstacle[i].height && 
                this.player.positionY + this.player.height > this.obstacle[i].positionY){
                    this.player.positionX = this.currentX;
                    this.player.positionY = this.currentY;
                    return true;
                }
        }
    }

    moveCoin(){
        this.coin.positionX = Math.floor(Math.random() * (this.canvas.width - this.coin.width)); 
        this.coin.positionY = Math.floor(Math.random() * (this.canvas.height - this.coin.width)); 
        for(let i = 0; i < this.obstacle.length; i++){
            if(this.coin.positionX < this.obstacle[i].positionX + this.obstacle[i].width &&
                this.coin.positionX + this.coin.width > this.obstacle[i].positionX &&
                this.coin.positionY < this.obstacle[i].positionY + this.obstacle[i].height && 
                this.coin.positionY + this.coin.height > this.obstacle[i].positionY){
                    this.moveCoin();
                }
        }
    }

    moveUp() {      
        if(this.player.positionY < 0){
        this.player.positionY = 0;
        }else{
         this.player.positionY -= 1/3;
         this.spritePositionX = 0;
         this.spritePositionY = 96;
         }
        };

    moveDown() { 
        if(this.player.positionY  + this.player.height >= this.canvas.height) {
            this.player.positionY = this.canvas.height - this.player.height;
        }else{
        this.player.positionY += 1/3;
        this.spritePositionX = 0;
        this.spritePositionY = 0;
        } 
        };

    moveLeft() {
        if(this.player.positionX< 0){
            this.player.positionX = 0;
        }else{
         this.player.positionX -= 1/3;
         this.spritePositionX = 0;
         this.spritePositionY = 32;
        }
        };

    moveRight() { 
        if(this.player.positionX + this.player.width >= this.canvas.width) {
            this.player.positionX = this.canvas.width - this.player.width;
        }else{
        this.player.positionX += 1/3;
        this.spritePositionX = 0;
        this.spritePositionY = 64;
        }
        };

    keyDown(e) {
        this.currentKey = e.keyCode;
    };
        
    keyUp(e) {
        // the if check here allows pressing a second key before releasing the old one
        if (this.currentKey === e.keyCode) {
        this.currentKey = undefined;
        }
    };

}


   






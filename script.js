// let board = [
//     [[null],[null],[null],[null],[null],[null]],
//     [[null],[null],[null],[null],[null],[null]],
//     [[null],[null],[null],[null],[null],[null]],
//     [[null],[null],[null],[null],[null],[null]],
//     [[null],[null],[null],[null],[null],[null]],
//     [[null],[null],[null],[null],[null],[null]],
// ];

class Player {
    constructor(name, position, direction, character) {
        this.name = name;
        this.position = position;
        this.direction = direction;
        this.character = new Image();
        this.character.onload = function() {
            game.start();
        }
        this.character.src = character;
    }
}

class Game {
    constructor() {

        this.player = new Player("player1", {x: 0, y: 0}, "E", "sprites-players.png");
    
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
          
    }

    start() {
        this.intervalId = setInterval(this.updateCanvas.bind(this), 100)
    }
  
    draw() {
        this.ctx.drawImage(this.player.character, 0, 0, 30, 30, 0, 0, 30, 30)
    }

    updateCanvas() {
        this.clearCanvas();
        this.draw();
    }

    clearCanvas(){
        this.ctx.clearRect(0,0,500,400);
    }

}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 38: player.moveUp();    console.log('up',    player); break;
        case 40: player.moveDown();  console.log('down',  player); break;
        case 37: player.moveLeft();  console.log('left',  player); break;
        case 39: player.moveRight(); console.log('right', player); break;
    }
}


window.onload = function() {
    game = new Game();
}

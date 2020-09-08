const GameScreen = require("./GameScreen");

class GameControl {
    constructor() {
        this.boards = new Map();
    }

    createScreen(gameScreen) {
        this.screen = gameScreen;
    }

    addBoard(gameBoard, id) {
        this.boards.set(id, gameBoard);
    }

    updateAll() {
        this.screen.update();
        
        // Move everything if screen has moved
        const screenVel = this.screen.velocity()
        if (screenVel[0] != 0 || screenVel[1] != 0) {
            for (const [name, board] of this.boards) {
                for (const obj of board.allObjects) {
                    obj.move(screenVel[0], screenVel[1]);
                }
            }
        }  
    }

    drawAll() {
        this.screen.draw();
        for (const [name, board] of this.boards) {
            for (const obj of board.allObjects) {
                obj.draw(this.screen.ctx);
            }
        }
    }

    // updateKeyMovement() {
    //     const scr = this.screen;
    //     let dx = 0;
    //     let dy = 0;
    //     dx -= 20*scr.keysDown.left;
    //     dx += 20*scr.keysDown.right;
    //     dy += 20*scr.keysDown.up;
    //     dy -= 20*scr.keysDown.down;
    //     screen.move(dx, dy);
    // }
}

module.exports = GameControl;

// const updateScreen = function updateScreen() {
//     updateKeyMovement();
//     screenVelocity();
// }

// const sortByZIndex = function sortByZIndex() {
//     allObjects.sort((a,b) => a.zIndex - b.zIndex);
// }

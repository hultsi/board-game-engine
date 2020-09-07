const GameScreen = require("./GameScreen.js");
const GameBoard = require("./shapes/GameBoard.js");

const screen = new GameScreen("screen");
const board = new GameBoard(0, 0, 0, 0);

const screenPrevCoords = [screen.x, screen.y]; // For mouse drag
let allObjects = [];


const createObject = function createObject(obj) {
    allObjects = [
        ...allObjects.filter(el => el.zIndex <= obj.zIndex),
        obj,
        ...allObjects.filter(el => el.zIndex > obj.zIndex),
    ];
}

const updateScreen = function updateScreen() {
    updateKeyMovement();
    updateMouseMovement();
}

const drawScreen = function drawScreen() {
    if (screen.bgColor != null) {
        screen.ctx.fillStyle = screen.bgColor;
        screen.ctx.fillRect(0, 0, screen.canvas.width, screen.canvas.height);
    }

    board.draw(screen.ctx);

    for (const obj of allObjects) {
        obj.draw(screen.ctx);
    }
}

const fitCanvasToBrowserView = function fitCanvasToBrowserView() {
    screen.canvas.width = window.innerWidth;
    screen.canvas.height = window.innerHeight;
    
    window.addEventListener("resize",() => {
        screen.canvas.width = window.innerWidth;
        screen.canvas.height = window.innerHeight;
        drawScreen();
    });
}

const sortByZIndex = function sortByZIndex() {
    allObjects.sort((a,b) => a.zIndex - b.zIndex);
}

/**
 * 
 * PRIVATE
 * 
 */

const updateMouseMovement = function updateMouseMovement() {
    const screenDx = ( screenPrevCoords[0] - screen.x );
    const screenDy = -( screenPrevCoords[1] - screen.y );
    
    if (screenDx != 0 || screenDy != 0) {
        for (const obj of allObjects) {
            obj.move(screenDx, screenDy);
        }
        board.move(screenDx, screenDy);

        screenPrevCoords[0] = screen.x;
        screenPrevCoords[1] = screen.y;
    }
}

const updateKeyMovement = function updateKeyMovement() {
    let dx = 0;
    let dy = 0;
    dx -= 20*screen.keysDown.left;
    dx += 20*screen.keysDown.right;
    dy += 20*screen.keysDown.up;
    dy -= 20*screen.keysDown.down;
    screen.move(dx, dy);
}

module.exports = {
    screen,
    board,
    createObject,
    updateScreen,
    drawScreen,
    fitCanvasToBrowserView,
    sortByZIndex,
};
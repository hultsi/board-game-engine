const GameScreen = require("../world/GameScreen.js");
const GameTable = require("../world/GameTable.js");
const listeners = require("./listeners.js");

let table = new GameTable(0, 0, "table");
let screen = new GameScreen("screen");
let allObjects = new Map();

const createObject = function createObject(obj) {
    allObjects.set(obj.name, obj);
}

const createBoard = function createBoard(gameBoard) {
    boards.set(gameBoard.name, gameBoard);
}

const moveScreen = function moveScreen() {
    let { dx, dy } = listeners.mouse;
    if (listeners.mouse.mousedown) {
        screen.move(-dx, -dy);
    }
}

const zoomScreen = function zoomScreen() {
    let dZoom = 0.075 * Math.sign(listeners.mouse.dWheel);
    if (dZoom != 0) {
        if (screen.zoomScale + dZoom < .2) {
            dZoom = .2 - screen.zoomScale;    
        } else if (screen.zoomScale  + dZoom > 1.75) {
            dZoom = 1.75 - screen.zoomScale;
        }
        screen.zoomScale += dZoom;
        screen.move(dZoom * screen.canvas.width/2, dZoom * screen.canvas.height/2);
    }
}

const sortObjectsByZIndex = function sortByZIndex() {
    allObjects = new Map([...allObjects].sort((a,b) => a[1].zIndex - b[1].zIndex));
}

module.exports = {
    table,
    screen,
    allObjects,
    moveScreen,
    zoomScreen,
    createObject,
    createBoard,
    sortObjectsByZIndex,
};

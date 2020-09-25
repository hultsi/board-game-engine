const GameScreen = require("./GameScreen.js");
const GameTable = require("./GameTable.js");
const listeners = require("./listeners.js");

let table = new GameTable(0, 0, "table");
let screen = new GameScreen("screen");
let allObjects = new Map();
let boards = new Map();

//Todo next: remove screen dependency from hexagon, rectangle and gameboard

const createObject = function createObject(obj) {
    allObjects.set(obj.name, obj);
}

const createBoard = function createBoard(gameBoard) {
    boards.set(gameBoard.name, gameBoard);
}

const moveScreen = function moveScreen() {
    let { dx, dy } = listeners.mouse;

    if (listeners.mouse.mousedown) {
        if (screen.x - dx < 0)
            dx = screen.x;
        if (screen.y - dy < 0)
            dy = screen.y;
        screen.move(-dx, -dy);
        table.moveScreen(dx, dy);
        for (const [name, obj] of allObjects) {
            obj.moveScreen(dx, dy);
        }
    }
    listeners.mouse.dx = 0;
    listeners.mouse.dy = 0;
}

const zoomScreen = function zoomScreen() {
    let dZoom = 0.03 * (listeners.keys.up - listeners.keys.down);

    table.zoomScreen(dZoom);
    for (const [name, obj] of allObjects) {
        obj.zoomScreen(dZoom);
    }
}

const updateAllBegin = function updateAllBegin() {
    // screen.width and screen.height to objects here
    moveScreen();
    zoomScreen();
}

const updateAll = function updateAll() {
    for (const [name, board] of boards) {
        board.update();
    }
    for (const [name, obj] of allObjects) {
        obj.update();
    }
}

const updateAllEnd = function updateAllEnd() {
    screen.updateEnd();
}

const drawAll = function drawAll() {
    screen.draw();
    table.draw(screen.ctx);

    for (const [name, board] of boards) {
        board.draw(screen.ctx);
    }
    for (const [name, obj] of allObjects) {
        obj.draw(screen.ctx);
    }
}

const sortObjectsByZIndex = function sortByZIndex() {
    allObjects = new Map([...allObjects].sort((a,b) => a[1].zIndex - b[1].zIndex));
}

module.exports = {
    table,
    screen,
    allObjects,
    boards,
    createObject,
    createBoard,
    updateAllBegin,
    updateAll,
    updateAllEnd,
    drawAll,
    sortObjectsByZIndex,
};

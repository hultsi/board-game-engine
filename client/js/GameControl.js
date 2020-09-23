const GameScreen = require("./GameScreen.js");
const GameTable = require("./GameTable.js");

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
    const screenVel = screen.velocity();
    
    table.moveScreen(screenVel[0], screenVel[1]);
    for (const [name, board] of boards) {
        board.moveScreen(screenVel[0], screenVel[1]);
    }
    for (const [name, obj] of allObjects) {
        obj.moveScreen(screenVel[0], screenVel[1]);
    }
}

const zoomScreen = function zoomScreen() {
    const dZoom = screen.zoomChange();

    table.zoomScreen(dZoom);
    for (const [name, board] of boards) {
        board.zoomScreen(dZoom);
    }
    for (const [name, obj] of allObjects) {
        obj.zoomScreen(dZoom);
    }
}

const updateAllBegin = function updateAllBegin() {
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

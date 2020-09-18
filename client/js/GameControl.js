let allObjects = new Map();
let boards = new Map();
let screen = null;

//Todo next: select object/board

const getScreen = function getScreen() {
    return screen;
}

const createObject = function createObject(obj) {
    allObjects.set(obj.name, obj);
}

const createScreen = function createScreen(gameScreen) {
    screen = gameScreen;
}

const createBoard = function createBoard(gameBoard) {
    boards.set(gameBoard.name, gameBoard);
}

const moveScreen = function moveScreen() {
    const screenVel = screen.velocity();

    for (const [name, board] of boards) {
        board.moveScreen(screenVel[0], screenVel[1]);
    }
    for (const [name, obj] of allObjects) {
        obj.moveScreen(screenVel[0], screenVel[1]);
    }
}

const updateAll = function updateAll() {
    screen.update();
    moveScreen();

    for (const [name, board] of boards) {
        board.update();
    }
    for (const [name, obj] of allObjects) {
        obj.update();
    }
}

const updateEndAll = function updateEndAll() {
    screen.updateEnd();
}

const drawAll = function drawAll() {
    screen.draw();
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
    allObjects,
    boards,
    getScreen,
    createObject,
    createScreen,
    createBoard,
    updateAll,
    updateEndAll,
    drawAll,
    sortObjectsByZIndex,
};

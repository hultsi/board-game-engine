let allObjects = new Map();
let boards = new Map();
let screen = null;

const createObject = function createObject(obj) {
    allObjects.set(obj.name, obj);
};

const createScreen = function createScreen(gameScreen) {
    screen = gameScreen;
};

const createBoard = function createBoard(gameBoard, id) {
    boards.set(id, gameBoard);
};

const updateAll = function updateAll() {
    screen.update();

    // Move everything if screen has moved
    const screenVel = screen.velocity()
    if (screenVel[0] != 0 || screenVel[1] != 0) {
        for (const [name, board] of boards) {
            board.move(screenVel[0], screenVel[1]);
        }
        for (const [name, obj] of allObjects) {
            obj.move(screenVel[0], screenVel[1]);
        }
    }  
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
};

module.exports = {
    allObjects,
    boards,
    screen,
    createObject,
    createScreen,
    createBoard,
    updateAll,
    drawAll,
    sortObjectsByZIndex,
};

const ImageCollection = require("../helpers/ImageCollection.js");
const listeners = require("./listeners.js");
const { 
    allObjects, table, screen, grids,
    moveScreen, zoomScreen 
} = require("./gameControl.js");

// Once images are loaded up, they are here as an image map 
// imageCollection.images[key]
let imageCollection = new ImageCollection();

const initiateGame = function initiateGame(imagePaths, callback) {
    imageCollection.load(imagePaths, callback);
}

const updateAllBegin = function updateAllBegin() {
    moveScreen();
    zoomScreen();
}

const updateAll = function updateAll() {
    for (const [name, obj] of allObjects) {
        obj.update();
    }
}

const updateAllEnd = function updateAllEnd() {
    listeners.updateEnd();
}

const drawAll = function drawAll() {
    screen.draw();
    const offsetX = -screen.x;
    const offsetY = -screen.y;
    const scale = screen.zoomScale;

    table.draw(screen.ctx, offsetX, offsetY, scale);
    for (const [name, obj] of allObjects) {
        obj.draw(screen.ctx, offsetX, offsetY, scale);
    }
    for (const [name, grid] of grids) {
        grid.draw(screen.ctx, offsetX, offsetY, scale);
    }
}

module.exports = {
    imageCollection,
    initiateGame,
    updateAllBegin,
    updateAll,
    updateAllEnd,
    drawAll,
}
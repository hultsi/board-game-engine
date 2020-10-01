const ImageCollection = require("../helpers/ImageCollection.js");
const listeners = require("./listeners.js");
const { 
    allObjects, table, screen, 
    moveScreen, zoomScreen 
} = require("./gameControl.js");
const grid = require("../helpers/grid.js");

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

    //grid.drawGrid(screen.ctx, offsetX, offsetY, screen.ctx.canvas.width, screen.ctx.canvas.height, scale);
    grid.drawHexGrid(screen.ctx, offsetX, offsetY, screen.ctx.canvas.width, screen.ctx.canvas.height, scale);
    grid.drawCoordinates(screen.ctx, offsetX, offsetY, 100);

    table.draw(screen.ctx, offsetX, offsetY, scale);
    for (const [name, obj] of allObjects) {
        obj.draw(screen.ctx, offsetX, offsetY, scale);
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
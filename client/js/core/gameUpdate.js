const ImageCollection = require("../helpers/ImageCollection.js");
const listeners = require("./listeners.js");
const { game, moveScreen, zoomScreen, dragObject } = require("./gameControl.js");
const { objects, table, screen, grids } = game;

// Once images are loaded up, they are here as an image map
let imageCollection = new ImageCollection();
let sortObjectMap = false;

const shouldReorderMap = function shouldReorderMap() {
    let zIndexPrev = null;
    for (const [name, obj] of objects.all) {
        if (obj.zIndex < zIndexPrev) {
            sortObjectMap = true;
            return true;
        }
        zIndexPrev = obj.zIndex;
    }
    return false;
}

const initiateGame = function initiateGame(imagePaths, callback) {
    imageCollection.load(imagePaths, callback);
}

const updateAllBegin = function updateAllBegin() {
    dragObject();
    zoomScreen();
    if (!screen.stop) {
        moveScreen();
    }
    if (shouldReorderMap())
        game.objects.sortByZIndex();
}

const updateAll = function updateAll() {
    if (game.objects.dragged.obj) {
        const { obj, offsetX, offsetY } = game.objects.dragged;
        obj.position.x = listeners.mouse.x/screen.zoomScale + screen.x - offsetX/screen.zoomScale;
        obj.position.y = listeners.mouse.y/screen.zoomScale + screen.y - offsetY/screen.zoomScale;
    }


}

const updateAllEnd = function updateAllEnd() {
    listeners.updateEnd();
}

const drawAll = function drawAll() {
    const offsetX = -screen.x;
    const offsetY = -screen.y;
    const scale = screen.zoomScale;

    table.draw(screen.ctx, offsetX, offsetY, scale);
    for (const [name, grid] of grids) {
        grid.draw(screen.ctx, offsetX, offsetY, scale);
    }
    for (const [name, obj] of objects.all) {
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
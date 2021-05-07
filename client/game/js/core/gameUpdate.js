const ImageCollection = require("../helpers/ImageCollection.js");
const listeners = require("./listeners.js");
const { game, moveScreen, zoomScreen, dragObject } = require("./gameControl.js");
const { objects, table, screen, grids } = game;

// Once images are loaded up, they are here as an image map
let imageCollection = new ImageCollection();

const initiateGame = function initiateGame(imagePaths, callback) {
    imageCollection.load(imagePaths, callback);
}

const updateAllBegin = function updateAllBegin() {
    dragObject();
    zoomScreen();
    if (!screen.stop) {
        moveScreen();
    }
    if (game.objects.shouldSortMap())
        game.objects.sortByZIndex();
}

const updateAll = function updateAll() {
    const { obj, offsetX, offsetY } = game.others.dragged;
    if (obj) {
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
    for (const grid of grids.all) {
        grid.draw(screen.ctx, offsetX, offsetY, scale);
    }
    for (const obj of objects.all) {
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
const ImageCollection = require("../helpers/ImageCollection.js");
const listeners = require("./listeners.js");
const { game, moveScreen, zoomScreen, dragObject } = require("./gameControl.js");
const { objects, table, screen, grids } = game;

// Once images are loaded up, they are here as an image map
let imageCollection = new ImageCollection();

const initiateGame = function initiateGame(imagePaths, callback) {
    imageCollection.load(imagePaths, callback);
}

const updateAllBegin = function updateAllBegin(updateBeginCb = null) {
    // First move screen
    zoomScreen();
    if (!screen.stop) {
        moveScreen();
    }
    if (game.objects.shouldSortMap()) {
        game.objects.sortByZIndex();
    }
    for (let i = 0; i < objects.all.length; ++i) {
        objects.all[i].updateScreenPositionAndScale(-screen.x, -screen.y, screen.zoomScale);
    }

    // Then drag an object
    // TODO: could this function return the things and then we'd do everything here without side effects?
    dragObject();
    const { obj, offsetX, offsetY } = game.others.dragged;
    if (obj) {
        obj.position.x = listeners.mouse.x/screen.zoomScale + screen.x - offsetX/screen.zoomScale;
        obj.position.y = listeners.mouse.y/screen.zoomScale + screen.y - offsetY/screen.zoomScale;
    }

    if (updateBeginCb) {
        updateBeginCb();
    }
}

const updateAll = function updateAll(updateCb = null) {
    if (updateCb) {
        updateCb();
    }
}

const updateAllEnd = function updateAllEnd(updateEndCb = null) {
    listeners.updateEnd();
    if (updateEndCb) {
        updateEndCb();
    }
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
        obj.draw(screen.ctx);
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
const GameScreen = require("../world/GameScreen.js");
const GameTable = require("../world/GameTable.js");
const listeners = require("./listeners.js");

const game = {
    table: new GameTable(0, 0, "table"),
    screen: new GameScreen("screen"),
    grids: new Map(),
    objects: {
        all: new Map(),
        dragged: {
            obj: null,
            offsetX: 0,
            offsetY: 0,
        }
    },
}

const createObject = function createObject(obj) {
    game.objects.all.set(obj.name, obj);
}

const createGrid = function createGrid(grid) {
    game.grids.set(grid.name, grid);
}

const moveScreen = function moveScreen() {
    let { dx, dy } = listeners.mouse;
    if (listeners.mouse.mousedown) {
        game.screen.move(-4*dx / game.screen.zoomScale, -4*dy / game.screen.zoomScale);
    }
}

const zoomScreen = function zoomScreen() {
    let dZoom = 0.075 * Math.sign(listeners.mouse.dWheel);
    if (dZoom != 0) {
        if (game.screen.zoomScale + dZoom < .2) {
            dZoom = .2 - game.screen.zoomScale;    
        } else if (game.screen.zoomScale  + dZoom > 1.75) {
            dZoom = 1.75 - game.screen.zoomScale;
        }
        game.screen.zoomScale += dZoom;

        const dx = -(game.screen.canvas.width / game.screen.zoomScale - game.screen.viewWidth)/2;
        const dy = -(game.screen.canvas.height / game.screen.zoomScale - game.screen.viewHeight)/2;
        game.screen.move(dx, dy);
    }
}

// Almost works, fix this
const dragObject = function dragObject() {
    // Needs to take into account screen offset
    const { screen, objects } = game;
    const mx = listeners.mouse.x/screen.zoomScale + screen.x;
    const my = listeners.mouse.y/screen.zoomScale + screen.y;
    if (listeners.mouse.mouseclick) {
        for (const [name, obj] of objects.all) {
            if (obj.constructor.name == "Rectangle") {
                const {position, width, height} = obj;
                if (mx > position.x && mx < position.x + width &&
                    my > position.y && my < position.y + height) {
                        // Mouse clicking on a rectangle, stop screen
                        screen.stop = true;
                        obj.beingDragged = true;
                        game.objects.dragged.obj = obj;
                        game.objects.dragged.offsetX = listeners.mouse.x + (screen.x - obj.position.x) * screen.zoomScale;
                        game.objects.dragged.offsetY = listeners.mouse.y + (screen.y - obj.position.y) * screen.zoomScale;
                        break;
                }
            }
        }
    } else if (listeners.mouse.mousereleased) {
        screen.stop = false;
        game.objects.dragged.obj = null;
    }
}

const sortObjectsByZIndex = function sortByZIndex() {
    game.objects.all = new Map([...game.objects.all].sort((a,b) => a[1].zIndex - b[1].zIndex));
}

module.exports = {
    game,
    moveScreen,
    zoomScreen,
    createObject,
    createGrid,
    sortObjectsByZIndex,
    dragObject,
};

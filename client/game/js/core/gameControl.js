const game = require("./game.js");
const listeners = require("./listeners.js");
const gridMap = require("../tools/gridMap.js");
const { pointInRect, pointInHex } = require("../helpers/collision.js");


const createObject = function createObject(obj) {
    game.objects.set(obj);
}

const createGrid = function createGrid(grid) {
    game.grids.set(grid);
}

const moveScreen = function moveScreen() {
    let { dx, dy } = listeners.mouse;
    if (listeners.mouse.mousedown) {
        game.screen.move(-3*dx / game.screen.zoomScale, -3*dy / game.screen.zoomScale);
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


const dragObject = function dragObject() {
    const { screen, objects, others } = game;
    const clickEffects = function clickEffects(screen, obj, others) {
        screen.stop = true;
        obj.beingDragged = true;
        obj.isSelected = true;
        obj.zIndex = Math.max(...objects.all.map(obj => { 
            obj.zIndex -= 1;
            return obj.zIndex;
        })) + 1;
        others.selected = obj;
        others.dragged.obj = obj;
        others.dragged.offsetX = listeners.mouse.x + (screen.x - obj.position.x) * screen.zoomScale;
        others.dragged.offsetY = listeners.mouse.y + (screen.y - obj.position.y) * screen.zoomScale;
    }
    const mx = listeners.mouse.x/screen.zoomScale + screen.x;
    const my = listeners.mouse.y/screen.zoomScale + screen.y;
    if (listeners.mouse.mouseclick) {
        if (others.selected)
            others.selected.isSelected = false;
        others.selected = null;
        for (const obj of objects.all) {
            if (obj.isStatic)
                continue;
            if (obj.constructor.name == "Rectangle") {
                const {position, width, height} = obj;
                if (pointInRect(mx, my, position.x, position.y, width, height)) {
                    // Mouse clicking on a rectangle, stop screen
                    clickEffects(screen, obj, others);
                    break;
                }
            } else if (obj.constructor.name == "Hexagon") {
                const {position, radius} = obj;
                if (pointInHex(mx, my, position.x, position.y, radius)) {
                    // Mouse clicking on a hex, stop screen
                    clickEffects(screen, obj, others);
                    break;
                }
            }
        }
    } else if (listeners.mouse.mousereleased) {
        screen.stop = false;
        // Snap to grid here
        if (others.dragged.obj != null) {
            for (const el of others.dragged.obj.snapGrids) {
                gridMap.snapToGrid(others.dragged.obj, el);
            }
            // Then nullify the dragged obj
            others.dragged.obj.beingDragged = false;
            others.dragged.obj = null;
        }
    }
}

module.exports = {
    game,
    moveScreen,
    zoomScreen,
    createObject,
    createGrid,
    dragObject,
};

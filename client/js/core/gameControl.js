const game = require("./game.js");
const listeners = require("./listeners.js");
const { pointInRect } = require("../helpers/collision.js");


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
    // Needs to take into account screen offset
    const { screen, objects, others } = game;
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
                    break;
                }
            }
        }
    } else if (listeners.mouse.mousereleased) {
        screen.stop = false;
        // Snap to grid here
        if (others.dragged.obj != null) {
            const { position } = others.dragged.obj;
            for (const el of game.grids.all) {
                for (let row = 0; row < el.xN; ++row) {
                    for (let col = 0; col < el.yN; ++col) {
                        const xx = el.position.x + el.width*col - el.width/2;
                        const yy = el.position.y + el.height*row - el.height/2;
                        if (pointInRect(position.x, position.y, xx, yy, el.width, el.height)) {
                            others.dragged.obj.position.x = el.position.x + el.width*col;
                            others.dragged.obj.position.y = el.position.y + el.height*row;
                        }
                    }
                }
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

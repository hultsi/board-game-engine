const keys = {
    up: false,
    down: false,
    left: false,
    right: false,
};

const mouse = {
    mousedown: false,
    left: false,
    right: false,
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    dWheel: 0,
};

const updateEnd = function updateEnd() {
    mouse.dx = 0;
    mouse.dy = 0;
    mouse.dWheel = 0;
}

const keyDown = function keyDown(ev) {
    if (ev.key == "ArrowLeft") {
        keys.left = true;
    } else if (ev.key == "ArrowUp") {
        keys.up = true;
    } else if (ev.key == "ArrowRight") {
        keys.right = true;
    } else if (ev.key == "ArrowDown") {
        keys.down = true;
    }
}

const keyUp = function keyUp(ev) {
    if (ev.key == "ArrowLeft") {
        keys.left = false;
    } else if (ev.key == "ArrowUp") {
        keys.up = false;
    } else if (ev.key == "ArrowRight") {
        keys.right = false;
    } else if (ev.key == "ArrowDown") {
        keys.down = false;
    }
}

//todo think about this
const mouseMoved = function mouseMoved(ev) {
    mouse.x = ev.offsetX;
    mouse.y = ev.offsetY;
    mouse.dx = ev.movementX;
    mouse.dy = ev.movementY;
}

const mouseDown = function mouseDown (ev) {
    mouse.mousedown = true;
    mouse.x = ev.offsetX;
    mouse.y = ev.offsetY;
    mouse.prevX = ev.offsetX;
    mouse.prevY = ev.offsetY;
}

const mouseUp = function mouseUp(ev) {
    mouse.mousedown = false;
}

const mouseWheel = function mouseWheel(ev) {
    mouse.dWheel = -ev.deltaY;
}

const enableKeyListeners = function enableKeyListeners(enable) {
    if (enable) {
        window.addEventListener("keydown", keyDown, false);
        window.addEventListener("keyup", keyUp, false);
    } else {
        window.removeEventListener("keydown",keyDown, false);
        window.removeEventListener("keyup", keyUp, false);
    }
}

const enableMouseListeners = function enableMouseListeners(enable) {
    if (enable) {
        window.addEventListener("mousedown", mouseDown, false);
        window.addEventListener('mousemove', mouseMoved, false);
        window.addEventListener("mouseup", mouseUp, false);
        window.addEventListener("wheel", mouseWheel, false);
    } else {
        window.removeEventListener("mousedown", mouseDown, false);
        window.removeEventListener('mousemove', mouseMoved, false);
        window.removeEventListener("mouseup", mouseUp, false);
        window.removeEventListener("wheel", mouseWheel, false);
    }
}

module.exports = {
    keys,
    mouse,
    enableKeyListeners,
    enableMouseListeners,
    updateEnd,
};
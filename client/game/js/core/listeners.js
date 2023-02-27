const keys = {
    up: false,
    down: false,
    left: false,
    right: false,
};

const mouse = {
    mouseclick: false,
    mousereleased: false,
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
    mouse.mouseclick = false;
    mouse.mousereleased = false;
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

const mouseMoved = function mouseMoved(ev) {
    mouse.x = ev.offsetX;
    mouse.y = ev.offsetY;
    mouse.dx = ev.movementX;
    mouse.dy = ev.movementY;
}

const mouseDown = function mouseDown (ev) {
    mouse.mouseclick = true;
    mouse.mousedown = true;
    mouse.x = ev.offsetX;
    mouse.y = ev.offsetY;
    mouse.prevX = ev.offsetX;
    mouse.prevY = ev.offsetY;
}

const mouseUp = function mouseUp(ev) {
    mouse.mousereleased = true;
    mouse.mousedown = false;
}

const mouseWheel = function mouseWheel(ev) {
    mouse.dWheel = -ev.deltaY;
}

const enableKeyListeners = function enableKeyListeners(enable) {
    if (enable) {
        addListener(window, "keydown", keyDown);
        addListener(window, "keyup", keyUp);
    } else {
        removeListener(window, "keydown", keyDown);
        removeListener(window, "keyup", keyUp);
    }
}

const enableMouseListeners = function enableMouseListeners(enable) {
    if (enable) {
        addListener(window, "mousedown", mouseDown);
        addListener(window, "mousemove", mouseMoved);
        addListener(window, "mouseup", mouseUp);
        addListener(window, "wheel", mouseWheel);
    } else {
        addListener(window, "mousedown", mouseDown);
        addListener(window, "mousemove", mouseMoved);
        addListener(window, "mouseup", mouseUp);
        addListener(window, "wheel", mouseWheel);
    }
}

const addListener = function addListener(theListener, type, callback) {
    console.log(
        "Adding listener to " + 
        `%c${theListener.constructor.name} ` +
        "%cwith a type of " +
        `%c${type} ` +
        "%cand a name of " +
        `%c${callback.name}`,
        "color:cyan",
        "color:white",
        "color:orange",
        "color:white",
        "color:yellow",
    );
    theListener.addEventListener(type, callback);
}

const removeListener = function removeListener(theListener, type, callback) {
    console.log(
        "Removing listener from " + 
        `%c${theListener.constructor.name} ` +
        "%cwith a type of " +
        `%c${type} ` +
        "%cand a name of " +
        `%c${callback.name}`,
        "color:cyan",
        "color:white",
        "color:orange",
        "color:white",
        "color:yellow",
    );
    theListener.removeEventListener(type, callback);
}

module.exports = {
    keys,
    mouse,
    enableKeyListeners,
    enableMouseListeners,
    updateEnd,
    addListener,
    removeListener,
};
const { sortObjectsByZIndex } = require("../gameControl.js");

class ConvexShape {
    constructor(name, color = "#FFFFFF", lineWidth = 2, zIndex = 0) {
        this.lineWidth = lineWidth;
        this.name = name;
        this.color = color;
        this.zIndex = zIndex;
        this.zoomScale = 1;
    }

    position(x, y) {
        this.x = x;
        this.y = y;
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    moveScreen(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    setZIndex(val) {
        this.zIndex = val;
        sortObjectsByZIndex();
    }
};

module.exports = ConvexShape;
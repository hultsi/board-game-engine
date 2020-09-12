const { sortObjectsByZIndex } = require("../GameControl.js");

class ConvexShape {
    constructor(name, color = "#FFFFFF", lineWidth = 2, zIndex = 0) {
        this.lineWidth = lineWidth;
        this.name = name;
        this.color = color;
        this.zIndex = zIndex;
    };

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    };

    setZIndex(val) {
        this.zIndex = val;
        sortObjectsByZIndex();
    };
};

module.exports = ConvexShape;
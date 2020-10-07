const { sortObjectsByZIndex } = require("../core/gameControl.js");

class ConvexShape {
    constructor(position, name, color = "#FFFFFF", lineWidth = 2, zIndex = 0) {
        this.position = position;
        this.lineWidth = lineWidth;
        this.name = name;
        this.color = color;
        this.zIndex = zIndex;
        this.isStatic = true;
        this.isSelected = false;
        this.beingDragged = false;
    }

    move(dx, dy) {
        this.position.x += dx;
        this.position.y += dy;
    }

    setZIndex(val) {
        this.zIndex = val;
        sortObjectsByZIndex();
    }
};

module.exports = ConvexShape;
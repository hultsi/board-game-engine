const { sortObjectsByZIndex } = require("../core/gameControl.js");

/**
 * Todo: Should this be elsewhere?
 * @param {key values to enumerate} arr 
 * @returns enumeration object
 */
const Enum = function Enum(arr) {
    let obj = {};
    for (let i = 0; i < arr.length; ++i) {
      obj[arr[i]] = i;
    }
    return obj;
}
  
const Shapes = Enum([
    "Rectangle",
    "Hexagon",
]);

class ConvexShape {
    constructor(position, name, color = "#FFFFFF", fill = "#FFFFFF", lineWidth = 2, zIndex = 0) {
        this.position = position;
        this.lineWidth = lineWidth;
        this.name = name;
        this.color = color;
        this.fill = fill;
        this.zIndex = zIndex;
        this.isStatic = true;
        this.isSelected = false;
        this.beingDragged = false;
        this.snapGrids = [];
        this.screenScale = 1;
        this.screenOffset = {
            x: 0,
            y: 0,
        };
    }

    move(dx, dy) {
        this.position.x += dx;
        this.position.y += dy;
    }

    setZIndex(val) {
        this.zIndex = val;
        sortObjectsByZIndex();
    }

    updateScreenPositionAndScale(screenX, screenY, screenScale) {
        this.screenOffset.x = screenX;
        this.screenOffset.y = screenY;
        this.screenScale = screenScale;
    }
};

module.exports = {
    ConvexShape,
    Shapes,
};
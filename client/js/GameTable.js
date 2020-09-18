const ConvexShape = require("./shapes/ConvexShape");

class GameTable extends ConvexShape {
    constructor(x, y, width, height, name, color = "#FFFFFF", lineWidth = 2) {
        super(name, color, lineWidth, zIndex);
    }
}

module.exports = GameTable;
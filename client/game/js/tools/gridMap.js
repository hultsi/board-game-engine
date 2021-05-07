const { pointInRect } = require("../helpers/collision.js");

const snapToGrid = function snapToGrid(obj, grid) {
    const { position } = obj;
    if (grid.constructor.name == "RectGrid") {
        for (let row = 0; row < grid.xN; ++row) {
            for (let col = 0; col < grid.yN; ++col) {
                const xx = grid.position.x + grid.width*col - grid.width/2;
                const yy = grid.position.y + grid.height*row - grid.height/2;
                if (pointInRect(position.x, position.y, xx, yy, grid.width, grid.height)) {
                    obj.position = grid.getCoords(col,row);
                }
            }
        }
    } else if (grid.constructor.name = "HexGrid") {
        for (let row = 0; row < grid.rows; ++row) {
            for (let col = 0; col < grid.columns; ++col) {
                const pos = grid.getCoords(col,row);
                const xx = pos.x;
                const yy = pos.y;
                if (pointInRect(position.x, position.y, xx-grid.radius, yy-grid.radius, 2*grid.radius, 2*grid.radius)) {
                    obj.position = pos;
                }
            }
        }           
    }
}

module.exports = {
    snapToGrid,
}
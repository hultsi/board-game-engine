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
        for (let row = 0; row < grid.xN; ++row) {
            for (let col = 0; col < grid.yN; ++col) {
                // TODO: the snapping
                // const xx = grid.position.x + 2*grid.radius*col - grid.radius;
                // const yy = grid.position.y + 2*grid.radius*row - grid.radius;
                // const pos = grid.getCoords(col,row);
                // const xx = pos.x;
                // const yy = pos.y;
                // console.log(xx,yy);
                // if (pointInRect(position.x, position.y, xx, yy, 2*grid.radius, 2*grid.radius)) {
                //     obj.position = grid.getCoords(col, row);
                // }
            }
        }           
    }
}

module.exports = {
    snapToGrid,
}
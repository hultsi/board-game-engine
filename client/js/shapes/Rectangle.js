const ConvexShape = require("./ConvexShape.js");
const GameBoard = require("../GameBoard.js");

class Rectangle extends ConvexShape {
    constructor(x, y, width, height, name, color = "#FFFFFF", lineWidth = 2, zIndex = 0) {
        super(name, color, lineWidth, zIndex);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x - this.width/2, this.y + this.height/2);
        
        ctx.lineTo(this.x + this.width/2, this.y + this.height/2);
        ctx.lineTo(this.x + this.width/2, this.y - this.height/2);
        ctx.lineTo(this.x - this.width/2, this.y - this.height/2);
        ctx.lineTo(this.x - this.width/2, this.y + this.height/2);
        
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }
}

module.exports = Rectangle;
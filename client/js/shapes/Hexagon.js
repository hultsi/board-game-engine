const ConvexShape = require("./ConvexShape.js");

class Hexagon extends ConvexShape {
    constructor(x, y, radius, name, color = "#FFFFFF", lineWidth = 2, zIndex = 0) {
        super(name, color, lineWidth, zIndex);
        this.x = x;
        this.y = y;
        this.radius = radius;
    };

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x + this.radius * Math.cos(0), this.y + this.radius * Math.sin(0));
    
        for (let side = 0; side < 7; side++) {
            ctx.lineTo(this.x + this.radius * Math.cos(side * 2 * Math.PI / 6), this.y + this.radius * Math.sin(side * 2 * Math.PI / 6));
        }
        
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    };
};

module.exports = Hexagon;
const gameControl = require("../gameControl.js");

class Hexagon {
    constructor(x, y, radius, name, color = "#FFFFFF", lineWidth = 2, zIndex = 0) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.lineWidth = lineWidth;
        this.name = name;
        this.color = color;
        this.zIndex = zIndex;
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x + this.radius * Math.cos(0), this.y + this.radius * Math.sin(0));
    
        for (let side = 0; side < 7; side++) {
            ctx.lineTo(this.x + this.radius * Math.cos(side * 2 * Math.PI / 6), this.y + this.radius * Math.sin(side * 2 * Math.PI / 6));
        }
        
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        ctx.stroke();
    }

    setZIndex(val) {
        this.zIndex = val;
        gameControl.sortByZIndex();
    }
}

module.exports = Hexagon;
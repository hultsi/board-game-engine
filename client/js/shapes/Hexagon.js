const ConvexShape = require("./ConvexShape.js");

class Hexagon extends ConvexShape {
    constructor(x, y, img, radius, name, color = "#FFFFFF", lineWidth = 2, zIndex = 0) {
        super(x, y, name, color, lineWidth, zIndex);
        this.radius = radius;
        this.img = img;
    }
    
    update() {
    }

    draw(ctx, offsetX, offsetY, scale) {
        const xx = (this.x + offsetX) * scale;
        const yy = (this.y + offsetY) * scale;
        const radius = this.radius * scale;
        
        ctx.save();
        ctx.lineWidth = this.lineWidth * scale;
        ctx.strokeStyle = this.color;
        
        ctx.beginPath();
        ctx.moveTo(xx + radius * Math.cos(0), yy + radius * Math.sin(0));
        for (let side = 0; side < 7; side++) {
            ctx.lineTo(xx + radius * Math.cos(side * 2 * Math.PI / 6), 
                        yy + radius * Math.sin(side * 2 * Math.PI / 6));
        }
        ctx.stroke();
        ctx.restore();
    }
};

module.exports = Hexagon;
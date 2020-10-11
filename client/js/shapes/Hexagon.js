const ConvexShape = require("./ConvexShape.js");

class Hexagon extends ConvexShape {
    constructor(position, img, radius, name, color = "#FFFFFF", fill = "#FFFFFF", lineWidth = 2, zIndex = 0) {
        super(position, name, color, fill, lineWidth, zIndex);
        this.radius = radius;
        this.img = img;
    }
    
    update() {
    }

    draw(ctx, offsetX, offsetY, scale) {
        const xx = (this.position.x + this.radius + offsetX) * scale;
        const yy = (this.position.y + this.radius + offsetY) * scale;
        const radius = this.radius * scale;
        
        ctx.save();
        ctx.lineWidth = this.lineWidth * scale;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.fill;

        ctx.beginPath();
        ctx.moveTo(xx + radius * Math.cos(0), yy + radius * Math.sin(0));
        for (let side = 0; side < 7; side++) {
            ctx.lineTo(xx + radius * Math.cos(side * 2 * Math.PI / 6), 
                        yy + radius * Math.sin(side * 2 * Math.PI / 6));
        }
        ctx.stroke();
        ctx.fill();
        
        ctx.restore();
    }
};

module.exports = Hexagon;
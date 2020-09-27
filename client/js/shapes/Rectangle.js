const ConvexShape = require("./ConvexShape.js");

class Rectangle extends ConvexShape {
    constructor(x, y, width, height, name, color = "#FFFFFF", lineWidth = 2, zIndex = 0) {
        super(name, color, lineWidth, zIndex);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = null;
    }

    update() {

    }

    draw(ctx, offsetX, offsetY, scale) {
        const xx = this.x * scale + offsetX;
        const yy = this.y * scale + offsetY;
        const width = this.width * scale;
        const height = this.height * scale;

        ctx.save();
        if (this.img) {
            ctx.drawImage(this.img, xx, yy, width, height);
        }
        ctx.lineWidth = this.lineWidth * scale;
        ctx.strokeStyle = this.color;

        ctx.beginPath();
        ctx.moveTo(xx, yy);
        
        ctx.lineTo(xx + width, yy);
        ctx.lineTo(xx + width, yy + height);
        ctx.lineTo(xx, yy + height);
        ctx.lineTo(xx, yy);
        
        ctx.stroke();
        ctx.restore();
    }
}

module.exports = Rectangle;
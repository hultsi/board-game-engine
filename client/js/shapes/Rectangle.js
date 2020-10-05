const ConvexShape = require("./ConvexShape.js");

class Rectangle extends ConvexShape {
    constructor(position, img, width, height, name, color = "#FFFFFF", fill = "#FFFFFF", lineWidth = 2, zIndex = 0) {
        super(position, name, color, lineWidth, zIndex);
        this.width = width;
        this.height = height;
        this.fill = fill;
        this.img = img;
    }

    update() {

    }

    draw(ctx, offsetX, offsetY, scale) {
        const xx = (this.position.x + offsetX) * scale;
        const yy = (this.position.y + offsetY) * scale;
        const width = this.width * scale;
        const height = this.height * scale;

        ctx.save();
        if (this.img) {
            ctx.drawImage(this.img, xx, yy, width, height);
        }
        ctx.lineWidth = this.lineWidth * scale;
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.fill;

        ctx.beginPath();
        ctx.moveTo(xx, yy);
        
        ctx.lineTo(xx + width, yy);
        ctx.lineTo(xx + width, yy + height);
        ctx.lineTo(xx, yy + height);
        ctx.lineTo(xx, yy);
        
        ctx.stroke();
        ctx.fill();

        ctx.restore();
    }
}

module.exports = Rectangle;
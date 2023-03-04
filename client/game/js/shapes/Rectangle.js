const { ConvexShape, Shapes } = require("./ConvexShape.js");

class Rectangle extends ConvexShape {
    constructor(position, img, width, height, name, color = "#FFFFFF", fill = "#FFFFFF", lineWidth = 1, zIndex = 0) {
        super(position, name, color, fill, lineWidth, zIndex);
        this.width = width;
        this.height = height;
        this.img = img;
    }

    update() {

    }

    draw(ctx) {
        const xx = (this.position.x + this.screenOffset.x) * this.screenScale;
        const yy = (this.position.y + this.screenOffset.y) * this.screenScale;
        const width = this.width * this.screenScale;
        const height = this.height * this.screenScale;
        console.log(this.screenScale);
        ctx.save();
        if (this.img) {
            ctx.drawImage(this.img, xx, yy, width, height);
        }
        ctx.lineWidth = this.lineWidth * this.screenScale;
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

        if (this.isSelected)
            this.drawOutline(ctx, xx, yy, width, height);
    }

    drawOutline(ctx, xx, yy, width, height) {
        ctx.save();

        ctx.lineWidth = this.lineWidth * this.screenScale * 1;
        for (let i = 0; i < 4; ++i) {
            ctx.beginPath();
            ctx.moveTo(xx - i, yy - i);
            ctx.strokeStyle = `rgba(0, 0, ${255 - 35*i}, ${1 - i/4})`;
            ctx.lineTo(xx + width + i, yy - i);
            ctx.lineTo(xx + width + i, yy + height + i);
            ctx.lineTo(xx - i, yy + height + i);
            ctx.lineTo(xx - i, yy - i);
            ctx.stroke();
        }

        ctx.restore();    
    }
}

module.exports = Rectangle;
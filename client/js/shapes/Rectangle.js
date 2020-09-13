const { getScreen } = require("../GameControl.js");
const ConvexShape = require("./ConvexShape.js");

class Rectangle extends ConvexShape {
    constructor(x, y, width, height, name, color = "#FFFFFF", lineWidth = 2, zIndex = 0) {
        super(name, color, lineWidth, zIndex);
        const screen = getScreen();
        this.x = x + screen.canvas.width / 2;
        this.y = y + screen.canvas.height / 2;
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        const screen = getScreen();
        const actualWidth = this.width * screen.zoomScale;
        const actualHeight = this.height * screen.zoomScale;
        const actualLineWidth = this.lineWidth * screen.zoomScale;
        const xx = this.x*screen.zoomScale + screen.canvas.width / 2;
        const yy = this.y*screen.zoomScale + screen.canvas.height / 2;

        ctx.lineWidth = actualLineWidth;
        ctx.strokeStyle = this.color;

        ctx.beginPath();
        ctx.moveTo(xx - actualWidth/2, yy + actualHeight/2);
        
        ctx.lineTo(xx + actualWidth/2, yy + actualHeight/2);
        ctx.lineTo(xx + actualWidth/2, yy - actualHeight/2);
        ctx.lineTo(xx - actualWidth/2, yy - actualHeight/2);
        ctx.lineTo(xx - actualWidth/2, yy + actualHeight/2);
        
        ctx.stroke();
    }
}

module.exports = Rectangle;
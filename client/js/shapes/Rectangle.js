const { screen } = require("../GameControl.js");
const ConvexShape = require("./ConvexShape.js");

class Rectangle extends ConvexShape {
    constructor(x, y, width, height, name, color = "#FFFFFF", lineWidth = 2, zIndex = 0) {
        super(name, color, lineWidth, zIndex);
        this.x = x; // + screen.canvas.width / 2;
        this.y = y; // + screen.canvas.height / 2;
        this.width = width;
        this.height = height;
        this.scale = 1;
    }

    update() {

    }

    draw(ctx) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = this.color;

        ctx.beginPath();
        ctx.moveTo(xx - width/2, yy + height/2);
        
        ctx.lineTo(xx + width/2, yy + height/2);
        ctx.lineTo(xx + width/2, yy - height/2);
        ctx.lineTo(xx - width/2, yy - height/2);
        ctx.lineTo(xx - width/2, yy + height/2);
        
        ctx.stroke();
    }

    zoomScreen(dZoom) {
        const scaleCoeff = 1 + dZoom;
        const halfWidth = screen.canvas.width / 2;
        const halfHeight = screen.canvas.height / 2;
        // this.x = (this.x - halfWidth) * scaleCoeff + halfWidth;
        // this.y = (this.y - halfHeight) * scaleCoeff + halfHeight;
        this.x = (this.x) * scaleCoeff;
        this.y = (this.y) * scaleCoeff;
        this.width = this.width * scaleCoeff;
        this.height = this.height * scaleCoeff;
        this.lineWidth = this.lineWidth * scaleCoeff;
    }
}

module.exports = Rectangle;
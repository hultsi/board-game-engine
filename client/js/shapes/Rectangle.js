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

    update() {
        this.zoom();
        const screenVel = getScreen().velocity()
        this.move(screenVel[0], screenVel[1]);
    }

    draw(ctx) {
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;

        ctx.beginPath();
        ctx.moveTo(this.x - this.width/2, this.y + this.height/2);
        
        ctx.lineTo(this.x + this.width/2, this.y + this.height/2);
        ctx.lineTo(this.x + this.width/2, this.y - this.height/2);
        ctx.lineTo(this.x - this.width/2, this.y - this.height/2);
        ctx.lineTo(this.x - this.width/2, this.y + this.height/2);
        
        ctx.stroke();
    }

    zoom() {
        const screen = getScreen();
        const scaleFactor = (1 + screen.dZoom);
        const halfWidth = screen.canvas.width / 2;
        const halfHeight = screen.canvas.height / 2;

        this.width *= scaleFactor;
        this.height *= scaleFactor;
        this.lineWidth *= scaleFactor;
        this.x = (this.x - halfWidth) * scaleFactor + halfWidth;
        this.y = (this.y - halfHeight) * scaleFactor + halfHeight;
    }
}

module.exports = Rectangle;
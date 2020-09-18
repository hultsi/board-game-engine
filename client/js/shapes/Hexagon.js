const { getScreen } = require("../GameControl.js");
const ConvexShape = require("./ConvexShape.js");

class Hexagon extends ConvexShape {
    constructor(x, y, radius, name, color = "#FFFFFF", lineWidth = 2, zIndex = 0) {
        super(name, color, lineWidth, zIndex);
        const screen = getScreen();
        this.x = x + screen.canvas.width/2;
        this.y = y + screen.canvas.height/2;
        this.radius = radius;
    }
    
    update() {
        this.zoom();
    }

    draw(ctx) {
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;
        
        ctx.beginPath();
        ctx.moveTo(this.x + this.radius * Math.cos(0), this.y + this.radius * Math.sin(0));
        for (let side = 0; side < 7; side++) {
            ctx.lineTo(this.x + this.radius * Math.cos(side * 2 * Math.PI / 6), 
                        this.y + this.radius * Math.sin(side * 2 * Math.PI / 6));
        }
        ctx.stroke();
    }

    zoom() {
        const screen = getScreen();
        const scaleFactor = (1 + screen.dZoom);
        const halfWidth = screen.canvas.width / 2;
        const halfHeight = screen.canvas.height / 2;
        this.radius *= scaleFactor;
        this.lineWidth *= scaleFactor;
        this.x = (this.x - halfWidth) * scaleFactor + halfWidth;
        this.y = (this.y - halfHeight) * scaleFactor + halfHeight;
    }
};

module.exports = Hexagon;
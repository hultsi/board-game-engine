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

    draw(ctx) {
        const screen = getScreen();
        const actualRadius = this.radius * screen.zoomScale;
        const actualLineWidth = this.lineWidth * screen.zoomScale;
        const xx = this.x * screen.zoomScale + screen.canvas.width/2;
        const yy = this.y * screen.zoomScale + screen.canvas.height/2;

        ctx.lineWidth = actualLineWidth;
        ctx.strokeStyle = this.color;
        
        ctx.beginPath();
        ctx.moveTo(xx + actualRadius * Math.cos(0), yy + actualRadius * Math.sin(0));
        for (let side = 0; side < 7; side++) {
            ctx.lineTo(xx + actualRadius * Math.cos(side * 2 * Math.PI / 6), 
                        yy + actualRadius * Math.sin(side * 2 * Math.PI / 6));
        }
        ctx.stroke();
    }
};

module.exports = Hexagon;
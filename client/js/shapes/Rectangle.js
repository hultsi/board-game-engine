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
        const actualWidth = this.width;// * screen.zoomScale;
        const actualHeight = this.height;// * screen.zoomScale;
        const actualLineWidth = this.lineWidth;// * screen.zoomScale;
        const xx = this.x;//*screen.zoomScale + screen.canvas.width / 2;
        const yy = this.y;//*screen.zoomScale + screen.canvas.height / 2;
        //this.position(xx,yy);

        ctx.lineWidth = actualLineWidth;
        ctx.strokeStyle = this.color;

        ctx.beginPath();
        ctx.moveTo(this.x - actualWidth/2, this.y + actualHeight/2);
        
        ctx.lineTo(this.x + actualWidth/2, this.y + actualHeight/2);
        ctx.lineTo(this.x + actualWidth/2, this.y - actualHeight/2);
        ctx.lineTo(this.x - actualWidth/2, this.y - actualHeight/2);
        ctx.lineTo(this.x - actualWidth/2, this.y + actualHeight/2);
        
        ctx.stroke();
    }

    zoom() {
        const screen = getScreen();
        this.width = this.width * (1 + screen.dZoom);
        this.height = this.height * (1 + screen.dZoom);
        this.lineWidth = this.lineWidth * (1 + screen.dZoom);
        this.x = (this.x - screen.canvas.width/2) * (1 + screen.dZoom) + screen.canvas.width/2;
        this.y = (this.y - screen.canvas.height/2) * (1 + screen.dZoom) + screen.canvas.height/2;
    }
}

module.exports = Rectangle;
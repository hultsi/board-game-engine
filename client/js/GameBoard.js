const { getScreen } = require("./GameControl.js");

class GameBoard {
    constructor(x, y, width, height, color = "#FFFFFF", lineWidth = 2) {
        const screen = getScreen();
        this.x = x + screen.canvas.width / 2;
        this.y = y + screen.canvas.height / 2;
        this.width = width;
        this.height = height;
        this.lineWidth = lineWidth;
        this.color = color;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
    }

    position(x, y) {
        this.x = x;
        this.y = y;
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
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
        ctx.moveTo(xx - actualWidth/2, yy + actualHeight/2);
        
        ctx.lineTo(xx + actualWidth/2, yy + actualHeight/2);
        ctx.lineTo(xx + actualWidth/2, yy - actualHeight/2);
        ctx.lineTo(xx - actualWidth/2, yy - actualHeight/2);
        ctx.lineTo(xx - actualWidth/2, yy + actualHeight/2);
        
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

module.exports = GameBoard;
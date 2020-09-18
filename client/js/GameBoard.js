const { getScreen } = require("./GameControl.js");

class GameBoard {
    constructor(x, y, width, height, name, color = "#FFFFFF", lineWidth = 2) {
        const screen = getScreen();
        this.x = x + screen.canvas.width / 2;
        this.y = y + screen.canvas.height / 2;
        this.width = width;
        this.height = height;
        this.name = name;
        this.lineWidth = lineWidth;
        this.color = color;
        this.linkedObjects = new Map();
    }

    linkObject(obj) {
        // Should then have relative x & y etc.
        this.linkedObjects.set(obj.name, obj);
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
    }

    position(x, y) {
        for (const [key, obj] of this.linkedObjects) {
            obj.x += this.x - x;
            obj.y += this.x - y;
        }
        this.x = x;
        this.y = y;
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
        for (const [key, obj] of this.linkedObjects) {
            obj.x += dx;
            obj.y += dy;
        }
    }

    moveScreen(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    update() {
        this.zoom();
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

module.exports = GameBoard;
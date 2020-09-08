class GameBoard {
    constructor(x, y, width, height, color = "#FFFFFF", lineWidth = 2) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.lineWidth = lineWidth;
        this.color = color;
        this.allObjects = [];
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    draw(ctx) {
        if (this.width > 0 && this.height > 0) {
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.lineWidth = this.lineWidthGameBoard;
            ctx.strokeStyle = this.color;
            ctx.stroke();
        }
    }

    createObject(obj) {
        this.allObjects = [
            ...this.allObjects.filter(el => el.zIndex <= obj.zIndex),
            obj,
            ...this.allObjects.filter(el => el.zIndex > obj.zIndex),
        ];
    }
}

module.exports = GameBoard;
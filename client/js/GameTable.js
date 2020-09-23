class GameTable {
    constructor(width, height, name, color = "#FFFFFF", lineWidth = 2) {
        this.x = 0;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.name = name;
        this.lineWidth = lineWidth;
        this.color = color;
        this.scale = 1;
    }

    moveScreen(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    draw(ctx) {
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.color;

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        
        ctx.lineTo(this.x + this.width, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.lineTo(this.x, this.y);
        
        ctx.stroke();
    }

    zoomScreen(dZoom) {
        const scaleCoeff = 1 + dZoom;
        // const halfWidth = screen.canvas.width / 2;
        // const halfHeight = screen.canvas.height / 2;
        // this.x = (this.x - halfWidth) * scaleCoeff + halfWidth;
        // this.y = (this.y - halfHeight) * scaleCoeff + halfHeight;
        this.x = (this.x) * scaleCoeff;
        this.y = (this.y) * scaleCoeff;
        this.width = this.width * scaleCoeff;
        this.height = this.height * scaleCoeff;
        this.lineWidth = this.lineWidth * scaleCoeff;
    }
};

module.exports = GameTable;
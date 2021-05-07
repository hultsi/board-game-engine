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

    draw(ctx, offsetX, offsetY, scale) {
        const xx = this.x * scale + offsetX;
        const yy = this.y * scale + offsetY;
        const width = this.width * scale;
        const height = this.height * scale;
        
        ctx.save();
        ctx.lineWidth = this.lineWidth * scale;
        ctx.strokeStyle = this.color;

        ctx.beginPath();
        ctx.moveTo(xx, yy);
        
        ctx.lineTo(xx + width, yy);
        ctx.lineTo(xx + width, yy + height);
        ctx.lineTo(xx, yy + height);
        ctx.lineTo(xx, yy);
        
        ctx.stroke();
        ctx.restore();
    }

    updateDrawingCoordinates(dZoom) {
        const scaleCoeff = 1 + dZoom;
        this.x = (this.x) * scaleCoeff;
        this.y = (this.y) * scaleCoeff;
        this.width = this.width * scaleCoeff;
        this.height = this.height * scaleCoeff;
        this.lineWidth = this.lineWidth * scaleCoeff;
    }
};

module.exports = GameTable;
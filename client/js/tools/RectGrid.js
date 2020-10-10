class RectGrid {
    constructor(position, width, height, xN, yN, name, lineWidth = 1, color = "#FFFFFF", txtFill = "#FFFFFF") {
        this.position = position;
        this.width = width;
        this.height = height;
        this.xN = xN;
        this.yN = yN;
        this.name = name;
        this.lineWidth = lineWidth;
        this.color = color;
        this.txtFill = txtFill;
    }

    getCoords(xi, yi) {
        const x = this.position.x + this.width * xi;
        const y = this.position.y + this.height * yi;
        return {x, y};
    }

    draw(ctx, offsetX, offsetY, scale) {
        const xx = (this.position.x + offsetX) * scale;
        const yy = (this.position.y + offsetY) * scale;
        const width = this.width * scale;
        const height = this.height * scale;

        ctx.save();
        
        ctx.lineWidth = this.lineWidth * scale;
        ctx.strokeStyle = this.color;
        ctx.setLineDash([10,5]);

        ctx.beginPath();
        // Create outer rectangle
        ctx.moveTo(xx, yy);
        ctx.lineTo(xx + width * this.xN, yy);
        ctx.lineTo(xx + width * this.xN, yy + height * this.yN);
        ctx.lineTo(xx, yy + height * this.yN);
        ctx.lineTo(xx, yy);

        // Create inner grid lines
        for (let n = 1; n < this.xN; ++n) {
            // verticals
            ctx.moveTo(xx + width*n, yy);
            ctx.lineTo(xx + width*n, yy + height * this.yN);
            // horizontals
            ctx.moveTo(xx, yy + height*n);
            ctx.lineTo(xx + width * this.xN, yy + height*n);
        }

        ctx.stroke();

        ctx.fillStyle = this.txtFill;
        ctx.font = `${300*scale} ${13*scale}px Arial`;
        let xText = 0;
        let yText = 0;
        while (yText < this.yN) {
            const txt = `(${xText}, ${yText})`;
            const txtWidth = ctx.measureText(txt).width;

            ctx.fillText(txt, xx + width*(xText + 1/2) - txtWidth/2, yy + height*(yText + 1/2)); 
            ++xText;
            if (xText == this.xN) {
                ++yText;
                xText = 0;
            }
        }

        ctx.restore();
    }
}

module.exports = RectGrid;
class HexGrid {
    constructor(position, radius, rows, columns, name, lineWidth = 1, color = "#FFFFFF", txtFill = "#FFFFFF") {
        this.position = position;
        this.radius = radius;
        this.columns = columns;
        this.rows = rows;
        this.name = name;
        this.lineWidth = lineWidth;
        this.color = color;
        this.txtFill = txtFill;
    }

    getCoords(xi, yi) {
        // xOffset
        const xOffset = 2 * (3/4) * this.radius * xi;
        // yOffset
        const evenOdd = ((xi % 2) * 2) - 1;
        const yAdd = (this.colums % 2 == 1 ? Math.sqrt(3) * this.radius : Math.sqrt(3) * this.radius / 2);
        const yOffset = (1 + evenOdd) * Math.sqrt(3) * this.radius / 4 + 2*yAdd*yi;

        const x = this.position.x + xOffset;
        const y = this.position.y + yOffset;
        return {x, y};
    }

    draw(ctx, offsetX, offsetY, scale) {
        let x = (this.position.x + offsetX) * scale;
        let y = (this.position.y + offsetY) * scale;
        const radius = this.radius * scale;

        ctx.save();
        
        ctx.lineWidth = this.lineWidth * scale;
        ctx.strokeStyle = this.color;
        ctx.setLineDash([10,5]);

        let xInd = 0;
        let yInd = 0;
        let evenOdd = 1;
        while (yInd < this.rows) {
            const xx = x + radius;
            const yy = y + radius;
            ctx.beginPath();
            ctx.moveTo(xx + radius * Math.cos(0), yy + radius * Math.sin(0));
            for (let side = 0; side < 7; side++) {
                ctx.lineTo(xx + radius * Math.cos(side * 2 * Math.PI / 6), 
                    yy + radius * Math.sin(side * 2 * Math.PI / 6));
            }
            ctx.stroke();

            x += 2 * (3/4) * radius;
            y += Math.sqrt(3) * radius / 2 * evenOdd; 
            evenOdd *= -1;
            ++xInd;
            if (xInd == this.columns) {
                (evenOdd == 1 ? y += Math.sqrt(3) * radius : y += Math.sqrt(3) * radius / 2);
                ++yInd;
                evenOdd = 1;
                x = (this.position.x + offsetX) * scale;
                xInd = 0;
            }
        }
        
        ctx.fillStyle = this.txtFill;
        ctx.font = `${300*scale} ${13*scale}px Arial`;
        let xText = 0;
        let yText = 0;
        x = (this.position.x + offsetX) * scale;
        y = (this.position.y + offsetY) * scale;
        evenOdd = 1;
        while (yText < this.rows) {
            const txt = `(${yText}, ${xText})`;
            const txtWidth = ctx.measureText(txt).width;

            ctx.fillText(txt, x + radius - txtWidth/2, y + radius);
            x += 2 * (3/4) * radius;
            y += Math.sqrt(3) * radius / 2 * evenOdd;  
            ++xText;
            evenOdd *= -1;
            if (xText == this.columns) {
                (evenOdd == 1 ? y += Math.sqrt(3) * radius : y += Math.sqrt(3) * radius / 2);
                x = (this.position.x + offsetX) * scale;
                evenOdd = 1;
                xText = 0;
                ++yText;
            }
        }
        
        ctx.restore();
    }
}

module.exports = HexGrid;
const drawGrid = function drawGrid(ctx, minX, minY, maxX, maxY, scale = 1, 
    minor = 20, stroke = "#00FF00")  {

    minX = minX || 0;
    minY = minY || 0;
    maxX = maxX || ctx.canvas.width;
    maxY = maxY || ctx.canvas.height;
    
    const coeff = 5;
    minor = Math.round(minor*scale*1000)/1000;
    major = minor * coeff;
    
    const { width, height } = ctx.canvas;
    const nMax = Math.ceil(width / minor) + 10;

    ctx.save();
    ctx.strokeStyle = stroke;
    let x = -(minX > 0 ? major - (minX*scale % major) : -(minX*scale % major));
    for (let n = 0; n < nMax; ++n) {
        ctx.beginPath();
        ctx.moveTo(Math.round(x), 0);
        ctx.lineTo(Math.round(x), height);
        ctx.lineWidth = (n % coeff == 0) ? 0.5 : 0.25;
        ctx.stroke();
        x += minor;
    }

    let y = -(minY > 0 ? major - (minY*scale % major) : -(minY*scale % major));
    for (let n = 0; n < nMax; ++n) {
        ctx.beginPath();
        ctx.moveTo(0, Math.round(y));
        ctx.lineTo(width, Math.round(y));
        ctx.lineWidth = (n % coeff == 0) ? 0.5 : 0.25;
        ctx.stroke();
        y += minor;
    }

    ctx.restore();
}

const drawHexGrid = function drawHexGrid(ctx, minX, minY, maxX, maxY, scale = 1, 
    minor = 20, stroke = "#00FF00", fill = "#009900")  {

    minX = minX || 0;
    minY = minY || 0;
    maxX = maxX || ctx.canvas.width;
    maxY = maxY || ctx.canvas.height;
    
    const radius = 50;
    const scaledRadius = 50 * scale;
    
    const { width, height } = ctx.canvas;
    const xMax = Math.ceil(width/(2*radius))+5;
    const yMax = Math.ceil(height/(Math.sqrt(3)*radius))+5;

    ctx.save();
    ctx.lineWidth = .25 * scale;
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    
    let x = -30;
    let y = -30;
    let xInd = 0;
    let yInd = 0;
    let evenOdd = 1;
    ctx.lineWidth = 1 * scale;
    while (yInd < yMax) {
        const xx = (x + radius) * scale;
        const yy = (y + radius) * scale;
        ctx.beginPath();
        ctx.moveTo(xx + scaledRadius * Math.cos(0), yy + scaledRadius * Math.sin(0));
        for (let side = 0; side < 7; side++) {
            ctx.lineTo(xx + scaledRadius * Math.cos(side * 2 * Math.PI / 6), 
                    yy + scaledRadius * Math.sin(side * 2 * Math.PI / 6));
        }
        ctx.stroke();
        x += 2 * (3/4) * radius;
        y += Math.sqrt(3) * radius / 2 * evenOdd;
        evenOdd *= -1;
        ++xInd;
        if (xInd == xMax) {
            evenOdd = 1;
            x = -30;
            xInd = 0;
            y += Math.sqrt(3) * radius / 2;
            ++yInd;
        }
    }

    ctx.restore();
}

const drawCoordinates = function drawCoordinates(ctx, minX, minY, spacing, scale = 1, fill = "#009900") {
    // This might be useless, maybe just round valueX and valueY in the beginning?
    const nearestMajor = function nearestMajor(value, baseMajor) {
        return Math.round((value)/baseMajor) * baseMajor;
    }

    const baseSpacing = spacing;
    spacing = spacing * scale;
    
    const nMax = Math.ceil(ctx.canvas.width / spacing) + 3;

    let x = -(minX > 0 ? spacing - (minX*scale % spacing) : -(minX*scale % spacing));
    let y = -(minY > 0 ? spacing - (minY*scale % spacing) : -(minY*scale % spacing));
    let valueX = x/scale - minX;
    let valueY = y/scale - minY;
    ctx.save();
    ctx.fillStyle = fill;
    ctx.font = "13px monospace";
    console.log(nMax);
    for (let n = 0; n < nMax; ++n) {
        ctx.fillText( nearestMajor(valueX,baseSpacing), x, 13); 
        ctx.fillText( nearestMajor(valueY,baseSpacing), 1, y + 10); 
        x += spacing;
        y += spacing;
        valueX += baseSpacing;
        valueY += baseSpacing;
    }
    ctx.restore();
}

module.exports = {
    drawGrid,
    drawHexGrid,
    drawCoordinates,
};
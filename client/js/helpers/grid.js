const drawGrid = function drawGrid(ctx, minX, minY, maxX, maxY, scale = 1, 
    minor = 20, stroke = "#00FF00", fill = "#009900")  {

    minX = minX || 0;
    minY = minY || 0;
    maxX = maxX || ctx.canvas.width;
    maxY = maxY || ctx.canvas.height;

    const baseMajor = minor * 5;
    minor = Math.round(minor*scale);
    major = minor * 5;

    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const nMax = Math.ceil(width / minor) + 10;
    
    const nearestMajor = function nearestMajor(value, scale, baseMajor) {
        return Math.round((value/scale + baseMajor)/baseMajor)*baseMajor - baseMajor;
    }

    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;

    const majorOffsetX = (minX > 0 ? major - (minX % major) : -(minX % major));
    let x = -Math.round(majorOffsetX); 
    let value = Math.round(- minX + x); 
    for (let n = 0; n < nMax; ++n) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.lineWidth = (value % major == 0) ? 0.5 : 0.25;
        ctx.stroke();
        !(value % major) && ctx.fillText( nearestMajor(value,scale,baseMajor), x, 10); 
        x += minor;
        value += minor;
    }

    const majorOffsetY = (minY > 0 ? major - (minY % major) : -(minY % major));
    let y = -Math.round(majorOffsetY); 
    value = Math.round(- minY + y); 
    for (let n = 0; n < nMax; ++n) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.lineWidth = (value % major == 0) ? 0.5 : 0.25;
        ctx.stroke();
        !(value % major) && ctx.fillText( nearestMajor(value,scale,baseMajor), 10, y + 10); 
        y += minor;
        value += minor;
    }

    ctx.restore();
}

module.exports = {
    drawGrid
};
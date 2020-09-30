const drawGrid = function drawGrid(ctx, minX, minY, maxX, maxY, scale = 1, 
    minor = 20, stroke = "#00FF00", fill = "#009900")  {

    minX = minX || 0;
    minY = minY || 0;
    maxX = maxX || ctx.canvas.width;
    maxY = maxY || ctx.canvas.height;
    
    const coeff = 5;
    const baseMinor = minor;
    const baseMajor = baseMinor * coeff;
    minor = Math.round(minor*scale*100000)/100000;
    major = minor * coeff;
    
    const { width, height } = ctx.canvas;
    const nMax = Math.ceil(width / minor) + 10;
    
    const nearestMajor = function nearestMajor(value, baseMajor) {
        return Math.round((value)/baseMajor) * baseMajor;
    }

    ctx.save();
    ctx.strokeStyle = stroke;
    ctx.fillStyle = fill;
    
    const majorOffsetX = (minX > 0 ? major - (minX*scale % major) : -(minX*scale % major));
    let x = -majorOffsetX; 
    let value = x/scale - minX;
    for (let n = 0; n < nMax; ++n) {
        ctx.beginPath();
        ctx.moveTo(Math.round(x), 0);
        ctx.lineTo(Math.round(x), height);
        ctx.lineWidth = (n % coeff == 0) ? 0.5 : 0.25;
        ctx.stroke();
        !(n % coeff) && ctx.fillText( nearestMajor(value,baseMajor), x, 10); 
        x += minor;
        value += baseMinor;
    }

    const majorOffsetY = (minY > 0 ? major - (minY*scale % major) : -(minY*scale % major));
    let y = -majorOffsetY; 
    value = (y/scale - minY); 
    for (let n = 0; n < nMax; ++n) {
        ctx.beginPath();
        ctx.moveTo(0, Math.round(y));
        ctx.lineTo(width, Math.round(y));
        ctx.lineWidth = (n % coeff == 0) ? 0.5 : 0.25;
        ctx.stroke();
        !(n % coeff) && ctx.fillText( nearestMajor(value,baseMajor), 10, y + 10); 
        y += minor;
        value += baseMinor;
    }

    ctx.restore();
}

module.exports = {
    drawGrid
};
const pointInRect = function pointInRect(px,py,rectX,rectY,rectWidth,rectHeight) {
    return (px > rectX && px < rectX + rectWidth &&
                py > rectY && py < rectY + rectHeight);
}

/**
 * Creates a line equation for each side of the hexagon
 * and checks in which half plane the hexagon center and mouse reside in.
 * If they have the same sign for each of the sides, the mouse is within
 * the hexagon. Can be easily generalized for all convex shapes.
 * @param {*px Point x coordinate} px 
 * @param {*py Point y coordinate} py 
 * @param {*hexX Hexagon x coordinate} hexX 
 * @param {*hexY Hexagon y coordinate} hexY 
 * @param {*hexRadius Hexagon radius} hexRadius 
 */
const pointInHex = function pointInHex(px, py, hexX, hexY, hexRadius) {
    const coeff = [Math.sqrt(3), -Math.sqrt(3), 0, Math.sqrt(3), -Math.sqrt(3), 0];
    
    for (let side = 0; side < 6; side++) {
        const x = hexX + hexRadius * Math.cos(side * 2 * Math.PI / 6) + hexRadius;
        const y = hexY + hexRadius * Math.sin(side * 2 * Math.PI / 6) + hexRadius;
        const mouseHalfPlane = coeff[side]*px - py + (y - coeff[side]*x);
        const hexCenterHalfPlane  = coeff[side]*(hexX+hexRadius) - (hexY+hexRadius) + (y - coeff[side]*x);
        
        if (Math.sign(mouseHalfPlane)  != Math.sign(hexCenterHalfPlane))
            return false;
    }
    
    return true;
}

module.exports = {
    pointInRect,
    pointInHex,
}
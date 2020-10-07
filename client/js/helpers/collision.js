const pointInRect = function pointInRect(px,py,rectX,rectY,rectWidth,rectHeight) {
    return (px > rectX && px < rectX + rectWidth &&
                py > rectY && py < rectY + rectHeight);
}

module.exports = {
    pointInRect,
}
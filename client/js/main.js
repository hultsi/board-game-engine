const gc = require("./gameControl.js");
const listeners = require("./listeners.js");
const Hexagon = require("./shapes/Hexagon.js");

listeners.enableKeyListeners(true);
listeners.enableMouseListeners(true);

gc.screen.createCanvas(window.innerWidth, window.innerHeight);
gc.screen.fitCanvasToBrowserView();
gc.screen.setBackgroundColor("#000000");
//gc.screen.enableDragging(true);
//gc.screen.enableKeyMovement(true);

gc.table.width = 1500;
gc.table.height = 1500;
gc.screen.boundaries.maxX = 1500;
gc.screen.boundaries.minY = -1500;

const hex1 = new Hexagon(100, 100, 60, "hex1", "#990011", 5);
gc.createObject(hex1);

const mainLoopId = window.setInterval(() => {
    gc.updateAllBegin();
    gc.updateAll();
    gc.updateAllEnd();
    gc.drawAll();
}, 34);


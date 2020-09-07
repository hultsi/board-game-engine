const gameControl = require("./gameControl.js");
const Hexagon = require("./shapes/Hexagon.js");
const GameBoard = require("./shapes/GameBoard.js");

gameControl.screen.createCanvas(window.innerWidth, window.innerHeight);
gameControl.screen.setBackgroundColor("#000000");

const hex1 = new Hexagon(100, 100, 50, "hex1");
hex1.radius = 123;
gameControl.createObject(hex1);

const hex2 = new Hexagon(200, 200, 70, "hex2");
hex2.setZIndex(1);
hex2.color = "#123FFF";
gameControl.createObject(hex2);

const hex3 = new Hexagon(-200, -200, 70, "hex3");
hex3.setZIndex(-1);
hex3.color = "#F23611";
gameControl.createObject(hex3);

gameControl.fitCanvasToBrowserView();
gameControl.board.resize(1600, 1600);
gameControl.screen.enableDragging(true);
gameControl.screen.enableKeyMovement(true);

const mainLoopId = window.setInterval(() => {
    gameControl.updateScreen();
    gameControl.drawScreen();
}, 34);

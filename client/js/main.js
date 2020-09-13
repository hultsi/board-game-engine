const gc = require("./GameControl.js");
const GameBoard = require("./GameBoard.js");
const Hexagon = require("./shapes/Hexagon.js");
const Rectangle = require("./shapes/Rectangle.js");
const GameScreen = require("./GameScreen.js");

const screen = new GameScreen("screen");
screen.createCanvas(window.innerWidth, window.innerHeight);
screen.setBackgroundColor("#000000");
screen.fitCanvasToBrowserView();
screen.enableDragging(true);
screen.enableKeyMovement(true);
//screen.setZoom(.5);
gc.createScreen(screen);

const board = new GameBoard(100, 100, 500, 500);
gc.createBoard(board,"board1");

const hex1 = new Hexagon(100, 100, 60, "hex1", "#990011", 5);
const hex2 = new Hexagon(200, 200, 110, "hex2", "#123FFF", 5);
const rect1 = new Rectangle(200, 300, 100, 100, "rect1", "#987F2F", 1);
gc.createObject(hex1, true);
gc.createObject(hex2, true);
gc.createObject(rect1, true);
gc.allObjects.get("hex2").setZIndex(2);

const mainLoopId = window.setInterval(() => {
    gc.updateAll();
    gc.drawAll();
}, 34);


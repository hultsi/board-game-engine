const gc = require("./GameControl.js");
const GameTable = require("./GameTable.js");
const GameBoard = require("./GameBoard.js");
const Hexagon = require("./shapes/Hexagon.js");
const Rectangle = require("./shapes/Rectangle.js");
const GameScreen = require("./GameScreen.js");

const screen = new GameScreen("screen");
screen.createCanvas(window.innerWidth, window.innerHeight);
screen.fitCanvasToBrowserView();
screen.setBackgroundColor("#000000");
screen.enableDragging(true);
screen.enableKeyMovement(true);
gc.createScreen(screen);

const board = new GameBoard(600, 200, 800, 500, "board1", "#FFFFFF", 1);
gc.createBoard(board);

const hex1 = new Hexagon(100, 100, 60, "hex1", "#990011", 5);
// const hex2 = new Hexagon(200, 200, 110, "hex2", "#123FFF", 5);
// const rect1 = new Rectangle(200, 300, 100, 100, "rect1", "#987F2F", 1);
gc.createObject(hex1);
// gc.createObject(hex2, true);
// gc.createObject(rect1, true);
gc.boards.get("board1").linkObject(hex1);

const mainLoopId = window.setInterval(() => {
    gc.updateAll();
    gc.updateEndAll();
    gc.drawAll();
}, 34);


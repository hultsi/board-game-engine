const GameControl = require("./GameControl.js");
const Hexagon = require("./shapes/Hexagon.js");
const GameBoard = require("./shapes/GameBoard.js");
const GameScreen = require("./GameScreen.js");

const gc = new GameControl();

const screen = new GameScreen("screen");
screen.createCanvas(window.innerWidth, window.innerHeight);
screen.setBackgroundColor("#000000");
screen.fitCanvasToBrowserView();
screen.enableDragging(true);
screen.enableKeyMovement(true);
gc.createScreen(screen);

const board = new GameBoard(0, 0, 1000, 1000);
gc.addBoard(board,"board1");

const hex1 = new Hexagon(100, 100, 50, "hex1");
hex1.radius = 123;
board.createObject(hex1);
const hex2 = new Hexagon(200, 200, 70, "hex2");
hex2.color = "#123FFF";
board.createObject(hex2);

const mainLoopId = window.setInterval(() => {
    gc.updateAll();
    gc.drawAll();
}, 34);


const gameControl = require("./core/gameControl.js");
const gameUpdate = require("./core/gameUpdate.js");
const listeners = require("./core/listeners.js");
const Hexagon = require("./shapes/Hexagon.js");
const Rectangle = require("./shapes/Rectangle.js");

// Define all program related images here
let imagePaths = [{
    name: "main_map", url: "../TM_map.jpeg"
}];

const startGame = function startGame() {
    // Set up the game here
    const { images } = gameUpdate.imageCollection;

    listeners.enableKeyListeners(true);
    listeners.enableMouseListeners(true);

    gameControl.screen.createCanvas(window.innerWidth, window.innerHeight);
    gameControl.screen.fitCanvasToBrowserView();
    gameControl.screen.setBackgroundColor("#000000");

    const hex1 = new Hexagon(100, 100, 60, "hex1", "#990011", 5);
    const rect1 = new Rectangle(200,200,1024,1024,"rect1","#FFFFFF",2);
    rect1.img = images["main_map"];

    gameControl.createObject(hex1);
    gameControl.createObject(rect1);

    // Then run the main loop
    const mainLoopId = window.setInterval(() => {
        gameUpdate.updateAllBegin();
        gameUpdate.updateAll();
        gameUpdate.updateAllEnd();
        gameUpdate.drawAll();
    }, 34);

    // And exit here
}
gameUpdate.initiateGame(imagePaths, startGame);

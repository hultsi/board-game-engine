const gameControl = require("./core/gameControl.js");
const gameLoop = require("./core/gameUpdate.js");
const listeners = require("./core/listeners.js");
const Hexagon = require("./shapes/Hexagon.js");
const Rectangle = require("./shapes/Rectangle.js");
const gameUpdate = require("./core/gameUpdate.js");

let mainLoopId;
const startGame = function startGame() {
    // Set up the game here
    listeners.enableKeyListeners(true);
    listeners.enableMouseListeners(true);

    gameControl.screen.createCanvas(window.innerWidth, window.innerHeight);
    gameControl.screen.fitCanvasToBrowserView();
    gameControl.screen.setBackgroundColor("#000000");

    const hex1 = new Hexagon(100, 100, 60, "hex1", "#990011", 5);
    const rect1 = new Rectangle(200,200,1024,1024,"rect1","#FFFFFF",2);
    rect1.img = gameUpdate.imageMap.images["main_map"];
    gameControl.createObject(hex1);
    gameControl.createObject(rect1);

    // Then run the main loop
    mainLoopId = window.setInterval(() => {
        gameLoop.updateAllBegin();
        gameLoop.updateAll();
        gameLoop.updateAllEnd();
        gameLoop.drawAll();
    }, 34);

    // And exit here
}
gameUpdate.loadImages(startGame);

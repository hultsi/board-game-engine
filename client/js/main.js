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

    //const hex1 = new Hexagon(0, 0, null, 50, "hex1", "#990011", 2);
    // const rect1 = new Rectangle(0, 0, null, 100, 100, "rect1", "#FFFFFF", 2);
    // const rect2 = new Rectangle(100, 100, null, 100, 100, "rect2", "#FFFFFF", 2);
    // const rect3 = new Rectangle(0, 100, null, 100, 100, "rect3", "#FFFFFF", 2);

    //gameControl.createObject(hex1);
    // gameControl.createObject(rect1);
    // gameControl.createObject(rect2);
    // gameControl.createObject(rect3);

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

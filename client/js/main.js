const gameControl = require("./core/gameControl.js");
const gameUpdate = require("./core/gameUpdate.js");
const listeners = require("./core/listeners.js");
const Hexagon = require("./shapes/Hexagon.js");
const Rectangle = require("./shapes/Rectangle.js");
const RectGrid = require("./tools/RectGrid.js");
const grid = require("./helpers/grid.js");

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

    gameControl.createGrid(new RectGrid({x: 100, y: 100}, 100, 100, 2, 2, "rect_grid_1", 2, "#FF00FF"));
    
    // const hex1 = new Hexagon(x:0, y:0}, null, 50, "hex1", "#990011", 2);
     const rect1 = new Rectangle(gameControl.grids.get("rect_grid_1").getCoords(2,1), null, 100, 100, "rect1", "#FFFFFF", 2);
    // const rect2 = new Rectangle(x:0, y:0}, null, 100, 100, "rect2", "#FFFFFF", 2);
    // const rect3 = new Rectangle(x:0, y:0}, null, 100, 100, "rect3", "#FFFFFF", 2);

    // gameControl.createObject(hex1);
     gameControl.createObject(rect1);
    // gameControl.createObject(rect2);
    // gameControl.createObject(rect3);

    // Then run the main loop
    const screen = gameControl.screen;
    const mainLoopId = window.setInterval(() => {
        gameUpdate.updateAllBegin();
        gameUpdate.updateAll();
        gameUpdate.updateAllEnd();
        
        gameUpdate.drawAll();
        grid.drawGrid(screen.ctx, -screen.x, -screen.y, screen.ctx.canvas.width, screen.ctx.canvas.height, screen.zoomScale);
        grid.drawCoordinates(screen.ctx, -screen.x, -screen.x, 100, screen.zoomScale);
    }, 34);

    // And exit here
}
gameUpdate.initiateGame(imagePaths, startGame);

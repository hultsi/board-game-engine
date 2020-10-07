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
    const { screen, grids } = gameControl.game;

    listeners.enableKeyListeners(true);
    listeners.enableMouseListeners(true);

    screen.createCanvas(window.innerWidth, window.innerHeight);
    screen.fitCanvasToBrowserView();
    screen.setBackgroundColor("#000000");
    screen.preventContextMenu();

    const grid1 = new RectGrid({x: 100, y: 100}, 100, 100, 2, 2, "rect_grid_1", 2, "#FF00FF");
    gameControl.createGrid(grid1);
    
    const rect1 = new Rectangle(grid1.getCoords(1,1), null, 100, 100, "rect1", "#FFFFFF", "#FFFFFF", 2);
    const rect2 = new Rectangle(grid1.getCoords(0,0), null, 100, 100, "rect2", "#FFFFFF", "#FFFFFF", 2);
    rect1.isStatic = false;

    gameControl.createObject(rect1);
    gameControl.createObject(rect2);

    // Then run the main loop
    const mainLoopId = window.setInterval(() => {
        gameUpdate.updateAllBegin();
        gameUpdate.updateAll();
        gameUpdate.updateAllEnd();
        
        // First draw screen
        screen.draw();
        // And then everything else
        grid.drawGrid(screen.ctx, -screen.x, -screen.y, screen.ctx.canvas.width, screen.ctx.canvas.height, screen.zoomScale,20,"rgba(0,255,0,.5)");
        grid.drawCoordinates(screen.ctx, -screen.x, -screen.y, 100, screen.zoomScale);
        gameUpdate.drawAll();
    }, 34);

    // And exit here
}
gameUpdate.initiateGame(imagePaths, startGame);

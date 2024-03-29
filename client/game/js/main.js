const gameControl = require("./core/gameControl.js");
const gameUpdate = require("./core/gameUpdate.js");
const listeners = require("./core/listeners.js");
const Hexagon = require("./shapes/Hexagon.js");
const Rectangle = require("./shapes/Rectangle.js");
const RectGrid = require("./tools/RectGrid.js");
const HexGrid = require("./tools/HexGrid.js");
const grid = require("./helpers/grid.js");

//TODO: define snapToGrid property for objects
//      which defines what grids the object should snap to!

// Define all program related images here
let imagePaths = [
	// { name: "main_map", url: "./assets/imgs/TM_map.jpeg"}
];

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

    const grid1 = new RectGrid({x: 100, y: 100}, 100, 100, 2, 2, "rect_grid_1", 1, "#FF00FF");
    const grid2 = new RectGrid({x: 100, y: -200}, 100, 100, 2, 2, "rect_grid_2", 1, "#FF00FF");
    const grid3 = new HexGrid({x: 300, y: 100}, 100, 3, 3, "hex_grid_1", 1, "#FF00FF");
    gameControl.createGrid(grid1);
    gameControl.createGrid(grid2);
    gameControl.createGrid(grid3);
    
    const hex1 = new Hexagon({ x: 100, y: 300 }, null, 100, "hex1", "#FFFFFF", "#FFFFFF");
    hex1.isStatic = false;
    hex1.snapGrids.push(grid3);
    gameControl.createObject(hex1);

    const rect1 = new Rectangle({ x: 100, y: 100 }, null, 100, 100, "rect1", "#FFFFFF", "#FFFFFF");
    rect1.isStatic = false;
    rect1.snapGrids.push(grid1);
    rect1.snapGrids.push(grid2);
    gameControl.createObject(rect1);

    // Then run the main loop
    const mainLoopId = window.setInterval(() => {
        gameUpdate.updateAllBegin();
        gameUpdate.updateAll();
        gameUpdate.updateAllEnd();
        
        // First draw screen
        screen.draw();
        // And then everything else
        grid.drawGrid(screen.ctx, -screen.x, -screen.y, screen.ctx.canvas.width, screen.ctx.canvas.height, screen.zoomScale, 20, "rgba(0,255,0,.5)");
        // grid.drawHexGrid(screen.ctx, -screen.x, -screen.y, screen.ctx.canvas.width, screen.ctx.canvas.height, screen.zoomScale, 50, "rgba(0,255,0,.5)");
        grid.drawCoordinates(screen.ctx, -screen.x, -screen.y, 200, screen.zoomScale);
        gameUpdate.drawAll();
    }, 34);

    // And exit here
}
gameUpdate.initiateGame(imagePaths, startGame);

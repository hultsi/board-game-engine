const listeners = require("./listeners.js");
const { 
    allObjects, table, screen, 
    moveScreen, zoomScreen 
} = require("./gameControl.js");

// Define all program related images here
let imagePaths = [{
    name: "main_map", url: "../TM_map.jpeg"
}];

const ImageCollection = function ImageCollection(){
    this.total = 0;
    this.images = {};
    this.load = function(list, callback) {
        let total = this.total;
        for(let i = 0; i < list.length; i++){
            let img = new Image();
            this.images[list[i].name] = img;
            img.onload = function(){
                total++;
                if(total == list.length){
                    callback && callback();
                }
            };
            img.src = list[i].url;
        }
    }

    this.get = function(name){
        return this.images[name] || (function(){throw "Not exist"})();
    };
}
// Once they are loaded up, they are here as an image map (with name == key)
let imageMap = new ImageCollection();

const loadImages = function loadImages(callback) {
    imageMap.load(imagePaths, callback);
}

const updateAllBegin = function updateAllBegin() {
    moveScreen();
    zoomScreen();
}

const updateAll = function updateAll() {
    for (const [name, obj] of allObjects) {
        obj.update();
    }
}

const updateAllEnd = function updateAllEnd() {
    screen.updateEnd();
    listeners.updateEnd();
}

const drawAll = function drawAll() {
    screen.draw();
    const offsetX = -screen.x;
    const offsetY = -screen.y;
    const scale = screen.zoomScale;

    table.draw(screen.ctx, offsetX, offsetY, scale);
    for (const [name, obj] of allObjects) {
        obj.draw(screen.ctx, offsetX, offsetY, scale);
    }
}

module.exports = {
    imageMap,
    loadImages,
    updateAllBegin,
    updateAll,
    updateAllEnd,
    drawAll,
}
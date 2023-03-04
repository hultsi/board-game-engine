const { addListener, removeListener } = require("../core/listeners.js");

class GameScreen {
    constructor(canvasId) {
        this.x = 0;
        this.y = 0;
        this.zoomScale = 1;
        this.boundaries = { minX: 0, maxY: 0, maxX: 32768, minY: -32768, minZoom: 0.5, maxZoom: 1.2 };
        this.viewWidth = 0;
        this.viewHeight = 0;
        this.canvasId = canvasId;
        this.canvas = null;
        this.ctx = null;
        this.bgColor = null;
        this.stop = false;

        this.gameScreenResizeListener = this.gameScreenResizeListener.bind(this);
    }

    createCanvas(width, height) {
        this.canvas = document.getElementById(this.canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.canvas.height = height;
        this.viewWidth = this.canvas.width * this.zoomScale;
        this.viewHeight = this.canvas.height * this.zoomScale;
    }

    resizeCanvas(width,height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    setBackgroundColor(bgColor) {
        this.bgColor = bgColor;
    }

    move(dx, dy) {
        this.x += dx;
        this.y += dy;
    }

    update() {
        
    }

    updateEnd() {
    }
    
    draw() {
        this.viewWidth = this.canvas.width / this.zoomScale;
        this.viewHeight = this.canvas.height / this.zoomScale;
        if (this.bgColor != null) {
            this.ctx.fillStyle = this.bgColor;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    fitCanvasToBrowserView(fit = true) {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        if (fit) {
            addListener(window, "resize", this.gameScreenResizeListener);
        } else {
            removeListener(window, "resize", this.gameScreenResizeListener);
        }
    }
    
    preventContextMenu(prevent = true) {
        if (prevent) {
            addListener(this.canvas, "contextmenu", this.preventDefaultListener);
        } else {
            removeListener(this.canvas, "contextmenu", this.preventDefaultListener);
        }
    }
    
    gameScreenResizeListener() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.draw();
    };

    preventDefaultListener(ev) {
        ev.preventDefault();
    }
};

module.exports = GameScreen;
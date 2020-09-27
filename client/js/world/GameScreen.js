class GameScreen {
    constructor(canvasId) {
        this.x = 0;
        this.y = 0;
        this.boundaries = { minX: 0, maxY: 0, maxX: 32768, minY: -32768, minZoom: 0.5, maxZoom: 1.2 };
        this.prevCoords = [0, 0];
        this.zoomScale = 1;
        this.canvasId = canvasId;
        this.canvas = null;
        this.ctx = null;
        this.bgColor = null;
    }

    createCanvas(width, height) {
        this.canvas = document.getElementById(this.canvasId);
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = width;
        this.canvas.height = height;
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
        this.prevCoords[0] = this.x;
        this.prevCoords[1] = this.y;
    }
    
    draw() {
        if (this.bgColor != null) {
            this.ctx.fillStyle = this.bgColor;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    fitCanvasToBrowserView() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        window.addEventListener("resize",() => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.draw();
        });
    }
};

module.exports = GameScreen;
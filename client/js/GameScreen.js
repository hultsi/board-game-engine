const { zoomObjects } = require("./GameControl.js");

class GameScreen {
    constructor(canvasId) {
        //TODO: change this random x & y
        this.x = 700;
        this.y = -200;
        this.prevCoords = [0, 0];
        this.canvasId = canvasId;
        this.canvas = null;
        this.ctx = null;
        this.bgColor = null;
        this.zoomScale = 1;
        this.keysDown = { left: false, up: false, right: false, down: false };
        this.keyDown = (ev) => {
            if (ev.key == "ArrowLeft") {
                this.keysDown.left = true;
            } else if (ev.key == "ArrowUp") {
                this.keysDown.up = true;
            } else if (ev.key == "ArrowRight") {
                this.keysDown.right = true;
            } else if (ev.key == "ArrowDown") {
                this.keysDown.down = true;
            }
        };
        this.keyUp = (ev) => {
            if (ev.key == "ArrowLeft") {
                this.keysDown.left = false;
            } else if (ev.key == "ArrowUp") {
                this.keysDown.up = false;
            } else if (ev.key == "ArrowRight") {
                this.keysDown.right = false;
            } else if (ev.key == "ArrowDown") {
                this.keysDown.down = false;
            }
        }
        this.mouseHandle = {
            mousedown: false,
            prevX: 0,
            prevY: 0 
        };
        this.mouseMoved = (ev) => {
            if (this.mouseHandle.mousedown)
                this.move(-(ev.offsetX - this.mouseHandle.prevX), ev.offsetY - this.mouseHandle.prevY);
            this.mouseHandle.prevX = ev.offsetX;
            this.mouseHandle.prevY = ev.offsetY;
        };
        this.mouseDown = (ev) => {
            this.mouseHandle.mousedown = true;
            this.mouseHandle.prevX = ev.offsetX;
            this.mouseHandle.prevY = ev.offsetY;
        };
        this.mouseUp = (ev) => {
            this.mouseHandle.mousedown = false;
        }
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
        let z1 = 0;
        z1 += 0.01 * this.keysDown.up;
        z1 -= 0.01 * this.keysDown.down;
        this.setZoom(this.zoomScale + z1);
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

    enableDragging(enable) {
        if (enable) {
            this.canvas.addEventListener("mousedown", this.mouseDown, false);
            this.canvas.addEventListener('mousemove', this.mouseMoved, false);
            this.canvas.addEventListener("mouseup", this.mouseUp, false);
        } else {
            this.canvas.removeEventListener("mousedown", this.mouseDown, false);
            this.canvas.removeEventListener('mousemove', this.mouseMoved, false);
            this.canvas.removeEventListener("mouseup", this.mouseUp, false);
        }
    }

    enableKeyMovement(enable) {
        if (enable) {
            window.addEventListener("keydown", this.keyDown, false);
            window.addEventListener("keyup", this.keyUp, false);
        } else {
            window.removeEventListener("keydown",this.keyDown, false);
            window.removeEventListener("keyup", this.keyUp, false);
        }
    }

    velocity() {
        const screenDx = ( this.prevCoords[0] - this.x );
        const screenDy = -( this.prevCoords[1] - this.y );
        
        this.prevCoords[0] = this.x;
        this.prevCoords[1] = this.y;

        return [screenDx, screenDy];
    }

    setZoom(amount) {
        this.zoomScale = amount;
        if (this.zoomScale < .2) {
            this.zoomScale = .2;
        }
    }
};

module.exports = GameScreen;
class GameScreen {
    constructor(canvasId) {
        this.x = 0;
        this.y = 0;
        this.canvasId = canvasId;
        this.canvas = null;
        this.ctx = null;
        this.bgColor = null;
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
};

module.exports = GameScreen;
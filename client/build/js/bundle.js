/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/GameControl.js":
/*!***************************!*\
  !*** ./js/GameControl.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GameScreen = __webpack_require__(/*! ./GameScreen */ \"./js/GameScreen.js\");\n\nclass GameControl {\n    constructor() {\n        this.boards = new Map();\n    }\n\n    createScreen(gameScreen) {\n        this.screen = gameScreen;\n    }\n\n    addBoard(gameBoard, id) {\n        this.boards.set(id, gameBoard);\n    }\n\n    updateAll() {\n        this.screen.update();\n        \n        // Move everything if screen has moved\n        const screenVel = this.screen.velocity()\n        if (screenVel[0] != 0 || screenVel[1] != 0) {\n            for (const [name, board] of this.boards) {\n                for (const obj of board.allObjects) {\n                    obj.move(screenVel[0], screenVel[1]);\n                }\n            }\n        }  \n    }\n\n    drawAll() {\n        this.screen.draw();\n        for (const [name, board] of this.boards) {\n            for (const obj of board.allObjects) {\n                obj.draw(this.screen.ctx);\n            }\n        }\n    }\n\n    // updateKeyMovement() {\n    //     const scr = this.screen;\n    //     let dx = 0;\n    //     let dy = 0;\n    //     dx -= 20*scr.keysDown.left;\n    //     dx += 20*scr.keysDown.right;\n    //     dy += 20*scr.keysDown.up;\n    //     dy -= 20*scr.keysDown.down;\n    //     screen.move(dx, dy);\n    // }\n}\n\nmodule.exports = GameControl;\n\n// const updateScreen = function updateScreen() {\n//     updateKeyMovement();\n//     screenVelocity();\n// }\n\n// const sortByZIndex = function sortByZIndex() {\n//     allObjects.sort((a,b) => a.zIndex - b.zIndex);\n// }\n\n\n//# sourceURL=webpack:///./js/GameControl.js?");

/***/ }),

/***/ "./js/GameScreen.js":
/*!**************************!*\
  !*** ./js/GameScreen.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameScreen {\n    constructor(canvasId) {\n        this.x = 0;\n        this.y = 0;\n        this.prevCoords = [0, 0];\n        this.canvasId = canvasId;\n        this.canvas = null;\n        this.ctx = null;\n        this.bgColor = null;\n        this.keysDown = { left: false, up: false, right: false, down: false };\n        this.keyDown = (ev) => {\n            if (ev.key == \"ArrowLeft\") {\n                this.keysDown.left = true;\n            } else if (ev.key == \"ArrowUp\") {\n                this.keysDown.up = true;\n            } else if (ev.key == \"ArrowRight\") {\n                this.keysDown.right = true;\n            } else if (ev.key == \"ArrowDown\") {\n                this.keysDown.down = true;\n            }\n        };\n        this.keyUp = (ev) => {\n            if (ev.key == \"ArrowLeft\") {\n                this.keysDown.left = false;\n            } else if (ev.key == \"ArrowUp\") {\n                this.keysDown.up = false;\n            } else if (ev.key == \"ArrowRight\") {\n                this.keysDown.right = false;\n            } else if (ev.key == \"ArrowDown\") {\n                this.keysDown.down = false;\n            }\n        }\n        this.mouseHandle = {\n            mousedown: false,\n            prevX: 0,\n            prevY: 0 \n        };\n        this.mouseMoved = (ev) => {\n            if (this.mouseHandle.mousedown)\n                this.move(-(ev.offsetX - this.mouseHandle.prevX), ev.offsetY - this.mouseHandle.prevY);\n            this.mouseHandle.prevX = ev.offsetX;\n            this.mouseHandle.prevY = ev.offsetY;\n        };\n        this.mouseDown = (ev) => {\n            this.mouseHandle.mousedown = true;\n            this.mouseHandle.prevX = ev.offsetX;\n            this.mouseHandle.prevY = ev.offsetY;\n        };\n        this.mouseUp = (ev) => {\n            this.mouseHandle.mousedown = false;\n        }\n    }\n\n    createCanvas(width, height) {\n        this.canvas = document.getElementById(this.canvasId);\n        this.ctx = this.canvas.getContext(\"2d\");\n        this.canvas.width = width;\n        this.canvas.height = height;\n    }\n\n    resizeCanvas(width,height) {\n        this.canvas.width = width;\n        this.canvas.height = height;\n    }\n\n    setBackgroundColor(bgColor) {\n        this.bgColor = bgColor;\n    }\n\n    move(dx, dy) {\n        this.x += dx;\n        this.y += dy;\n    }\n\n    update() {\n        let dx = 0;\n        let dy = 0;\n        dx -= 20*this.keysDown.left;\n        dx += 20*this.keysDown.right;\n        dy += 20*this.keysDown.up;\n        dy -= 20*this.keysDown.down;\n        this.move(dx, dy);\n    }\n\n    draw() {\n        if (this.bgColor != null) {\n            this.ctx.fillStyle = this.bgColor;\n            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n        }\n    }\n\n    fitCanvasToBrowserView() {\n        this.canvas.width = window.innerWidth;\n        this.canvas.height = window.innerHeight;\n        \n        window.addEventListener(\"resize\",() => {\n            this.canvas.width = window.innerWidth;\n            this.canvas.height = window.innerHeight;\n            this.draw();\n        });\n    }\n\n    enableDragging(enable) {\n        if (enable) {\n            this.canvas.addEventListener(\"mousedown\", this.mouseDown, false);\n            this.canvas.addEventListener('mousemove', this.mouseMoved, false);\n            this.canvas.addEventListener(\"mouseup\", this.mouseUp, false);\n        } else {\n            this.canvas.removeEventListener(\"mousedown\", this.mouseDown, false);\n            this.canvas.removeEventListener('mousemove', this.mouseMoved, false);\n            this.canvas.removeEventListener(\"mouseup\", this.mouseUp, false);\n        }\n    }\n\n    enableKeyMovement(enable) {\n        if (enable) {\n            window.addEventListener(\"keydown\", this.keyDown, false);\n            window.addEventListener(\"keyup\", this.keyUp, false);\n        } else {\n            window.removeEventListener(\"keydown\",this.keyDown, false);\n            window.removeEventListener(\"keyup\", this.keyUp, false);\n        }\n    }\n\n    velocity() {\n        const screenDx = ( this.prevCoords[0] - this.x );\n        const screenDy = -( this.prevCoords[1] - this.y );\n        \n        this.prevCoords[0] = this.x;\n        this.prevCoords[1] = this.y;\n\n        return [screenDx, screenDy];\n    }\n};\n\nmodule.exports = GameScreen;\n\n//# sourceURL=webpack:///./js/GameScreen.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GameControl = __webpack_require__(/*! ./GameControl.js */ \"./js/GameControl.js\");\nconst Hexagon = __webpack_require__(/*! ./shapes/Hexagon.js */ \"./js/shapes/Hexagon.js\");\nconst GameBoard = __webpack_require__(/*! ./shapes/GameBoard.js */ \"./js/shapes/GameBoard.js\");\nconst GameScreen = __webpack_require__(/*! ./GameScreen.js */ \"./js/GameScreen.js\");\n\nconst gc = new GameControl();\n\nconst screen = new GameScreen(\"screen\");\nscreen.createCanvas(window.innerWidth, window.innerHeight);\nscreen.setBackgroundColor(\"#000000\");\nscreen.fitCanvasToBrowserView();\nscreen.enableDragging(true);\nscreen.enableKeyMovement(true);\ngc.createScreen(screen);\n\nconst board = new GameBoard(0, 0, 1000, 1000);\ngc.addBoard(board,\"board1\");\n\nconst hex1 = new Hexagon(100, 100, 50, \"hex1\");\nhex1.radius = 123;\nboard.createObject(hex1);\nconst hex2 = new Hexagon(200, 200, 70, \"hex2\");\nhex2.color = \"#123FFF\";\nboard.createObject(hex2);\n\nconst mainLoopId = window.setInterval(() => {\n    gc.updateAll();\n    gc.drawAll();\n}, 34);\n\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/shapes/GameBoard.js":
/*!********************************!*\
  !*** ./js/shapes/GameBoard.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameBoard {\n    constructor(x, y, width, height, color = \"#FFFFFF\", lineWidth = 2) {\n        this.x = x;\n        this.y = y;\n        this.width = width;\n        this.height = height;\n        this.lineWidth = lineWidth;\n        this.color = color;\n        this.allObjects = [];\n    }\n\n    resize(width, height) {\n        this.width = width;\n        this.height = height;\n    }\n\n    move(dx, dy) {\n        this.x += dx;\n        this.y += dy;\n    }\n\n    draw(ctx) {\n        if (this.width > 0 && this.height > 0) {\n            ctx.beginPath();\n            ctx.rect(this.x, this.y, this.width, this.height);\n            ctx.lineWidth = this.lineWidthGameBoard;\n            ctx.strokeStyle = this.color;\n            ctx.stroke();\n        }\n    }\n\n    createObject(obj) {\n        this.allObjects = [\n            ...this.allObjects.filter(el => el.zIndex <= obj.zIndex),\n            obj,\n            ...this.allObjects.filter(el => el.zIndex > obj.zIndex),\n        ];\n    }\n}\n\nmodule.exports = GameBoard;\n\n//# sourceURL=webpack:///./js/shapes/GameBoard.js?");

/***/ }),

/***/ "./js/shapes/Hexagon.js":
/*!******************************!*\
  !*** ./js/shapes/Hexagon.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Hexagon {\n    constructor(x, y, radius, name, color = \"#FFFFFF\", lineWidth = 2, zIndex = 0) {\n        this.x = x;\n        this.y = y;\n        this.radius = radius;\n        this.lineWidth = lineWidth;\n        this.name = name;\n        this.color = color;\n        this.zIndex = zIndex;\n    }\n\n    move(dx, dy) {\n        this.x += dx;\n        this.y += dy;\n    }\n\n    draw(ctx) {\n        ctx.beginPath();\n        ctx.moveTo(this.x + this.radius * Math.cos(0), this.y + this.radius * Math.sin(0));\n    \n        for (let side = 0; side < 7; side++) {\n            ctx.lineTo(this.x + this.radius * Math.cos(side * 2 * Math.PI / 6), this.y + this.radius * Math.sin(side * 2 * Math.PI / 6));\n        }\n        \n        ctx.lineWidth = this.lineWidth;\n        ctx.strokeStyle = this.color;\n        ctx.stroke();\n    }\n\n    // setZIndex(val) {\n    //     this.zIndex = val;\n    //     gameControl.sortByZIndex();\n    // }\n}\n\nmodule.exports = Hexagon;\n\n//# sourceURL=webpack:///./js/shapes/Hexagon.js?");

/***/ }),

/***/ 0:
/*!**************************!*\
  !*** multi ./js/main.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./js/main.js */\"./js/main.js\");\n\n\n//# sourceURL=webpack:///multi_./js/main.js?");

/***/ })

/******/ });
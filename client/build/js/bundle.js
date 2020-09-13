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

/***/ "./js/GameBoard.js":
/*!*************************!*\
  !*** ./js/GameBoard.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { getScreen } = __webpack_require__(/*! ./GameControl.js */ \"./js/GameControl.js\");\n\nclass GameBoard {\n    constructor(x, y, width, height, color = \"#FFFFFF\", lineWidth = 2) {\n        const screen = getScreen();\n        this.x = x + screen.canvas.width / 2;\n        this.y = y + screen.canvas.height / 2;\n        this.width = width;\n        this.height = height;\n        this.lineWidth = lineWidth;\n        this.color = color;\n    }\n\n    resize(width, height) {\n        this.width = width;\n        this.height = height;\n    }\n\n    move(dx, dy) {\n        this.x += dx;\n        this.y += dy;\n    }\n\n    draw(ctx) {\n        const screen = getScreen();\n        const actualWidth = this.width * screen.zoomScale;\n        const actualHeight = this.height * screen.zoomScale;\n        const actualLineWidth = this.lineWidth * screen.zoomScale;\n        const xx = this.x*screen.zoomScale + screen.canvas.width / 2;\n        const yy = this.y*screen.zoomScale + screen.canvas.height / 2;\n\n        ctx.lineWidth = actualLineWidth;\n        ctx.strokeStyle = this.color;\n\n        ctx.beginPath();\n        ctx.moveTo(xx - actualWidth/2, yy + actualHeight/2);\n        \n        ctx.lineTo(xx + actualWidth/2, yy + actualHeight/2);\n        ctx.lineTo(xx + actualWidth/2, yy - actualHeight/2);\n        ctx.lineTo(xx - actualWidth/2, yy - actualHeight/2);\n        ctx.lineTo(xx - actualWidth/2, yy + actualHeight/2);\n        \n        ctx.stroke();\n    }\n}\n\nmodule.exports = GameBoard;\n\n//# sourceURL=webpack:///./js/GameBoard.js?");

/***/ }),

/***/ "./js/GameControl.js":
/*!***************************!*\
  !*** ./js/GameControl.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let allObjects = new Map();\nlet boards = new Map();\nlet screen = null;\n\nconst getScreen = function getScreen() {\n    return screen;\n}\n\nconst createObject = function createObject(obj) {\n    allObjects.set(obj.name, obj);\n}\n\nconst createScreen = function createScreen(gameScreen) {\n    screen = gameScreen;\n}\n\nconst createBoard = function createBoard(gameBoard, id) {\n    boards.set(id, gameBoard);\n}\n\nconst updateAll = function updateAll() {\n    screen.update();\n\n    // Move everything if screen has moved\n    const screenVel = screen.velocity()\n    if (screenVel[0] != 0 || screenVel[1] != 0) {\n        for (const [name, board] of boards) {\n            board.move(screenVel[0], screenVel[1]);\n        }\n        for (const [name, obj] of allObjects) {\n            obj.move(screenVel[0], screenVel[1]);\n        }\n    }  \n}\n\nconst drawAll = function drawAll() {\n    screen.draw();\n    for (const [name, board] of boards) {\n        board.draw(screen.ctx);\n    }\n    for (const [name, obj] of allObjects) {\n        obj.draw(screen.ctx);\n    }\n}\n\nconst sortObjectsByZIndex = function sortByZIndex() {\n    allObjects = new Map([...allObjects].sort((a,b) => a[1].zIndex - b[1].zIndex));\n}\n\nmodule.exports = {\n    allObjects,\n    boards,\n    getScreen,\n    createObject,\n    createScreen,\n    createBoard,\n    updateAll,\n    drawAll,\n    sortObjectsByZIndex,\n};\n\n\n//# sourceURL=webpack:///./js/GameControl.js?");

/***/ }),

/***/ "./js/GameScreen.js":
/*!**************************!*\
  !*** ./js/GameScreen.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { zoomObjects } = __webpack_require__(/*! ./GameControl.js */ \"./js/GameControl.js\");\n\nclass GameScreen {\n    constructor(canvasId) {\n        //TODO: change this random x & y\n        this.x = 700;\n        this.y = -200;\n        this.prevCoords = [0, 0];\n        this.canvasId = canvasId;\n        this.canvas = null;\n        this.ctx = null;\n        this.bgColor = null;\n        this.zoomScale = 1;\n        this.keysDown = { left: false, up: false, right: false, down: false };\n        this.keyDown = (ev) => {\n            if (ev.key == \"ArrowLeft\") {\n                this.keysDown.left = true;\n            } else if (ev.key == \"ArrowUp\") {\n                this.keysDown.up = true;\n            } else if (ev.key == \"ArrowRight\") {\n                this.keysDown.right = true;\n            } else if (ev.key == \"ArrowDown\") {\n                this.keysDown.down = true;\n            }\n        };\n        this.keyUp = (ev) => {\n            if (ev.key == \"ArrowLeft\") {\n                this.keysDown.left = false;\n            } else if (ev.key == \"ArrowUp\") {\n                this.keysDown.up = false;\n            } else if (ev.key == \"ArrowRight\") {\n                this.keysDown.right = false;\n            } else if (ev.key == \"ArrowDown\") {\n                this.keysDown.down = false;\n            }\n        }\n        this.mouseHandle = {\n            mousedown: false,\n            prevX: 0,\n            prevY: 0 \n        };\n        this.mouseMoved = (ev) => {\n            if (this.mouseHandle.mousedown)\n                this.move(-(ev.offsetX - this.mouseHandle.prevX), ev.offsetY - this.mouseHandle.prevY);\n            this.mouseHandle.prevX = ev.offsetX;\n            this.mouseHandle.prevY = ev.offsetY;\n        };\n        this.mouseDown = (ev) => {\n            this.mouseHandle.mousedown = true;\n            this.mouseHandle.prevX = ev.offsetX;\n            this.mouseHandle.prevY = ev.offsetY;\n        };\n        this.mouseUp = (ev) => {\n            this.mouseHandle.mousedown = false;\n        }\n    }\n\n    createCanvas(width, height) {\n        this.canvas = document.getElementById(this.canvasId);\n        this.ctx = this.canvas.getContext(\"2d\");\n        this.canvas.width = width;\n        this.canvas.height = height;\n    }\n\n    resizeCanvas(width,height) {\n        this.canvas.width = width;\n        this.canvas.height = height;\n    }\n\n    setBackgroundColor(bgColor) {\n        this.bgColor = bgColor;\n    }\n\n    move(dx, dy) {\n        this.x += dx;\n        this.y += dy;\n    }\n\n    update() {\n        let z1 = 0;\n        z1 += 0.01 * this.keysDown.up;\n        z1 -= 0.01 * this.keysDown.down;\n        this.setZoom(this.zoomScale + z1);\n    }\n\n    draw() {\n        if (this.bgColor != null) {\n            this.ctx.fillStyle = this.bgColor;\n            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n        }\n    }\n\n    fitCanvasToBrowserView() {\n        this.canvas.width = window.innerWidth;\n        this.canvas.height = window.innerHeight;\n        \n        window.addEventListener(\"resize\",() => {\n            this.canvas.width = window.innerWidth;\n            this.canvas.height = window.innerHeight;\n            this.draw();\n        });\n    }\n\n    enableDragging(enable) {\n        if (enable) {\n            this.canvas.addEventListener(\"mousedown\", this.mouseDown, false);\n            this.canvas.addEventListener('mousemove', this.mouseMoved, false);\n            this.canvas.addEventListener(\"mouseup\", this.mouseUp, false);\n        } else {\n            this.canvas.removeEventListener(\"mousedown\", this.mouseDown, false);\n            this.canvas.removeEventListener('mousemove', this.mouseMoved, false);\n            this.canvas.removeEventListener(\"mouseup\", this.mouseUp, false);\n        }\n    }\n\n    enableKeyMovement(enable) {\n        if (enable) {\n            window.addEventListener(\"keydown\", this.keyDown, false);\n            window.addEventListener(\"keyup\", this.keyUp, false);\n        } else {\n            window.removeEventListener(\"keydown\",this.keyDown, false);\n            window.removeEventListener(\"keyup\", this.keyUp, false);\n        }\n    }\n\n    velocity() {\n        const screenDx = ( this.prevCoords[0] - this.x );\n        const screenDy = -( this.prevCoords[1] - this.y );\n        \n        this.prevCoords[0] = this.x;\n        this.prevCoords[1] = this.y;\n\n        return [screenDx, screenDy];\n    }\n\n    setZoom(amount) {\n        this.zoomScale = amount;\n        if (this.zoomScale < .2) {\n            this.zoomScale = .2;\n        }\n    }\n};\n\nmodule.exports = GameScreen;\n\n//# sourceURL=webpack:///./js/GameScreen.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const gc = __webpack_require__(/*! ./GameControl.js */ \"./js/GameControl.js\");\nconst GameBoard = __webpack_require__(/*! ./GameBoard.js */ \"./js/GameBoard.js\");\nconst Hexagon = __webpack_require__(/*! ./shapes/Hexagon.js */ \"./js/shapes/Hexagon.js\");\nconst Rectangle = __webpack_require__(/*! ./shapes/Rectangle.js */ \"./js/shapes/Rectangle.js\");\nconst GameScreen = __webpack_require__(/*! ./GameScreen.js */ \"./js/GameScreen.js\");\n\nconst screen = new GameScreen(\"screen\");\nscreen.createCanvas(window.innerWidth, window.innerHeight);\nscreen.setBackgroundColor(\"#000000\");\nscreen.fitCanvasToBrowserView();\nscreen.enableDragging(true);\nscreen.enableKeyMovement(true);\n//screen.setZoom(.5);\ngc.createScreen(screen);\n\nconst board = new GameBoard(100, 100, 500, 500);\ngc.createBoard(board,\"board1\");\n\nconst hex1 = new Hexagon(100, 100, 60, \"hex1\", \"#990011\", 5);\nconst hex2 = new Hexagon(200, 200, 110, \"hex2\", \"#123FFF\", 5);\nconst rect1 = new Rectangle(200, 300, 100, 100, \"rect1\", \"#987F2F\", 1);\ngc.createObject(hex1, true);\ngc.createObject(hex2, true);\ngc.createObject(rect1, true);\ngc.allObjects.get(\"hex2\").setZIndex(2);\n\nconst mainLoopId = window.setInterval(() => {\n    gc.updateAll();\n    gc.drawAll();\n}, 34);\n\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/shapes/ConvexShape.js":
/*!**********************************!*\
  !*** ./js/shapes/ConvexShape.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { sortObjectsByZIndex } = __webpack_require__(/*! ../GameControl.js */ \"./js/GameControl.js\");\n\nclass ConvexShape {\n    constructor(name, color = \"#FFFFFF\", lineWidth = 2, zIndex = 0) {\n        this.lineWidth = lineWidth;\n        this.name = name;\n        this.color = color;\n        this.zIndex = zIndex;\n        this.zoomScale = 1;\n    }\n\n    move(dx, dy) {\n        this.x += dx;\n        this.y += dy;\n    }\n\n    setZIndex(val) {\n        this.zIndex = val;\n        sortObjectsByZIndex();\n    }\n\n    setZoomScale(amount) {\n        this.zoomScale = amount;\n    }\n};\n\nmodule.exports = ConvexShape;\n\n//# sourceURL=webpack:///./js/shapes/ConvexShape.js?");

/***/ }),

/***/ "./js/shapes/Hexagon.js":
/*!******************************!*\
  !*** ./js/shapes/Hexagon.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { getScreen } = __webpack_require__(/*! ../GameControl.js */ \"./js/GameControl.js\");\nconst ConvexShape = __webpack_require__(/*! ./ConvexShape.js */ \"./js/shapes/ConvexShape.js\");\n\nclass Hexagon extends ConvexShape {\n    constructor(x, y, radius, name, color = \"#FFFFFF\", lineWidth = 2, zIndex = 0) {\n        super(name, color, lineWidth, zIndex);\n        const screen = getScreen();\n        this.x = x + screen.canvas.width/2;\n        this.y = y + screen.canvas.height/2;\n        this.radius = radius;\n    }\n\n    draw(ctx) {\n        const screen = getScreen();\n        const actualRadius = this.radius * screen.zoomScale;\n        const actualLineWidth = this.lineWidth * screen.zoomScale;\n        const xx = this.x * screen.zoomScale + screen.canvas.width/2;\n        const yy = this.y * screen.zoomScale + screen.canvas.height/2;\n\n        ctx.lineWidth = actualLineWidth;\n        ctx.strokeStyle = this.color;\n        \n        ctx.beginPath();\n        ctx.moveTo(xx + actualRadius * Math.cos(0), yy + actualRadius * Math.sin(0));\n        for (let side = 0; side < 7; side++) {\n            ctx.lineTo(xx + actualRadius * Math.cos(side * 2 * Math.PI / 6), \n                        yy + actualRadius * Math.sin(side * 2 * Math.PI / 6));\n        }\n        ctx.stroke();\n    }\n};\n\nmodule.exports = Hexagon;\n\n//# sourceURL=webpack:///./js/shapes/Hexagon.js?");

/***/ }),

/***/ "./js/shapes/Rectangle.js":
/*!********************************!*\
  !*** ./js/shapes/Rectangle.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { getScreen } = __webpack_require__(/*! ../GameControl.js */ \"./js/GameControl.js\");\nconst ConvexShape = __webpack_require__(/*! ./ConvexShape.js */ \"./js/shapes/ConvexShape.js\");\n\nclass Rectangle extends ConvexShape {\n    constructor(x, y, width, height, name, color = \"#FFFFFF\", lineWidth = 2, zIndex = 0) {\n        super(name, color, lineWidth, zIndex);\n        const screen = getScreen();\n        this.x = x + screen.canvas.width / 2;\n        this.y = y + screen.canvas.height / 2;\n        this.width = width;\n        this.height = height;\n    }\n\n    draw(ctx) {\n        const screen = getScreen();\n        const actualWidth = this.width * screen.zoomScale;\n        const actualHeight = this.height * screen.zoomScale;\n        const actualLineWidth = this.lineWidth * screen.zoomScale;\n        const xx = this.x*screen.zoomScale + screen.canvas.width / 2;\n        const yy = this.y*screen.zoomScale + screen.canvas.height / 2;\n\n        ctx.lineWidth = actualLineWidth;\n        ctx.strokeStyle = this.color;\n\n        ctx.beginPath();\n        ctx.moveTo(xx - actualWidth/2, yy + actualHeight/2);\n        \n        ctx.lineTo(xx + actualWidth/2, yy + actualHeight/2);\n        ctx.lineTo(xx + actualWidth/2, yy - actualHeight/2);\n        ctx.lineTo(xx - actualWidth/2, yy - actualHeight/2);\n        ctx.lineTo(xx - actualWidth/2, yy + actualHeight/2);\n        \n        ctx.stroke();\n    }\n}\n\nmodule.exports = Rectangle;\n\n//# sourceURL=webpack:///./js/shapes/Rectangle.js?");

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
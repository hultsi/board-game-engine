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

/***/ "./js/GameScreen.js":
/*!**************************!*\
  !*** ./js/GameScreen.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameScreen {\n    constructor(canvasId) {\n        this.x = 0;\n        this.y = 0;\n        this.boundaries = { minX: 0, maxY: 0, maxX: 32768, minY: -32768, minZoom: 0.5, maxZoom: 1.2 };\n        this.prevCoords = [0, 0];\n        this.zoomScale = 1;\n        this.canvasId = canvasId;\n        this.canvas = null;\n        this.ctx = null;\n        this.bgColor = null;\n    }\n\n    createCanvas(width, height) {\n        this.canvas = document.getElementById(this.canvasId);\n        this.ctx = this.canvas.getContext(\"2d\");\n        this.canvas.width = width;\n        this.canvas.height = height;\n    }\n\n    resizeCanvas(width,height) {\n        this.canvas.width = width;\n        this.canvas.height = height;\n    }\n\n    setBackgroundColor(bgColor) {\n        this.bgColor = bgColor;\n    }\n\n    move(dx, dy) {\n        this.x += dx;\n        this.y += dy;\n    }\n\n    update() {\n        \n    }\n\n    updateEnd() {\n        this.prevCoords[0] = this.x;\n        this.prevCoords[1] = this.y;\n    }\n    \n    draw() {\n        if (this.bgColor != null) {\n            this.ctx.fillStyle = this.bgColor;\n            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n        }\n    }\n\n    fitCanvasToBrowserView() {\n        this.canvas.width = window.innerWidth;\n        this.canvas.height = window.innerHeight;\n        \n        window.addEventListener(\"resize\",() => {\n            this.canvas.width = window.innerWidth;\n            this.canvas.height = window.innerHeight;\n            this.draw();\n        });\n    }\n};\n\nmodule.exports = GameScreen;\n\n//# sourceURL=webpack:///./js/GameScreen.js?");

/***/ }),

/***/ "./js/GameTable.js":
/*!*************************!*\
  !*** ./js/GameTable.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameTable {\n    constructor(width, height, name, color = \"#FFFFFF\", lineWidth = 2) {\n        this.x = 0;\n        this.y = 0;\n        this.width = width;\n        this.height = height;\n        this.name = name;\n        this.lineWidth = lineWidth;\n        this.color = color;\n        this.scale = 1;\n    }\n\n    moveScreen(dx, dy) {\n        this.x += dx;\n        this.y += dy;\n    }\n\n    draw(ctx) {\n        ctx.lineWidth = this.lineWidth;\n        ctx.strokeStyle = this.color;\n\n        ctx.beginPath();\n        ctx.moveTo(this.x, this.y);\n        \n        ctx.lineTo(this.x + this.width, this.y);\n        ctx.lineTo(this.x + this.width, this.y + this.height);\n        ctx.lineTo(this.x, this.y + this.height);\n        ctx.lineTo(this.x, this.y);\n        \n        ctx.stroke();\n    }\n\n    zoomScreen(dZoom) {\n        const scaleCoeff = 1 + dZoom;\n        // const halfWidth = screen.canvas.width / 2;\n        // const halfHeight = screen.canvas.height / 2;\n        // this.x = (this.x - halfWidth) * scaleCoeff + halfWidth;\n        // this.y = (this.y - halfHeight) * scaleCoeff + halfHeight;\n        this.x = (this.x) * scaleCoeff;\n        this.y = (this.y) * scaleCoeff;\n        this.width = this.width * scaleCoeff;\n        this.height = this.height * scaleCoeff;\n        this.lineWidth = this.lineWidth * scaleCoeff;\n    }\n};\n\nmodule.exports = GameTable;\n\n//# sourceURL=webpack:///./js/GameTable.js?");

/***/ }),

/***/ "./js/gameControl.js":
/*!***************************!*\
  !*** ./js/gameControl.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GameScreen = __webpack_require__(/*! ./GameScreen.js */ \"./js/GameScreen.js\");\nconst GameTable = __webpack_require__(/*! ./GameTable.js */ \"./js/GameTable.js\");\nconst listeners = __webpack_require__(/*! ./listeners.js */ \"./js/listeners.js\");\n\nlet table = new GameTable(0, 0, \"table\");\nlet screen = new GameScreen(\"screen\");\nlet allObjects = new Map();\nlet boards = new Map();\n\n//Todo next: remove screen dependency from hexagon, rectangle and gameboard\n\nconst createObject = function createObject(obj) {\n    allObjects.set(obj.name, obj);\n}\n\nconst createBoard = function createBoard(gameBoard) {\n    boards.set(gameBoard.name, gameBoard);\n}\n\nconst moveScreen = function moveScreen() {\n    let { dx, dy } = listeners.mouse;\n\n    if (listeners.mouse.mousedown) {\n        if (screen.x - dx < 0)\n            dx = screen.x;\n        if (screen.y - dy < 0)\n            dy = screen.y;\n        screen.move(-dx, -dy);\n        table.moveScreen(dx, dy);\n        for (const [name, obj] of allObjects) {\n            obj.moveScreen(dx, dy);\n        }\n    }\n    listeners.mouse.dx = 0;\n    listeners.mouse.dy = 0;\n}\n\nconst zoomScreen = function zoomScreen() {\n    let dZoom = 0.03 * (listeners.keys.up - listeners.keys.down);\n\n    table.zoomScreen(dZoom);\n    for (const [name, obj] of allObjects) {\n        obj.zoomScreen(dZoom);\n    }\n}\n\nconst updateAllBegin = function updateAllBegin() {\n    // screen.width and screen.height to objects here\n    moveScreen();\n    zoomScreen();\n}\n\nconst updateAll = function updateAll() {\n    for (const [name, board] of boards) {\n        board.update();\n    }\n    for (const [name, obj] of allObjects) {\n        obj.update();\n    }\n}\n\nconst updateAllEnd = function updateAllEnd() {\n    screen.updateEnd();\n}\n\nconst drawAll = function drawAll() {\n    screen.draw();\n    table.draw(screen.ctx);\n\n    for (const [name, board] of boards) {\n        board.draw(screen.ctx);\n    }\n    for (const [name, obj] of allObjects) {\n        obj.draw(screen.ctx);\n    }\n}\n\nconst sortObjectsByZIndex = function sortByZIndex() {\n    allObjects = new Map([...allObjects].sort((a,b) => a[1].zIndex - b[1].zIndex));\n}\n\nmodule.exports = {\n    table,\n    screen,\n    allObjects,\n    boards,\n    createObject,\n    createBoard,\n    updateAllBegin,\n    updateAll,\n    updateAllEnd,\n    drawAll,\n    sortObjectsByZIndex,\n};\n\n\n//# sourceURL=webpack:///./js/gameControl.js?");

/***/ }),

/***/ "./js/listeners.js":
/*!*************************!*\
  !*** ./js/listeners.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const keys = {\n    up: false,\n    down: false,\n    left: false,\n    right: false,\n};\n\nconst mouse = {\n    mousedown: false,\n    left: false,\n    right: false,\n    x: 0,\n    y: 0,\n    dx: 0,\n    dy: 0,\n};\n\nconst keyDown = function keyDown(ev) {\n    if (ev.key == \"ArrowLeft\") {\n        keys.left = true;\n    } else if (ev.key == \"ArrowUp\") {\n        keys.up = true;\n    } else if (ev.key == \"ArrowRight\") {\n        keys.right = true;\n    } else if (ev.key == \"ArrowDown\") {\n        keys.down = true;\n    }\n}\n\nconst keyUp = function keyUp(ev) {\n    if (ev.key == \"ArrowLeft\") {\n        keys.left = false;\n    } else if (ev.key == \"ArrowUp\") {\n        keys.up = false;\n    } else if (ev.key == \"ArrowRight\") {\n        keys.right = false;\n    } else if (ev.key == \"ArrowDown\") {\n        keys.down = false;\n    }\n}\n\n//todo think about this\nconst mouseMoved = function mouseMoved(ev) {\n    mouse.x = ev.offsetX;\n    mouse.y = ev.offsetY;\n    mouse.dx = ev.movementX;\n    mouse.dy = ev.movementY;\n}\n\nconst mouseDown = function mouseDown (ev) {\n    mouse.mousedown = true;\n    mouse.x = ev.offsetX;\n    mouse.y = ev.offsetY;\n    mouse.prevX = ev.offsetX;\n    mouse.prevY = ev.offsetY;\n}\n\nconst mouseUp = function mouseUp(ev) {\n    mouse.mousedown = false;\n}\n\nconst enableKeyListeners = function enableKeyListeners(enable) {\n    if (enable) {\n        window.addEventListener(\"keydown\", keyDown, false);\n        window.addEventListener(\"keyup\", keyUp, false);\n    } else {\n        window.removeEventListener(\"keydown\",keyDown, false);\n        window.removeEventListener(\"keyup\", keyUp, false);\n    }\n}\n\nconst enableMouseListeners = function enableMouseListeners(enable) {\n    if (enable) {\n        window.addEventListener(\"mousedown\", mouseDown, false);\n        window.addEventListener('mousemove', mouseMoved, false);\n        window.addEventListener(\"mouseup\", mouseUp, false);\n    } else {\n        window.removeEventListener(\"mousedown\", mouseDown, false);\n        window.removeEventListener('mousemove', mouseMoved, false);\n        window.removeEventListener(\"mouseup\", mouseUp, false);\n    }\n}\n\nmodule.exports = {\n    keys,\n    mouse,\n    enableKeyListeners,\n    enableMouseListeners,\n};\n\n//# sourceURL=webpack:///./js/listeners.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const gc = __webpack_require__(/*! ./gameControl.js */ \"./js/gameControl.js\");\nconst listeners = __webpack_require__(/*! ./listeners.js */ \"./js/listeners.js\");\nconst Hexagon = __webpack_require__(/*! ./shapes/Hexagon.js */ \"./js/shapes/Hexagon.js\");\n\nlisteners.enableKeyListeners(true);\nlisteners.enableMouseListeners(true);\n\ngc.screen.createCanvas(window.innerWidth, window.innerHeight);\ngc.screen.fitCanvasToBrowserView();\ngc.screen.setBackgroundColor(\"#000000\");\n//gc.screen.enableDragging(true);\n//gc.screen.enableKeyMovement(true);\n\ngc.table.width = 1500;\ngc.table.height = 1500;\ngc.screen.boundaries.maxX = 1500;\ngc.screen.boundaries.minY = -1500;\n\nconst hex1 = new Hexagon(100, 100, 60, \"hex1\", \"#990011\", 5);\ngc.createObject(hex1);\n\nconst mainLoopId = window.setInterval(() => {\n    gc.updateAllBegin();\n    gc.updateAll();\n    gc.updateAllEnd();\n    gc.drawAll();\n}, 34);\n\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/shapes/ConvexShape.js":
/*!**********************************!*\
  !*** ./js/shapes/ConvexShape.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { sortObjectsByZIndex } = __webpack_require__(/*! ../gameControl.js */ \"./js/gameControl.js\");\n\nclass ConvexShape {\n    constructor(name, color = \"#FFFFFF\", lineWidth = 2, zIndex = 0) {\n        this.lineWidth = lineWidth;\n        this.name = name;\n        this.color = color;\n        this.zIndex = zIndex;\n        this.zoomScale = 1;\n    }\n\n    position(x, y) {\n        this.x = x;\n        this.y = y;\n    }\n\n    move(dx, dy) {\n        this.x += dx;\n        this.y += dy;\n    }\n\n    moveScreen(dx, dy) {\n        this.x += dx;\n        this.y += dy;\n    }\n\n    setZIndex(val) {\n        this.zIndex = val;\n        sortObjectsByZIndex();\n    }\n};\n\nmodule.exports = ConvexShape;\n\n//# sourceURL=webpack:///./js/shapes/ConvexShape.js?");

/***/ }),

/***/ "./js/shapes/Hexagon.js":
/*!******************************!*\
  !*** ./js/shapes/Hexagon.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { screen } = __webpack_require__(/*! ../gameControl.js */ \"./js/gameControl.js\");\nconst ConvexShape = __webpack_require__(/*! ./ConvexShape.js */ \"./js/shapes/ConvexShape.js\");\n\nclass Hexagon extends ConvexShape {\n    constructor(x, y, radius, name, color = \"#FFFFFF\", lineWidth = 2, zIndex = 0) {\n        super(name, color, lineWidth, zIndex);\n        this.x = x;// + screen.canvas.width/2;\n        this.y = y;// + screen.canvas.height/2;\n        this.radius = radius;\n        this.scale = 1;\n    }\n    \n    update() {\n    }\n\n    draw(ctx) {\n        ctx.lineWidth = this.lineWidth;\n        ctx.strokeStyle = this.color;\n        \n        ctx.beginPath();\n        ctx.moveTo(this.x + this.radius * Math.cos(0), this.y + this.radius * Math.sin(0));\n        for (let side = 0; side < 7; side++) {\n            ctx.lineTo(this.x + this.radius * Math.cos(side * 2 * Math.PI / 6), \n                        this.y + this.radius * Math.sin(side * 2 * Math.PI / 6));\n        }\n        ctx.stroke();\n    }\n\n    zoomScreen(dZoom) {\n        const scaleCoeff = 1 + dZoom;\n        const halfWidth = screen.canvas.width / 2;\n        const halfHeight = screen.canvas.height / 2;\n        // this.x = (this.x - halfWidth) * scaleCoeff + halfWidth;\n        // this.y = (this.y - halfHeight) * scaleCoeff + halfHeight;\n        this.x = (this.x) * scaleCoeff;\n        this.y = (this.y) * scaleCoeff;\n        this.radius = this.radius * scaleCoeff;\n        this.lineWidth = this.lineWidth * scaleCoeff;\n    }\n};\n\nmodule.exports = Hexagon;\n\n//# sourceURL=webpack:///./js/shapes/Hexagon.js?");

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
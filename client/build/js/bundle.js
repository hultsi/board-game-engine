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

/***/ "./js/core/gameControl.js":
/*!********************************!*\
  !*** ./js/core/gameControl.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GameScreen = __webpack_require__(/*! ../world/GameScreen.js */ \"./js/world/GameScreen.js\");\nconst GameTable = __webpack_require__(/*! ../world/GameTable.js */ \"./js/world/GameTable.js\");\nconst listeners = __webpack_require__(/*! ./listeners.js */ \"./js/core/listeners.js\");\n\nlet table = new GameTable(0, 0, \"table\");\nlet screen = new GameScreen(\"screen\");\nlet allObjects = new Map();\n\nconst createObject = function createObject(obj) {\n    allObjects.set(obj.name, obj);\n}\n\nconst createBoard = function createBoard(gameBoard) {\n    boards.set(gameBoard.name, gameBoard);\n}\n\nconst moveScreen = function moveScreen() {\n    let { dx, dy } = listeners.mouse;\n    if (listeners.mouse.mousedown) {\n        screen.move(-1*dx / screen.zoomScale, -1*dy / screen.zoomScale);\n    }\n}\n\nconst zoomScreen = function zoomScreen() {\n    let dZoom = 0.075 * Math.sign(listeners.mouse.dWheel);\n    if (dZoom != 0) {\n        if (screen.zoomScale + dZoom < .2) {\n            dZoom = .2 - screen.zoomScale;    \n        } else if (screen.zoomScale  + dZoom > 1.75) {\n            dZoom = 1.75 - screen.zoomScale;\n        }\n        screen.zoomScale += dZoom;\n\n        const dx = -(screen.canvas.width / screen.zoomScale - screen.viewWidth)/2;\n        const dy = -(screen.canvas.height / screen.zoomScale - screen.viewHeight)/2;\n        screen.move(dx, dy);\n    }\n}\n\nconst sortObjectsByZIndex = function sortByZIndex() {\n    allObjects = new Map([...allObjects].sort((a,b) => a[1].zIndex - b[1].zIndex));\n}\n\nmodule.exports = {\n    table,\n    screen,\n    allObjects,\n    moveScreen,\n    zoomScreen,\n    createObject,\n    createBoard,\n    sortObjectsByZIndex,\n};\n\n\n//# sourceURL=webpack:///./js/core/gameControl.js?");

/***/ }),

/***/ "./js/core/gameUpdate.js":
/*!*******************************!*\
  !*** ./js/core/gameUpdate.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ImageCollection = __webpack_require__(/*! ../helpers/ImageCollection.js */ \"./js/helpers/ImageCollection.js\");\nconst listeners = __webpack_require__(/*! ./listeners.js */ \"./js/core/listeners.js\");\nconst { \n    allObjects, table, screen, \n    moveScreen, zoomScreen \n} = __webpack_require__(/*! ./gameControl.js */ \"./js/core/gameControl.js\");\nconst grid = __webpack_require__(/*! ../helpers/grid.js */ \"./js/helpers/grid.js\");\n\n// Once images are loaded up, they are here as an image map \n// imageCollection.images[key]\nlet imageCollection = new ImageCollection();\n\nconst initiateGame = function initiateGame(imagePaths, callback) {\n    imageCollection.load(imagePaths, callback);\n}\n\nconst updateAllBegin = function updateAllBegin() {\n    moveScreen();\n    zoomScreen();\n}\n\nconst updateAll = function updateAll() {\n    for (const [name, obj] of allObjects) {\n        obj.update();\n    }\n}\n\nconst updateAllEnd = function updateAllEnd() {\n    listeners.updateEnd();\n}\n\nconst drawAll = function drawAll() {\n    screen.draw();\n    const offsetX = -screen.x;\n    const offsetY = -screen.y;\n    const scale = screen.zoomScale;\n\n    //grid.drawGrid(screen.ctx, offsetX, offsetY, screen.ctx.canvas.width, screen.ctx.canvas.height, scale);\n    grid.drawHexGrid(screen.ctx, offsetX, offsetY, screen.ctx.canvas.width, screen.ctx.canvas.height, scale);\n    grid.drawCoordinates(screen.ctx, offsetX, offsetY, 100);\n\n    table.draw(screen.ctx, offsetX, offsetY, scale);\n    for (const [name, obj] of allObjects) {\n        obj.draw(screen.ctx, offsetX, offsetY, scale);\n    }\n}\n\nmodule.exports = {\n    imageCollection,\n    initiateGame,\n    updateAllBegin,\n    updateAll,\n    updateAllEnd,\n    drawAll,\n}\n\n//# sourceURL=webpack:///./js/core/gameUpdate.js?");

/***/ }),

/***/ "./js/core/listeners.js":
/*!******************************!*\
  !*** ./js/core/listeners.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const keys = {\n    up: false,\n    down: false,\n    left: false,\n    right: false,\n};\n\nconst mouse = {\n    mousedown: false,\n    left: false,\n    right: false,\n    x: 0,\n    y: 0,\n    dx: 0,\n    dy: 0,\n    dWheel: 0,\n};\n\nconst updateEnd = function updateEnd() {\n    mouse.dx = 0;\n    mouse.dy = 0;\n    mouse.dWheel = 0;\n}\n\nconst keyDown = function keyDown(ev) {\n    if (ev.key == \"ArrowLeft\") {\n        keys.left = true;\n    } else if (ev.key == \"ArrowUp\") {\n        keys.up = true;\n    } else if (ev.key == \"ArrowRight\") {\n        keys.right = true;\n    } else if (ev.key == \"ArrowDown\") {\n        keys.down = true;\n    }\n}\n\nconst keyUp = function keyUp(ev) {\n    if (ev.key == \"ArrowLeft\") {\n        keys.left = false;\n    } else if (ev.key == \"ArrowUp\") {\n        keys.up = false;\n    } else if (ev.key == \"ArrowRight\") {\n        keys.right = false;\n    } else if (ev.key == \"ArrowDown\") {\n        keys.down = false;\n    }\n}\n\n//todo think about this\nconst mouseMoved = function mouseMoved(ev) {\n    mouse.x = ev.offsetX;\n    mouse.y = ev.offsetY;\n    mouse.dx = ev.movementX;\n    mouse.dy = ev.movementY;\n}\n\nconst mouseDown = function mouseDown (ev) {\n    mouse.mousedown = true;\n    mouse.x = ev.offsetX;\n    mouse.y = ev.offsetY;\n    mouse.prevX = ev.offsetX;\n    mouse.prevY = ev.offsetY;\n}\n\nconst mouseUp = function mouseUp(ev) {\n    mouse.mousedown = false;\n}\n\nconst mouseWheel = function mouseWheel(ev) {\n    mouse.dWheel = -ev.deltaY;\n}\n\nconst enableKeyListeners = function enableKeyListeners(enable) {\n    if (enable) {\n        window.addEventListener(\"keydown\", keyDown, false);\n        window.addEventListener(\"keyup\", keyUp, false);\n    } else {\n        window.removeEventListener(\"keydown\",keyDown, false);\n        window.removeEventListener(\"keyup\", keyUp, false);\n    }\n}\n\nconst enableMouseListeners = function enableMouseListeners(enable) {\n    if (enable) {\n        window.addEventListener(\"mousedown\", mouseDown, false);\n        window.addEventListener('mousemove', mouseMoved, false);\n        window.addEventListener(\"mouseup\", mouseUp, false);\n        window.addEventListener(\"wheel\", mouseWheel, false);\n    } else {\n        window.removeEventListener(\"mousedown\", mouseDown, false);\n        window.removeEventListener('mousemove', mouseMoved, false);\n        window.removeEventListener(\"mouseup\", mouseUp, false);\n        window.removeEventListener(\"wheel\", mouseWheel, false);\n    }\n}\n\nmodule.exports = {\n    keys,\n    mouse,\n    enableKeyListeners,\n    enableMouseListeners,\n    updateEnd,\n};\n\n//# sourceURL=webpack:///./js/core/listeners.js?");

/***/ }),

/***/ "./js/helpers/ImageCollection.js":
/*!***************************************!*\
  !*** ./js/helpers/ImageCollection.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class ImageCollection {\n    constructor() {\n        this.total = 0;\n        this.images = {};\n    }\n\n    load(list, callback) {\n        let total = this.total;\n\n        for(let i = 0; i < list.length; i++){\n            let img = new Image();\n            this.images[list[i].name] = img;\n            img.addEventListener(\"load\", () => {\n                total++;\n                if(total == list.length){\n                    callback && callback();\n                }\n            });\n            img.src = list[i].url;\n        }\n    }\n\n    get(name){\n        return this.images[name] || (function(){throw \"Not exist\"})();\n    };\n}\n\nmodule.exports = ImageCollection;\n\n//# sourceURL=webpack:///./js/helpers/ImageCollection.js?");

/***/ }),

/***/ "./js/helpers/grid.js":
/*!****************************!*\
  !*** ./js/helpers/grid.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const drawGrid = function drawGrid(ctx, minX, minY, maxX, maxY, scale = 1, \n    minor = 20, stroke = \"#00FF00\")  {\n\n    minX = minX || 0;\n    minY = minY || 0;\n    maxX = maxX || ctx.canvas.width;\n    maxY = maxY || ctx.canvas.height;\n    \n    const coeff = 5;\n    minor = Math.round(minor*scale*1000)/1000;\n    major = minor * coeff;\n    \n    const { width, height } = ctx.canvas;\n    const nMax = Math.ceil(width / minor) + 10;\n\n    ctx.save();\n    ctx.strokeStyle = stroke;\n    let x = -(minX > 0 ? major - (minX*scale % major) : -(minX*scale % major));\n    for (let n = 0; n < nMax; ++n) {\n        ctx.beginPath();\n        ctx.moveTo(Math.round(x), 0);\n        ctx.lineTo(Math.round(x), height);\n        ctx.lineWidth = (n % coeff == 0) ? 0.5 : 0.25;\n        ctx.stroke();\n        x += minor;\n    }\n\n    let y = -(minY > 0 ? major - (minY*scale % major) : -(minY*scale % major));\n    for (let n = 0; n < nMax; ++n) {\n        ctx.beginPath();\n        ctx.moveTo(0, Math.round(y));\n        ctx.lineTo(width, Math.round(y));\n        ctx.lineWidth = (n % coeff == 0) ? 0.5 : 0.25;\n        ctx.stroke();\n        y += minor;\n    }\n\n    ctx.restore();\n}\n\nconst drawHexGrid = function drawHexGrid(ctx, minX, minY, maxX, maxY, scale = 1, \n    minor = 20, stroke = \"#00FF00\", fill = \"#009900\")  {\n\n    minX = minX || 0;\n    minY = minY || 0;\n    maxX = maxX || ctx.canvas.width;\n    maxY = maxY || ctx.canvas.height;\n    \n    const radius = 50;\n    const scaledRadius = 50 * scale;\n    \n    const { width, height } = ctx.canvas;\n    const xMax = Math.ceil(width/(2*radius))+5;\n    const yMax = Math.ceil(height/(Math.sqrt(3)*radius))+5;\n\n    ctx.save();\n    ctx.lineWidth = .25 * scale;\n    ctx.strokeStyle = stroke;\n    ctx.fillStyle = fill;\n    \n    let x = -30;\n    let y = -30;\n    let xInd = 0;\n    let yInd = 0;\n    let evenOdd = 1;\n    ctx.lineWidth = 1 * scale;\n    while (yInd < yMax) {\n        const xx = (x + radius) * scale;\n        const yy = (y + radius) * scale;\n        ctx.beginPath();\n        ctx.moveTo(xx + scaledRadius * Math.cos(0), yy + scaledRadius * Math.sin(0));\n        for (let side = 0; side < 7; side++) {\n            ctx.lineTo(xx + scaledRadius * Math.cos(side * 2 * Math.PI / 6), \n                    yy + scaledRadius * Math.sin(side * 2 * Math.PI / 6));\n        }\n        ctx.stroke();\n        x += 2 * (3/4) * radius;\n        y += Math.sqrt(3) * radius / 2 * evenOdd;\n        evenOdd *= -1;\n        ++xInd;\n        if (xInd == xMax) {\n            evenOdd = 1;\n            x = -30;\n            xInd = 0;\n            y += Math.sqrt(3) * radius / 2;\n            ++yInd;\n        }\n    }\n\n    ctx.restore();\n}\n\nconst drawCoordinates = function drawCoordinates(ctx, minX, minY, spacing, scale = 1, fill = \"#009900\") {\n    // This might be useless, maybe just round valueX and valueY in the beginning?\n    const nearestMajor = function nearestMajor(value, baseMajor) {\n        return Math.round((value)/baseMajor) * baseMajor;\n    }\n\n    const baseSpacing = spacing;\n    spacing = spacing * scale;\n    \n    const nMax = Math.ceil(ctx.canvas.width / spacing) + 3;\n\n    let x = -(minX > 0 ? spacing - (minX*scale % spacing) : -(minX*scale % spacing));\n    let y = -(minY > 0 ? spacing - (minY*scale % spacing) : -(minY*scale % spacing));\n    let valueX = x/scale - minX;\n    let valueY = y/scale - minY;\n    ctx.save();\n    ctx.fillStyle = fill;\n    ctx.font = \"13px monospace\";\n    console.log(nMax);\n    for (let n = 0; n < nMax; ++n) {\n        ctx.fillText( nearestMajor(valueX,baseSpacing), x, 13); \n        ctx.fillText( nearestMajor(valueY,baseSpacing), 1, y + 10); \n        x += spacing;\n        y += spacing;\n        valueX += baseSpacing;\n        valueY += baseSpacing;\n    }\n    ctx.restore();\n}\n\nmodule.exports = {\n    drawGrid,\n    drawHexGrid,\n    drawCoordinates,\n};\n\n//# sourceURL=webpack:///./js/helpers/grid.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const gameControl = __webpack_require__(/*! ./core/gameControl.js */ \"./js/core/gameControl.js\");\nconst gameUpdate = __webpack_require__(/*! ./core/gameUpdate.js */ \"./js/core/gameUpdate.js\");\nconst listeners = __webpack_require__(/*! ./core/listeners.js */ \"./js/core/listeners.js\");\nconst Hexagon = __webpack_require__(/*! ./shapes/Hexagon.js */ \"./js/shapes/Hexagon.js\");\nconst Rectangle = __webpack_require__(/*! ./shapes/Rectangle.js */ \"./js/shapes/Rectangle.js\");\n\n// Define all program related images here\nlet imagePaths = [{\n    name: \"main_map\", url: \"../TM_map.jpeg\"\n}];\n\nconst startGame = function startGame() {\n    // Set up the game here\n    const { images } = gameUpdate.imageCollection;\n\n    listeners.enableKeyListeners(true);\n    listeners.enableMouseListeners(true);\n\n    gameControl.screen.createCanvas(window.innerWidth, window.innerHeight);\n    gameControl.screen.fitCanvasToBrowserView();\n    gameControl.screen.setBackgroundColor(\"#000000\");\n\n    //const hex1 = new Hexagon(0, 0, null, 50, \"hex1\", \"#990011\", 2);\n    // const rect1 = new Rectangle(0, 0, null, 100, 100, \"rect1\", \"#FFFFFF\", 2);\n    // const rect2 = new Rectangle(100, 100, null, 100, 100, \"rect2\", \"#FFFFFF\", 2);\n    // const rect3 = new Rectangle(0, 100, null, 100, 100, \"rect3\", \"#FFFFFF\", 2);\n\n    //gameControl.createObject(hex1);\n    // gameControl.createObject(rect1);\n    // gameControl.createObject(rect2);\n    // gameControl.createObject(rect3);\n\n    // Then run the main loop\n    const mainLoopId = window.setInterval(() => {\n        gameUpdate.updateAllBegin();\n        gameUpdate.updateAll();\n        gameUpdate.updateAllEnd();\n        gameUpdate.drawAll();\n    }, 34);\n\n    // And exit here\n}\ngameUpdate.initiateGame(imagePaths, startGame);\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/shapes/ConvexShape.js":
/*!**********************************!*\
  !*** ./js/shapes/ConvexShape.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { sortObjectsByZIndex } = __webpack_require__(/*! ../core/gameControl.js */ \"./js/core/gameControl.js\");\n\nclass ConvexShape {\n    constructor(x, y, name, color = \"#FFFFFF\", lineWidth = 2, zIndex = 0) {\n        this.x = x;\n        this.y = y;\n        this.lineWidth = lineWidth;\n        this.name = name;\n        this.color = color;\n        this.zIndex = zIndex;\n        this.isStatic = true;\n        this.zoomScale = 1;\n    }\n\n    position(x, y) {\n        this.x = x;\n        this.y = y;\n    }\n\n    move(dx, dy) {\n        this.x += dx;\n        this.y += dy;\n    }\n\n    setZIndex(val) {\n        this.zIndex = val;\n        sortObjectsByZIndex();\n    }\n};\n\nmodule.exports = ConvexShape;\n\n//# sourceURL=webpack:///./js/shapes/ConvexShape.js?");

/***/ }),

/***/ "./js/shapes/Hexagon.js":
/*!******************************!*\
  !*** ./js/shapes/Hexagon.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ConvexShape = __webpack_require__(/*! ./ConvexShape.js */ \"./js/shapes/ConvexShape.js\");\n\nclass Hexagon extends ConvexShape {\n    constructor(x, y, img, radius, name, color = \"#FFFFFF\", lineWidth = 2, zIndex = 0) {\n        super(x, y, name, color, lineWidth, zIndex);\n        this.radius = radius;\n        this.img = img;\n    }\n    \n    update() {\n    }\n\n    draw(ctx, offsetX, offsetY, scale) {\n        const xx = (this.x + this.radius + offsetX) * scale;\n        const yy = (this.y + this.radius + offsetY) * scale;\n        const radius = this.radius * scale;\n        \n        ctx.save();\n        ctx.lineWidth = this.lineWidth * scale;\n        ctx.strokeStyle = this.color;\n        \n        ctx.beginPath();\n        ctx.moveTo(xx + radius * Math.cos(0), yy + radius * Math.sin(0));\n        for (let side = 0; side < 7; side++) {\n            ctx.lineTo(xx + radius * Math.cos(side * 2 * Math.PI / 6), \n                        yy + radius * Math.sin(side * 2 * Math.PI / 6));\n        }\n        ctx.stroke();\n        ctx.restore();\n    }\n};\n\nmodule.exports = Hexagon;\n\n//# sourceURL=webpack:///./js/shapes/Hexagon.js?");

/***/ }),

/***/ "./js/shapes/Rectangle.js":
/*!********************************!*\
  !*** ./js/shapes/Rectangle.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ConvexShape = __webpack_require__(/*! ./ConvexShape.js */ \"./js/shapes/ConvexShape.js\");\n\nclass Rectangle extends ConvexShape {\n    constructor(x, y, img, width, height, name, color = \"#FFFFFF\", lineWidth = 2, zIndex = 0) {\n        super(x, y, name, color, lineWidth, zIndex);\n        this.width = width;\n        this.height = height;\n        this.img = img;\n    }\n\n    update() {\n\n    }\n\n    draw(ctx, offsetX, offsetY, scale) {\n        const xx = (this.x + offsetX) * scale;\n        const yy = (this.y + offsetY) * scale;\n        const width = this.width * scale;\n        const height = this.height * scale;\n\n        ctx.save();\n        if (this.img) {\n            ctx.drawImage(this.img, xx, yy, width, height);\n        }\n        ctx.lineWidth = this.lineWidth * scale;\n        ctx.strokeStyle = this.color;\n\n        ctx.beginPath();\n        ctx.moveTo(xx, yy);\n        \n        ctx.lineTo(xx + width, yy);\n        ctx.lineTo(xx + width, yy + height);\n        ctx.lineTo(xx, yy + height);\n        ctx.lineTo(xx, yy);\n        \n        ctx.stroke();\n        ctx.restore();\n    }\n}\n\nmodule.exports = Rectangle;\n\n//# sourceURL=webpack:///./js/shapes/Rectangle.js?");

/***/ }),

/***/ "./js/world/GameScreen.js":
/*!********************************!*\
  !*** ./js/world/GameScreen.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameScreen {\n    constructor(canvasId) {\n        this.x = 0;\n        this.y = 0;\n        this.zoomScale = 1;\n        this.boundaries = { minX: 0, maxY: 0, maxX: 32768, minY: -32768, minZoom: 0.5, maxZoom: 1.2 };\n        this.viewWidth = 0;\n        this.viewHeight = 0;\n        this.canvasId = canvasId;\n        this.canvas = null;\n        this.ctx = null;\n        this.bgColor = null;\n    }\n\n    createCanvas(width, height) {\n        this.canvas = document.getElementById(this.canvasId);\n        this.ctx = this.canvas.getContext(\"2d\");\n        this.canvas.width = width;\n        this.canvas.height = height;\n        this.viewWidth = this.canvas.width * this.zoomScale;\n        this.viewHeight = this.canvas.height * this.zoomScale;\n    }\n\n    resizeCanvas(width,height) {\n        this.canvas.width = width;\n        this.canvas.height = height;\n    }\n\n    setBackgroundColor(bgColor) {\n        this.bgColor = bgColor;\n    }\n\n    move(dx, dy) {\n        this.x += dx;\n        this.y += dy;\n    }\n\n    update() {\n        \n    }\n\n    updateEnd() {\n    }\n    \n    draw() {\n        this.viewWidth = this.canvas.width / this.zoomScale;\n        this.viewHeight = this.canvas.height / this.zoomScale;\n        if (this.bgColor != null) {\n            this.ctx.fillStyle = this.bgColor;\n            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n        }\n    }\n\n    fitCanvasToBrowserView() {\n        this.canvas.width = window.innerWidth;\n        this.canvas.height = window.innerHeight;\n        \n        window.addEventListener(\"resize\",() => {\n            this.canvas.width = window.innerWidth;\n            this.canvas.height = window.innerHeight;\n            this.draw();\n        });\n    }\n};\n\nmodule.exports = GameScreen;\n\n//# sourceURL=webpack:///./js/world/GameScreen.js?");

/***/ }),

/***/ "./js/world/GameTable.js":
/*!*******************************!*\
  !*** ./js/world/GameTable.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameTable {\n    constructor(width, height, name, color = \"#FFFFFF\", lineWidth = 2) {\n        this.x = 0;\n        this.y = 0;\n        this.width = width;\n        this.height = height;\n        this.name = name;\n        this.lineWidth = lineWidth;\n        this.color = color;\n        this.scale = 1;   \n    }\n\n    moveScreen(dx, dy) {\n        this.x += dx;\n        this.y += dy;\n    }\n\n    draw(ctx, offsetX, offsetY, scale) {\n        const xx = this.x * scale + offsetX;\n        const yy = this.y * scale + offsetY;\n        const width = this.width * scale;\n        const height = this.height * scale;\n        \n        ctx.save();\n        ctx.lineWidth = this.lineWidth * scale;\n        ctx.strokeStyle = this.color;\n\n        ctx.beginPath();\n        ctx.moveTo(xx, yy);\n        \n        ctx.lineTo(xx + width, yy);\n        ctx.lineTo(xx + width, yy + height);\n        ctx.lineTo(xx, yy + height);\n        ctx.lineTo(xx, yy);\n        \n        ctx.stroke();\n        ctx.restore();\n    }\n\n    updateDrawingCoordinates(dZoom) {\n        const scaleCoeff = 1 + dZoom;\n        this.x = (this.x) * scaleCoeff;\n        this.y = (this.y) * scaleCoeff;\n        this.width = this.width * scaleCoeff;\n        this.height = this.height * scaleCoeff;\n        this.lineWidth = this.lineWidth * scaleCoeff;\n    }\n};\n\nmodule.exports = GameTable;\n\n//# sourceURL=webpack:///./js/world/GameTable.js?");

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
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

eval("const GameScreen = __webpack_require__(/*! ../world/GameScreen.js */ \"./js/world/GameScreen.js\");\r\nconst GameTable = __webpack_require__(/*! ../world/GameTable.js */ \"./js/world/GameTable.js\");\r\nconst listeners = __webpack_require__(/*! ./listeners.js */ \"./js/core/listeners.js\");\r\n\r\nlet table = new GameTable(0, 0, \"table\");\r\nlet screen = new GameScreen(\"screen\");\r\nlet allObjects = new Map();\r\n\r\nconst createObject = function createObject(obj) {\r\n    allObjects.set(obj.name, obj);\r\n}\r\n\r\nconst createBoard = function createBoard(gameBoard) {\r\n    boards.set(gameBoard.name, gameBoard);\r\n}\r\n\r\nconst moveScreen = function moveScreen() {\r\n    let { dx, dy } = listeners.mouse;\r\n    if (listeners.mouse.mousedown) {\r\n        screen.move(-8*dx / screen.zoomScale, -8*dy / screen.zoomScale);\r\n    }\r\n}\r\n\r\nconst zoomScreen = function zoomScreen() {\r\n    let dZoom = 0.075 * Math.sign(listeners.mouse.dWheel);\r\n    if (dZoom != 0) {\r\n        if (screen.zoomScale + dZoom < .2) {\r\n            dZoom = .2 - screen.zoomScale;    \r\n        } else if (screen.zoomScale  + dZoom > 1.75) {\r\n            dZoom = 1.75 - screen.zoomScale;\r\n        }\r\n        screen.zoomScale += dZoom;\r\n\r\n        const dx = -(screen.canvas.width / screen.zoomScale - screen.viewWidth)/2;\r\n        const dy = -(screen.canvas.height / screen.zoomScale - screen.viewHeight)/2;\r\n        screen.move(dx, dy);\r\n    }\r\n}\r\n\r\nconst sortObjectsByZIndex = function sortByZIndex() {\r\n    allObjects = new Map([...allObjects].sort((a,b) => a[1].zIndex - b[1].zIndex));\r\n}\r\n\r\nmodule.exports = {\r\n    table,\r\n    screen,\r\n    allObjects,\r\n    moveScreen,\r\n    zoomScreen,\r\n    createObject,\r\n    createBoard,\r\n    sortObjectsByZIndex,\r\n};\r\n\n\n//# sourceURL=webpack:///./js/core/gameControl.js?");

/***/ }),

/***/ "./js/core/gameUpdate.js":
/*!*******************************!*\
  !*** ./js/core/gameUpdate.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ImageCollection = __webpack_require__(/*! ../helpers/ImageCollection.js */ \"./js/helpers/ImageCollection.js\");\r\nconst listeners = __webpack_require__(/*! ./listeners.js */ \"./js/core/listeners.js\");\r\nconst { \r\n    allObjects, table, screen, \r\n    moveScreen, zoomScreen \r\n} = __webpack_require__(/*! ./gameControl.js */ \"./js/core/gameControl.js\");\r\nconst grid = __webpack_require__(/*! ../helpers/grid.js */ \"./js/helpers/grid.js\");\r\n\r\n// Once images are loaded up, they are here as an image map \r\n// imageCollection.images[key]\r\nlet imageCollection = new ImageCollection();\r\n\r\nconst initiateGame = function initiateGame(imagePaths, callback) {\r\n    imageCollection.load(imagePaths, callback);\r\n}\r\n\r\nconst updateAllBegin = function updateAllBegin() {\r\n    moveScreen();\r\n    zoomScreen();\r\n}\r\n\r\nconst updateAll = function updateAll() {\r\n    for (const [name, obj] of allObjects) {\r\n        obj.update();\r\n    }\r\n}\r\n\r\nconst updateAllEnd = function updateAllEnd() {\r\n    listeners.updateEnd();\r\n}\r\n\r\nconst drawAll = function drawAll() {\r\n    screen.draw();\r\n    const offsetX = -screen.x;\r\n    const offsetY = -screen.y;\r\n    const scale = screen.zoomScale;\r\n\r\n    grid.drawGrid(screen.ctx, offsetX, offsetY, screen.ctx.canvas.width, screen.ctx.canvas.height, scale);\r\n\r\n    table.draw(screen.ctx, offsetX, offsetY, scale);\r\n    for (const [name, obj] of allObjects) {\r\n        obj.draw(screen.ctx, offsetX, offsetY, scale);\r\n    }\r\n}\r\n\r\nmodule.exports = {\r\n    imageCollection,\r\n    initiateGame,\r\n    updateAllBegin,\r\n    updateAll,\r\n    updateAllEnd,\r\n    drawAll,\r\n}\n\n//# sourceURL=webpack:///./js/core/gameUpdate.js?");

/***/ }),

/***/ "./js/core/listeners.js":
/*!******************************!*\
  !*** ./js/core/listeners.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const keys = {\r\n    up: false,\r\n    down: false,\r\n    left: false,\r\n    right: false,\r\n};\r\n\r\nconst mouse = {\r\n    mousedown: false,\r\n    left: false,\r\n    right: false,\r\n    x: 0,\r\n    y: 0,\r\n    dx: 0,\r\n    dy: 0,\r\n    dWheel: 0,\r\n};\r\n\r\nconst updateEnd = function updateEnd() {\r\n    mouse.dx = 0;\r\n    mouse.dy = 0;\r\n    mouse.dWheel = 0;\r\n}\r\n\r\nconst keyDown = function keyDown(ev) {\r\n    if (ev.key == \"ArrowLeft\") {\r\n        keys.left = true;\r\n    } else if (ev.key == \"ArrowUp\") {\r\n        keys.up = true;\r\n    } else if (ev.key == \"ArrowRight\") {\r\n        keys.right = true;\r\n    } else if (ev.key == \"ArrowDown\") {\r\n        keys.down = true;\r\n    }\r\n}\r\n\r\nconst keyUp = function keyUp(ev) {\r\n    if (ev.key == \"ArrowLeft\") {\r\n        keys.left = false;\r\n    } else if (ev.key == \"ArrowUp\") {\r\n        keys.up = false;\r\n    } else if (ev.key == \"ArrowRight\") {\r\n        keys.right = false;\r\n    } else if (ev.key == \"ArrowDown\") {\r\n        keys.down = false;\r\n    }\r\n}\r\n\r\n//todo think about this\r\nconst mouseMoved = function mouseMoved(ev) {\r\n    mouse.x = ev.offsetX;\r\n    mouse.y = ev.offsetY;\r\n    mouse.dx = ev.movementX;\r\n    mouse.dy = ev.movementY;\r\n}\r\n\r\nconst mouseDown = function mouseDown (ev) {\r\n    mouse.mousedown = true;\r\n    mouse.x = ev.offsetX;\r\n    mouse.y = ev.offsetY;\r\n    mouse.prevX = ev.offsetX;\r\n    mouse.prevY = ev.offsetY;\r\n}\r\n\r\nconst mouseUp = function mouseUp(ev) {\r\n    mouse.mousedown = false;\r\n}\r\n\r\nconst mouseWheel = function mouseWheel(ev) {\r\n    mouse.dWheel = -ev.deltaY;\r\n}\r\n\r\nconst enableKeyListeners = function enableKeyListeners(enable) {\r\n    if (enable) {\r\n        window.addEventListener(\"keydown\", keyDown, false);\r\n        window.addEventListener(\"keyup\", keyUp, false);\r\n    } else {\r\n        window.removeEventListener(\"keydown\",keyDown, false);\r\n        window.removeEventListener(\"keyup\", keyUp, false);\r\n    }\r\n}\r\n\r\nconst enableMouseListeners = function enableMouseListeners(enable) {\r\n    if (enable) {\r\n        window.addEventListener(\"mousedown\", mouseDown, false);\r\n        window.addEventListener('mousemove', mouseMoved, false);\r\n        window.addEventListener(\"mouseup\", mouseUp, false);\r\n        window.addEventListener(\"wheel\", mouseWheel, false);\r\n    } else {\r\n        window.removeEventListener(\"mousedown\", mouseDown, false);\r\n        window.removeEventListener('mousemove', mouseMoved, false);\r\n        window.removeEventListener(\"mouseup\", mouseUp, false);\r\n        window.removeEventListener(\"wheel\", mouseWheel, false);\r\n    }\r\n}\r\n\r\nmodule.exports = {\r\n    keys,\r\n    mouse,\r\n    enableKeyListeners,\r\n    enableMouseListeners,\r\n    updateEnd,\r\n};\n\n//# sourceURL=webpack:///./js/core/listeners.js?");

/***/ }),

/***/ "./js/helpers/ImageCollection.js":
/*!***************************************!*\
  !*** ./js/helpers/ImageCollection.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class ImageCollection {\r\n    constructor() {\r\n        this.total = 0;\r\n        this.images = {};\r\n    }\r\n\r\n    load(list, callback) {\r\n        let total = this.total;\r\n\r\n        for(let i = 0; i < list.length; i++){\r\n            let img = new Image();\r\n            this.images[list[i].name] = img;\r\n            img.addEventListener(\"load\", () => {\r\n                total++;\r\n                if(total == list.length){\r\n                    callback && callback();\r\n                }\r\n            });\r\n            img.src = list[i].url;\r\n        }\r\n    }\r\n\r\n    get(name){\r\n        return this.images[name] || (function(){throw \"Not exist\"})();\r\n    };\r\n}\r\n\r\nmodule.exports = ImageCollection;\n\n//# sourceURL=webpack:///./js/helpers/ImageCollection.js?");

/***/ }),

/***/ "./js/helpers/grid.js":
/*!****************************!*\
  !*** ./js/helpers/grid.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const drawGrid = function drawGrid(ctx, minX, minY, maxX, maxY, scale = 1, \r\n    minor = 20, stroke = \"#00FF00\", fill = \"#009900\")  {\r\n\r\n    minX = minX || 0;\r\n    minY = minY || 0;\r\n    maxX = maxX || ctx.canvas.width;\r\n    maxY = maxY || ctx.canvas.height;\r\n    \r\n    const coeff = 5;\r\n    const baseMinor = minor;\r\n    const baseMajor = baseMinor * coeff;\r\n    minor = Math.round(minor*scale*100000)/100000;\r\n    major = minor * coeff;\r\n    \r\n    const { width, height } = ctx.canvas;\r\n    const nMax = Math.ceil(width / minor) + 10;\r\n    \r\n    const nearestMajor = function nearestMajor(value, baseMajor) {\r\n        return Math.round((value)/baseMajor) * baseMajor;\r\n    }\r\n\r\n    ctx.save();\r\n    ctx.strokeStyle = stroke;\r\n    ctx.fillStyle = fill;\r\n    \r\n    const majorOffsetX = (minX > 0 ? major - (minX*scale % major) : -(minX*scale % major));\r\n    let x = -majorOffsetX; \r\n    let value = x/scale - minX;\r\n    for (let n = 0; n < nMax; ++n) {\r\n        ctx.beginPath();\r\n        ctx.moveTo(Math.round(x), 0);\r\n        ctx.lineTo(Math.round(x), height);\r\n        ctx.lineWidth = (n % coeff == 0) ? 0.5 : 0.25;\r\n        ctx.stroke();\r\n        !(n % coeff) && ctx.fillText( nearestMajor(value,baseMajor), x, 10); \r\n        x += minor;\r\n        value += baseMinor;\r\n    }\r\n\r\n    const majorOffsetY = (minY > 0 ? major - (minY*scale % major) : -(minY*scale % major));\r\n    let y = -majorOffsetY; \r\n    value = (y/scale - minY); \r\n    for (let n = 0; n < nMax; ++n) {\r\n        ctx.beginPath();\r\n        ctx.moveTo(0, Math.round(y));\r\n        ctx.lineTo(width, Math.round(y));\r\n        ctx.lineWidth = (n % coeff == 0) ? 0.5 : 0.25;\r\n        ctx.stroke();\r\n        !(n % coeff) && ctx.fillText( nearestMajor(value,baseMajor), 10, y + 10); \r\n        y += minor;\r\n        value += baseMinor;\r\n    }\r\n\r\n    ctx.restore();\r\n}\r\n\r\nconst drawHexGrid = function drawHexGrid(ctx, minX, minY, maxX, maxY, scale = 1, \r\n    minor = 20, stroke = \"#00FF00\", fill = \"#009900\")  {\r\n\r\n    minX = minX || 0;\r\n    minY = minY || 0;\r\n    maxX = maxX || ctx.canvas.width;\r\n    maxY = maxY || ctx.canvas.height;\r\n    \r\n    const coeff = 5;\r\n    const baseMinor = minor;\r\n    const baseMajor = baseMinor * coeff;\r\n    minor = Math.round(minor*scale*100000)/100000;\r\n    major = minor * coeff;\r\n    \r\n    const { width, height } = ctx.canvas;\r\n    const nMax = Math.ceil(width / minor) + 10;\r\n    \r\n    const nearestMajor = function nearestMajor(value, baseMajor) {\r\n        return Math.round((value)/baseMajor) * baseMajor;\r\n    }\r\n\r\n    ctx.save();\r\n    ctx.strokeStyle = stroke;\r\n    ctx.fillStyle = fill;\r\n    \r\n    const majorOffsetX = (minX > 0 ? major - (minX*scale % major) : -(minX*scale % major));\r\n    let x = -majorOffsetX; \r\n    let value = x/scale - minX;\r\n    for (let n = 0; n < nMax; ++n) {\r\n        ctx.beginPath();\r\n        ctx.moveTo(Math.round(x), 0);\r\n        ctx.lineTo(Math.round(x), height);\r\n        ctx.lineWidth = (n % coeff == 0) ? 0.5 : 0.25;\r\n        ctx.stroke();\r\n        !(n % coeff) && ctx.fillText( nearestMajor(value,baseMajor), x, 10); \r\n        x += minor;\r\n        value += baseMinor;\r\n    }\r\n\r\n\r\n    ctx.restore();\r\n}\r\n\r\nmodule.exports = {\r\n    drawGrid,\r\n    drawHexGrid,\r\n};\n\n//# sourceURL=webpack:///./js/helpers/grid.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const gameControl = __webpack_require__(/*! ./core/gameControl.js */ \"./js/core/gameControl.js\");\r\nconst gameUpdate = __webpack_require__(/*! ./core/gameUpdate.js */ \"./js/core/gameUpdate.js\");\r\nconst listeners = __webpack_require__(/*! ./core/listeners.js */ \"./js/core/listeners.js\");\r\nconst Hexagon = __webpack_require__(/*! ./shapes/Hexagon.js */ \"./js/shapes/Hexagon.js\");\r\nconst Rectangle = __webpack_require__(/*! ./shapes/Rectangle.js */ \"./js/shapes/Rectangle.js\");\r\n\r\n// Define all program related images here\r\nlet imagePaths = [{\r\n    name: \"main_map\", url: \"../TM_map.jpeg\"\r\n}];\r\n\r\nconst startGame = function startGame() {\r\n    // Set up the game here\r\n    const { images } = gameUpdate.imageCollection;\r\n\r\n    listeners.enableKeyListeners(true);\r\n    listeners.enableMouseListeners(true);\r\n\r\n    gameControl.screen.createCanvas(window.innerWidth, window.innerHeight);\r\n    gameControl.screen.fitCanvasToBrowserView();\r\n    gameControl.screen.setBackgroundColor(\"#000000\");\r\n\r\n    //const hex1 = new Hexagon(100, 100, null, 60, \"hex1\", \"#990011\", 5);\r\n    const rect1 = new Rectangle(0, 0, null, 100, 100, \"rect1\", \"#FFFFFF\", 2);\r\n    const rect2 = new Rectangle(100, 100, null, 100, 100, \"rect2\", \"#FFFFFF\", 2);\r\n    const rect3 = new Rectangle(0, 100, null, 100, 100, \"rect3\", \"#FFFFFF\", 2);\r\n\r\n    //gameControl.createObject(hex1);\r\n    gameControl.createObject(rect1);\r\n    gameControl.createObject(rect2);\r\n    gameControl.createObject(rect3);\r\n\r\n    // Then run the main loop\r\n    const mainLoopId = window.setInterval(() => {\r\n        gameUpdate.updateAllBegin();\r\n        gameUpdate.updateAll();\r\n        gameUpdate.updateAllEnd();\r\n        gameUpdate.drawAll();\r\n    }, 34);\r\n\r\n    // And exit here\r\n}\r\ngameUpdate.initiateGame(imagePaths, startGame);\r\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/shapes/ConvexShape.js":
/*!**********************************!*\
  !*** ./js/shapes/ConvexShape.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { sortObjectsByZIndex } = __webpack_require__(/*! ../core/gameControl.js */ \"./js/core/gameControl.js\");\r\n\r\nclass ConvexShape {\r\n    constructor(x, y, name, color = \"#FFFFFF\", lineWidth = 2, zIndex = 0) {\r\n        this.x = x;\r\n        this.y = y;\r\n        this.lineWidth = lineWidth;\r\n        this.name = name;\r\n        this.color = color;\r\n        this.zIndex = zIndex;\r\n        this.isStatic = true;\r\n        this.zoomScale = 1;\r\n    }\r\n\r\n    position(x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n\r\n    move(dx, dy) {\r\n        this.x += dx;\r\n        this.y += dy;\r\n    }\r\n\r\n    setZIndex(val) {\r\n        this.zIndex = val;\r\n        sortObjectsByZIndex();\r\n    }\r\n};\r\n\r\nmodule.exports = ConvexShape;\n\n//# sourceURL=webpack:///./js/shapes/ConvexShape.js?");

/***/ }),

/***/ "./js/shapes/Hexagon.js":
/*!******************************!*\
  !*** ./js/shapes/Hexagon.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ConvexShape = __webpack_require__(/*! ./ConvexShape.js */ \"./js/shapes/ConvexShape.js\");\r\n\r\nclass Hexagon extends ConvexShape {\r\n    constructor(x, y, img, radius, name, color = \"#FFFFFF\", lineWidth = 2, zIndex = 0) {\r\n        super(x, y, name, color, lineWidth, zIndex);\r\n        this.radius = radius;\r\n        this.img = img;\r\n    }\r\n    \r\n    update() {\r\n    }\r\n\r\n    draw(ctx, offsetX, offsetY, scale) {\r\n        const xx = (this.x + offsetX) * scale;\r\n        const yy = (this.y + offsetY) * scale;\r\n        const radius = this.radius * scale;\r\n        \r\n        ctx.save();\r\n        ctx.lineWidth = this.lineWidth * scale;\r\n        ctx.strokeStyle = this.color;\r\n        \r\n        ctx.beginPath();\r\n        ctx.moveTo(xx + radius * Math.cos(0), yy + radius * Math.sin(0));\r\n        for (let side = 0; side < 7; side++) {\r\n            ctx.lineTo(xx + radius * Math.cos(side * 2 * Math.PI / 6), \r\n                        yy + radius * Math.sin(side * 2 * Math.PI / 6));\r\n        }\r\n        ctx.stroke();\r\n        ctx.restore();\r\n    }\r\n};\r\n\r\nmodule.exports = Hexagon;\n\n//# sourceURL=webpack:///./js/shapes/Hexagon.js?");

/***/ }),

/***/ "./js/shapes/Rectangle.js":
/*!********************************!*\
  !*** ./js/shapes/Rectangle.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ConvexShape = __webpack_require__(/*! ./ConvexShape.js */ \"./js/shapes/ConvexShape.js\");\r\n\r\nclass Rectangle extends ConvexShape {\r\n    constructor(x, y, img, width, height, name, color = \"#FFFFFF\", lineWidth = 2, zIndex = 0) {\r\n        super(x, y, name, color, lineWidth, zIndex);\r\n        this.width = width;\r\n        this.height = height;\r\n        this.img = img;\r\n    }\r\n\r\n    update() {\r\n\r\n    }\r\n\r\n    draw(ctx, offsetX, offsetY, scale) {\r\n        const xx = (this.x + offsetX) * scale;\r\n        const yy = (this.y + offsetY) * scale;\r\n        const width = this.width * scale;\r\n        const height = this.height * scale;\r\n\r\n        ctx.save();\r\n        if (this.img) {\r\n            ctx.drawImage(this.img, xx, yy, width, height);\r\n        }\r\n        ctx.lineWidth = this.lineWidth * scale;\r\n        ctx.strokeStyle = this.color;\r\n\r\n        ctx.beginPath();\r\n        ctx.moveTo(xx, yy);\r\n        \r\n        ctx.lineTo(xx + width, yy);\r\n        ctx.lineTo(xx + width, yy + height);\r\n        ctx.lineTo(xx, yy + height);\r\n        ctx.lineTo(xx, yy);\r\n        \r\n        ctx.stroke();\r\n        ctx.restore();\r\n    }\r\n}\r\n\r\nmodule.exports = Rectangle;\n\n//# sourceURL=webpack:///./js/shapes/Rectangle.js?");

/***/ }),

/***/ "./js/world/GameScreen.js":
/*!********************************!*\
  !*** ./js/world/GameScreen.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameScreen {\r\n    constructor(canvasId) {\r\n        this.x = 0;\r\n        this.y = 0;\r\n        this.zoomScale = 1;\r\n        this.boundaries = { minX: 0, maxY: 0, maxX: 32768, minY: -32768, minZoom: 0.5, maxZoom: 1.2 };\r\n        this.viewWidth = 0;\r\n        this.viewHeight = 0;\r\n        this.canvasId = canvasId;\r\n        this.canvas = null;\r\n        this.ctx = null;\r\n        this.bgColor = null;\r\n    }\r\n\r\n    createCanvas(width, height) {\r\n        this.canvas = document.getElementById(this.canvasId);\r\n        this.ctx = this.canvas.getContext(\"2d\");\r\n        this.canvas.width = width;\r\n        this.canvas.height = height;\r\n        this.viewWidth = this.canvas.width * this.zoomScale;\r\n        this.viewHeight = this.canvas.height * this.zoomScale;\r\n    }\r\n\r\n    resizeCanvas(width,height) {\r\n        this.canvas.width = width;\r\n        this.canvas.height = height;\r\n    }\r\n\r\n    setBackgroundColor(bgColor) {\r\n        this.bgColor = bgColor;\r\n    }\r\n\r\n    move(dx, dy) {\r\n        this.x += dx;\r\n        this.y += dy;\r\n    }\r\n\r\n    update() {\r\n        \r\n    }\r\n\r\n    updateEnd() {\r\n    }\r\n    \r\n    draw() {\r\n        this.viewWidth = this.canvas.width / this.zoomScale;\r\n        this.viewHeight = this.canvas.height / this.zoomScale;\r\n        if (this.bgColor != null) {\r\n            this.ctx.fillStyle = this.bgColor;\r\n            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\r\n        }\r\n    }\r\n\r\n    fitCanvasToBrowserView() {\r\n        this.canvas.width = window.innerWidth;\r\n        this.canvas.height = window.innerHeight;\r\n        \r\n        window.addEventListener(\"resize\",() => {\r\n            this.canvas.width = window.innerWidth;\r\n            this.canvas.height = window.innerHeight;\r\n            this.draw();\r\n        });\r\n    }\r\n};\r\n\r\nmodule.exports = GameScreen;\n\n//# sourceURL=webpack:///./js/world/GameScreen.js?");

/***/ }),

/***/ "./js/world/GameTable.js":
/*!*******************************!*\
  !*** ./js/world/GameTable.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameTable {\r\n    constructor(width, height, name, color = \"#FFFFFF\", lineWidth = 2) {\r\n        this.x = 0;\r\n        this.y = 0;\r\n        this.width = width;\r\n        this.height = height;\r\n        this.name = name;\r\n        this.lineWidth = lineWidth;\r\n        this.color = color;\r\n        this.scale = 1;   \r\n    }\r\n\r\n    moveScreen(dx, dy) {\r\n        this.x += dx;\r\n        this.y += dy;\r\n    }\r\n\r\n    draw(ctx, offsetX, offsetY, scale) {\r\n        const xx = this.x * scale + offsetX;\r\n        const yy = this.y * scale + offsetY;\r\n        const width = this.width * scale;\r\n        const height = this.height * scale;\r\n        \r\n        ctx.save();\r\n        ctx.lineWidth = this.lineWidth * scale;\r\n        ctx.strokeStyle = this.color;\r\n\r\n        ctx.beginPath();\r\n        ctx.moveTo(xx, yy);\r\n        \r\n        ctx.lineTo(xx + width, yy);\r\n        ctx.lineTo(xx + width, yy + height);\r\n        ctx.lineTo(xx, yy + height);\r\n        ctx.lineTo(xx, yy);\r\n        \r\n        ctx.stroke();\r\n        ctx.restore();\r\n    }\r\n\r\n    updateDrawingCoordinates(dZoom) {\r\n        const scaleCoeff = 1 + dZoom;\r\n        this.x = (this.x) * scaleCoeff;\r\n        this.y = (this.y) * scaleCoeff;\r\n        this.width = this.width * scaleCoeff;\r\n        this.height = this.height * scaleCoeff;\r\n        this.lineWidth = this.lineWidth * scaleCoeff;\r\n    }\r\n};\r\n\r\nmodule.exports = GameTable;\n\n//# sourceURL=webpack:///./js/world/GameTable.js?");

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
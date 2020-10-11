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

/***/ "./js/core/game.js":
/*!*************************!*\
  !*** ./js/core/game.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const GameScreen = __webpack_require__(/*! ../world/GameScreen.js */ \"./js/world/GameScreen.js\");\nconst GameTable = __webpack_require__(/*! ../world/GameTable.js */ \"./js/world/GameTable.js\");\n\nconst get = function get(name) {\n    return this.arr.find(obj => obj.name == name);\n}\n\nconst set = function set(obj) {\n    this.all.push(obj)\n}\n\nconst sortByZIndex = function sortByZIndex() {\n    this.all.sort((a,b) => a.zIndex - b.zIndex);\n}\n\nconst shouldSortMap = function shouldSortMap() {\n    let zIndexPrev = null;\n    for (const obj of this.all) {\n        if (obj.zIndex < zIndexPrev) {\n            sortObjectMap = true;\n            return true;\n        }\n        zIndexPrev = obj.zIndex;\n    }\n    return false;\n}\n\nconst game = {\n    table: new GameTable(0, 0, \"table\"),\n    screen: new GameScreen(\"screen\"),\n    grids: {\n        all: [],\n        get: get,\n        set: set,\n    },\n    objects: {\n        all: [],\n        get: get,\n        set: set, \n        sortByZIndex: sortByZIndex,\n        shouldSortMap: shouldSortMap,\n    },\n    others: {\n        dragged: {\n            obj: null,\n            offsetX: 0,\n            offsetY: 0,\n        },\n        selected: null,\n    },\n}\n\nmodule.exports = game;\n\n//# sourceURL=webpack:///./js/core/game.js?");

/***/ }),

/***/ "./js/core/gameControl.js":
/*!********************************!*\
  !*** ./js/core/gameControl.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const game = __webpack_require__(/*! ./game.js */ \"./js/core/game.js\");\nconst listeners = __webpack_require__(/*! ./listeners.js */ \"./js/core/listeners.js\");\nconst gridMap = __webpack_require__(/*! ../tools/gridMap.js */ \"./js/tools/gridMap.js\");\nconst { pointInRect, pointInHex } = __webpack_require__(/*! ../helpers/collision.js */ \"./js/helpers/collision.js\");\n\n\nconst createObject = function createObject(obj) {\n    game.objects.set(obj);\n}\n\nconst createGrid = function createGrid(grid) {\n    game.grids.set(grid);\n}\n\nconst moveScreen = function moveScreen() {\n    let { dx, dy } = listeners.mouse;\n    if (listeners.mouse.mousedown) {\n        game.screen.move(-3*dx / game.screen.zoomScale, -3*dy / game.screen.zoomScale);\n    }\n}\n\nconst zoomScreen = function zoomScreen() {\n    let dZoom = 0.075 * Math.sign(listeners.mouse.dWheel);\n    if (dZoom != 0) {\n        if (game.screen.zoomScale + dZoom < .2) {\n            dZoom = .2 - game.screen.zoomScale;    \n        } else if (game.screen.zoomScale  + dZoom > 1.75) {\n            dZoom = 1.75 - game.screen.zoomScale;\n        }\n        game.screen.zoomScale += dZoom;\n\n        const dx = -(game.screen.canvas.width / game.screen.zoomScale - game.screen.viewWidth)/2;\n        const dy = -(game.screen.canvas.height / game.screen.zoomScale - game.screen.viewHeight)/2;\n        game.screen.move(dx, dy);\n    }\n}\n\n\nconst dragObject = function dragObject() {\n    // Needs to take into account screen offset\n    const { screen, objects, others } = game;\n    const mx = listeners.mouse.x/screen.zoomScale + screen.x;\n    const my = listeners.mouse.y/screen.zoomScale + screen.y;\n    if (listeners.mouse.mouseclick) {\n        if (others.selected)\n            others.selected.isSelected = false;\n        others.selected = null;\n        for (const obj of objects.all) {\n            if (obj.isStatic)\n                continue;\n            if (obj.constructor.name == \"Rectangle\") {\n                const {position, width, height} = obj;\n                if (pointInRect(mx, my, position.x, position.y, width, height)) {\n                    // Mouse clicking on a rectangle, stop screen\n                    screen.stop = true;\n                    obj.beingDragged = true;\n                    obj.isSelected = true;\n                    obj.zIndex = Math.max(...objects.all.map(obj => { \n                        obj.zIndex -= 1;\n                        return obj.zIndex;\n                    })) + 1;\n                    others.selected = obj;\n                    others.dragged.obj = obj;\n                    others.dragged.offsetX = listeners.mouse.x + (screen.x - obj.position.x) * screen.zoomScale;\n                    others.dragged.offsetY = listeners.mouse.y + (screen.y - obj.position.y) * screen.zoomScale;\n                    break;\n                }\n            } else if (obj.constructor.name == \"Hexagon\") {\n                const {position, radius} = obj;\n                if (pointInHex(mx, my, position.x, position.y, radius)) {\n                    // Mouse clicking on a rectangle, stop screen\n                    screen.stop = true;\n                    obj.beingDragged = true;\n                    obj.isSelected = true;\n                    obj.zIndex = Math.max(...objects.all.map(obj => { \n                        obj.zIndex -= 1;\n                        return obj.zIndex;\n                    })) + 1;\n                    others.selected = obj;\n                    others.dragged.obj = obj;\n                    others.dragged.offsetX = listeners.mouse.x + (screen.x - obj.position.x) * screen.zoomScale;\n                    others.dragged.offsetY = listeners.mouse.y + (screen.y - obj.position.y) * screen.zoomScale;\n                    break;\n                }\n            }\n        }\n    } else if (listeners.mouse.mousereleased) {\n        screen.stop = false;\n        // Snap to grid here\n        if (others.dragged.obj != null) {\n            for (const el of game.grids.all) {\n                gridMap.snapToGrid(others.dragged.obj, el);\n            }\n            // Then nullify the dragged obj\n            others.dragged.obj.beingDragged = false;\n            others.dragged.obj = null;\n        }\n    }\n}\n\nmodule.exports = {\n    game,\n    moveScreen,\n    zoomScreen,\n    createObject,\n    createGrid,\n    dragObject,\n};\n\n\n//# sourceURL=webpack:///./js/core/gameControl.js?");

/***/ }),

/***/ "./js/core/gameUpdate.js":
/*!*******************************!*\
  !*** ./js/core/gameUpdate.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ImageCollection = __webpack_require__(/*! ../helpers/ImageCollection.js */ \"./js/helpers/ImageCollection.js\");\nconst listeners = __webpack_require__(/*! ./listeners.js */ \"./js/core/listeners.js\");\nconst { game, moveScreen, zoomScreen, dragObject } = __webpack_require__(/*! ./gameControl.js */ \"./js/core/gameControl.js\");\nconst { objects, table, screen, grids } = game;\n\n// Once images are loaded up, they are here as an image map\nlet imageCollection = new ImageCollection();\n\nconst initiateGame = function initiateGame(imagePaths, callback) {\n    imageCollection.load(imagePaths, callback);\n}\n\nconst updateAllBegin = function updateAllBegin() {\n    dragObject();\n    zoomScreen();\n    if (!screen.stop) {\n        moveScreen();\n    }\n    if (game.objects.shouldSortMap())\n        game.objects.sortByZIndex();\n}\n\nconst updateAll = function updateAll() {\n    const { obj, offsetX, offsetY } = game.others.dragged;\n    if (obj) {\n        obj.position.x = listeners.mouse.x/screen.zoomScale + screen.x - offsetX/screen.zoomScale;\n        obj.position.y = listeners.mouse.y/screen.zoomScale + screen.y - offsetY/screen.zoomScale;\n    }\n}\n\nconst updateAllEnd = function updateAllEnd() {\n    listeners.updateEnd();\n}\n\nconst drawAll = function drawAll() {\n    const offsetX = -screen.x;\n    const offsetY = -screen.y;\n    const scale = screen.zoomScale;\n\n    table.draw(screen.ctx, offsetX, offsetY, scale);\n    for (const grid of grids.all) {\n        grid.draw(screen.ctx, offsetX, offsetY, scale);\n    }\n    for (const obj of objects.all) {\n        obj.draw(screen.ctx, offsetX, offsetY, scale);\n    }\n}\n\nmodule.exports = {\n    imageCollection,\n    initiateGame,\n    updateAllBegin,\n    updateAll,\n    updateAllEnd,\n    drawAll,\n}\n\n//# sourceURL=webpack:///./js/core/gameUpdate.js?");

/***/ }),

/***/ "./js/core/listeners.js":
/*!******************************!*\
  !*** ./js/core/listeners.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const keys = {\n    up: false,\n    down: false,\n    left: false,\n    right: false,\n};\n\nconst mouse = {\n    mouseclick: false,\n    mousereleased: false,\n    mousedown: false,\n    left: false,\n    right: false,\n    x: 0,\n    y: 0,\n    dx: 0,\n    dy: 0,\n    dWheel: 0,\n};\n\nconst updateEnd = function updateEnd() {\n    mouse.dx = 0;\n    mouse.dy = 0;\n    mouse.dWheel = 0;\n    mouse.mouseclick = false;\n    mouse.mousereleased = false;\n}\n\nconst keyDown = function keyDown(ev) {\n    if (ev.key == \"ArrowLeft\") {\n        keys.left = true;\n    } else if (ev.key == \"ArrowUp\") {\n        keys.up = true;\n    } else if (ev.key == \"ArrowRight\") {\n        keys.right = true;\n    } else if (ev.key == \"ArrowDown\") {\n        keys.down = true;\n    }\n}\n\nconst keyUp = function keyUp(ev) {\n    if (ev.key == \"ArrowLeft\") {\n        keys.left = false;\n    } else if (ev.key == \"ArrowUp\") {\n        keys.up = false;\n    } else if (ev.key == \"ArrowRight\") {\n        keys.right = false;\n    } else if (ev.key == \"ArrowDown\") {\n        keys.down = false;\n    }\n}\n\nconst mouseMoved = function mouseMoved(ev) {\n    mouse.x = ev.offsetX;\n    mouse.y = ev.offsetY;\n    mouse.dx = ev.movementX;\n    mouse.dy = ev.movementY;\n}\n\nconst mouseDown = function mouseDown (ev) {\n    mouse.mouseclick = true;\n    mouse.mousedown = true;\n    mouse.x = ev.offsetX;\n    mouse.y = ev.offsetY;\n    mouse.prevX = ev.offsetX;\n    mouse.prevY = ev.offsetY;\n}\n\nconst mouseUp = function mouseUp(ev) {\n    mouse.mousereleased = true;\n    mouse.mousedown = false;\n}\n\nconst mouseWheel = function mouseWheel(ev) {\n    mouse.dWheel = -ev.deltaY;\n}\n\nconst enableKeyListeners = function enableKeyListeners(enable) {\n    if (enable) {\n        window.addEventListener(\"keydown\", keyDown, false);\n        window.addEventListener(\"keyup\", keyUp, false);\n    } else {\n        window.removeEventListener(\"keydown\",keyDown, false);\n        window.removeEventListener(\"keyup\", keyUp, false);\n    }\n}\n\nconst enableMouseListeners = function enableMouseListeners(enable) {\n    if (enable) {\n        window.addEventListener(\"mousedown\", mouseDown, false);\n        window.addEventListener('mousemove', mouseMoved, false);\n        window.addEventListener(\"mouseup\", mouseUp, false);\n        window.addEventListener(\"wheel\", mouseWheel, false);\n    } else {\n        window.removeEventListener(\"mousedown\", mouseDown, false);\n        window.removeEventListener('mousemove', mouseMoved, false);\n        window.removeEventListener(\"mouseup\", mouseUp, false);\n        window.removeEventListener(\"wheel\", mouseWheel, false);\n    }\n}\n\nmodule.exports = {\n    keys,\n    mouse,\n    enableKeyListeners,\n    enableMouseListeners,\n    updateEnd,\n};\n\n//# sourceURL=webpack:///./js/core/listeners.js?");

/***/ }),

/***/ "./js/helpers/ImageCollection.js":
/*!***************************************!*\
  !*** ./js/helpers/ImageCollection.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class ImageCollection {\n    constructor() {\n        this.total = 0;\n        this.images = {};\n    }\n\n    load(list, callback) {\n        let total = this.total;\n\n        for(let i = 0; i < list.length; i++){\n            let img = new Image();\n            this.images[list[i].name] = img;\n            img.addEventListener(\"load\", () => {\n                total++;\n                if(total == list.length){\n                    callback && callback();\n                }\n            });\n            img.src = list[i].url;\n        }\n    }\n\n    get(name){\n        return this.images[name] || (function(){throw \"Not exist\"})();\n    };\n}\n\nmodule.exports = ImageCollection;\n\n//# sourceURL=webpack:///./js/helpers/ImageCollection.js?");

/***/ }),

/***/ "./js/helpers/collision.js":
/*!*********************************!*\
  !*** ./js/helpers/collision.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const pointInRect = function pointInRect(px,py,rectX,rectY,rectWidth,rectHeight) {\n    return (px > rectX && px < rectX + rectWidth &&\n                py > rectY && py < rectY + rectHeight);\n}\n\n/**\n * Creates a line equation (y-y0) = k(x-x0) for each side of the hexagon\n * and checks in which half plane the hexagon center and point reside in.\n * If they have the same sign for each of the sides, the point is within\n * the hexagon. Can be easily generalized for all convex shapes.\n * @param {*px Point x coordinate} px \n * @param {*py Point y coordinate} py \n * @param {*hexX Hexagon x coordinate} hexX \n * @param {*hexY Hexagon y coordinate} hexY \n * @param {*hexRadius Hexagon radius} hexRadius \n */\nconst pointInHex = function pointInHex(px, py, hexX, hexY, hexRadius) {\n    const coeff = [Math.sqrt(3), -Math.sqrt(3), 0, Math.sqrt(3), -Math.sqrt(3), 0];\n    for (let side = 0; side < 6; side++) {\n        const x = hexX + hexRadius * Math.cos(side * 2 * Math.PI / 6) + hexRadius;\n        const y = hexY + hexRadius * Math.sin(side * 2 * Math.PI / 6) + hexRadius;\n        const mouseHalfPlane = coeff[side]*px - py + (y - coeff[side]*x);\n        const hexCenterHalfPlane  = coeff[side]*(hexX+hexRadius) - (hexY+hexRadius) + (y - coeff[side]*x);\n        \n        if (Math.sign(mouseHalfPlane) != Math.sign(hexCenterHalfPlane))\n            return false;\n    }\n    return true;\n}\n\nmodule.exports = {\n    pointInRect,\n    pointInHex,\n}\n\n//# sourceURL=webpack:///./js/helpers/collision.js?");

/***/ }),

/***/ "./js/helpers/grid.js":
/*!****************************!*\
  !*** ./js/helpers/grid.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const drawGrid = function drawGrid(ctx, minX, minY, maxX, maxY, scale = 1, \n    minor = 20, stroke = \"#00FF00\")  {\n\n    minX = minX || 0;\n    minY = minY || 0;\n    maxX = maxX || ctx.canvas.width;\n    maxY = maxY || ctx.canvas.height;\n    \n    const coeff = 5;\n    minor = Math.round(minor*scale*1000)/1000;\n    major = minor * coeff;\n    \n    const { width, height } = ctx.canvas;\n    const nMax = Math.ceil(width / minor) + 10;\n\n    ctx.save();\n    ctx.strokeStyle = stroke;\n    let x = -(minX > 0 ? major - (minX*scale % major) : -(minX*scale % major));\n    for (let n = 0; n < nMax; ++n) {\n        ctx.beginPath();\n        ctx.moveTo(Math.round(x), 0);\n        ctx.lineTo(Math.round(x), height);\n        ctx.lineWidth = (n % coeff == 0) ? 0.5 : 0.25;\n        ctx.stroke();\n        x += minor;\n    }\n\n    let y = -(minY > 0 ? major - (minY*scale % major) : -(minY*scale % major));\n    for (let n = 0; n < nMax; ++n) {\n        ctx.beginPath();\n        ctx.moveTo(0, Math.round(y));\n        ctx.lineTo(width, Math.round(y));\n        ctx.lineWidth = (n % coeff == 0) ? 0.5 : 0.25;\n        ctx.stroke();\n        y += minor;\n    }\n\n    ctx.restore();\n}\n\nconst drawHexGrid = function drawHexGrid(ctx, minX, minY, maxX, maxY, scale = 1, \n    radius = 50, stroke = \"#00FF00\", fill = \"#009900\")  {\n\n    minX = minX || 0;\n    minY = minY || 0;\n    maxX = maxX || ctx.canvas.width;\n    maxY = maxY || ctx.canvas.height;\n    \n    const scaledRadius = radius * scale;\n    \n    const { width, height } = ctx.canvas;\n    const xMax = Math.ceil(width/(2 * (3/4) * scaledRadius)) + 3;\n    const yMax = Math.ceil(height/(Math.sqrt(3)*scaledRadius/2)) + 3;\n\n    ctx.save();\n    ctx.lineWidth = .25 * scale;\n    ctx.strokeStyle = stroke;\n    ctx.fillStyle = fill;\n    \n    const xMod = 3*scaledRadius;\n    const yMod = Math.sqrt(3)*scaledRadius;\n    let x = -(minX > 0 ? xMod - (minX*scale % xMod) : -(minX*scale % xMod));\n    let y = -(minY > 0 ? yMod - (minY*scale % yMod) : -(minY*scale % yMod));\n    let xInd = 0;\n    let yInd = 0;\n    let evenOdd = 1;\n    while (yInd < yMax) {\n        const xx = x + scaledRadius;\n        const yy = y + scaledRadius;\n        ctx.beginPath();\n        ctx.moveTo(xx + scaledRadius * Math.cos(0), yy + scaledRadius * Math.sin(0));\n        for (let side = 0; side < 7; side++) {\n            ctx.lineTo(xx + scaledRadius * Math.cos(side * 2 * Math.PI / 6), \n                    yy + scaledRadius * Math.sin(side * 2 * Math.PI / 6));\n        }\n        ctx.stroke();\n        x += 2 * (3/4) * scaledRadius;\n        y += Math.sqrt(3) * scaledRadius / 2 * evenOdd;\n        evenOdd *= -1;\n        ++xInd;\n        if (xInd == xMax) {\n            (evenOdd == 1 ? y += Math.sqrt(3) * scaledRadius : y += Math.sqrt(3) * scaledRadius / 2);\n            ++yInd;\n            evenOdd = 1;\n            x = -(minX > 0 ? xMod - (minX*scale % xMod) : -(minX*scale % xMod));\n            xInd = 0;\n        }\n    }\n\n    ctx.restore();\n}\n\nconst drawCoordinates = function drawCoordinates(ctx, minX, minY, spacing, scale = 1, fill = \"#009900\") {\n    // This might be useless, maybe just round valueX and valueY in the beginning?\n    const nearestMajor = function nearestMajor(value, baseMajor) {\n        return Math.round((value)/baseMajor) * baseMajor;\n    }\n\n    const baseSpacing = spacing;\n    spacing = spacing * scale;\n    \n    const nMax = Math.ceil(ctx.canvas.width / spacing) + 10;\n\n    let x = -(minX > 0 ? spacing - (minX*scale % spacing) : -(minX*scale % spacing));\n    let y = -(minY > 0 ? spacing - (minY*scale % spacing) : -(minY*scale % spacing));\n    let valueX = x/scale - minX;\n    let valueY = y/scale - minY;\n    ctx.save();\n    ctx.fillStyle = fill;\n    ctx.font = \"900 13px Arial\";\n    for (let n = 0; n < nMax; ++n) {\n        ctx.fillText( nearestMajor(valueX,baseSpacing), x, 13); \n        ctx.fillText( nearestMajor(valueY,baseSpacing), 1, y + 10); \n        x += spacing;\n        y += spacing;\n        valueX += baseSpacing;\n        valueY += baseSpacing;\n    }\n    ctx.restore();\n}\n\nmodule.exports = {\n    drawGrid,\n    drawHexGrid,\n    drawCoordinates,\n};\n\n//# sourceURL=webpack:///./js/helpers/grid.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const gameControl = __webpack_require__(/*! ./core/gameControl.js */ \"./js/core/gameControl.js\");\nconst gameUpdate = __webpack_require__(/*! ./core/gameUpdate.js */ \"./js/core/gameUpdate.js\");\nconst listeners = __webpack_require__(/*! ./core/listeners.js */ \"./js/core/listeners.js\");\nconst Hexagon = __webpack_require__(/*! ./shapes/Hexagon.js */ \"./js/shapes/Hexagon.js\");\nconst Rectangle = __webpack_require__(/*! ./shapes/Rectangle.js */ \"./js/shapes/Rectangle.js\");\nconst RectGrid = __webpack_require__(/*! ./tools/RectGrid.js */ \"./js/tools/RectGrid.js\");\nconst HexGrid = __webpack_require__(/*! ./tools/HexGrid.js */ \"./js/tools/HexGrid.js\");\nconst grid = __webpack_require__(/*! ./helpers/grid.js */ \"./js/helpers/grid.js\");\n\n//TODO: define snapToGrid property for objects\n//      which defines what grids the object should snap to!\n\n// Define all program related images here\nlet imagePaths = [{\n    name: \"main_map\", url: \"../TM_map.jpeg\"\n}];\n\nconst startGame = function startGame() {\n    // Set up the game here\n    const { images } = gameUpdate.imageCollection;\n    const { screen, grids } = gameControl.game;\n\n    listeners.enableKeyListeners(true);\n    listeners.enableMouseListeners(true);\n\n    screen.createCanvas(window.innerWidth, window.innerHeight);\n    screen.fitCanvasToBrowserView();\n    screen.setBackgroundColor(\"#000000\");\n    screen.preventContextMenu();\n\n    const grid1 = new RectGrid({x: 100, y: 100}, 100, 100, 2, 2, \"rect_grid_1\", 2, \"#FF00FF\");\n    const grid2 = new HexGrid({x: 300, y: 100}, 100, 3, 3, \"hex_grid_1\", 2, \"#FF00FF\");\n    gameControl.createGrid(grid1);\n    gameControl.createGrid(grid2);\n    \n    // const rect1 = new Rectangle(grid1.getCoords(1,0), null, 100, 100, \"rect1\", \"#FFFFFF\", \"#FFFFFF\", 2);\n    // rect1.isStatic = false;\n    const hex1 = new Hexagon({ x: 100, y: 100 }, null, 100, \"hex1\", \"#FFFFFF\", \"#FFFFFF\");\n    hex1.isStatic = false;\n\n    // gameControl.createObject(rect1);\n    gameControl.createObject(hex1);\n\n    // Then run the main loop\n    const mainLoopId = window.setInterval(() => {\n        gameUpdate.updateAllBegin();\n        gameUpdate.updateAll();\n        gameUpdate.updateAllEnd();\n        \n        // First draw screen\n        screen.draw();\n        // And then everything else\n        grid.drawGrid(screen.ctx, -screen.x, -screen.y, screen.ctx.canvas.width, screen.ctx.canvas.height, screen.zoomScale, 20, \"rgba(0,255,0,.5)\");\n        //grid.drawHexGrid(screen.ctx, -screen.x, -screen.y, screen.ctx.canvas.width, screen.ctx.canvas.height, screen.zoomScale, 50, \"rgba(0,255,0,.5)\");\n        grid.drawCoordinates(screen.ctx, -screen.x, -screen.y, 200, screen.zoomScale);\n        gameUpdate.drawAll();\n    }, 34);\n\n    // And exit here\n}\ngameUpdate.initiateGame(imagePaths, startGame);\n\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./js/shapes/ConvexShape.js":
/*!**********************************!*\
  !*** ./js/shapes/ConvexShape.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { sortObjectsByZIndex } = __webpack_require__(/*! ../core/gameControl.js */ \"./js/core/gameControl.js\");\n\nclass ConvexShape {\n    constructor(position, name, color = \"#FFFFFF\", lineWidth = 2, zIndex = 0) {\n        this.position = position;\n        this.lineWidth = lineWidth;\n        this.name = name;\n        this.color = color;\n        this.zIndex = zIndex;\n        this.isStatic = true;\n        this.isSelected = false;\n        this.beingDragged = false;\n    }\n\n    move(dx, dy) {\n        this.position.x += dx;\n        this.position.y += dy;\n    }\n\n    setZIndex(val) {\n        this.zIndex = val;\n        sortObjectsByZIndex();\n    }\n};\n\nmodule.exports = ConvexShape;\n\n//# sourceURL=webpack:///./js/shapes/ConvexShape.js?");

/***/ }),

/***/ "./js/shapes/Hexagon.js":
/*!******************************!*\
  !*** ./js/shapes/Hexagon.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ConvexShape = __webpack_require__(/*! ./ConvexShape.js */ \"./js/shapes/ConvexShape.js\");\n\nclass Hexagon extends ConvexShape {\n    constructor(position, img, radius, name, color = \"#FFFFFF\", fill = \"#FFFFFF\", lineWidth = 2, zIndex = 0) {\n        super(position, name, color, lineWidth, zIndex);\n        this.radius = radius;\n        this.fill = fill;\n        this.img = img;\n    }\n    \n    update() {\n    }\n\n    draw(ctx, offsetX, offsetY, scale) {\n        const xx = (this.position.x + this.radius + offsetX) * scale;\n        const yy = (this.position.y + this.radius + offsetY) * scale;\n        const radius = this.radius * scale;\n        \n        ctx.save();\n        ctx.lineWidth = this.lineWidth * scale;\n        ctx.strokeStyle = this.color;\n        ctx.fillStyle = this.fill;\n\n        ctx.beginPath();\n        ctx.moveTo(xx + radius * Math.cos(0), yy + radius * Math.sin(0));\n        for (let side = 0; side < 7; side++) {\n            ctx.lineTo(xx + radius * Math.cos(side * 2 * Math.PI / 6), \n                        yy + radius * Math.sin(side * 2 * Math.PI / 6));\n        }\n        ctx.stroke();\n        ctx.fill();\n        \n        ctx.restore();\n    }\n};\n\nmodule.exports = Hexagon;\n\n//# sourceURL=webpack:///./js/shapes/Hexagon.js?");

/***/ }),

/***/ "./js/shapes/Rectangle.js":
/*!********************************!*\
  !*** ./js/shapes/Rectangle.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const ConvexShape = __webpack_require__(/*! ./ConvexShape.js */ \"./js/shapes/ConvexShape.js\");\n\nclass Rectangle extends ConvexShape {\n    constructor(position, img, width, height, name, color = \"#FFFFFF\", fill = \"#FFFFFF\", lineWidth = 2, zIndex = 0) {\n        super(position, name, color, lineWidth, zIndex);\n        this.width = width;\n        this.height = height;\n        this.fill = fill;\n        this.img = img;\n    }\n\n    update() {\n\n    }\n\n    draw(ctx, offsetX, offsetY, scale) {\n        const xx = (this.position.x + offsetX) * scale;\n        const yy = (this.position.y + offsetY) * scale;\n        const width = this.width * scale;\n        const height = this.height * scale;\n\n        ctx.save();\n        if (this.img) {\n            ctx.drawImage(this.img, xx, yy, width, height);\n        }\n        ctx.lineWidth = this.lineWidth * scale;\n        ctx.strokeStyle = this.color;\n        ctx.fillStyle = this.fill;\n\n        ctx.beginPath();\n        ctx.moveTo(xx, yy);\n        \n        ctx.lineTo(xx + width, yy);\n        ctx.lineTo(xx + width, yy + height);\n        ctx.lineTo(xx, yy + height);\n        ctx.lineTo(xx, yy);\n\n        ctx.stroke();\n        ctx.fill();\n\n        ctx.restore();\n\n        if (this.isSelected)\n            this.drawOutline(ctx, xx, yy, width, height, scale);\n    }\n\n    drawOutline(ctx,xx,yy,width,height,scale) {\n        ctx.save();\n\n        ctx.lineWidth = this.lineWidth * scale * 1;\n        for (let i = 0; i < 3; ++i) {\n            ctx.beginPath();\n            ctx.moveTo(xx-i, yy-i);\n            ctx.strokeStyle = `rgba(0,${255-i*35},0,${.8/(i*.5+.8)})`;\n            ctx.lineTo(xx + width + i, yy - i);\n            ctx.lineTo(xx + width + i, yy + height + i);\n            ctx.lineTo(xx - i, yy + height + i);\n            ctx.lineTo(xx - i, yy - i);\n            ctx.stroke();\n        }\n\n        ctx.restore();    \n    }\n}\n\nmodule.exports = Rectangle;\n\n//# sourceURL=webpack:///./js/shapes/Rectangle.js?");

/***/ }),

/***/ "./js/tools/HexGrid.js":
/*!*****************************!*\
  !*** ./js/tools/HexGrid.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class HexGrid {\n    constructor(position, radius, rows, columns, name, lineWidth = 1, color = \"#FFFFFF\", txtFill = \"#FFFFFF\") {\n        this.position = position;\n        this.radius = radius;\n        this.columns = columns;\n        this.rows = rows;\n        this.name = name;\n        this.lineWidth = lineWidth;\n        this.color = color;\n        this.txtFill = txtFill;\n    }\n\n    getCoords(xi, yi) {\n        // xOffset\n        const xOffset = 2 * (3/4) * this.radius * xi;\n        // yOffset\n        const evenOdd = ((xi % 2) * 2) - 1;\n        const yAdd = (this.colums % 2 == 1 ? Math.sqrt(3) * this.radius : Math.sqrt(3) * this.radius / 2);\n        const yOffset = (1 + evenOdd) * Math.sqrt(3) * this.radius / 4 + 2*yAdd*yi;\n\n        const x = this.position.x + xOffset;\n        const y = this.position.y + yOffset;\n        return {x, y};\n    }\n\n    draw(ctx, offsetX, offsetY, scale) {\n        let x = (this.position.x + offsetX) * scale;\n        let y = (this.position.y + offsetY) * scale;\n        const radius = this.radius * scale;\n\n        ctx.save();\n        \n        ctx.lineWidth = this.lineWidth * scale;\n        ctx.strokeStyle = this.color;\n        ctx.setLineDash([10,5]);\n\n        let xInd = 0;\n        let yInd = 0;\n        let evenOdd = 1;\n        while (yInd < this.rows) {\n            const xx = x + radius;\n            const yy = y + radius;\n            ctx.beginPath();\n            ctx.moveTo(xx + radius * Math.cos(0), yy + radius * Math.sin(0));\n            for (let side = 0; side < 7; side++) {\n                ctx.lineTo(xx + radius * Math.cos(side * 2 * Math.PI / 6), \n                    yy + radius * Math.sin(side * 2 * Math.PI / 6));\n            }\n            ctx.stroke();\n\n            x += 2 * (3/4) * radius;\n            y += Math.sqrt(3) * radius / 2 * evenOdd; \n            evenOdd *= -1;\n            ++xInd;\n            if (xInd == this.columns) {\n                (evenOdd == 1 ? y += Math.sqrt(3) * radius : y += Math.sqrt(3) * radius / 2);\n                ++yInd;\n                evenOdd = 1;\n                x = (this.position.x + offsetX) * scale;\n                xInd = 0;\n            }\n        }\n        \n        ctx.fillStyle = this.txtFill;\n        ctx.font = `${300*scale} ${13*scale}px Arial`;\n        let xText = 0;\n        let yText = 0;\n        x = (this.position.x + offsetX) * scale;\n        y = (this.position.y + offsetY) * scale;\n        evenOdd = 1;\n        while (yText < this.rows) {\n            const txt = `(${yText}, ${xText})`;\n            const txtWidth = ctx.measureText(txt).width;\n\n            ctx.fillText(txt, x + radius - txtWidth/2, y + radius);\n            x += 2 * (3/4) * radius;\n            y += Math.sqrt(3) * radius / 2 * evenOdd;  \n            ++xText;\n            evenOdd *= -1;\n            if (xText == this.columns) {\n                (evenOdd == 1 ? y += Math.sqrt(3) * radius : y += Math.sqrt(3) * radius / 2);\n                x = (this.position.x + offsetX) * scale;\n                evenOdd = 1;\n                xText = 0;\n                ++yText;\n            }\n        }\n        \n        ctx.restore();\n    }\n}\n\nmodule.exports = HexGrid;\n\n//# sourceURL=webpack:///./js/tools/HexGrid.js?");

/***/ }),

/***/ "./js/tools/RectGrid.js":
/*!******************************!*\
  !*** ./js/tools/RectGrid.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class RectGrid {\n    constructor(position, width, height, rows, columns, name, lineWidth = 1, color = \"#FFFFFF\", txtFill = \"#FFFFFF\") {\n        this.position = position;\n        this.width = width;\n        this.height = height;\n        this.columns = columns;\n        this.rows = rows;\n        this.name = name;\n        this.lineWidth = lineWidth;\n        this.color = color;\n        this.txtFill = txtFill;\n    }\n\n    getCoords(xi, yi) {\n        const x = this.position.x + this.width * xi;\n        const y = this.position.y + this.height * yi;\n        return {x, y};\n    }\n\n    draw(ctx, offsetX, offsetY, scale) {\n        const xx = (this.position.x + offsetX) * scale;\n        const yy = (this.position.y + offsetY) * scale;\n        const width = this.width * scale;\n        const height = this.height * scale;\n\n        ctx.save();\n        \n        ctx.lineWidth = this.lineWidth * scale;\n        ctx.strokeStyle = this.color;\n        ctx.setLineDash([10,5]);\n\n        ctx.beginPath();\n        // Create outer rectangle\n        ctx.moveTo(xx, yy);\n        ctx.lineTo(xx + width * this.columns, yy);\n        ctx.lineTo(xx + width * this.columns, yy + height * this.rows);\n        ctx.lineTo(xx, yy + height * this.rows);\n        ctx.lineTo(xx, yy);\n\n        // Create inner grid lines\n        for (let n = 1; n < this.columns; ++n) {\n            // verticals\n            ctx.moveTo(xx + width*n, yy);\n            ctx.lineTo(xx + width*n, yy + height * this.rows);\n            // horizontals\n            ctx.moveTo(xx, yy + height*n);\n            ctx.lineTo(xx + width * this.columns, yy + height*n);\n        }\n\n        ctx.stroke();\n\n        ctx.fillStyle = this.txtFill;\n        ctx.font = `${300*scale} ${13*scale}px Arial`;\n        let xText = 0;\n        let yText = 0;\n        while (yText < this.rows) {\n            const txt = `(${yText}, ${xText})`;\n            const txtWidth = ctx.measureText(txt).width;\n\n            ctx.fillText(txt, xx + width*(xText + 1/2) - txtWidth/2, yy + height*(yText + 1/2)); \n            ++xText;\n            if (xText == this.columns) {\n                ++yText;\n                xText = 0;\n            }\n        }\n\n        ctx.restore();\n    }\n}\n\nmodule.exports = RectGrid;\n\n//# sourceURL=webpack:///./js/tools/RectGrid.js?");

/***/ }),

/***/ "./js/tools/gridMap.js":
/*!*****************************!*\
  !*** ./js/tools/gridMap.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const { pointInRect } = __webpack_require__(/*! ../helpers/collision.js */ \"./js/helpers/collision.js\");\n\nconst snapToGrid = function snapToGrid(obj, grid) {\n    const { position } = obj;\n    if (grid.constructor.name == \"RectGrid\") {\n        for (let row = 0; row < grid.xN; ++row) {\n            for (let col = 0; col < grid.yN; ++col) {\n                const xx = grid.position.x + grid.width*col - grid.width/2;\n                const yy = grid.position.y + grid.height*row - grid.height/2;\n                if (pointInRect(position.x, position.y, xx, yy, grid.width, grid.height)) {\n                    obj.position = grid.getCoords(col,row);\n                }\n            }\n        }\n    } else if (grid.constructor.name = \"HexGrid\") {\n        for (let row = 0; row < grid.rows; ++row) {\n            for (let col = 0; col < grid.columns; ++col) {\n                const pos = grid.getCoords(col,row);\n                const xx = pos.x;\n                const yy = pos.y;\n                if (pointInRect(position.x, position.y, xx-grid.radius, yy-grid.radius, 2*grid.radius, 2*grid.radius)) {\n                    obj.position = pos;\n                }\n            }\n        }           \n    }\n}\n\nmodule.exports = {\n    snapToGrid,\n}\n\n//# sourceURL=webpack:///./js/tools/gridMap.js?");

/***/ }),

/***/ "./js/world/GameScreen.js":
/*!********************************!*\
  !*** ./js/world/GameScreen.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class GameScreen {\n    constructor(canvasId) {\n        this.x = 0;\n        this.y = 0;\n        this.zoomScale = 1;\n        this.boundaries = { minX: 0, maxY: 0, maxX: 32768, minY: -32768, minZoom: 0.5, maxZoom: 1.2 };\n        this.viewWidth = 0;\n        this.viewHeight = 0;\n        this.canvasId = canvasId;\n        this.canvas = null;\n        this.ctx = null;\n        this.bgColor = null;\n        this.stop = false;\n    }\n\n    createCanvas(width, height) {\n        this.canvas = document.getElementById(this.canvasId);\n        this.ctx = this.canvas.getContext(\"2d\");\n        this.canvas.width = width;\n        this.canvas.height = height;\n        this.viewWidth = this.canvas.width * this.zoomScale;\n        this.viewHeight = this.canvas.height * this.zoomScale;\n    }\n\n    resizeCanvas(width,height) {\n        this.canvas.width = width;\n        this.canvas.height = height;\n    }\n\n    setBackgroundColor(bgColor) {\n        this.bgColor = bgColor;\n    }\n\n    move(dx, dy) {\n        this.x += dx;\n        this.y += dy;\n    }\n\n    update() {\n        \n    }\n\n    updateEnd() {\n    }\n    \n    draw() {\n        this.viewWidth = this.canvas.width / this.zoomScale;\n        this.viewHeight = this.canvas.height / this.zoomScale;\n        if (this.bgColor != null) {\n            this.ctx.fillStyle = this.bgColor;\n            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);\n        }\n    }\n\n    fitCanvasToBrowserView() {\n        this.canvas.width = window.innerWidth;\n        this.canvas.height = window.innerHeight;\n        \n        window.addEventListener(\"resize\",() => {\n            this.canvas.width = window.innerWidth;\n            this.canvas.height = window.innerHeight;\n            this.draw();\n        });\n    }\n\n    preventContextMenu() {\n        this.canvas.addEventListener(\"contextmenu\", (ev) => {\n            ev.preventDefault();\n        });\n    }\n};\n\nmodule.exports = GameScreen;\n\n//# sourceURL=webpack:///./js/world/GameScreen.js?");

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
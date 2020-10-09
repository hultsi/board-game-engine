const GameScreen = require("../world/GameScreen.js");
const GameTable = require("../world/GameTable.js");

const get = function get(name) {
    return this.arr.find(obj => obj.name == name);
}

const set = function set(obj) {
    this.all.push(obj)
}

const sortByZIndex = function sortByZIndex() {
    this.all.sort((a,b) => a.zIndex - b.zIndex);
}

const shouldSortMap = function shouldSortMap() {
    let zIndexPrev = null;
    for (const obj of this.all) {
        if (obj.zIndex < zIndexPrev) {
            sortObjectMap = true;
            return true;
        }
        zIndexPrev = obj.zIndex;
    }
    return false;
}

const game = {
    table: new GameTable(0, 0, "table"),
    screen: new GameScreen("screen"),
    grids: {
        all: [],
        get: get,
        set: set,
    },
    objects: {
        all: [],
        get: get,
        set: set, 
        sortByZIndex: sortByZIndex,
        shouldSortMap: shouldSortMap,
    },
    others: {
        dragged: {
            obj: null,
            offsetX: 0,
            offsetY: 0,
        },
        selected: null,
    },
}

module.exports = game;
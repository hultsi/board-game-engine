const express = require("express");
const route = express.Router();

route.get("/create", (req,res) => {
	res.sendFile("/home/hultsi/programming/javascript/board-game/server/build/html/createGame.html");
});

route.get("/join", (req,res) => {
	res.sendFile("/home/hultsi/programming/javascript/board-game/server/build/html/joinGame.html");
});

module.exports = route;
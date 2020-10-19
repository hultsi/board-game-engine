const express = require("express");
const bodyParser = require("body-parser");

const route = express.Router();

const jsonParser = bodyParser.json();

route.get("/", (req,res) => {
	res.sendFile("/home/hultsi/programming/javascript/board-game/server/build/html/game.html");
});

route.post("/create", jsonParser, (req,res) => {
	console.log("Creating game " + req.body.gameId);
	res.send({txt: "Game created"});
});

route.post("/join", jsonParser, (req,res) => {
	console.log("Joining game " + req.body.gameId);
	res.send({txt: "Some day you'll be able to join"});
});


module.exports = route;
const express = require("express");
const bodyParser = require("body-parser");

const route = express.Router();
const jsonParser = bodyParser.json();

const HTML_ROOT = `${__dirname}/../build/game-init/html`;
const gameList = [
	{
		id: "1234",
		playerCount: 0,
	}
];

route.get("/", (req,res) => {
	res.sendFile("game.html", { root: `${HTML_ROOT}` });
});

route.post("/create", jsonParser, (req,res) => {
	const { gameId } = req.body;
	console.log("Trying to create game " + gameId);
	if (gameList.find(el => el.id === gameId)) {
		res.send(false);
	} else {
		gameList.push({ id: gameId, playerCount: 1 });
		res.send(true);
	}
});

route.post("/join", jsonParser, (req,res) => {
	const { gameId } = req.body;
	const game = gameList.find(el => el.id === gameId);
	if (game) {
		console.log("Game id ok: " + gameId);
		res.send({ txt: "Joining game lobby..." });
	} else {
		res.send({ txt: "Some day you'll be able to join" });
	}
});


module.exports = route;
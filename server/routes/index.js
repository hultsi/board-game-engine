const express = require("express");
const route = express.Router();
const bodyParser = require("body-parser");

const HTML_ROOT = `${__dirname}/../../client/game-setup/game-init/html`;

const jsonParser = bodyParser.json();

route.get("/create", (req,res) => {
	res.sendFile("createGame.html", { root: HTML_ROOT});
});

route.post("/create", jsonParser, (req,res) => {
	const { gameId } = req.body;
	console.log("Trying to create game " + gameId);
	// if (gameList.find(el => el.id === gameId)) {
	// 	res.send(false);
	// } else {
	// 	gameList.push({ id: gameId, playerCount: 1 });
	// 	res.send(true);
	// }
});

route.get("/join", (req,res) => {
	res.sendFile("joinGame.html", { root: HTML_ROOT});
});

route.post("/join", jsonParser, (req,res) => {
	const { gameId } = req.body;
	// const game = gameList.find(el => el.id === gameId);
	// if (game) {
	// 	console.log("Game id ok: " + gameId);
	// 	res.send({ txt: "Joining game lobby..." });
	// } else {
	// 	res.send({ txt: "Some day you'll be able to join" });
	// }
});

module.exports = route;
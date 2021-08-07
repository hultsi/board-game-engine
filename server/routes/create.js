const express = require("express");
const route = express.Router();
const bodyParser = require("body-parser");

const HTML_ROOT = `${__dirname}/../../client/game-setup/game-init/html`;

const jsonParser = bodyParser.json();

let gameList = [];

route.get("/:gameId", (req,res) => {
	console.log(req.body.gameId);
	res.sendFile("createGame.html", { root: HTML_ROOT});
});

route.post("/", jsonParser, (req, res) => {
	const { gameName } = req.body;
	const gameId = "asd123";

	console.log("Trying to create game " + gameName);

	gameList.push({ id: gameId, name: gameName, playerCount: 1 });
	res.send({ id: gameId, name: gameName, playerCount: 1 });
});

// route.get("/join", (req,res) => {
// 	res.sendFile("joinGame.html", { root: HTML_ROOT});
// });

// route.post("/join", jsonParser, (req,res) => {
// 	const { gameId } = req.body;
// 	// const game = gameList.find(el => el.id === gameId);
// 	// if (game) {
// 	// 	console.log("Game id ok: " + gameId);
// 	// 	res.send({ txt: "Joining game lobby..." });
// 	// } else {
// 	// 	res.send({ txt: "Some day you'll be able to join" });
// 	// }
// });

module.exports = route;
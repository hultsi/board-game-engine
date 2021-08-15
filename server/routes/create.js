const express = require("express");
const route = express.Router();
// const bodyParser = require("body-parser");

const { gameList } = require("./resources/gameList.js");

const HTML_ROOT = `${__dirname}/../../client/build/other/html`;

// const jsonParser = bodyParser.json();

route.get("/:gameId", (req,res) => {
	let gameExists = false;
	for (let i = 0; i < gameList.length; ++i) {
		if (gameList[i].id === req.params.gameId) {
			gameExists = true;
			break;
		}
	}
	if (gameExists)
		res.sendFile("createGame.html", { root: HTML_ROOT});
	else
		res.redirect("../mainMenu");
});

route.post("/:gameId/info", (req,res) => {
	let game = {};
	for (let i = 0; i < gameList.length; ++i) {
		if (gameList[i].id === req.params.gameId) {
			game = gameList[i];
			break;
		}
	}
	console.log(game);
	if (game) {
		res.send({ err: null, game });
	}
});

module.exports = route;
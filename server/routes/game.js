const express = require("express");
const route = express.Router();
// const bodyParser = require("body-parser");

const { gameList } = require("./resources/gameList.js");

const HTML_ROOT = `${__dirname}/../../client/build/other/html`;

// const jsonParser = bodyParser.json();

route.get("/setup/:gameId", (req,res) => {
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

route.post("/info/:gameId", (req,res) => {
	let game = {};
	for (let i = 0; i < gameList.length; ++i) {
		if (gameList[i].id === req.params.gameId) {
			game = gameList[i];
			break;
		}
	}
	if (game) {
		res.send({ 
			err: null,
			game 
		});
	}
});

route.get("/play/:gameId", (req,res) => {
	res.redirect("../mainMenu");
});

module.exports = route;
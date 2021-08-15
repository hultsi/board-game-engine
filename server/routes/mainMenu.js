const express = require("express");
const bodyParser = require("body-parser");

const boardGame = require("./resources/gameList.js");

const route = express.Router();
const HTML_ROOT = `${__dirname}/../../client/build/other/html`;

route.use(bodyParser.urlencoded({ extended: true }));
route.use(express.json());

route.get("/", (req,res) => {
	res.sendFile("mainMenu.html", { root: HTML_ROOT});
});

route.post("/create", (req, res) => {
	const gameId = boardGame.createGame(req.session.userId, req.body.gameName);
	res.send({ err: null, success: true, gameId: gameId });
});


module.exports = route;
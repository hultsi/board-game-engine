const express = require("express");
const route = express.Router();

const HTML_ROOT = `${__dirname}/../build/game-init/html`;

route.get("/create", (req,res) => {
	res.sendFile("createGame.html", { root: HTML_ROOT});
});

route.get("/join", (req,res) => {
	res.sendFile("joinGame.html", { root: HTML_ROOT});
});

module.exports = route;
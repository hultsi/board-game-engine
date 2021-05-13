const express = require("express");
const route = express.Router();

const HTML_ROOT = `${__dirname}/../../client/game-setup/game-init/html`;

route.get("/", (req,res) => {
	res.sendFile("game.html", { root: `${HTML_ROOT}` });
});

module.exports = route;
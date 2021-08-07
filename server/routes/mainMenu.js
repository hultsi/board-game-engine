const express = require("express");
const bodyParser = require("body-parser");

const route = express.Router();
const HTML_ROOT = `${__dirname}/../../client/game-setup/game-init/html`;

route.use(bodyParser.urlencoded({ extended: true }));
route.use(express.json());

route.get("/", (req,res) => {
	res.sendFile("mainMenu.html", { root: HTML_ROOT});
});

route.post("/createGame", (req, res) => {
	res;
});


module.exports = route;
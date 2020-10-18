const express = require("express");
const route = express.Router();

route.get("/", (req,res) => {
	res.sendFile("/home/hultsi/programming/javascript/board-game/server/build/html/index.html");
});

module.exports = route;
const express = require("express");
const route = express.Router();

const HTML_ROOT = `${__dirname}/../build/login/html`;

route.get("/create", (req,res) => {
	res.sendFile("login.html", { root: HTML_ROOT});
});

module.exports = route;
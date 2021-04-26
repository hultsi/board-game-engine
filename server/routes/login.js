const express = require("express");
const bodyParser = require("body-parser");
const route = express.Router();

const HTML_ROOT = `${__dirname}/../build/login/html`;

route.use(bodyParser.urlencoded({ extended: true }));

const isValidAuth = function isValidAuth(req, res, next) {
	console.log(req.body);
	next();
};

route.get("/", isValidAuth, (req,res) => {
	res.sendFile("login.html", { root: HTML_ROOT});
});

module.exports = route;
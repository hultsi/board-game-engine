const express = require("express");
const bodyParser = require("body-parser");
const route = express.Router();

const HTML_ROOT = `${__dirname}/../build/login/html`;

route.use(bodyParser.urlencoded({ extended: true }));
route.use(express.json());

const isValidAuth = function isValidAuth(req, res, next) {
	console.log(req.body);
	next();
};

route.get("/", (req,res) => {
	res.sendFile("login.html", { root: HTML_ROOT});
});

route.post("/", isValidAuth, (req,res) => {
	
});

module.exports = route;
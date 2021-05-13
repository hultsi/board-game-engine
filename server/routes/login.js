const express = require("express");
const bodyParser = require("body-parser");
const UserSQLHandle = require("../sql_objects/UserSQLHandle");

const route = express.Router();
const HTML_ROOT = `${__dirname}/../../client/game-setup/login/html`;
const userSql = new UserSQLHandle("accounts");

route.use(bodyParser.urlencoded({ extended: true }));
route.use(express.json());

const isValidAuth = async function isValidAuth(req, res, next) {
	if (await userSql.credentialsMatch(req.body.username, req.body.password)) {
		console.log("Match!");	
		next();
	} else {
		console.log("Failed");
		res.send({ err: "Try again" });
	}
};

route.get("/", (req,res) => {
	res.sendFile("login.html", { root: HTML_ROOT});
});

route.post("/", isValidAuth, (req,res) => {
	res.send({ err: null, result: "well done dude"});
});

module.exports = route;
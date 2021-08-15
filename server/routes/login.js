const express = require("express");
const bodyParser = require("body-parser");
const UserSQLHandle = require("../sql_objects/UserSQLHandle");

const route = express.Router();
const HTML_ROOT = `${__dirname}/../../client/build/other/html`;
const userSql = new UserSQLHandle("accounts");

route.use(bodyParser.urlencoded({ extended: true }));
route.use(express.json());

const isValidAuth = async function isValidAuth(req, res, next) {
	if (await userSql.credentialsMatch(req.body.username, req.body.password)) {
		next();
	} else {
		res.send({ err: null, loggedIn: false});
	}
};

route.get("/", (req,res) => {
	res.sendFile("login.html", { root: HTML_ROOT});
});

route.post("/", isValidAuth, async (req,res) => {
	if (!req.session.userId) {
		req.session.userId = await userSql.getUserId(req.body.username);
	}
	res.send({ err: null, loggedIn: true});
});

module.exports = route;
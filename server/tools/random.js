const crypto = require("crypto");

const createUniqueId = function createUniqueId() {
	const rnd0 = crypto.randomBytes(8).toString("hex");
	const rnd1 = (new Date()).getTime();
	return `${rnd0}-${rnd1}`;
};

module.exports = {
	createUniqueId,
};
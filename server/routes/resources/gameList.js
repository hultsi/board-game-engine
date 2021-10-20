const { createUniqueId } = require("../../tools/random.js");

// todo: move list to sql
let gameList = [];

const createGame = function createGame(host, gameName) {
	const game = {
		id: createUniqueId(),
		name: gameName,
		players: 1,
		maxPlayers: 2,
		host: host,
		playerList: [
			host,
		],
	};
	gameList.push(game);
	return game.id;
};

module.exports = {
	gameList,
	createGame,
};
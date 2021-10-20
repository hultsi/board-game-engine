const createGameBtn = document.getElementById("create-game-btn");

const createGame = function createGame() {

}

const updatePlayersContainer = function updatePlayersContainer(players) {
	const pContainer = document.getElementById("players-container");
	for (let i = 0; i < players.length; ++i) {
		const div = document.createElement("div");
		div.classList.add("player");
		div.innerHTML = players[i];
		pContainer.appendChild(div);
	}
}

const getGameInfo = async function getGameInfo() {
	const gameId = window.location.pathname.split("/")[3];
	document.getElementById("game-id-field").innerHTML = gameId;

	const reqPath = `http://localhost:5000/game/info/${gameId}`;
	const resp = await fetch(`${reqPath}`, {
		method: "post",
		headers: {
			"Content-Type": "application/json;charset=utf-8"
		},
		body: JSON.stringify({ gameId })
	}).then(response => response.json());

	document.getElementById("game-name-field").innerHTML = resp.game.name;
	updatePlayersContainer(resp.game.playerList);
};

createGameBtn.addEventListener("click", createGame);
getGameInfo();
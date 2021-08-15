const createGameBtn = document.getElementById("create-game-btn");

const getGameInfo = async function getGameInfo() {
	const gameId = window.location.pathname.split("/")[2];
	document.getElementById("game-id-field").innerHTML = gameId;

	const reqPath = `http://localhost:5000/create/${gameId}/info`;
	const resp = await fetch(`${reqPath}`, {
		method: "post",
		headers: {
			"Content-Type": "application/json;charset=utf-8"
		},
		body: JSON.stringify({ gameId })
	}).then(response => response.json());

	document.getElementById("game-name-field").innerHTML = resp.game.name;
};
getGameInfo();
//createGameBtn.addEventListener("click", createGame);
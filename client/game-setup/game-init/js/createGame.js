const createGameBtn = document.getElementById("create-game-btn");
const createGameInput = document.getElementById("create-game-input");

const createGame = async function createGame() {
	const gameId = document.getElementById("create-game-input").value;
	if (gameId.length < 4) {
		return false;
	}
	const root = "http://localhost:5000";
	const resp = await fetch(`${root}/game/create`, {
		method: "post",
		headers: {
			"Content-Type": "application/json;charset=utf-8"
		},
		body: JSON.stringify({ gameId })
	}).then(response => response.json());

	console.log(resp);
	window.location.replace(`${root}/game`);
	return true;	
};

createGameInput.addEventListener("keydown", (e) => {
	if (e.key === "Enter")
		createGame();
});
createGameBtn.addEventListener("click", createGame);
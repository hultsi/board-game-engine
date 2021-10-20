const createGame = document.getElementById("create-game-btn");
const joinGame = document.getElementById("join-game-btn");

createGame.addEventListener("click", () => {
	// Need to take user to createGame
	// a game id needs to be generated within backend
	const gameName = "dummy";
	const endpoint = "http://localhost:5000/mainMenu/create";
	
	fetch(endpoint, { 
		method: "post",
		body: JSON.stringify({
			gameName: gameName
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	}).then(async ans => {
		const body = await ans.json();
		// Send req to move to main.html
		if (body.success)
			window.location.href = `http://localhost:5000/game/setup/${body.gameId}`;
	});	
});

joinGame.addEventListener("click", () => {
	// Take user to joinGame 
	// and show a list of available games
	
});
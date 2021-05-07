/*eslint no-undef:*/
const socket = io("/game_123");

socket.on("connect", () => {
	console.log("Connected to server");
});

socket.on("initiateGame", (msg) => {
	console.log(msg);
});

socket.on("disconnect", () => {
	
});
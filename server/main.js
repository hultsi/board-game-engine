// const bodyParser = require("body-parser");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 5000 || process.env.PORT;

app.get("/",(req,res) => {
	res.sendFile("/home/hultsi/programming/javascript/board-game/server/public/index.html");
});

io.on("connection", () => {
	console.log("hmm");
});

server.listen(PORT, () => {
	console.log(`Listening to port ${PORT}`);
});

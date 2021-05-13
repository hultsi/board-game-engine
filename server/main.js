// const bodyParser = require("body-parser");
const express = require("express");

const socketIo = require("./socketIo/socketIo.js");
const route_index = require("./routes/index.js");
const route_game = require("./routes/game.js");
const route_login = require("./routes/login.js");

const app = express();
socketIo.initSocketIo(app);

const PORT = Number(process.env.PORT) || 5000;
const STATIC_FOLDER_LOGIN = `${__dirname}/../client/game-setup/`;

app.use(express.static(STATIC_FOLDER_LOGIN));

app.use("/", route_index);
app.use("/game", route_game);
app.use("/login", route_login);

socketIo.createNamespace("/game_123");
socketIo.addNamespaceListener("/game_123", "connection", (socket) => {
	console.log("Client connected");
	socket.emit("initiateGame","Hello there");
});

socketIo.socket.server.listen(PORT, () => {
	console.log(`Listening to port ${PORT}`);
});
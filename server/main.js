// const bodyParser = require("body-parser");
const express = require("express");

const socketIo = require("./socketIo/socketIo.js");
const route_index = require("./routes/index.js");
const route_other = require("./routes/other.js");

const app = express();
const io = socketIo.initSocketIo(app);

const PORT = 5000 || Number(process.env.PORT);
const STATIC_FOLDER = "/home/hultsi/programming/javascript/board-game/server/build";

app.use(express.static(STATIC_FOLDER));
app.use("/", route_index);
app.use("/other", route_other);

socketIo.createNamespace("/game_123");
socketIo.addNamespaceListener("/game_123", "connection", (socket) => {
	console.log("Client connected");
	socket.emit("initiateGame","Hello there");
});

socketIo.socket.server.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
});

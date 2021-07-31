// const bodyParser = require("body-parser");
const express = require("express");
const session = require("express-session");

const socketIo = require("./socketIo/socketIo.js");
const route_create = require("./routes/create.js");
const route_game = require("./routes/game.js");
const route_login = require("./routes/login.js");
const route_mainMenu = require("./routes/mainMenu.js");

const { isLoggedIn } = require("./routes/middleware.js");

const app = express();
socketIo.initSocketIo(app);

const PORT = Number(process.env.PORT) || 5000;
const STATIC_FOLDER_LOGIN = `${__dirname}/../client/game-setup/`;

// todo: save sessions to sql
app.use(express.static(STATIC_FOLDER_LOGIN));
// app.use("trust proxy", 1); Trust proxy if set behind one
app.use(session({
	secret: "some secret word", // Figure out some better one here?
	resave: false, // This is fine as is
	saveUninitialized: true, // Change to false at some point?
	rolling: true, // Reset maxAge counter on every request
	cookie: {
		secure: false, // Set to true if using HTTPS
		maxAge: 1000 * 60 * 5, // Milliseconds
	}
}));
app.use(isLoggedIn);
app.use("/login", route_login);
app.use("/mainMenu", route_mainMenu);
app.use("/create", route_create);
app.use("/game", route_game);

socketIo.createNamespace("/game_123");
socketIo.addNamespaceListener("/game_123", "connection", (socket) => {
	console.log("Client connected");
	socket.emit("initiateGame","Hello there");
});

socketIo.socket.server.listen(PORT, () => {
	console.log(`Listening to port ${PORT}`);
});
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
    mode: "development", // "production" | "development" | "none"
    
    entry: {
		main: "./game/js/main.js",
		login: "./game-setup/login/js/login.js",
		mainMenu: "./game-setup/game-init/js/mainMenu.js",
		joinGame: "./game-setup/game-init/js/joinGame.js",
		createGame: "./game-setup/game-init/js/createGame.js",
	}, // string | object | array
    
    output: {
        path: path.resolve(__dirname, "build"), // string
        filename: "./js/[name].bundle.js",
    },

    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './game/html', to: "./" },
				{ from: './game/css', to: "./css" },
				{ from: './game/assets', to: "./assets" },

				{ from: './game-setup/game-init/html', to: "./" },
				{ from: './game-setup/game-init/css', to: "./css" },
            ]
        }),       
    ],
};

module.exports = config;
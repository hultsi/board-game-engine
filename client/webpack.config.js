const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
    mode: "development", // "production" | "development" | "none"
    
    entry: [
        "./game/js/main.js",
    ], // string | object | array
    
    output: {
        path: path.resolve(__dirname, "build"), // string
        filename: "./js/bundle.js",
    },

    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './game/html', to: "./" },
				{ from: './game/css', to: "./css" },
				{ from: './game/assets', to: "./assets" },
            ]
        }),       
    ],
};

module.exports = config;
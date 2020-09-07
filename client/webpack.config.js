const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const config = {
    mode: "development", // "production" | "development" | "none"
    
    entry: [
        "./js/main.js",
    ], // string | object | array
    
    output: {
        path: path.resolve(__dirname, "build"), // string
        filename: "./js/bundle.js",
    },

    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: './html', to: "./" },
                { from: './css', to: "./css" },
            ]
        }),       
    ],
};

module.exports = config;
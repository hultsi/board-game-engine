const socketIo = require("socket.io");
const http = require("http");

const socket = {
	server: null,
	io: null,
	namespaces: [],
	rooms: [],
};

const initSocketIo = function initSocketIo(expressApp) {
	socket.server = http.createServer(expressApp);
	socket.io = socketIo(socket.server);
	return socket.io;
};

const createNamespace = function createNamespace(name) {
	const namespace = socket.io.of(name);
	socket.namespaces.push(namespace);
	return namespace;
};

const addNamespaceListener = function addNamespaceListener(name, listener, callback) {
	if (name && listener && callback) {
		socket.namespaces.find((el) => el.name === name).on(listener, callback);
		return true;
	} else {
		return false;
	}
};

const addNamespaceMiddleware = function addNamespaceMiddleware(name, callback) {
	if (name && callback) {
		socket.namespaces.find((el) => el.name === name).use(callback);
		return true;
	} else {
		return false;
	}
};

module.exports = {
	socket,
	initSocketIo,
	createNamespace,
	addNamespaceListener,
	addNamespaceMiddleware,
};
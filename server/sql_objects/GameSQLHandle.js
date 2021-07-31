const fs = require("fs");
const { Pool } = require("pg");
const { createUniqueId } = require("../tools/random.js");

const path = `${__dirname}/../../sql-creds/creds.json`;
const creds = JSON.parse(fs.readFileSync(path));

class GameSQLHandle {
	constructor(accountsTable) {
		this.pool = new Pool(creds);
		this.table = accountsTable;
	}

	// todo: make sure the username isn't in use
	async createGame() {
		const id = createUniqueId();
		const created_on = new Date().toISOString().slice(0, 10).split("-");
		const query = `insert into ${this.table}(game_id, created_on) values($1, $2)`;
		const values = [id, created_on];
		await this.pool.query(query, values);
	}
}

module.exports = GameSQLHandle;
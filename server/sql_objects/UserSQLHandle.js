const fs = require("fs");
const { Pool } = require("pg");
const argon2 = require("argon2");

const path = `${__dirname}/../../sql-creds/creds.json`;
const creds = JSON.parse(fs.readFileSync(path));

class UserSQLHandle {
	constructor(accountsTable) {
		this.pool = new Pool(creds);
		this.table = accountsTable;
	}

	async createUser(username, password) {
		const pwdHash = await argon2.hash(password);
		const created_on = new Date().toISOString().slice(0, 10).split("-");
		const last_login = created_on;
		const query = `insert into ${this.table}(username, password, created_on, last_login) values($1, $2, $3, $4)`;
		const values = [username, pwdHash, created_on, last_login];
		await this.pool.query(query, values);
	}

	async getUser(username) {
		const values = [username];
		return (await this.pool.query(`select * from ${this.table} where username = $1`, values)).rows;
	}

	async getAllUsers() {
		return (await this.pool.query(`select * from ${this.table}`)).rows;
	}

	async deleteUser(username) {
		const values = [username];
		const res = await this.pool.query(`delete from ${this.table} where username = $1`, values);
		if (!res.rowCounts)
			return false;
		return true;
	}

	async credentialsMatch(username, password) {
		const user = await this.getUser(username);
		if (user.length === 0)
			return false;
		if (await argon2.verify(user[0].password, password))
			return true;
		return false;
	}
	// async updateUser(username) {
	// 	// todo
	// }
}

module.exports = UserSQLHandle;
export class Chats {
	#tableName = 'chats';
	#database;

	constructor(database) {
		this.#database = database;
	}

	async dropTable() {
		const sql = `DROP TABLE IF EXISTS ${this.#tableName}`;
		await this.#database.run(sql);
	}

	async initTable() {
		const sql = `
			CREATE TABLE IF NOT EXISTS ${this.#tableName} (
				id INTEGER PRIMARY KEY NOT NULL,
				state TEXT NOT NULL,
				username TEXT NOT NULL
			)`;
		await this.#database.run(sql);
	}

	async add(id, state, username) {
		const sql = `INSERT INTO ${this.#tableName} (id, state, username) VALUES (?, ?, ?)`;
		await this.#database.run(sql, id, state, username);
	}

	async changeState(id, newState) {
		const sql = `UPDATE ${this.#tableName} SET state = ? WHERE id = ?`;
		await this.#database.run(sql, newState, id);
	}

	async getIds() {
		const sql = `SELECT id FROM ${this.#tableName}`;
		return (await this.#database.all(sql))
			.map((chat) => chat.id);
	}

	async getUsernames() {
		const sql = `SELECT username FROM ${this.#tableName}`;
		return (await this.#database.all(sql))
			.map((chat) => chat.username);
	}

	async getState(id) {
		const sql = `SELECT state FROM ${this.#tableName} WHERE id = ?`;
		return (await this.#database.get(sql, id))?.state;
	}
}


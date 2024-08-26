export class Settings {
	#tableName = 'settings';
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
				key TEXT PRIMARY KEY NOT NULL,
				value REAL NOT NULL
			)`;
		await this.#database.run(sql);
	}

	async changeRate(newValue) {
		const sql = `INSERT OR REPLACE INTO ${this.#tableName} (key, value) VALUES ('rate', ?)`;
		await this.#database.run(sql, newValue);
	}

	async changePercent(newValue) {
		const sql = `INSERT OR REPLACE INTO ${this.#tableName} (key, value) VALUES ('percent', ?)`;
		await this.#database.run(sql, newValue);
	}

	async getRate() {
		const sql = `SELECT value FROM ${this.#tableName} WHERE key = 'rate'`;
		return (await this.#database.get(sql)).value;
	}

	async getPercent() {
		const sql = `SELECT value FROM ${this.#tableName} WHERE key = 'percent'`;
		return (await this.#database.get(sql)).value;
	}
}


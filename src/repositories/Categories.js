export class Categories {
	#tableName = 'categories';
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
				name TEXT PRIMARY KEY NOT NULL,
				markup REAL NOT NULL
			)`;
		await this.#database.run(sql);
	}

	async add(name, markup) {
		const sql = `INSERT INTO ${this.#tableName} (name, markup) VALUES (?, ?)`;
		await this.#database.run(sql, name, markup);
	}

	async remove(name) {
		const sql = `DELETE FROM ${this.#tableName} WHERE name = ?`;
		await this.#database.run(sql, name);
	}

	async changeName(name, newName) {
		const sql = `UPDATE ${this.#tableName} SET name = ? WHERE name = ?`;
		await this.#database.run(sql, newName, name);
	}

	async changeMarkup(name, newMarkup) {
		const sql = `UPDATE ${this.#tableName} SET markup = ? WHERE name = ?`;
		await this.#database.run(sql, newMarkup, name);
	}

	async getAll() {
		const sql = `SELECT * FROM ${this.#tableName}`;
		return await this.#database.all(sql);
	}

	async getNames() {
		const sql = `SELECT name FROM ${this.#tableName}`;
		return (await this.#database.all(sql))
			.map((category) => category.name);
	}

	async getMarkup(name) {
		const sql = `SELECT * FROM ${this.#tableName} WHERE name = ?`;
		return (await this.#database.get(sql, name)).markup;
	}
}


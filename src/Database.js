const sqlite = (await import('sqlite3')).default.verbose();

export class Database {
	#database;

	async connect(filename) {
		return new Promise((resolve, reject) => {
			this.#database = new sqlite.Database(filename, (error) => {
				if (error) reject(error);
				else resolve();
			});
		});
	}

	async run(sql, ...args) {
		return new Promise((resolve, reject) => {
			this.#database.run(sql, ...args, (error) => {
				if (error) reject(error);
				else resolve();
			});
		});
	}

	async all(sql, ...args) {
		return new Promise((resolve, reject) => {
			this.#database.all(sql, ...args, (error, result) => {
				if (error) reject(error);
				else resolve(result);
			});
		});
	}
	
	async get(sql, ...args) {
		return new Promise((resolve, reject) => {
			this.#database.get(sql, ...args, (error, result) => {
				if (error) reject(error);
				else resolve(result);
			});
		});
	}
}


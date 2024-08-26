import { Database } from '../Database.js';

const database = new Database();
try {
	await database.connect('./database.db');
} catch (error) {
	console.error(error.message);
}

export { database };


import { Categories } from '../repositories/Categories.js';
import { database } from './database.js';

const categories = new Categories(database);
try {
	await categories.initTable();
} catch (error) {
	console.error(error.message);
}

export { categories };


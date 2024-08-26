import { Settings } from '../repositories/Settings.js'; 
import { database } from './database.js';

const settings = new Settings(database);
try {
	await settings.initTable();
} catch (error) {
	console.error(error.message);
}

export { settings };



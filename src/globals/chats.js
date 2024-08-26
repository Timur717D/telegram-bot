import { Chats } from '../repositories/Chats.js';
import { database } from './database.js';

const chats = new Chats(database);
try {
	await chats.initTable();
} catch (error) {
	console.error(error.message);
}

export { chats };


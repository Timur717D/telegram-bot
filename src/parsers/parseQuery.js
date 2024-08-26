import { parseMessage } from './parseMessage.js';

export const parseQuery = (query) => ({
	...parseMessage(query.message),
	text: query.data
});


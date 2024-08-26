import TelegramBot from 'node-telegram-bot-api';

import { 
	telegramBotToken, 
	password,
	againText,
	deleteText,
	againButton
} from './globals/constants.js';

import { categories } from './globals/categories.js';
import { settings } from './globals/settings.js';
import { chats } from './globals/chats.js';

import { createKeyboard } from './content/createKeyboard.js';
import { createHelloMessage } from './content/createHelloMessage.js';
import { createResultMessage } from './content/createResultMessage.js';

import { executeCommand } from './admin/executeCommand.js';

import { parseMessage } from './parsers/parseMessage.js';
import { parseQuery } from './parsers/parseQuery.js';

const showMenu = async (chatId, names, bot) => {
	await bot.sendMessage(
		chatId,
		'Выберите категорию товаров',
		createKeyboard(...names)
	);
}

const getResult = async (sum, state) => {
	const rate = await settings.getRate();
	const percent = await settings.getPercent();
	const markup = await categories.getMarkup(state);
	return Math.ceil((sum * rate * (percent + 100) / 100 + markup) * 0.02) * 50;
}

const bot = new TelegramBot(telegramBotToken, { polling: true });

bot.on('message', async (message) => {
	const { chatId, messageId, text, username } = parseMessage(message);
	const names = await categories.getNames();
	let state = await chats.getState(chatId);

	if (state === undefined) {
		await chats.add(chatId, 'menu', username);
	}
	state = await chats.getState(chatId);
	
	if (state === 'menu') {
		await bot.deleteMessage(chatId, messageId);
	} else if (names.includes(state)) {
		await chats.changeState(chatId, 'menu');
		await bot.deleteMessage(chatId, message.message_id - 1);
		await bot.deleteMessage(chatId, message.message_id);

		const sum = parseFloat(text);
		await bot.sendMessage(
			chatId,
			createResultMessage(await getResult(sum, state)),
			{ ...againButton, parse_mode: 'Markdown' } );
	}

	if (text === '/start') {
		await bot.sendMessage(chatId, createHelloMessage());
		showMenu(chatId, names, bot);
	}
});

bot.on('callback_query', async (query) => {
	const { chatId, messageId, text } = parseQuery(query);
	const names = await categories.getNames();

	if (names.includes(text)) {
		await chats.changeState(chatId, text);
		await bot.deleteMessage(chatId, messageId);
		await bot.sendMessage(
			chatId, 
			'Введите сумму в *ЮАНЯХ*',
			{ parse_mode: 'Markdown' }
		);
	} else if (text === againText) {
		await bot.deleteMessage(chatId, messageId);
		await showMenu(chatId, names, bot);
	} else if (text === deleteText) {
		await bot.deleteMessage(chatId, messageId);
	}
});

bot.onText(new RegExp(`/${password}`), async (message) => await executeCommand(message, bot));


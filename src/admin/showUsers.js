import { chats } from '../globals/chats.js';
import { deleteButton } from '../globals/constants.js';

export const showUsers = async (chatId, args, bot) => {
	try {
		const users = await chats.getUsernames();
		const result = users.join('\n');
		await bot.sendMessage(
			chatId, 
			`Все пользователи бота:\n${result}\nВсего: ${users.length}`, 
			deleteButton
		);
	} catch (error) {
		await bot.sendMessage(chatId, `Произошла ошибка`, deleteButton);
		console.error(error.message);
	}
};


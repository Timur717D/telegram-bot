import { deleteButton } from '../globals/constants.js';

export const unknownCommand = async (chatId, args, bot) => {
	try {
		await bot.sendMessage(
			chatId, 
			`Такой команды нет. Вводи внимательней`,
			deleteButton
		);
	} catch (error) {
		await bot.sendMessage(chatId, `Произошла ошибка`, deleteButton);
		console.error(error.message);
	}
};


import { settings } from '../globals/settings.js';
import { deleteButton } from '../globals/constants.js';

export const changeRate = async (chatId, args, bot) => {
	try {
		const newRate = args[0];
		await settings.changeRate(newRate);
		await bot.sendMessage(chatId, `Курс успешно сменён`, deleteButton);
	} catch (error) {
		await bot.sendMessage(chatId, `Произошла ошибка`, deleteButton);
		console.error(error.message);
	}
};


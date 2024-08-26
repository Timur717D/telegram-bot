import { settings } from '../globals/settings.js';
import { deleteButton } from '../globals/constants.js';

export const changePercent = async (chatId, args, bot) => {
	try {
		const newPercent = args[0];
		await settings.changePercent(newPercent);
		await bot.sendMessage(chatId, `Процент успешно сменён`, deleteButton);
	} catch (error) {
		await bot.sendMessage(chatId, `Произошла ошибка`, deleteButton);
		console.error(error.message);
	}
};


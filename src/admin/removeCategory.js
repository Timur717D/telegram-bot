import { categories } from '../globals/categories.js';
import { deleteButton } from '../globals/constants.js';

export const removeCategory = async (chatId, args, bot) => {
	try {
		const name = args[0];
		await categories.remove(name);
		await bot.sendMessage(chatId, `Категория успешно удалена`, deleteButton);
	} catch (error) {
		await bot.sendMessage(chatId, `Произошла ошибка`, deleteButton);
		console.error(error.message);
	}
};


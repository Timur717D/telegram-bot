import { categories } from '../globals/categories.js';
import { deleteButton } from '../globals/constants.js';

export const addCategory = async (chatId, args, bot) => {
	try {
		const [name, markup] = args;
		await categories.add(name, markup);
		await bot.sendMessage(chatId, `Категория успешно создана`, deleteButton);
	} catch (error) {
		await bot.sendMessage(chatId, `Произошла ошибка`, deleteButton);
		console.error(error.message);
	}
};


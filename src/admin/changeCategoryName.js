import { categories } from '../globals/categories.js';
import { deleteButton } from '../globals/constants.js';

export const changeCategoryName = async (chatId, args, bot) => {
	try {
		const [name, newName] = args;
		await categories.changeName(name, newName);
		await bot.sendMessage(chatId, `Название категории успешно сменено`, deleteButton);
	} catch (error) {
		await bot.sendMessage(chatId, `Произошла ошибка`, deleteButton);
		console.error(error.message);
	}
};


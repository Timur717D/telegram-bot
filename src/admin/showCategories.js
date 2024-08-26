import { categories } from '../globals/categories.js';
import { deleteButton } from '../globals/constants.js';

export const showCategories = async (chatId, args, bot) => {
	try {
		const result = (await categories.getAll())
			.map((category) => `Название - ${category.name}, наценка - ${category.markup}`)
			.join(`\n`);
		await bot.sendMessage(chatId, `Категории:\n${result}`, deleteButton);
	} catch (error) {
		await bot.sendMessage(chatId, `Произошла ошибка`, deleteButton);
		console.error(error.message);
	}
};


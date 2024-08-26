import { categories } from '../globals/categories.js';
import { deleteButton } from '../globals/constants.js';

export const changeCategoryMarkup = async (chatId, args, bot) => {
	try {
		const [name, newMarkup] = args;
		await categories.changeMarkup(name, newMarkup);
		await bot.sendMessage(chatId, `Наценка категории успешно сменена`, deleteButton);
	} catch (error) {
		await bot.sendMessage(chatId, `Произошла ошибка`, deleteButton);
		console.error(error.message);
	}
};


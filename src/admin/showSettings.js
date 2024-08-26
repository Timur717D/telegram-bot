import { settings } from '../globals/settings.js';
import { deleteButton } from '../globals/constants.js';

export const showSettings = async (chatId, args, bot) => {
	try {
		const rate = await settings.getRate();
		const percent = await settings.getPercent();
		await bot.sendMessage(
			chatId, 
`Формула расчёта:
Результат = сумма * курс + процент + наценка

Текущие настройки:
Курс - ${rate}
Процент - ${percent}%`, 
			deleteButton
		);
	} catch (error) {
		await bot.sendMessage(chatId, `Произошла ошибка`, deleteButton);
		console.error(error.message);
	}
};


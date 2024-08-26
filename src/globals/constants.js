(await import('dotenv')).config();
import { createKeyboard } from '../content/createKeyboard.js';

export const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
export const password = process.env.PASSWORD;

export const againText = 'Заново';
export const deleteText = 'Удалить';

export const againButton = createKeyboard(againText);
export const deleteButton = createKeyboard(deleteText);


import { parseCommand } from '../parsers/parseCommand.js';

import { showSettings } from './showSettings.js';
import { changeRate } from './changeRate.js';
import { changePercent } from './changePercent.js';
import { showCategories } from './showCategories.js';
import { addCategory } from './addCategory.js';
import { removeCategory } from './removeCategory.js';
import { changeCategoryName } from './changeCategoryName.js';
import { changeCategoryMarkup } from './changeCategoryMarkup.js';
import { showUsers } from './showUsers.js';
import { unknownCommand } from './unknownCommand.js';

const keywords = [
	'show_settings',
	'change_rate',
	'change_percent',
	'show_categories',
	'add_category',
	'remove_category',
	'change_category_name',
	'change_category_markup',
	'show_users'
];

const methods = [
	showSettings,
	changeRate,
	changePercent,
	showCategories,
	addCategory,
	removeCategory,
	changeCategoryName,
	changeCategoryMarkup,
	showUsers
];

const commands = Object.fromEntries(
	keywords.map((keyword, index) => [keywords[index], methods[index]])
);

export const executeCommand = async (message, bot) => {
	const { chatId, command, args } = parseCommand(message);	
	if (keywords.includes(command)) {
		commands[command](chatId, args, bot);
	} else {
		unknownCommand(chatId, args, bot);
	}
};


export const parseCommand = (message) => {
	const arr = message.text.split(' ');
	return {
		chatId: message.chat.id,
		command: arr[1],
		args: arr.slice(2, arr.length) 
	};
};


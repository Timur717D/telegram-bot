export const parseMessage = (message) => ({
	chatId: message.chat.id,
	messageId: message.message_id,
	text: message.text,
	username: message.from.username
});


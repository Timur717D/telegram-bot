export const createKeyboard = (...items) => ({ 
	reply_markup: { 
		inline_keyboard: [
			...items.map((item) => [{
				text: item,
				callback_data: item
			}])
		] 
	} 
});


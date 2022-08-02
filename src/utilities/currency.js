const defaultCurrencyOptions = {
	currency: 'usd',
	style: 'currency',
};

// todo locale support
export const formatCurrency = (number, options = defaultCurrencyOptions) => {
	return number.toLocaleString('en-US', { ...defaultCurrencyOptions, ...options });
};

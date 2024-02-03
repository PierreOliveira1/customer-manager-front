export function maskPhoneNumber(value: string, inputType: string): string {
	value = value.replace(/\D/g, '');
	let formatted = '';

	if (value.length > 0) formatted += '(' + value.substring(0, 1);
	value = value.substring(1);

	if (inputType === 'deleteContentBackward' && value.length < 2) {
		return formatted + value;
	}

	if (value.length > 0) formatted += value.substring(0, 1) + ') ';
	value = value.substring(1);

	if (value.length > 4) formatted += value.substring(0, 4) + '-';
	else formatted += value;

	value = value.substring(4);
	formatted += value;

	if (formatted.length > 14) {
		formatted = formatted.replace(/\D/g, '');
		const match = formatted.match(/^(\d{2})(\d{1})(\d{4})(\d{4})$/);
		if (match) formatted = `(${match[1]}) ${match[2]} ${match[3]}-${match[4]}`;
	}

	return formatted;
}

export function unmaskPhoneNumber(value: string): string {
	const cleaned = value.replace(/\D/g, '');
	return cleaned;
}

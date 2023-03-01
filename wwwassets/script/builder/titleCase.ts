const SEPARATORS = /([ -])/;

export function toTitleCase(text: string): string {
	return text
		.split(SEPARATORS)
		.map((word, index) => {
			if (index % 2 === 0 && word.length) {
				const [first, ...rest] = word;
				return first.toUpperCase() + rest.join('').toLowerCase();
			} else {
				return word;
			}
		})
		.join('');
}

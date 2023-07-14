/**
 * Compare two strings in a natural way, where numbers are compared as numbers.
 * 
 * @example
 * // returns ['1', '2', '10']
 * ['1', '10', '2'].sort(naturalCompare)
 */
export function naturalCompare(a: string|null|undefined, b: string|null|undefined): number {
	// any null, empty or undefined comes first (!!'' == false)
	if (!a || !b) return +!!a - +!!b;
	const aParts = a.match(/[0-9]+|[^0-9]+/g)!;
	const bParts = b.match(/[0-9]+|[^0-9]+/g)!;
	for (const i of aParts.keys()) {
		if (bParts.length <= i) return 1;
		const aText = !/^[0-9]/.test(aParts[i]);
		const bText = !/^[0-9]/.test(bParts[i]);
		if (aText !== bText) return +aText - +bText;
		if (aText) {
			const cmp = aParts[i].localeCompare(bParts[i]);
			if (cmp !== 0) return cmp;
		} else {
			const cmp = parseInt(aParts[i], 10) - parseInt(bParts[i], 10);
			if (cmp !== 0) return cmp;
		}
	}
	return -1;
}
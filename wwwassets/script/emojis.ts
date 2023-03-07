import {UnicodeData} from "./unicodeInterface";
import {toCodePoints} from "./builder/builder";
import {fromEntries} from "./helpers";

const u = UnicodeData

const ESCAPE_REGEX = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-'].join('|\\') + ')', 'g');
const SEPARATOR = '%';
const SEPARATOR_REGEX_G = /%/g;
const SEARCH_ID = SEPARATOR + '([\\d,]+)' + SEPARATOR + '[^' + SEPARATOR + ']*';

const index = new Map<string, string>();
for (const c of Object.values(u.clusters)) {
	if (!c.parent) {
		index.set(toCodePoints(c.cluster).join(',').toString(), `${c.name} ${c.alias?.join(' ') ?? ''}`);
	}
}
for (const c of Object.values(u.chars)) {
	index.set(c.code.toString(), `${c.n} ${c.alias?.join(' ') ?? ''} ${c.falias?.join(' ') ?? ''}`);
}
console.log(index);
const searchHaystack = Array.from(index.entries()).map(([k, v]) => `${SEPARATOR}${k}${SEPARATOR}${v.replace(SEPARATOR_REGEX_G, '')}`).join('');

function escapeRegex(str: string): string {
	return str.replace(ESCAPE_REGEX, '\\$1');
}

export function search(needle: string): string[] {
	let result: string[] = [];
	needle.split(/\s+/g).forEach((n, k) => {
		let filter: string[] = [];
		if (!n.length) return;
		const re = new RegExp(SEARCH_ID + escapeRegex(n.replace(SEPARATOR_REGEX_G, '')), 'ig');
		for (let m; (m = re.exec(searchHaystack));) {
			filter.push(m[1]);
		}
		if (k == 0) result = filter;
		else {
			const f = new Set(filter);
			result = result.filter(v => f.has(v));
		}
	})

	// Score the entries, +1 for full word match, -1 for a match not at the start of a word
	const scores = fromEntries(result.map(v => [v, 0] as const));
	for (const n of needle.split(/\s+/g)) {
		if (!n.length) continue;
		const re1 = new RegExp('(?:[^a-z]|^)' + escapeRegex(n) + '(?:[^a-z]|$)', 'i');
		const re2 = new RegExp('(?:[^a-z]|^)' + escapeRegex(n), 'i');
		for (const r of result) {
			if (re1.test(index.get(r)!)) scores[r]++;
			else if (!re2.test(index.get(r)!)) scores[r]--;
		}
	}
	result.sort((a, b) => scores[b] - scores[a]);
	return result.map(v => String.fromCodePoint(...v.split(',').map(v => parseInt(v, 10))));
}

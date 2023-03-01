import {Paths} from "./config";
import * as peggy from "peggy";
import {Dictionary} from "../data";

/*
 * Parsers for Unicode data files
 */

const EmojiDataRegex = new RegExp(
	`^(?<char>[0-9A-F]+(?:..[0-9A-F]+)?)\\s*;\\s*(?<attr>[A-Za-z_]+)\\s*#\\s*E?(?<version>[0-9.]+)\\s*\\[`
);

export type EmojiVersion = Record<number, string|undefined>;

export async function parseEmojiVersions(emojiDataPath: string): Promise<EmojiVersion> {
	const emojiVersion: EmojiVersion = {};
	const text = await fetch(emojiDataPath).then(r => r.text());

	for (const line of text.split('\n')) {
		if (!line.length || line.startsWith('#')) continue;
		const m = line.match(EmojiDataRegex)?.groups;
		if (m) {
			if (m['char'].includes('..')) {
				const [from, to] = m['char'].split('..').map(s => parseInt(s, 16));
				const version = m['version'];
				for (let char = from; char <= to; char++) {
					emojiVersion[char] = version;
				}
			} else {
				const char = parseInt(m['char'], 16);
				emojiVersion[char] = m['version'];
			}
		}
	}

	return emojiVersion;
}

export const enum GeneralCategory {
	/** an uppercase letter */
	Uppercase_Letter = "Lu",
	/** a lowercase letter */
	Lowercase_Letter = "Ll",
	/** a digraphic character, with first part uppercase */
	Titlecase_Letter = "Lt",
	/** Lu | Ll | Lt */
	Cased_Letter = "LC",
	/** a modifier letter */
	Modifier_Letter = "Lm",
	/** other letters, including syllables and ideographs */
	Other_Letter = "Lo",
	/** Lu | Ll | Lt | Lm | Lo */
	Letter = "L",
	/** a nonspacing combining mark (zero advance width) */
	Nonspacing_Mark = "Mn",
	/** a spacing combining mark (positive advance width) */
	Spacing_Mark = "Mc",
	/** an enclosing combining mark */
	Enclosing_Mark = "Me",
	/** Mn | Mc | Me */
	Mark = "M",
	/** a decimal digit */
	Decimal_Number = "Nd",
	/** a letterlike numeric character */
	Letter_Number = "Nl",
	/** a numeric character of other type */
	Other_Number = "No",
	/** Nd | Nl | No */
	Number = "N",
	/** a connecting punctuation mark, like a tie */
	Connector_Punctuation = "Pc",
	/** a dash or hyphen punctuation mark */
	Dash_Punctuation = "Pd",
	/** an opening punctuation mark (of a pair) */
	Open_Punctuation = "Ps",
	/** a closing punctuation mark (of a pair) */
	Close_Punctuation = "Pe",
	/** an initial quotation mark */
	Initial_Punctuation = "Pi",
	/** a final quotation mark */
	Final_Punctuation = "Pf",
	/** a punctuation mark of other type */
	Other_Punctuation = "Po",
	/** Pc | Pd | Ps | Pe | Pi | Pf | Po */
	Punctuation = "P",
	/** a symbol of mathematical use */
	Math_Symbol = "Sm",
	/** a currency sign */
	Currency_Symbol = "Sc",
	/** a non-letterlike modifier symbol */
	Modifier_Symbol = "Sk",
	/** a symbol of other type */
	Other_Symbol = "So",
	/** Sm | Sc | Sk | So */
	Symbol = "S",
	/** a space character (of various non-zero widths) */
	Space_Separator = "Zs",
	/** U+2028 LINE SEPARATOR only */
	Line_Separator = "Zl",
	/** U+2029 PARAGRAPH SEPARATOR only */
	Paragraph_Separator = "Zp",
	/** Zs | Zl | Zp */
	Separator = "Z",
	/** a C0 or C1 control code */
	Control = "Cc",
	/** a format control character */
	Format = "Cf",
	/** a surrogate code point */
	Surrogate = "Cs",
	/** a private-use character */
	Private_Use = "Co",
	/** a reserved unassigned code point or a noncharacter */
	Unassigned = "Cn",
	/** Cc | Cf | Cs | Co | Cn */
	Other = "C",
}
export const enum CanonicalCombiningClass {
	/** Spacing and enclosing marks; also many vowel and consonant signs, even if nonspacing */
	Not_Reordered = 0,
	/** Marks which overlay a base letter or symbol */
	Overlay = 1,
	/** Diacritic reading marks for CJK unified ideographs */
	Han_Reading = 6,
	/** Diacritic nukta marks in Brahmi-derived scripts */
	Nukta = 7,
	/** Hiragana/Katakana voicing marks */
	Kana_Voicing = 8,
	/** Viramas */
	Virama = 9,
	/** Start of fixed position classes */
	Ccc10 = 10,
	/** End of fixed position classes */
	Ccc199 = 199,
	/** Marks attached at the bottom left */
	Attached_Below_Left = 200,
	/** Marks attached directly below */
	Attached_Below = 202,
	/** Marks attached at the bottom right */
	Ccc204 = 204,
	/** Marks attached to the left */
	Ccc208 = 208,
	/** Marks attached to the right */
	Ccc210 = 210,
	/** Marks attached at the top left */
	Ccc212 = 212,
	/** Marks attached directly above */
	Attached_Above = 214,
	/** Marks attached at the top right */
	Attached_Above_Right = 216,
	/** Distinct marks at the bottom left */
	Below_Left = 218,
	/** Distinct marks directly below */
	Below = 220,
	/** Distinct marks at the bottom right */
	Below_Right = 222,
	/** Distinct marks to the left */
	Left = 224,
	/** Distinct marks to the right */
	Right = 226,
	/** Distinct marks at the top left */
	Above_Left = 228,
	/** Distinct marks directly above */
	Above = 230,
	/** Distinct marks at the top right */
	Above_Right = 232,
	/** Distinct marks subtending two bases */
	Double_Below = 233,
	/** Distinct marks extending above two bases */
	Double_Above = 234,
	/** Greek iota subscript only */
	Iota_Subscript = 240,
}
export const enum BidiClass {
	/** any strong left-to-right character */
	Left_To_Right = "L",
	/** any strong right-to-left (non-Arabic-type) character */
	Right_To_Left = "R",
	/** any strong right-to-left (Arabic-type) character */
	Arabic_Letter = "AL",
	/** any ASCII digit or Eastern Arabic-Indic digit */
	European_Number = "EN",
	/** plus and minus signs */
	European_Separator = "ES",
	/** a terminator in a numeric format context, includes currency signs */
	European_Terminator = "ET",
	/** any Arabic-Indic digit */
	Arabic_Number = "AN",
	/** commas, colons, and slashes */
	Common_Separator = "CS",
	/** any nonspacing mark */
	Nonspacing_Mark = "NSM",
	/** most format characters, control codes, or noncharacters */
	Boundary_Neutral = "BN",
	/** various newline characters */
	Paragraph_Separator = "B",
	/** various segment-related control codes */
	Segment_Separator = "S",
	/** spaces */
	White_Space = "WS",
	/** most other symbols and punctuation marks */
	Other_Neutral = "ON",
	/** U+202A: the LR embedding control */
	Left_To_Right_Embedding = "LRE",
	/** U+202D: the LR override control */
	Left_To_Right_Override = "LRO",
	/** U+202B: the RL embedding control */
	Right_To_Left_Embedding = "RLE",
	/** U+202E: the RL override control */
	Right_To_Left_Override = "RLO",
	/** U+202C: terminates an embedding or override control */
	Pop_Directional_Format = "PDF",
	/** U+2066: the LR isolate control */
	Left_To_Right_Isolate = "LRI",
	/** U+2067: the RL isolate control */
	Right_To_Left_Isolate = "RLI",
	/** U+2068: the first strong isolate control */
	First_Strong_Isolate = "FSI",
	/** U+2069: terminates an isolate control */
	Pop_Directional_Isolate = "PDI",
}

export type UnicodeDataChar = {
	name: string;
	code: number;
	category: GeneralCategory;
	combining: CanonicalCombiningClass;
	bidiClass: BidiClass;
	decompositionUD?: string;
	decimalDigit?: number;
	digit?: number;
	numeric?: string;
	bidiMirrored: boolean;
	unicode1?: string;
	comment?: string[];
	uppercase?: string;
	lowercase?: string;
	titlecase?: string;
}
export type UnicodeData = Record<number, UnicodeDataChar>;

export async function parseUnicodeData(p: Paths): Promise<UnicodeData> {
	const data: UnicodeData = {};

	const text = await fetch(p.unicodeDataPath).then(r => r.text());
	for (const line of text.split('\n')) {
		if (!line.length) continue;
		const [hex, name, category, combining, bidiClass, decomposition, decimalDigit, digit, numeric, bidiMirrored, unicode1, comment, uppercase, lowercase, titlecase] = line.split(';');
		const code = parseInt(hex, 16);
		data[code] = {
			name, code,
			category: category as GeneralCategory,
			combining: parseInt(combining, 10),
			bidiClass: bidiClass as BidiClass,
			decompositionUD: decomposition.length ? decomposition : undefined,
			decimalDigit: decimalDigit.length ? parseInt(decimalDigit, 10) : undefined,
			digit: digit.length ? parseInt(digit, 10) : undefined,
			numeric: numeric.length ? numeric : undefined,
			bidiMirrored: bidiMirrored === 'Y',
			unicode1: unicode1.length ? unicode1 : undefined,
			comment: comment.length ? [comment] : undefined,
			uppercase: uppercase.length ? uppercase : undefined,
			lowercase: lowercase.length ? lowercase : undefined,
			titlecase: titlecase.length ? titlecase : undefined,
		};
	}

	return data;
}

export type NamesListChar = {
	name: string;
	code: number;
	alias?: string[];
	falias?: string[];
	ref?: number[];
	decomposition?: string[];
	variation?: {
		code: number;
		sel: string;
		name: string;
	}[];
	notice?: string[];
	comment?: string[];
};
export type NamesListData = {
	title: {
		title: string;
		info: {
			subtitle?: string[];
			sub?: string;
			comment?: string[];
			notice?: string[];
			break?: true;
		}
	},
	block: {
		start: number;
		end: number;
		name: string;
		sub: {
			name: string;
			notice?: string[];
			char?: NamesListChar[];
		}[]
	}[]
}

export async function parseNamesList(p: Paths): Promise<NamesListData> {
	const text = await fetch(p.namesListPath).then(r => r.text());
	const parser = peggy.generate(await fetch('./script/namesList.pegjs').then(r => r.text()));
	return parser.parse(text);
}

type EmojiGroup = {
	name: string;
	sub: EmojiSubGroup[];
}
type EmojiSubGroup = {
	name: string;
	clusters: string[];
}
type SequenceType = 'component' | 'fully-qualified' | 'minimally-qualified' | 'unqualified';
type EmojiSequence = {
	sequence: string;
	type: SequenceType;
	name: string;
	version: string;
}
export type EmojiTestData = {
	groups: EmojiGroup[],
	sequences: Dictionary<EmojiSequence|undefined>,
};

export async function parseEmojiTest(p: { emojiTestPath: string }): Promise<EmojiTestData> {
	const groups: EmojiGroup[] = [];
	const sequences: Dictionary<EmojiSequence> = {};

	let g: EmojiGroup = {name: '', sub: []};
	let s: EmojiSubGroup = {name: '', clusters: []};

	const data = await fetch(p.emojiTestPath).then(f => f.text());
	for (const line of data.split('\n')) {
		const m = line.match(/^# group: (?<group>.+)$|^# subgroup: (?<subGroup>.+)$|^(?<code>[0-9a-f]+(?: [0-9a-f]+)*) +; +(?<type>[a-z-]+) +# (?<symbol>[^ ]+) E(?<version>[\d.]+) (?<name>.+)$/i)?.groups;
		if (m) {
			if (m['group']) {
				g = {name: m['group'], sub: []};
				groups.push(g);
			} else if (m['subGroup']) {
				s = {name: m['subGroup'], clusters: []};
				g.sub.push(s);
			} else if (m['code']) {
				const sequence = String.fromCodePoint(...m['code'].split(' ').map((hex) => parseInt(hex, 16)));
				s.clusters.push(sequence);
				sequences[sequence] = {
					sequence,
					type: m['type'] as SequenceType,
					name: m['name'],
					version: m['version'],
				};
			}
		}
	}

	return {groups, sequences};
}

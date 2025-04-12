import {SoftHyphen, ZeroWidthJoiner} from "../chars";
import {VK, VKAbbr} from "../layout/vk";
import {ArrowsKeyboard} from "./arrows";
import {MathKeyboard} from "./math";
import {emojiGroup} from "../unicodeInterface";
import {UnicodeKeyboard} from "./unicodeBoard";
import {toCodePoints} from "../builder/builder";
import {ExtendedLatin} from "./extendedLatin";

function unicodeRange(from: string | number, to: string | number): string[] {
	const result: string[] = [];
	const codeFrom = typeof from === 'number' ? from : toCodePoints(from)[0];
	const codeTo = typeof to === 'number' ? to : toCodePoints(to)[0];
	if (codeFrom && codeTo && codeTo > codeFrom) {
		for (let i = codeFrom; i <= codeTo; ++i) result.push(String.fromCodePoint(i));
	}
	return result;
}

/**
 * An item that will be placed on one key, either:
 * - a symbol
 * - a blank key
 * - array of 1 symbol: symbol without variants (atm. only emoji skin color)
 * - array of 2 symbols: the second symbols is accessed with shift or right-click, e.g. for small and capital letters
 * - array of 3+ symbols: least-recently used symbol on left click, other symbols on right click
 * - a keyboard key (can be nested)
 */
export type KeyboardItem = string | null | string[] | EmojiKeyboard | Cluster;
export type SpriteRef = {
	spriteMap: string;
	sprite: string;
};
export type KeyCap = string | SpriteRef;
export type EmojiKeyboard = {
	/** Name must be unique */
	name: string;
	/** Name as shown in the status bar */
	statusName?: string;
	symbol: KeyCap;
	/** Only set to true on the main keyboard */
	top?: true;
	/** Do not add to recently used */
	noRecent?: true;
	/** Place the items on the free keys, paging when necessary */
	content?: KeyboardItem[] | (() => KeyboardItem[]);
	/** Place the items according the Virtual Key code i.e. based on the symbols on the keys */
	byVK?: { [vk in VK | VKAbbr]?: KeyboardItem }
	/** Place the items by row */
	byRow?: (KeyboardItem[] | Record<string, never>)[]
};
export type Cluster = {
	cluster: string;
	name: string;
	symbol?: KeyCap;
};

export function isCluster(item: KeyboardItem): item is Cluster {
	return typeof item === 'object' && (item?.hasOwnProperty('cluster') ?? false);
}

export type SpriteMap = {
	path: string,
	width: number,
	height: number,
	padding?: number;
	cols: number;
	rows: number;
	index: Record<string, { row: number, col: number }>
}
export type Plugin = {
	name: string;
	data: PluginData;
}
export type PluginData = {
	name: string;
	symbol: KeyCap;
	boards?: EmojiKeyboard[];
	spriteMaps?: Record<string, SpriteMap>;
}

export const MAIN_BOARD: EmojiKeyboard = {
	name: 'Main Board',
	top: true,
	symbol: '⌨',
	content: [
		{
			name: "Happy",
			symbol: "😀",
			content: [
				...emojiGroup({group: "Smileys & Emotion", subGroup: "face-smiling"}),
				...emojiGroup({group: "Smileys & Emotion", subGroup: "face-affection"}),
				...emojiGroup({group: "Smileys & Emotion", subGroup: "face-tongue"}),
				...emojiGroup({group: "Smileys & Emotion", subGroup: "face-hand"}),
				...emojiGroup({group: "Smileys & Emotion", subGroup: "face-neutral-skeptical"}),
				...emojiGroup({group: "Smileys & Emotion", subGroup: "face-hat"}),
				...emojiGroup({group: "Smileys & Emotion", subGroup: "face-glasses"}),
			]
		},
		{
			name: "Unwell",
			symbol: "😱",
			content: [
				...emojiGroup({group: "Smileys & Emotion", subGroup: "face-sleepy"}),
				...emojiGroup({group: "Smileys & Emotion", subGroup: "face-unwell"}),
				...emojiGroup({group: "Smileys & Emotion", subGroup: "face-concerned"}),
				...emojiGroup({group: "Smileys & Emotion", subGroup: "face-negative"}),
			]
		},
		{
			name: "Roles",
			symbol: "👻",
			content: [
				...emojiGroup({group: "Smileys & Emotion", subGroup: "face-costume"}),
				...emojiGroup({group: "People & Body", subGroup: "person-fantasy"}),
			]
		},
		{
			name: "Body",
			symbol: "👍",
			content: [
				...emojiGroup({group: "People & Body", subGroup: "hand-fingers-open"}),
				...emojiGroup({group: "People & Body", subGroup: "hand-fingers-partial"}),
				...emojiGroup({group: "People & Body", subGroup: "hand-single-finger"}),
				...emojiGroup({group: "People & Body", subGroup: "hand-fingers-closed"}),
				...emojiGroup({group: "People & Body", subGroup: "hands"}),
				...emojiGroup({group: "People & Body", subGroup: "hand-prop"}),
				...emojiGroup({group: "People & Body", subGroup: "body-parts"}),
			]
		},
		{
			name: "Gestures & activities",
			symbol: "💃",
			content: [
				...emojiGroup({group: "People & Body", subGroup: "person-gesture"}),
				...emojiGroup({group: "People & Body", subGroup: "person-activity"}),
				...emojiGroup({group: "People & Body", subGroup: "person-resting"}),
			]
		},
		{
			name: "Persons",
			symbol: "👤",
			content: [
				...emojiGroup({group: "People & Body", subGroup: "person"}),
				...emojiGroup({group: "People & Body", subGroup: "person-role"}),
				...emojiGroup({group: "People & Body", subGroup: "person-symbol"}),
			]
		},
		{
			name: "Emotions",
			symbol: "😺",
			content: [
				...emojiGroup({group: "Smileys & Emotion", subGroup: "cat-face"}),
				...emojiGroup({group: "Smileys & Emotion", subGroup: "monkey-face"}),
				...emojiGroup({group: "Smileys & Emotion", subGroup: "heart"}),
				...emojiGroup({group: "Smileys & Emotion", subGroup: "emotion"}),
			]
		},
		{
			name: "Families",
			symbol: "👪",
			content: [
				...emojiGroup({group: "People & Body", subGroup: "family"}),
			]
		},
		{
			name: "Clothing",
			symbol: "👖",
			content: [
				...emojiGroup({group: "Objects", subGroup: "clothing"}),
			]
		},
		{
			name: "Animals",
			symbol: "🐦",
			content: [
				...emojiGroup({group: "Animals & Nature", subGroup: "animal-mammal"}),
				...emojiGroup({group: "Animals & Nature", subGroup: "animal-bird"}),
				...emojiGroup({group: "Animals & Nature", subGroup: "animal-amphibian"}),
				...emojiGroup({group: "Animals & Nature", subGroup: "animal-reptile"}),
				...emojiGroup({group: "Animals & Nature", subGroup: "animal-marine"}),
				...emojiGroup({group: "Animals & Nature", subGroup: "animal-bug"}),
			]
		},
		{
			name: "Plants",
			symbol: "🌹",
			content: [
				...emojiGroup({group: "Animals & Nature", subGroup: "plant-flower"}),
				...emojiGroup({group: "Animals & Nature", subGroup: "plant-other"}),
			]
		},
		{
			name: "Raw food",
			symbol: "🥝",
			content: [
				...emojiGroup({group: "Food & Drink", subGroup: "food-fruit"}),
				...emojiGroup({group: "Food & Drink", subGroup: "food-vegetable"}),
				...emojiGroup({group: "Food & Drink", subGroup: "drink"}),
				...emojiGroup({group: "Food & Drink", subGroup: "dishware"}),
			]
		},
		{
			name: "Cooked",
			symbol: "🌭",
			content: [
				...emojiGroup({group: "Food & Drink", subGroup: "food-prepared"}),
				...emojiGroup({group: "Food & Drink", subGroup: "food-asian"}),
				...emojiGroup({group: "Food & Drink", subGroup: "food-sweet"}),
			]
		},
		{
			name: "Places",
			symbol: "🏡",
			content: [
				...emojiGroup({group: "Travel & Places", subGroup: "place-map"}),
				...emojiGroup({group: "Travel & Places", subGroup: "place-geographic"}),
				...emojiGroup({group: "Travel & Places", subGroup: "place-building"}),
				...emojiGroup({group: "Travel & Places", subGroup: "place-religious"}),
				...emojiGroup({group: "Travel & Places", subGroup: "place-other"}),
				...emojiGroup({group: "Travel & Places", subGroup: "hotel"}),
			]
		},
		{
			name: "Vehicles",
			symbol: "🚗",
			content: [
				...emojiGroup({group: "Travel & Places", subGroup: "transport-ground"}),
			]
		},
		{
			name: "Ships",
			symbol: "✈️",
			content: [
				...emojiGroup({group: "Travel & Places", subGroup: "transport-air"}),
				...emojiGroup({group: "Travel & Places", subGroup: "transport-water"}),
			]
		},
		{
			name: "Time",
			symbol: "⌛",
			content: [
				...emojiGroup({group: "Travel & Places", subGroup: "time"})
			]
		},
		{
			name: "Weather",
			symbol: "⛅",
			content: [
				...emojiGroup({group: "Travel & Places", subGroup: "sky & weather"})
			]
		},
		{
			name: "Sports",
			symbol: "🎽",
			content: [
				...emojiGroup({group: "Activities", subGroup: "sport"}),
				...emojiGroup({group: "People & Body", subGroup: "person-sport"})
			]
		},
		{
			name: "Activities",
			symbol: "🎮",
			content: [
				...emojiGroup({group: "Activities", subGroup: "event"}),
				...emojiGroup({group: "Activities", subGroup: "award-medal"}),
				...emojiGroup({group: "Activities", subGroup: "game"}),
				...emojiGroup({group: "Activities", subGroup: "arts & crafts"})
			]
		},
		{
			name: "Sound & light",
			symbol: "🎥",
			content: [
				...emojiGroup({group: "Objects", subGroup: "sound"}),
				...emojiGroup({group: "Objects", subGroup: "music"}),
				...emojiGroup({group: "Objects", subGroup: "musical-instrument"}),
				...emojiGroup({group: "Objects", subGroup: "light & video"})
			]
		},
		{
			name: "Tech",
			symbol: "💻",
			content: [
				...emojiGroup({group: "Objects", subGroup: "phone"}),
				...emojiGroup({group: "Objects", subGroup: "computer"}),
				...emojiGroup({group: "Objects", subGroup: "mail"}),
			]
		},
		{
			name: "Objects",
			symbol: "📜",
			content: [
				...emojiGroup({group: "Objects", subGroup: "book-paper"}),
				...emojiGroup({group: "Objects", subGroup: "money"}),
				...emojiGroup({group: "Objects", subGroup: "writing"}),
				...emojiGroup({group: "Objects", subGroup: "science"}),
				...emojiGroup({group: "Objects", subGroup: "medical"}),
				...emojiGroup({group: "Objects", subGroup: "household"}),
				...emojiGroup({group: "Objects", subGroup: "other-object"}),
			]
		},
		{
			name: "Work",
			symbol: "💼",
			content: [
				...emojiGroup({group: "Objects", subGroup: "office"}),
				...emojiGroup({group: "Objects", subGroup: "lock"}),
				...emojiGroup({group: "Objects", subGroup: "tool"})
			]
		},
		{
			name: "Signs",
			symbol: "⛔",
			content: [
				...emojiGroup({group: "Symbols", subGroup: "transport-sign"}),
				...emojiGroup({group: "Symbols", subGroup: "warning"}),
				...emojiGroup({group: "Symbols", subGroup: "zodiac"}),
				...emojiGroup({group: "Flags", subGroup: "flag"}),
			]
		},
		{
			name: "Symbols",
			symbol: "⚜️",
			content: [
				...emojiGroup({group: "Symbols", subGroup: "religion"}),
				...emojiGroup({group: "Symbols", subGroup: "gender"}),
				...emojiGroup({group: "Symbols", subGroup: "punctuation"}),
				...emojiGroup({group: "Symbols", subGroup: "currency"}),
				...emojiGroup({group: "Symbols", subGroup: "other-symbol"})
			]
		},
		{
			name: "Alphanum",
			symbol: "🔤",
			content: [
				...emojiGroup({group: "Symbols", subGroup: "alphanum"})
			]
		},
		{
			name: "Geometric & keys",
			symbol: "🔷",
			content: [
				...emojiGroup({group: "Symbols", subGroup: "keycap"}),
				...emojiGroup({group: "Symbols", subGroup: "geometric"}),
				...emojiGroup({group: "Symbols", subGroup: "av-symbol"})
			]
		},
		{
			name: "World Flags",
			symbol: "🌐",
			content: [
				...emojiGroup({group: "Flags", subGroup: "country-flag"}),
				...emojiGroup({group: "Flags", subGroup: "subdivision-flag"}),
			]
		},
		{
			name: "Greek",
			symbol: "π",
			noRecent: true,
			content: [
				"∂",
				"ϵ",
				"ϑ",
				"ϴ",
				"ϰ",
				"ϖ",
				"ϱ",
				"ϕ",
				"∇",
				["ϝ", "Ϝ"],
			],
			byVK: {
				a: ["α", "Α"],
				b: ["β", "Β"],
				c: ["ψ", "Ψ"],
				d: ["δ", "Δ"],
				e: ["ε", "Ε"],
				f: ["φ", "Φ"],
				g: ["γ", "Γ"],
				h: ["η", "Η"],
				i: ["ι", "Ι"],
				j: ["ξ", "Ξ"],
				k: ["κ", "Κ"],
				l: ["λ", "Λ"],
				m: ["μ", "Μ"],
				n: ["ν", "Ν"],
				o: ["ο", "Ο"],
				p: ["π", "Π"],
				q: ";",
				r: ["ρ", "Ρ"],
				s: ["σ", "Σ"],
				t: ["τ", "Τ"],
				u: ["θ", "Θ"],
				v: ["ω", "Ω"],
				w: "ς",
				x: ["χ", "Χ"],
				y: ["υ", "Υ"],
				z: ["ζ", "Ζ"],
				[VK.Period]: "·",
				[VK.Comma]: "ϐ",
			}
		},
		{
			name: "Boxes",
			symbol: "╚",
			byRow: [
				[
					["│", "║"],
					["─", "═"],
					"╱",
					"╲",
					"╳",
					["┃"],
					["━"],
					["╴", "╸"],
					["╵", "╹"],
					["╷", "╻"],
					["╶", "╺"],
				],
				[
					["┌", "╔"],
					["┬", "╦"],
					["┐", "╗"],
					["┏"],
					["┳"],
					["┓"],
					["╒", "╓"],
					["╤", "╥"],
					["╕", "╖"],
					"╭",
					"╮",
					{
						name: "Dashed",
						symbol: "┉",
						byRow: [
							["┆", "┇", "┊", "┋", "╎", "╏"],
							["┄", "┅", "┈", "┉", "╌", "╍"]
						]
					}
				],
				[
					["├", "╠"],
					["┼", "╬"],
					["┤", "╣"],
					["┣"],
					["╋"],
					["┫"],
					["╞", "╟"],
					["╪", "╫"],
					["╡", "╢"],
					"╰",
					"╯",
					{
						name: "Mixed Lines",
						symbol: "╆",
						content: [
							"┍", "┎", "┭", "┮",
							"┯", "┰", "┱", "┲",
							"┑", "┒",
							"┝", "┞", "┟", "┠", "┡", "┢",
							"┽", "┾", "┿", "╀", "╁", "╂", "╃", "╄", "╅", "╆", "╇", "╈", "╉", "╊",
							"┥", "┦", "┧", "┨", "┩", "┪",
							"┕", "┖",
							"┵", "┶", "┷", "┸", "┹", "┺",
							"┙", "┚",
							"╽", "╿",
							"╼", "╾",
						]
					}
				],
				[
					["└", "╚"],
					["┴", "╩"],
					["┘", "╝"],
					["┗"],
					["┻"],
					["┛"],
					["╘", "╙"],
					["╧", "╨"],
					["╛", "╜"],
				],
			],
		},
		ExtendedLatin,
		ArrowsKeyboard,
		{
			name: `Typo${SoftHyphen}graphy`,
			symbol: "‽",
			content: [
				"\u00a0", // No-Break\nSpace
				"\u202f", // Narrow\nNo-Break\nSpace
				"\u2001", // EM\nQuad
				"\u2000", // EN\nQuad
				"\u2003", // EM\nSpace
				"\u2002", // EN\nSpace
				"\u2004", // ⅓ EM\nSpace
				"\u2005", // ¼ EM\nSpace
				"\u2006", // ⅙ EM\nSpace
				"\u2009", // Thin\nSpace
				"\u200a", // Hair\nSpace
				"\u2007", // Figure\nSpace
				"\u2008", // Punctuation\nSpace
				"\u200b", // Zero\nWidth\nSpace
				"\u200c", // Zero\nWidth\nNon-Joiner
				ZeroWidthJoiner,
				"\u205f", // Medium\nMath\nSpace
				"\u3000", // Ideographic\nSpace
				SoftHyphen, // Soft\nHyphen
				"–", "—", "―", // Hyphens
				"“", "”", "‟", "„", "«", "»", "‹", "›", "‘", "’", "‛", "‚", // Quotes
				"¿", "¡", "‽", "‼", "°", "¦", // Punctuation
				"·",
				"•",
			]
		},
		{
			name: "Currency",
			symbol: "¤",
			content: [
				"¤",
				/* Afghani */ "₳",
				/* Austral */ "؋",
				/* Baht */ "฿",
				/* Bitcoin */ "₿",
				/* Cedi */ "₵",
				/* Cent */ "¢",
				/* Colon */ "₡",
				/* Cruzeiro */ "₢",
				/* Dollar */ "$",
				/* Dong */ "₫",
				/* Drachma */ "₯",
				/* Euro, Currency */ "₠",
				/* Euro, Symbol */ "€",
				/* Floren */ "ƒ",
				/* Franc */ "₣",
				/* Guarani */ "₲",
				/* Hryvnia */ "₴",
				/* Kip */ "₭",
				/* Lari */ "₾",
				/* Lira */ "₤",
				/* Lira, Turkish */ "₺",
				/* Livre Tournois */ "₶",
				/* Manat */ "₼",
				/* Mark, German */ "ℳ",
				/* Mark, Nordic */ "₻",
				/* Mill */ "₥",
				/* Naira */ "₦",
				/* Penny, German */ "₰",
				/* Peseta */ "₧",
				/* Peso */ "₱",
				/* Pound */ "£",
				/* Rial */ "﷼",
				/* Riel, Khmer */ "៛",
				/* Ruble */ "₽",
				/* Rupee */ "₨",
				/* Rupee, Bengali */ "৳",
				/* Rupee, Gujarati */ "૱",
				/* Rupee, Indian */ "₹",
				/* Rupee, Mark */ "৲",
				/* Rupee, Tamil */ "௹",
				/* Sheqel, New */ "₪",
				/* Som */ "⃀",
				/* Spesmilo */ "₷",
				/* Tenge */ "₸",
				/* Tugrik */ "₮",
				/* Won */ "₩",
				/* Yen */ "¥",
				/* Yen 2 */ "円",
				/* Yuan */ "元",
				/* Yuan 2 */ "圓",
			]
		},
		MathKeyboard,
		UnicodeKeyboard,
	]
};

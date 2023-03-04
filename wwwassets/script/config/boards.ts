import {UnicodeEmojiGroup} from "../unidata";
import {SC, VK} from "../data";
import {SoftHyphen, ZeroWidthJoiner} from "../chars";

export type KeyboardItem = string | null | string[];
export type KeyboardContent =
	KeyboardItem
	| (UnicodeEmojiGroup & { from?: undefined })
	| { group?: undefined, from: string | number, to: string | number };
export type EmojiKeyboard = {
	name: string;
	symbol: string;
	content?: KeyboardContent[];
	byVK?: { [vk in VK]?: KeyboardItem }
	bySC?: { [sc in SC]?: KeyboardItem }
}
export const DEFAULT_KEYBOARDS: EmojiKeyboard[] = [
	{
		name: "Happy",
		symbol: "😀",
		content: [
			{group: "Smileys & Emotion", subGroup: "face-smiling"},
			{group: "Smileys & Emotion", subGroup: "face-affection"},
			{group: "Smileys & Emotion", subGroup: "face-tongue"},
			{group: "Smileys & Emotion", subGroup: "face-hand"},
			{group: "Smileys & Emotion", subGroup: "face-neutral-skeptical"},
			{group: "Smileys & Emotion", subGroup: "face-hat"},
			{group: "Smileys & Emotion", subGroup: "face-glasses"},
		]
	},
	{
		name: "Unwell",
		symbol: "😱",
		content: [
			{group: "Smileys & Emotion", subGroup: "face-sleepy"},
			{group: "Smileys & Emotion", subGroup: "face-unwell"},
			{group: "Smileys & Emotion", subGroup: "face-concerned"},
			{group: "Smileys & Emotion", subGroup: "face-negative"},
		]
	},
	{
		name: "Roles",
		symbol: "👻",
		content: [
			{group: "Smileys & Emotion", subGroup: "face-costume"},
			{group: "People & Body", subGroup: "person-fantasy"}
		]
	},
	{
		name: "Body",
		symbol: "👍",
		content: [
			{group: "People & Body", subGroup: "hand-fingers-open"},
			{group: "People & Body", subGroup: "hand-fingers-partial"},
			{group: "People & Body", subGroup: "hand-single-finger"},
			{group: "People & Body", subGroup: "hand-fingers-closed"},
			{group: "People & Body", subGroup: "hands"},
			{group: "People & Body", subGroup: "hand-prop"},
			{group: "People & Body", subGroup: "body-parts"},
		]
	},
	{
		name: "Gestures & activities",
		symbol: "💃",
		content: [
			{group: "People & Body", subGroup: "person-gesture"},
			{group: "People & Body", subGroup: "person-activity"},
			{group: "People & Body", subGroup: "person-resting"}
		]
	},
	{
		name: "Persons",
		symbol: "👤",
		content: [
			{group: "People & Body", subGroup: "person"},
			{group: "People & Body", subGroup: "person-role"},
			{group: "People & Body", subGroup: "person-symbol"}
		]
	},
	{
		name: "Emotions",
		symbol: "😺",
		content: [
			{group: "Smileys & Emotion", subGroup: "cat-face"},
			{group: "Smileys & Emotion", subGroup: "monkey-face"},
			{group: "Smileys & Emotion", subGroup: "heart"},
			{group: "Smileys & Emotion", subGroup: "emotion"}
		]
	},
	{
		name: "Families",
		symbol: "👪",
		content: [
			{group: "People & Body", subGroup: "family"}
		]
	},
	{
		name: "Clothing",
		symbol: "👖",
		content: [
			{group: "Objects", subGroup: "clothing"}
		]
	},
	{
		name: "Animals",
		symbol: "🐦",
		content: [
			{group: "Animals & Nature", subGroup: "animal-mammal"},
			{group: "Animals & Nature", subGroup: "animal-bird"},
			{group: "Animals & Nature", subGroup: "animal-amphibian"},
			{group: "Animals & Nature", subGroup: "animal-reptile"},
			{group: "Animals & Nature", subGroup: "animal-marine"},
			{group: "Animals & Nature", subGroup: "animal-bug"}
		]
	},
	{
		name: "Plants",
		symbol: "🌹",
		content: [
			{group: "Animals & Nature", subGroup: "plant-flower"},
			{group: "Animals & Nature", subGroup: "plant-other"}
		]
	},
	{
		name: "Raw food",
		symbol: "🥝",
		content: [
			{group: "Food & Drink", subGroup: "food-fruit"},
			{group: "Food & Drink", subGroup: "food-vegetable"},
			{group: "Food & Drink", subGroup: "food-marine"},
			{group: "Food & Drink", subGroup: "drink"},
			{group: "Food & Drink", subGroup: "dishware"}
		]
	},
	{
		name: "Cooked",
		symbol: "🌭",
		content: [
			{group: "Food & Drink", subGroup: "food-prepared"},
			{group: "Food & Drink", subGroup: "food-asian"},
			{group: "Food & Drink", subGroup: "food-sweet"}
		]
	},
	{
		name: "Places",
		symbol: "🏡",
		content: [
			{group: "Travel & Places", subGroup: "place-map"},
			{group: "Travel & Places", subGroup: "place-geographic"},
			{group: "Travel & Places", subGroup: "place-building"},
			{group: "Travel & Places", subGroup: "place-religious"},
			{group: "Travel & Places", subGroup: "place-other"},
			{group: "Travel & Places", subGroup: "hotel"}
		]
	},
	{
		name: "Vehicles",
		symbol: "🚗",
		content: [
			{group: "Travel & Places", subGroup: "transport-ground"}
		]
	},
	{
		name: "Ships",
		symbol: "✈",
		content: [
			{group: "Travel & Places", subGroup: "transport-air"},
			{group: "Travel & Places", subGroup: "transport-water"}
		]
	},
	{
		name: "Time",
		symbol: "⌛",
		content: [
			{group: "Travel & Places", subGroup: "time"}
		]
	},
	{
		name: "Weather",
		symbol: "⛅",
		content: [
			{group: "Travel & Places", subGroup: "sky & weather"}
		]
	},
	{
		name: "Sports",
		symbol: "🎽",
		content: [
			{group: "Activities", subGroup: "sport"},
			{group: "People & Body", subGroup: "person-sport"}
		]
	},
	{
		name: "Activities",
		symbol: "🎮",
		content: [
			{group: "Activities", subGroup: "event"},
			{group: "Activities", subGroup: "award-medal"},
			{group: "Activities", subGroup: "game"},
			{group: "Activities", subGroup: "arts & crafts"}
		]
	},
	{
		name: "Sound & light",
		symbol: "🎥",
		content: [
			{group: "Objects", subGroup: "sound"},
			{group: "Objects", subGroup: "music"},
			{group: "Objects", subGroup: "musical-instrument"},
			{group: "Objects", subGroup: "light & video"}
		]
	},
	{
		name: "Tech",
		symbol: "💻",
		content: [
			{group: "Objects", subGroup: "phone"},
			{group: "Objects", subGroup: "computer"},
			{group: "Objects", subGroup: "mail"},
		]
	},
	{
		name: "Paper & things",
		symbol: "📜",
		content: [
			{group: "Objects", subGroup: "book-paper"},
			{group: "Objects", subGroup: "money"},
			{group: "Objects", subGroup: "writing"},
			{group: "Objects", subGroup: "science"},
			{group: "Objects", subGroup: "medical"},
			{group: "Objects", subGroup: "household"},
			{group: "Objects", subGroup: "other-object"},
		]
	},
	{
		name: "Work",
		symbol: "💼",
		content: [
			{group: "Objects", subGroup: "office"},
			{group: "Objects", subGroup: "lock"},
			{group: "Objects", subGroup: "tool"}
		]
	},
	{
		name: "Signs",
		symbol: "⛔",
		content: [
			{group: "Symbols", subGroup: "transport-sign"},
			{group: "Symbols", subGroup: "warning"},
			{group: "Symbols", subGroup: "zodiac"}
		]
	},
	{
		name: "Symbols",
		symbol: "⚜",
		content: [
			{group: "Symbols", subGroup: "religion"},
			{group: "Symbols", subGroup: "gender"},
			{group: "Symbols", subGroup: "punctuation"},
			{group: "Symbols", subGroup: "currency"},
			{group: "Symbols", subGroup: "other-symbol"}
		]
	},
	{
		name: "Arrows",
		symbol: "↕",
		content: [
			{group: "Symbols", subGroup: "arrow"},
			{"from": "←", "to": "⇿"}
		]
	},
	{
		name: "Alphanum",
		symbol: "🔤",
		content: [
			{group: "Symbols", subGroup: "alphanum"}
		]
	},
	{
		name: "Geometric & keys",
		symbol: "🔷",
		content: [
			{group: "Symbols", subGroup: "keycap"},
			{group: "Symbols", subGroup: "geometric"},
			{group: "Symbols", subGroup: "av-symbol"}
		]
	},
	{
		name: "Country Flags",
		symbol: "🌐",
		content: [
			{group: "Flags", subGroup: "country-flag"}
		]
	},
	{
		name: "Flags",
		symbol: "🏁",
		content: [
			{group: "Flags", subGroup: "subdivision-flag"},
			{group: "Flags", subGroup: "flag"}
		]
	},
	{
		name: "Greek",
		symbol: "π",
		content: [
			"ϕ",
		],
		byVK: {
			[VK.A]: ["α", "Α"],
			[VK.B]: ["β", "Β"],
			[VK.C]: ["ψ", "Ψ"],
			[VK.D]: ["δ", "Δ"],
			[VK.E]: ["ε", "Ε"],
			[VK.F]: ["φ", "Φ"],
			[VK.G]: ["γ", "Γ"],
			[VK.H]: ["η", "Η"],
			[VK.I]: ["ι", "Ι"],
			[VK.J]: ["ξ", "Ξ"],
			[VK.K]: ["κ", "Κ"],
			[VK.L]: ["λ", "Λ"],
			[VK.M]: ["μ", "Μ"],
			[VK.N]: ["ν", "Ν"],
			[VK.O]: ["ο", "Ο"],
			[VK.P]: ["π", "Π"],
			[VK.Q]: ";",
			[VK.R]: ["ρ", "Ρ"],
			[VK.S]: ["σ", "Σ"],
			[VK.T]: ["τ", "Τ"],
			[VK.U]: ["θ", "Θ"],
			[VK.V]: ["ω", "Ω"],
			[VK.W]: ["ς", "ϐ"],
			[VK.X]: ["χ", "Χ"],
			[VK.Y]: ["υ", "Υ"],
			[VK.Z]: ["ζ", "Ζ"],
			[VK.Comma]: "ϵ",
			[VK.Period]: "·",
		}
	},
	{
		name: "Boxes",
		symbol: "╚",
		bySC: {
			[SC.Digit1]: ["┌", "╔"],
			[SC.Digit2]: ["┬", "╦"],
			[SC.Digit3]: ["┐", "╗"],
			[SC.Q]: ["├", "╠"],
			[SC.W]: ["┼", "╬"],
			[SC.E]: ["┤", "╣"],
			[SC.A]: ["└", "╚"],
			[SC.S]: ["┴", "╩"],
			[SC.D]: ["┘", "╝"],
			[SC.Z]: ["│", "║"],
			[SC.X]: ["─", "═"],
			[SC.C]: "╳",

			[SC.Digit4]: ["┏", "┍", "┎"],
			[SC.Digit5]: ["┳", "┭", "┮", "┯", "┰", "┱", "┲"],
			[SC.Digit6]: ["┓", "┑", "┒"],
			[SC.R]: ["┣", "┝", "┞", "┟", "┠", "┡", "┢"],
			[SC.T]: ["╋", "┽", "┾", "┿", "╀", "╁", "╂", "╃", "╄", "╅", "╆", "╇", "╈", "╉", "╊"],
			[SC.Y]: ["┫", "┥", "┦", "┧", "┨", "┩", "┪"],
			[SC.F]: ["┗", "┕", "┖"],
			[SC.G]: ["┻", "┵", "┶", "┷", "┸", "┹", "┺"],
			[SC.H]: ["┛", "┙", "┚"],
			[SC.V]: ["┃", "┆", "┇", "┊", "┋", "╎", "╏", "╽", "╿"],
			[SC.B]: ["━", "┄", "┅", "┈", "┉", "╌", "╍", "╼", "╾"],
			[SC.N]: ["╴", "╸"],

			[SC.Digit7]: ["╒", "╓"],
			[SC.Digit8]: ["╤", "╥"],
			[SC.Digit9]: ["╕", "╖"],
			[SC.U]: ["╞", "╟"],
			[SC.I]: ["╪", "╫"],
			[SC.O]: ["╡", "╢"],
			[SC.J]: ["╘", "╙"],
			[SC.K]: ["╧", "╨"],
			[SC.L]: ["╛", "╜"],
			[SC.M]: ["╵", "╹"],
			[SC.Comma]: ["╷", "╻"],
			[SC.Period]: ["╶", "╺"],

			[SC.Digit0]: "╭",
			[SC.Minus]: "╮",
			[SC.P]: "╰",
			[SC.LeftBrace]: "╯",
			[SC.Semicolon]: "╱",
			[SC.Apostrophe]: "╲",
		}
	},/*
	{
		name: "TextMath",
		symbol: "\u221a2",
		content: [
			{group: "UTN28", subGroup: "special"},
			{group: "UTN28", subGroup: "stretchy-characters"},
			{group: "UTN28", subGroup: "accents-operators"},
			{group: "UTN28", subGroup: "operators"},
			{group: "UTN28", subGroup: "operators-nary"},
			{group: "UTN28", subGroup: "enclosing"},
			{group: "UTN28", subGroup: "spaces"},
			{group: "UTN28", subGroup: "phantom-smashes"}
		]
	},*/
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
		]
	},
	{
		name: "Currency",
		symbol: "¤",
		content: [
			"¤",
			"₳", "؋", "฿", "₵", "¢", "₡", "₢", "$", "₫", "₯", "₠", "€", "ƒ", "₣", "₲", "₴", "₭", "₤", "ℳ", "₥", "₦", "₪", "₧", "₱", "₰", "£", "﷼", "៛", "૱", "௹", "₨", "৳", "৲", "₮", "₩", "円", "¥", "元", "圓"
		]
	}
];

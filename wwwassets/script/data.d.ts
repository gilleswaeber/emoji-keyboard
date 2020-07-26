declare type Dictionary<T> = { [key: string]: T }

export interface DataStatic {
	emojis: Emoji[];
	keyboards: EmojiKeyboard[];
	keymaps: Dictionary<KeyboardLayout>
}

export type EmojiStyle = "space";

export interface Emoji {
	symbol: string,
	group: string,
	subGroup: string,
	fullName: string,
	name: string,
	keywords?: string[],
	requiredVersion?: string,
	alternates?: Emoji[],
	style?: EmojiStyle;
	show: string,
}

export interface EmojiKeyboard {
	name: string,
	symbol: string,
	requiredVersion?: string,
	content: {
		group: string,
		subGroup: string
	}[]
}

/**
 * Key names are based on a US-like layout (note that the bottom-left key has been labeled LessThan)
 * ```
 * ` 1 2 3 4 5 6 7 8 9 0 - +
 * Q W E R T Y U I O P [ ] \
 *   A S D F G H J K L ; '
 *   < Z X C V B N M , . /
 * ```
 */
export const enum KeyCode {
	None = 0,
	Esc = 1,
	F1 = 59,
	F2 = 60,
	F3 = 61,
	F4 = 62,
	F5 = 63,
	F6 = 64,
	F7 = 65,
	F8 = 66,
	F9 = 67,
	F10 = 68,
	F11 = 87,
	F12 = 88,
	Backspace = 14,
	Tab = 15,
	CapsLock = 58,
	Enter = 28,
	Shift = 42,
	Ctrl = 29,
	Win = 91,
	Alt = 56,
	Backtick = 41,  // Swiss layout: §
	Digit1 = 2,
	Digit2 = 3,
	Digit3 = 4,
	Digit4 = 5,
	Digit5 = 6,
	Digit6 = 7,
	Digit7 = 8,
	Digit8 = 9,
	Digit9 = 10,
	Digit0 = 11,
	Minus = 12,  // Swiss layout: '
	Plus = 13,  // Swiss layout: ^
	Q = 16,
	W = 17,
	E = 18,
	R = 19,
	T = 20,
	Y = 21,  // Swiss layout: Z
	U = 22,
	I = 23,
	O = 24,
	P = 25,
	LeftBrace = 26,  // Swiss layout: ÈÜ
	RightBrace = 27,  // Swiss layout: ¨
	Backslash = 43,  // Swiss layout: $
	A = 30,
	S = 31,
	D = 32,
	F = 33,
	G = 34,
	H = 35,
	J = 36,
	K = 37,
	L = 38,
	Semicolon = 39,  // Swiss layout: ÉÖ
	Apostrophe = 40,  // Swiss layout: ÀÄ
	LessThan = 86,  // Swiss layout: <, does not exist on US layout
	Z = 44,  // Swiss layout: Y
	X = 45,
	C = 46,
	V = 47,
	B = 48,
	N = 49,
	M = 50,
	Comma = 51,  // Swiss layout: ,
	Period = 52,  // Swiss layout: .
	Slash = 53,  // Swiss layout: -
}

export type KeyboardLayoutKeys = {
	readonly [id in KeyCode]: string;
};

export interface KeyboardLayout {
	name: string,
	keys: KeyboardLayoutKeys
}

declare global {
	const data: DataStatic;
}

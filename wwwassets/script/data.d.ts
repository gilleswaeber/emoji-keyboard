declare type Dictionary<T> = { [key: string]: T }

export interface DataStatic {
	emojis: Emoji[];
	keyboards: LegacyEmojiKeyboard[];
}

export type EmojiStyle = "space";

interface Emoji {
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

export interface LegacyEmojiKeyboard {
	name: string,
	symbol: string,
	requiredVersion?: string,
	content: {
		group: string,
		subGroup: string
	}[]
}

/**
 * Scancodes:
 * Key names are based on a US-like layout (note that the bottom-left key has been labeled LessThan)
 * ```
 * ` 1 2 3 4 5 6 7 8 9 0 - +
 * Q W E R T Y U I O P [ ] \
 *   A S D F G H J K L ; '
 *   < Z X C V B N M , . /
 * ```
 */
export const enum SC {
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
	RightShift = 54,
	Ctrl = 29,
	RightCtrl = 285,
	Win = 91,
	Alt = 56,
	RightAlt = 312,
	/** Swiss layout: § */
	Backtick = 41,
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
	/** Swiss layout: ' */
	Minus = 12,
	/** Swiss layout: ^ */
	Equal = 13,
	Q = 16,
	W = 17,
	E = 18,
	R = 19,
	T = 20,
	/** Swiss layout: Z */
	Y = 21,
	U = 22,
	I = 23,
	O = 24,
	P = 25,
	/** Swiss layout: ÈÜ */
	LeftBrace = 26,
	/** Swiss layout: ¨ */
	RightBrace = 27,
	/** Swiss layout: $ */
	Backslash = 43,
	A = 30,
	S = 31,
	D = 32,
	F = 33,
	G = 34,
	H = 35,
	J = 36,
	K = 37,
	L = 38,
	/** Swiss layout: ÉÖ */
	Semicolon = 39,
	/** Swiss layout: ÀÄ */
	Apostrophe = 40,
	/** Swiss layout: <, does not exist on US layout */
	LessThan = 86,
	/** Swiss layout: Y */
	Z = 44,
	X = 45,
	C = 46,
	V = 47,
	B = 48,
	N = 49,
	M = 50,
	/** Swiss layout: , */
	Comma = 51,
	/** Swiss layout: . */
	Period = 52,
	/** Swiss layout: - */
	Slash = 53,

	Space = 57,

	Pause = 69,
	ScrollLock = 70,
	SysReq = 84,
	PrintScreen = 311,

	NumLock = 325,
	NumMult = 55,
	NumSub = 74,
	NumAdd = 78,
	NumDiv = 309,
	Num0 = 82,
	NumDecimal = 83,
	Num1 = 79,
	Num2 = 80,
	Num3 = 81,
	Num4 = 75,
	Num5 = 76,
	Num6 = 77,
	Num7 = 71,
	Num8 = 72,
	Num9 = 73,
}

/**
 * Windows Virtual Key codes
 * Note that e.g. wherever Y is placed on the keyboard, it'll have the same VK but may have a different SC
 */
export const enum VK {
	None = 0,

	Backspace = 8,
	Tab = 9,
	Enter = 13,
	RightShift = 16,
	Pause = 19,
	CapsLock = 20,
	Esc = 27,

	Space = 32,

	SysReq = 44,
	PrintScreen = 44,
	Digit1 = 49,
	Digit2 = 50,
	Digit3 = 51,
	Digit4 = 52,
	Digit5 = 53,
	Digit6 = 54,
	Digit7 = 55,
	Digit8 = 56,
	Digit9 = 57,
	Digit0 = 48,

	A = 65,
	B = 66,
	C = 67,
	D = 68,
	E = 69,
	F = 70,
	G = 71,
	H = 72,
	I = 73,
	J = 74,
	K = 75,
	L = 76,
	M = 77,
	N = 78,
	O = 79,
	P = 80,
	Q = 81,
	R = 82,
	S = 83,
	T = 84,
	U = 85,
	V = 86,
	W = 87,
	X = 88,
	Y = 89,
	Z = 90,

	Win = 91,

	Num0 = 96,
	Num1 = 97,
	Num2 = 98,
	Num3 = 99,
	Num4 = 100,
	Num5 = 101,
	Num6 = 102,
	Num7 = 103,
	Num8 = 104,
	Num9 = 105,
	NumMult = 106,
	NumAdd = 107,
	NumSub = 109,
	NumDecimal = 110,
	NumDiv = 111,

	F1 = 112,
	F2 = 113,
	F3 = 114,
	F4 = 115,
	F5 = 116,
	F6 = 117,
	F7 = 118,
	F8 = 119,
	F9 = 120,
	F10 = 121,
	F11 = 122,
	F12 = 123,

	NumLock = 144,
	ScrollLock = 145,

	Shift = 160,
	Ctrl = 162,
	RightCtrl = 163,
	Alt = 164,
	RightAlt = 165,

	Semicolon = 186,
	Equal = 187,
	Comma = 188,
	Minus = 189,
	Period = 190,
	Slash = 191,
	Backtick = 192,
	LeftBrace = 219,
	Backslash = 220,
	RightBrace = 221,
	Apostrophe = 222,
	LessThan = 226,
}

export type KeyboardLayoutKeys = {
	readonly [id in SC]: string;
};

export type SystemLayout = {
	readonly [id in SC] : {
		vk: VK,
		name: string
	}
};

declare global {
	const data: DataStatic;
}

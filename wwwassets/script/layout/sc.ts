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

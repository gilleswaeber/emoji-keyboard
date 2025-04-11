/**
 * Windows Virtual Key codes
 * Note that e.g. wherever the letter A is placed on the keyboard, it'll have the same VK but may have a different SC
 * ```
 * ` 1 2 3 4 5 6 7 8 9 0 - +
 * Q W E R T Y U I O P [ ] \
 *   A S D F G H J K L ; '
 *   < Z X C V B N M , . /
 * ```
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

	Digit0 = 48,
	Digit1 = 49,
	Digit2 = 50,
	Digit3 = 51,
	Digit4 = 52,
	Digit5 = 53,
	Digit6 = 54,
	Digit7 = 55,
	Digit8 = 56,
	Digit9 = 57,

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

export const VKMap = {
	a: VK.A,
	b: VK.B,
	c: VK.C,
	d: VK.D,
	e: VK.E,
	f: VK.F,
	g: VK.G,
	h: VK.H,
	i: VK.I,
	j: VK.J,
	k: VK.K,
	l: VK.L,
	m: VK.M,
	n: VK.N,
	o: VK.O,
	p: VK.P,
	q: VK.Q,
	r: VK.R,
	s: VK.S,
	t: VK.T,
	u: VK.U,
	v: VK.V,
	w: VK.W,
	x: VK.X,
	y: VK.Y,
	z: VK.Z,

	d0: VK.Digit0,
	d1: VK.Digit1,
	d2: VK.Digit2,
	d3: VK.Digit3,
	d4: VK.Digit4,
	d5: VK.Digit5,
	d6: VK.Digit6,
	d7: VK.Digit7,
	d8: VK.Digit8,
	d9: VK.Digit9,

	"0": VK.Digit0,
	"1": VK.Digit1,
	"2": VK.Digit2,
	"3": VK.Digit3,
	"4": VK.Digit4,
	"5": VK.Digit5,
	"6": VK.Digit6,
	"7": VK.Digit7,
	"8": VK.Digit8,
	"9": VK.Digit9,

	",": VK.Comma,
	"-": VK.Minus,
	".": VK.Period,
} as const;
const ReverseVkMap = new Map<VK, VKAbbr[]>();
for (const [k, vk] of Object.entries(VKMap)) {
	if (!ReverseVkMap.has(vk)) ReverseVkMap.set(vk, []);
	ReverseVkMap.get(vk)!.push(k as VKAbbr);
}

export function vkLookup(vk: VK): (VK | VKAbbr)[] {
	return [vk, ...(ReverseVkMap.get(vk) ?? [])];
}

export type VKAbbr = keyof typeof VKMap;

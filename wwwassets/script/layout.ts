import {VK} from "./layout/vk";
import {SC} from "./layout/sc";

export type SystemLayout = {
	readonly [id in SC]: {
		vk: VK,
		name: string
	}
};

export const SystemLayoutUS: SystemLayout = {
	[SC.None]: {vk: 0, name: ""},
	[SC.Esc]: {vk: 27, name: "Esc"},
	[SC.Digit1]: {vk: 49, name: "1"},
	[SC.Digit2]: {vk: 50, name: "2"},
	[SC.Digit3]: {vk: 51, name: "3"},
	[SC.Digit4]: {vk: 52, name: "4"},
	[SC.Digit5]: {vk: 53, name: "5"},
	[SC.Digit6]: {vk: 54, name: "6"},
	[SC.Digit7]: {vk: 55, name: "7"},
	[SC.Digit8]: {vk: 56, name: "8"},
	[SC.Digit9]: {vk: 57, name: "9"},
	[SC.Digit0]: {vk: 48, name: "0"},
	[SC.Minus]: {vk: 189, name: "-"},
	[SC.Equal]: {vk: 187, name: "="},
	[SC.Backspace]: {vk: 8, name: "Backspace"},
	[SC.Tab]: {vk: 9, name: "Tab"},
	[SC.Q]: {vk: 81, name: "q"},
	[SC.W]: {vk: 87, name: "w"},
	[SC.E]: {vk: 69, name: "e"},
	[SC.R]: {vk: 82, name: "r"},
	[SC.T]: {vk: 84, name: "t"},
	[SC.Y]: {vk: 89, name: "y"},
	[SC.U]: {vk: 85, name: "u"},
	[SC.I]: {vk: 73, name: "i"},
	[SC.O]: {vk: 79, name: "o"},
	[SC.P]: {vk: 80, name: "p"},
	[SC.LeftBrace]: {vk: 219, name: "["},
	[SC.RightBrace]: {vk: 221, name: "]"},
	[SC.Enter]: {vk: 13, name: "Enter"},
	[SC.Ctrl]: {vk: 162, name: "Ctrl"},
	[SC.A]: {vk: 65, name: "a"},
	[SC.S]: {vk: 83, name: "s"},
	[SC.D]: {vk: 68, name: "d"},
	[SC.F]: {vk: 70, name: "f"},
	[SC.G]: {vk: 71, name: "g"},
	[SC.H]: {vk: 72, name: "h"},
	[SC.J]: {vk: 74, name: "j"},
	[SC.K]: {vk: 75, name: "k"},
	[SC.L]: {vk: 76, name: "l"},
	[SC.Semicolon]: {vk: 186, name: ";"},
	[SC.Apostrophe]: {vk: 222, name: "'"},
	[SC.Backtick]: {vk: 192, name: "`"},
	[SC.Shift]: {vk: 160, name: "Shift"},
	[SC.Backslash]: {vk: 220, name: "\\"},
	[SC.Z]: {vk: 90, name: "z"},
	[SC.X]: {vk: 88, name: "x"},
	[SC.C]: {vk: 67, name: "c"},
	[SC.V]: {vk: 86, name: "v"},
	[SC.B]: {vk: 66, name: "b"},
	[SC.N]: {vk: 78, name: "n"},
	[SC.M]: {vk: 77, name: "m"},
	[SC.Comma]: {vk: 188, name: ","},
	[SC.Period]: {vk: 190, name: "."},
	[SC.Slash]: {vk: 191, name: "/"},
	[SC.RightShift]: {vk: 16, name: "Right Shift"},
	[SC.NumMult]: {vk: 106, name: "Num *"},
	[SC.Alt]: {vk: 164, name: "Alt"},
	[SC.Space]: {vk: 32, name: "Space"},
	[SC.CapsLock]: {vk: 20, name: "Caps Lock"},
	[SC.F1]: {vk: 112, name: "F1"},
	[SC.F2]: {vk: 113, name: "F2"},
	[SC.F3]: {vk: 114, name: "F3"},
	[SC.F4]: {vk: 115, name: "F4"},
	[SC.F5]: {vk: 116, name: "F5"},
	[SC.F6]: {vk: 117, name: "F6"},
	[SC.F7]: {vk: 118, name: "F7"},
	[SC.F8]: {vk: 119, name: "F8"},
	[SC.F9]: {vk: 120, name: "F9"},
	[SC.F10]: {vk: 121, name: "F10"},
	[SC.Pause]: {vk: 19, name: "Pause"},
	[SC.ScrollLock]: {vk: 145, name: "Scroll Lock"},
	[SC.Num7]: {vk: 103, name: "Num 7"},
	[SC.Num8]: {vk: 104, name: "Num 8"},
	[SC.Num9]: {vk: 105, name: "Num 9"},
	[SC.NumSub]: {vk: 109, name: "Num -"},
	[SC.Num4]: {vk: 100, name: "Num 4"},
	[SC.Num5]: {vk: 101, name: "Num 5"},
	[SC.Num6]: {vk: 102, name: "Num 6"},
	[SC.NumAdd]: {vk: 107, name: "Num +"},
	[SC.Num1]: {vk: 97, name: "Num 1"},
	[SC.Num2]: {vk: 98, name: "Num 2"},
	[SC.Num3]: {vk: 99, name: "Num 3"},
	[SC.Num0]: {vk: 96, name: "Num 0"},
	[SC.NumDecimal]: {vk: 110, name: "Num Del"},
	[SC.SysReq]: {vk: 44, name: "Sys Req"},
	[SC.LessThan]: {vk: 226, name: "\\"},
	[SC.F11]: {vk: 122, name: "F11"},
	[SC.F12]: {vk: 123, name: "F12"},
	[SC.RightCtrl]: {vk: 163, name: "Right Ctrl"},
	[SC.NumDiv]: {vk: 111, name: "Num /"},
	[SC.PrintScreen]: {vk: 44, name: "Prnt Scrn"},
	[SC.RightAlt]: {vk: 165, name: "Right Alt"},
	[SC.NumLock]: {vk: 144, name: "Num Lock"},
	[SC.Win]: {vk: 91, name: "Win"}
}

export type KeyCodesList = readonly SC[];
export const DigitsRow = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const;
export const FirstRow = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27] as const;
export const SecondRow = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43] as const;
export const ThirdRow = [44, 45, 46, 47, 48, 49, 50, 51, 52, 53] as const;
export const SearchKeyCodesTable: KeyCodesList = [
	SC.Backtick, ...DigitsRow,
	1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013,
	1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026,
];
export type BaseLayout = {
	all: KeyCodesList;
	free: KeyCodesList;
	cssClass: string;
}
export type Layout = BaseLayout & {
	sys: SystemLayout;
}
export const AnsiLayout: BaseLayout = {
	all: [
		SC.Backtick, ...DigitsRow, //, 59, 60, 61
		SC.Tab, ...FirstRow, //, 62, 63, 64
		SC.CapsLock, ...SecondRow, //, 65, 66, 67
		SC.Shift, ...ThirdRow, 1100, 1101  //, 68, 87, 88
	],
	free: [...DigitsRow, ...FirstRow, ...SecondRow, ...ThirdRow],
	cssClass: 'ansi-layout',
};
export const IsoLayout: BaseLayout = {
	all: [
		SC.Backtick, ...DigitsRow, //, 59, 60, 61
		SC.Tab, ...FirstRow, //, 62, 63, 64
		SC.CapsLock, ...SecondRow, //, 65, 66, 67
		SC.LessThan, ...ThirdRow, 1100, 1101  //, 68, 87, 88
	],
	free: [...DigitsRow, ...FirstRow, ...SecondRow, SC.LessThan, ...ThirdRow],
	cssClass: 'iso-layout',
};
export const SearchKeyCodes: number[] = [
	...DigitsRow,
	1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013,
	1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026
];

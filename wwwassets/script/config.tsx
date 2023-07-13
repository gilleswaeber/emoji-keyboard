import {Fragment, h} from "preact";
import {DigitsRow, FirstRow, Layout, SecondRow} from "./layout";
import {ConfigActionKey, ConfigBuildKey, ConfigLabelKey, ConfigToggleKey, ExitSearchKey, PageKey} from "./key";
import {Board} from "./board";
import {useContext} from "preact/hooks";
import {app, ConfigContext, LayoutContext} from "./appVar";
import {SC} from "./layout/sc";
import {BoardState, Keys, mapKeysToSlots, SlottedKeys} from "./boards/utils";
import {KeyName} from "./keys/base";
import {ahkOpenLink, ahkReload} from "./ahk";

// Backslash and Enter appears on the first or the second row resp. second or both, so they're listed in both
// noinspection JSUnusedLocalSymbols
const SHORTCUT_KEYS = [
	{
		name: "Function Row", keys: [
			SC.Esc,
			SC.F1, SC.F2, SC.F3, SC.F4, SC.F5, SC.F6, SC.F7, SC.F8, SC.F9, SC.F10, SC.F11, SC.F12,
		]
	}, {
		name: "Numbers Row", keys: [
			SC.Backtick,
			SC.Digit1, SC.Digit2, SC.Digit3, SC.Digit4, SC.Digit5, SC.Digit6, SC.Digit7, SC.Digit8, SC.Digit9, SC.Digit0,
			SC.Minus, SC.Equal,
			SC.Backspace,
		]
	}, {
		name: "First Row", keys: [
			SC.Tab,
			SC.Q, SC.W, SC.E, SC.R, SC.T, SC.Y, SC.U, SC.I, SC.O, SC.P,
			SC.LeftBrace, SC.RightBrace, SC.Backslash, SC.Enter,
		]
	}, {
		name: "Second Row", keys: [
			SC.CapsLock,
			SC.A, SC.S, SC.D, SC.F, SC.G, SC.H, SC.J, SC.K, SC.L,
			SC.Semicolon, SC.Apostrophe, SC.Backslash, SC.Enter,
		]
	}, {
		name: "Third Row", keys: [
			SC.LessThan,
			SC.Z, SC.X, SC.C, SC.V, SC.B, SC.N, SC.M,
			SC.Comma, SC.Period, SC.Slash,
		]
	}, {
		name: "Fourth Row", keys: [
			SC.Space
		]
	}, {
		name: "Numpad", keys: [
			SC.Num0, SC.Num1, SC.Num2, SC.Num3,
			SC.Num4, SC.Num5, SC.Num6,
			SC.Num7, SC.Num8, SC.Num9,
			SC.NumDecimal,
			SC.NumDiv,
			SC.NumMult,
			SC.NumSub,
			SC.NumAdd,
			SC.NumLock,
		]
	}
] as const;

const SkinTones = [
	{name: "neutral", symbol: "👤"},
	{name: "light", symbol: "🏻"},
	{name: "medium-light", symbol: "🏼"},
	{name: "medium", symbol: "🏽"},
	{name: "medium-dark", symbol: "🏾"},
	{name: "dark", symbol: "🏿"},
] as const;

export type SkinTone = keyof typeof SkinTones;

export const DefaultTheme = "material";
export const Themes: { name: string, url: string, symbol: string }[] = [
	{name: DefaultTheme, url: "style/material.css", symbol: "🔳"},
	{name: "legacy", url: "style/legacy.css", symbol: "⬜"},
];
type ThemeMode = "light" | "dark" | "system";
type OpenAt = "last-position" | "bottom" | "text-caret" | "mouse";

export interface RecentEmoji {
	symbol: string;
	useCount: number;
}

export interface AppConfig {
	isoKeyboard: boolean;  // has an additional key next to left shift
	theme: string;
	themeMode: ThemeMode;
	x: number;
	y: number;
	width: number;
	height: number;
	devTools: boolean;
	openAt: OpenAt;
	opacity: number;
	recent: RecentEmoji[];
	skinTone: SkinTone;
	preferredVariant: Record<string, string | undefined>;
	hideAfterInput: boolean;
	mainAfterInput: boolean;
	showAliases: boolean;
	showCharCodes: boolean;
}

export const DefaultOpacity = .90;

export const DefaultConfig: AppConfig = {
	isoKeyboard: false,
	theme: DefaultTheme,
	themeMode: "system",
	x: -1,
	y: -1,
	width: 764,
	height: 240,
	devTools: false,
	openAt: "bottom",
	opacity: DefaultOpacity,
	skinTone: 0,
	preferredVariant: {},
	recent: [],
	hideAfterInput: false,
	mainAfterInput: false,
	showAliases: false,
	showCharCodes: false,
};

export const ThemesMap = new Map(Themes.map((t) => [t.name, t]));
export const DefaultThemeUrl = ThemesMap.get(DefaultTheme)!!.url;

export interface ConfigPage {
	name: string;
	symbol: string;

	keys(config: AppConfig, l: Layout): SlottedKeys;
}

const ConfigPages: ConfigPage[] = [
	{
		name: "General",
		symbol: "🛠️",
		keys(config: AppConfig, l) {
			return {
				[SC.Q]: new ConfigToggleKey({
					active: config.isoKeyboard,
					statusName: `ISO layout: ${config.isoKeyboard ? 'on' : 'off'}`,
					action() {
						app().updateConfig({isoKeyboard: !config.isoKeyboard});
					}
				}),
				[SC.W]: new ConfigLabelKey(<Fragment>ISO layout (<KeyName code={SC.LessThan}/> between <KeyName
					code={SC.Shift}/> and <KeyName code={SC.Z}/>)</Fragment>),
				...mapKeysToSlots(l.freeRows[2], [
					// 	...SkinTones.map((s, i) => new ConfigActionKey({
					// 		active: i == config.skinTone,
					// 		action() {
					// 			p.app.updateConfig({skinTone: i});
					// 		},
					// 		name: s.name,
					// 		symbol: s.symbol
					// 	})),
					new ConfigActionKey({
						action() {
							app().updateConfig({preferredVariant: {}})
						},
						active: !Object.keys(config.preferredVariant).length,
						name: "Reset Variants",
						statusName: "Clear variant preferences for all symbols",
						symbol: "🥷"
					})
					// 	new ConfigLabelKey("Default skin tone")
				]),
				...mapKeysToSlots(l.freeRows[3], [
					new ConfigActionKey({
						name: 'Fallback Fonts',
						symbol: '🔣',
						action: () => ahkOpenLink('https://github.com/gilleswaeber/emoji-keyboard/wiki/Fallback-Fonts'),
					}),
					new ConfigActionKey({
						name: 'Font Folder',
						symbol: '📂',
						action: () => ahkOpenLink('.\\wwwassets\\fallback_fonts'),
					}),
					new ConfigActionKey({
						name: 'Plugins',
						symbol: '🪇',
						action: () => ahkOpenLink('https://github.com/gilleswaeber/emoji-keyboard/wiki/Plugins'),
					}),
					new ConfigActionKey({
						name: 'Plugins Folder',
						symbol: '📂',
						action: () => ahkOpenLink('.\\wwwassets\\plugins'),
					}),
				]),
			}
		}
	},
	{
		name: "Theme",
		symbol: "🎨",
		keys(config: AppConfig) {
			return {
				...mapKeysToSlots(FirstRow, Themes.map((t) => new ConfigActionKey({
					active: config.theme == t.name,
					name: t.name, statusName: `Theme: ${t.name}`,
					symbol: t.symbol,
					action() {
						app().updateConfig({theme: t.name});
					}
				}))),
				...mapKeysToSlots(SecondRow, [
					...([
						["light", "🌞"],
						["dark", "🌚"],
						["system", "📟"]
					] as const).map(([mode, symbol]) => new ConfigActionKey({
						active: config.themeMode == mode,
						name: mode, symbol: symbol,
						statusName: `Theme variant: ${mode}`,
						action() {
							app().updateConfig({themeMode: mode})
						}
					}))
				])
			}
		}
	},
	{
		name: "Display",
		symbol: "🖥️",
		keys(config, l) {
			return {
				...mapKeysToSlots(l.freeRows[1], [
					new ConfigActionKey({
						symbol: "⏬", name: "-10", statusName: 'Opacity -10', action() {
							app().updateConfig({opacity: Math.max(config.opacity - .1, .2)})
						}
					}),
					new ConfigActionKey({
						symbol: "🔽", name: "-1", statusName: 'Opacity -1', action() {
							app().updateConfig({opacity: Math.max(config.opacity - .01, .2)})
						}
					}),
					new ConfigActionKey({
						symbol: "🔼", name: "+1", statusName: 'Opacity +1', action() {
							app().updateConfig({opacity: Math.min(config.opacity + .01, 1)})
						}
					}),
					new ConfigActionKey({
						symbol: "⏫", name: "+10", statusName: 'Opacity +10', action() {
							app().updateConfig({opacity: Math.min(config.opacity + .1, 1)})
						}
					}),
					new ConfigActionKey({
						symbol: `${Math.round(config.opacity * 100)}`,
						name: "reset",
						statusName: 'Reset opacity',
						action() {
							app().updateConfig({opacity: DefaultOpacity})
						}
					}),
					new ConfigLabelKey("Opacity")
				]),
				...mapKeysToSlots(l.freeRows[2], [
					...([
						["last position", "🗿", "last-position"],
						["bottom", "👇", "bottom"],
						["caret (beta)", "⌨️", "text-caret"],
						["mouse", "🖱️", "mouse"]
					] as const).map(([name, symbol, mode]) => new ConfigActionKey({
						active: config.openAt == mode,
						name, statusName: `Open at ${name}`, symbol,
						action() {
							app().updateConfig({openAt: mode})
						}
					})),
					new ConfigLabelKey("Open At")
				]),
				...mapKeysToSlots(l.freeRows[3], [
					new ConfigToggleKey({
						active: config.hideAfterInput,
						name: 'Hide', statusName: `Hide after input: ${config.hideAfterInput ? 'on' : 'off'}`,
						symbol: '🫥',
						action() {
							app().updateConfig({hideAfterInput: !config.hideAfterInput})
						}
					}),
					new ConfigToggleKey({
						active: config.mainAfterInput,
						name: 'Go Home',
						symbol: '🏠', statusName: `Go home after input: ${config.hideAfterInput ? 'on' : 'off'}`,
						action() {
							app().updateConfig({mainAfterInput: !config.mainAfterInput})
						}
					}),
					new ConfigLabelKey('After Input')
				])
			};
		}
	},
	{
		name: "Tools",
		symbol: "🔨",
		keys(config: AppConfig) {
			return {
				...mapKeysToSlots(FirstRow, [
					new ConfigBuildKey(),
					new ConfigActionKey({
						action: ahkReload,
						name: 'Reload',
						symbol: '🔄'
					}),
				]),
				...mapKeysToSlots(SecondRow, [
					new ConfigToggleKey({
						active: config.devTools, statusName: `Open DevTools: ${config.devTools ? 'on' : 'off'}`,
						action() {
							app().updateConfig({devTools: !config.devTools});
						}
					}),
					new ConfigLabelKey("Open DevTools")
				]),
			}
		}
	},
	{
		name: "Details",
		symbol: "🔬",
		keys(config: AppConfig) {
			return {
				...mapKeysToSlots(FirstRow, [
					new ConfigToggleKey({
						active: config.showAliases,
						statusName: `Show aliases in status bar: ${config.showAliases ? 'on' : 'off'}`,
						action: () => app().updateConfig({showAliases: !config.showAliases}),
						name: 'Aliases',
						symbol: '📛',
					}),
					new ConfigToggleKey({
						active: config.showCharCodes,
						statusName: `Show char codes in status bar: ${config.showCharCodes ? 'on' : 'off'}`,
						action: () => app().updateConfig({showCharCodes: !config.showCharCodes}),
						name: 'Codes',
						symbol: '🔢',
					}),
					new ConfigLabelKey('in Status Bar')
				]),
			}
		}
	},
	{
		name: "About",
		symbol: "📜",
		keys(config: AppConfig) {
			return {
				...mapKeysToSlots(FirstRow, [
					new ConfigActionKey({
						action: () => ahkOpenLink('https://github.com/gilleswaeber/emoji-keyboard'),
						name: 'GitHub',
						symbol: '🐙'
					}),
					new ConfigActionKey({
						action: () => ahkOpenLink('https://github.com/gilleswaeber/emoji-keyboard/blob/master/LICENSE'),
						name: 'MIT License',
						symbol: '⚖️'
					}),
					new ConfigActionKey({
						action: () => ahkOpenLink('https://github.com/gilleswaeber/emoji-keyboard#dependencies'),
						name: 'Deps',
						statusName: 'Dependencies',
						symbol: '🪃',
					}),
					new ConfigLabelKey('Emoji Keyboard by Gilles Waeber')
				])
			}
		}
	}
];

export class ConfigBoard extends Board {
	constructor() {
		super({name: '__config', symbol: '🛠️'});
	}

	Contents = ({state}: { state: BoardState | undefined }) => {
		const page = Math.min(state?.page ?? 0, ConfigPages.length - 1);
		const config = useContext(ConfigContext);
		const l = useContext(LayoutContext);
		const pageKeys = ConfigPages.map((c, n) => new PageKey(n, n === page, c.name, c.symbol));
		const keys = {
			[SC.Backtick]: new ExitSearchKey(),
			...mapKeysToSlots(DigitsRow, pageKeys),
			...ConfigPages[page].keys(config, l),
		}
		return <Keys keys={keys}/>
	}
}

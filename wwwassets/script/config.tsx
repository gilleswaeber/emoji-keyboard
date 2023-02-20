import {SC} from "./data";
import {AppRenderProps} from "./app";
import {h} from "preact";
import {AnsiCodesList, DigitsRow, FirstRow, IsoCodesList, SecondRow} from "./layout";
import {BackKey, BlankKey, ConfigActionKey, ConfigLabelKey, ConfigPageKey, ConfigToggleKey, ExitSearchKey} from "./key";
import {SlottedKeys, mapKeysToSlots} from "./board";
import {useMemo} from "preact/hooks";

// Backslash and Enter appears on the first or the second row resp. second or both, so they're listed in both
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

export interface AppConfig {
	isoKeyboard: boolean;  // has an additional key next to left shift
	theme: string;
	themeMode: ThemeMode;
	width: number;
	height: number;
	devTools: boolean;
	opacity: number;
	skinTone: SkinTone;

}

export const DefaultOpacity = .90;

export const DefaultConfig: AppConfig = {
	isoKeyboard: false,
	theme: DefaultTheme,
	themeMode: "system",
	width: 764,
	height: 240,
	devTools: false,
	opacity: DefaultOpacity,
	skinTone: 0,
};

export const ThemesMap = new Map(Themes.map((t) => [t.name, t]));
export const DefaultThemeUrl = ThemesMap.get(DefaultTheme)!!.url;

export interface ConfigPage {
	name: string;
	symbol: string;

	keys(config: AppRenderProps): SlottedKeys;
}

const ConfigPages: ConfigPage[] = [
	{
		name: "General",
		symbol: "🛠️",
		keys(p: AppRenderProps) {
			return {
				[SC.Q]: new ConfigToggleKey({
					active: p.config.isoKeyboard,
					action() {
						p.app.updateConfig({isoKeyboard: !p.config.isoKeyboard});
					}
				}),
				[SC.W]: new ConfigLabelKey(`ISO layout (additional key between ${p.layout[SC.Shift].name} and ${p.layout[SC.Z].name})`),
				// ...mapKeysToSlots(SecondRow, [
				// 	...SkinTones.map((s, i) => new ConfigActionKey({
				// 		active: i == p.config.skinTone,
				// 		action() {
				// 			p.app.updateConfig({skinTone: i});
				// 		},
				// 		name: s.name,
				// 		symbol: s.symbol
				// 	})),
				// 	new ConfigLabelKey("Default skin tone")
				// ])
			}
		}
	},
	{
		name: "Theme",
		symbol: "🎨",
		keys(p: AppRenderProps) {
			return {
				...mapKeysToSlots(FirstRow, Themes.map((t) => new ConfigActionKey({
					active: p.config.theme == t.name,
					name: t.name,
					symbol: t.symbol,
					action() {
						p.app.updateConfig({theme: t.name});
					}
				}))),
				...mapKeysToSlots(SecondRow, [
					...([
						["light", "🌞"],
						["dark", "🌚"],
						["system", "📟"]
					] as const).map(([mode, symbol]) => new ConfigActionKey({
						active: p.config.themeMode == mode,
						name: mode, symbol: symbol,
						action() {
							p.app.updateConfig({themeMode: mode})
						}
					}))
				])
			}
		}
	},
	{
		name: "Display",
		symbol: "🖥️",
		keys(p: AppRenderProps) {
			return {
				...mapKeysToSlots(FirstRow, [
					new ConfigActionKey({
						symbol: "--", name: "-10", action() {
							p.app.updateConfig({opacity: Math.max(p.config.opacity - .1, .2)})
						}
					}),
					new ConfigActionKey({
						symbol: "-", name: "-1", action() {
							p.app.updateConfig({opacity: Math.max(p.config.opacity - .01, .2)})
						}
					}),
					new ConfigActionKey({
						symbol: "+", name: "+1", action() {
							p.app.updateConfig({opacity: Math.min(p.config.opacity + .01, 1)})
						}
					}),
					new ConfigActionKey({
						symbol: "++", name: "+10", action() {
							p.app.updateConfig({opacity: Math.min(p.config.opacity + .1, 1)})
						}
					}),
					new ConfigActionKey({
						symbol: `${Math.round(p.config.opacity * 100)}`, name: "reset", action() {
							p.app.updateConfig({opacity: DefaultOpacity})
						}
					}),
					new ConfigLabelKey("Opacity")
				]),
				...mapKeysToSlots(SecondRow, [
					new ConfigToggleKey({
						active: p.config.devTools,
						action() {
							p.app.updateConfig({devTools: !p.config.devTools});
						}
					}),
					new ConfigLabelKey("Open DevTools")
				]),
			};
		}
	},
]
export const DefaultConfigPage = ConfigPages[0];

export function ConfigView(p: AppRenderProps) {
	const keys = useMemo(() => ({
			[SC.Backtick]: new ExitSearchKey(),
			...mapKeysToSlots(DigitsRow, ConfigPages.map((c) => new ConfigPageKey(c, c == p.sharedState.configPage))),
			...p.sharedState.configPage.keys(p)
		})
		, [p.sharedState.configPage, p.layout, p.config]);
	p.app.keyHandlers = keys;
	const codes = p.config.isoKeyboard ? IsoCodesList : AnsiCodesList;
	return <div className="keyboard">{codes.map((code) => (keys[code] ?? BlankKey).render(p, code))}</div>
}

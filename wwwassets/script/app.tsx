import {Component, h, options, render} from 'preact';
import {AnsiLayout, IsoLayout, Layout, SystemLayout, SystemLayoutUS} from "./layout";
import {Board, getMainBoard} from "./board";
import {Version} from "./osversion";
import {
	ahkHide,
	ahkLoaded,
	ahkOpenDevTools,
	ahkReady,
	ahkSaveConfig,
	ahkSend,
	ahkSetOpacity,
	ahkSetOpenAt,
	ahkSetPosSize,
	ahkSetSearch,
	ahkTitle
} from "./ahk";
import {search} from "./emojis";
import {AppConfig, ConfigBoard, DefaultConfig, DefaultThemeUrl, ThemesMap} from "./config";
import {fromEntries, unreachable} from "./helpers";
import {
	app,
	AppActions,
	ConfigBuildingContext,
	ConfigContext,
	LayoutContext,
	OSContext,
	PluginsContext,
	SearchContext,
	setApp
} from "./appVar";
import {useMemo} from "preact/hooks";
import {SC} from "./layout/sc";
import {SearchBoard} from "./searchView";
import {BoardState, SlottedKeys} from "./boards/utils";
import {RecentBoard} from "./recentsView";
import {increaseRecent} from "./recentsActions";
import {Plugin, PluginData} from "./config/boards";
import {naturalCompare} from "./utils/compare";
import {IconFallback} from './config/fallback';
import {supportsRequirements} from './utils/emojiSupportTest';
import {UnicodeData} from "./unicodeInterface";

export const enum AppMode {
	MAIN = 0,
	SEARCH = 1,
	SETTINGS = 2,
	RECENTS = 3,
}

const AppModes = [AppMode.MAIN, AppMode.SEARCH, AppMode.SETTINGS, AppMode.RECENTS] as const;

type AppState = {
	mode: AppMode;
	searchText: string;
	layout: SystemLayout;
	config: AppConfig;
	os: Version;
	boardState: Record<string, BoardState | undefined>;
	currentBoard: { [mode in AppMode]: Board };
	/** oldest at the end */
	parentBoards: { [mode in AppMode]: Board[] };
	/** building in progress */
	building: boolean;
	plugins: Plugin[];
}

class App extends Component<{}, AppState> implements AppActions {
	keyHandlers: SlottedKeys = {}
	state: AppState = {
		mode: AppMode.MAIN,
		searchText: '',
		layout: SystemLayoutUS,
		config: {...DefaultConfig, opacity: 1},
		boardState: {},
		os: new Version('99'),
		currentBoard: {
			[AppMode.MAIN]: getMainBoard([]),
			[AppMode.SEARCH]: new SearchBoard(),
			[AppMode.SETTINGS]: new ConfigBoard(),
			[AppMode.RECENTS]: new RecentBoard(),
		},
		parentBoards: fromEntries(AppModes.map(m => [m, []] as const)),
		building: false,
		plugins: [],
	}

	constructor(props: {}) {
		super(props);
		setApp(this);
		(window as any).document.ahk = this;
		(window as any).s = search;
		(window as any).chrome?.webview?.addEventListener('message', (e: MessageEvent) => {
			if (Array.isArray(e.data)) {
				switch (e.data[0]) {
					case 'input':
						this.input(e.data[1], e.data[2]);
						break;
					case 'layout':
						this.setSystemLayout(e.data[1]);
						break;
					case 'possize':
						this.updateConfig({x: e.data[1], y: e.data[2], width: e.data[3], height: e.data[4]});
						break;
					default:
						console.log("message", e.data[0], e.data)
				}
			} else if (typeof e.data === 'string') {
				const command = e.data.split(',', 1)[0];
				const rest = e.data.slice(command.length + 1);
				switch (command) {
					case 'config':
						this.setConfig(rest).catch(console.error);
						break;
					case 'defaultConfig':
						this.defaultConfig();
						break;
					case 'os':
						this.setOS(rest);
						break;
					case 'plugin':
						this.loadPlugin(rest);
						break;
					case 'fonts':
						this.loadFallbackFonts(rest);
						break;
					case 'done':
					case 'error':
						console.log("async callback", command, rest);
						break;
					default:
						console.log("message", command, rest)
				}
			} else {
				console.log("message", e.data)
			}
		});
	}

	render() {
		const s = this.state;
		const Board = s.currentBoard[s.mode];
		const c = <Board.Contents state={s.boardState[Board.name]}/>;
		const l: Layout = useMemo(() => {
			const base = s.config.isoKeyboard ? IsoLayout : AnsiLayout;
			return {...base, sys: s.layout};
		}, [s.config.isoKeyboard, s.layout]);
		return <LayoutContext.Provider value={l}>
			<OSContext.Provider value={s.os}>
				<ConfigContext.Provider value={s.config}>
					<PluginsContext.Provider value={s.plugins}>
						<ConfigBuildingContext.Provider value={s.building}>
							<SearchContext.Provider value={s.searchText}>
								<div className={`root ${s.config.themeMode}-color-scheme ${l.cssClass}`}>{c}</div>
							</SearchContext.Provider>
						</ConfigBuildingContext.Provider>
					</PluginsContext.Provider>
				</ConfigContext.Provider>
			</OSContext.Provider>
		</LayoutContext.Provider>;
	}

	public setMode(mode: AppMode) {
		this.setState((s) => {
			if (s.mode != mode) {
				if (mode == AppMode.SEARCH && !s.parentBoards[AppMode.SEARCH].length) ahkSetSearch(true);
				else ahkSetSearch(false);
			}
			return {mode};
		}, () => {
			this.updateStatus();
		});
	}

	public updateStatus(text?: string) {
		const s = this.state;
		switch (s.mode) {
			case AppMode.MAIN:
			case AppMode.RECENTS:
				const board = s.currentBoard[s.mode];
				ahkTitle(('Emoji Keyboard - ' + board.name + (text?.length ? ': ' + text : '')).replace(/[\s\n]+/g, ' '));
				break;
			case AppMode.SEARCH:
				ahkTitle('Emoji Keyboard - ' + (text?.length ? text : 'Search'));
				break;
			case AppMode.SETTINGS:
				ahkTitle('Emoji Keyboard - ' + (text?.length ? text : 'Settings'));
				break;
			default:
				return unreachable(s.mode);
		}

	}

	public input(key: number, shift: boolean = false) {
		const s = this.state;
		switch (s.mode) {
			case AppMode.MAIN:
			case AppMode.SEARCH:
			case AppMode.SETTINGS:
			case AppMode.RECENTS:
				// animate keypress
				var keydiv = document.querySelector('[data-keycode="' + key + '"]')
				var symboldiv = keydiv?.getElementsByClassName("symbol")[0]
				symboldiv?.classList.add("keypress")
				setTimeout(() => {
					symboldiv?.classList.remove("keypress")
				}, 100)

				const k = this.keyHandlers[key as SC];
				if (k) {
					if (shift) k.actAlternate();
					else k.act();
				}
				break;
			default:
				return unreachable(s.mode);
		}
	}

	public async setConfig(config: string) {
		await this.updateConfig(JSON.parse(config), false);
		ahkReady();
	}

	public defaultConfig() {
		ahkSaveConfig(this.state.config);
		ahkSetOpacity(this.state.config.opacity);
		ahkReady();
	}

	public getConfig(): AppConfig {
		return this.state.config;
	}

	public updateConfig(config: Partial<AppConfig> | ((prev: AppConfig) => Partial<AppConfig>), save = true): Promise<void> {
		return new Promise((resolve) => {
			let noop = false;
			this.setState((s) => {
				if (typeof config === 'function') config = config(s.config);
				if (!Object.keys(config).length) {
					noop = true;
					return {};
				}
				if (config.theme && s.config.theme != config.theme) {
					const link = document.getElementById('themeCSS') as HTMLLinkElement;
					link.href = ThemesMap.get(config.theme)?.url ?? DefaultThemeUrl;
				}
				if (config.openAt) {
					ahkSetOpenAt(config.openAt);
				}
				// must check explicitly as 0 is false
				if ((config.x != undefined && config.y != undefined &&
					config.width != undefined && config.height != undefined)) {
					ahkSetPosSize(config.x, config.y, config.width, config.height);
				}
				if (config.opacity && s.config.opacity != config.opacity) {
					ahkSetOpacity(config.opacity);
				}
				if (config.devTools && !s.config.devTools) {
					ahkOpenDevTools();
				}
				return {config: {...s.config, ...config}};
			}, () => {
				if (save && !noop) ahkSaveConfig(this.state.config);
				resolve();
			});
		})
	}

	public setOS(osString: string) {
		const os = new Version(osString.replace(/^WIN_/, ''));
		this.setState({os})
		console.log("OS Set", os, IconFallback.map(f => ({...f, supported: supportsRequirements(f.requirement, os)})));
	}

	public setSystemLayout(layout: SystemLayout) {
		this.setState({layout: {...SystemLayoutUS, ...layout}});
	}

	public setSearchText(searchText: string) {
		this.setState({searchText},
			() => this.updateStatus());
	}

	public setBoard(board: Board): void {
		this.setState((s) => {
			if (s.mode == AppMode.SEARCH) ahkSetSearch(false);
			return {
				currentBoard: {...s.currentBoard, [s.mode]: board},
				parentBoards: {...s.parentBoards, [s.mode]: [s.currentBoard[s.mode], ...s.parentBoards[s.mode]]},
			}
		}, () => this.updateStatus());
	}

	public setPage(page: number): void {
		this.setState((s) => {
			const board = s.currentBoard[s.mode];
			return {
				boardState: {
					...s.boardState,
					[board.name]: {page}
				}
			}
		});
	}

	public setBuilding(building: boolean) {
		this.setState({building});
	}

	public back(): void {
		this.setState((s) => {
			if (s.parentBoards[s.mode].length) {
				if (s.mode == AppMode.SEARCH) ahkSetSearch(s.parentBoards[s.mode].length == 1);
				const [board, ...parents] = s.parentBoards[s.mode];
				return {
					parentBoards: {...s.parentBoards, [s.mode]: parents},
					currentBoard: {...s.currentBoard, [s.mode]: board},
				};
			}
			return {};
		});
	}

	/** Go back to main board */
	private main(): void {
		this.setState(s => ({
			mode: AppMode.MAIN,
			currentBoard: {
				...s.currentBoard,
				[AppMode.MAIN]: s.parentBoards[AppMode.MAIN][s.parentBoards[AppMode.MAIN].length - 1] ?? s.currentBoard[AppMode.MAIN]
			},
			parentBoards: {
				...s.parentBoards,
				[AppMode.MAIN]: []
			}
		}));
	}

	public send(cluster: string, {noRecent, variantOf}: { noRecent?: boolean, variantOf?: string }): void {
		ahkSend(cluster);
		if (!noRecent) increaseRecent(cluster);
		if (variantOf) app().updateConfig(c => {
			if (c.preferredVariant[variantOf] != cluster) return {
				preferredVariant: {
					...c.preferredVariant,
					[variantOf]: cluster
				}
			};
			else return {};
		})
		if (this.state.config.hideAfterInput) ahkHide();
		if (this.state.config.mainAfterInput) {
			if (this.state.mode == AppMode.RECENTS || this.state.mode == AppMode.MAIN) this.main();
		}
	}

	private loadPlugin(rest: string) {
		const name = rest.split('\n', 1)[0];
		const contents = rest.slice(name.length + 1);
		const data = JSON.parse(contents) as PluginData;
		const plugin: Plugin = {
			name,
			data
		}
		this.setState((s) => {
			const plugins = [...s.plugins, plugin];
			plugins.sort((a, b) => naturalCompare(a.name, b.name));
			const mainBoard = getMainBoard(plugins);
			return {
				plugins,
				currentBoard: {
					...s.currentBoard,
					[AppMode.MAIN]: mainBoard,
				},
				parentBoards: {
					...s.parentBoards,
					[AppMode.MAIN]: [],
				}
			}
		});
	}

	private loadFallbackFonts(rest: string) {
		const fonts = rest.split('\n')
			.filter(f => f.length && f.match(/.*\.(otf|ttf|woff2?|eot|svg)$/i));
		const usedNames = new Set<string>();
		const faces = fonts.map(font => {
			let alias = font.replace(/.*[\\\/]([^\\\/]+)$/, '$1').replace(/[^a-z0-9]/ig, '_');
			if (usedNames.has(alias)) {
				let i = 1;
				while (usedNames.has(alias + i)) i++;
				alias = alias + i;
			}
			usedNames.add(alias);
			return {alias, font};
		});
		const fFonts = faces.map(({alias}) => `${alias}, `).join('');
		const style = document.createElement('style');
		style.textContent = faces.map(({alias, font}) => `@font-face {
	font-family: "${alias}";
	src: url("${font.replace(/([\\"])/g, '\\$1')}");
}`).join('\n\n') + `
:root {
	--f-fallback: ${fFonts} 'Cambria Math', Tahoma, Geneva, Verdana, sans-serif;
}`;
		document.head.appendChild(style);
		console.log("Fallback fonts loaded", faces, style);
	}
}

export function startApp() {
	const main = document.querySelector('main') as HTMLElement;
	options.debounceRendering = f => setTimeout(f, 0);  // Use setTimeout for debounce to avoid the use of the Promise polyfill, which causes issues with IE
	(window as any).u = UnicodeData;

	render(<App/>, main);
	setTimeout(() => ahkLoaded(), 0);
}

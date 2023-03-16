import {Component, h, options, render} from 'preact';
import {AnsiLayout, IsoLayout, Layout, SystemLayout, SystemLayoutUS} from "./layout";
import {Board, BoardState, getMainBoard, SlottedKeys} from "./board";
import {Version} from "./osversion";
import {ahkOpenDevTools, ahkReady, ahkSaveConfig, ahkSetOpacity, ahkSetSearch, ahkTitle} from "./ahk";
import {search} from "./emojis";
import {AppConfig, ConfigBoard, DefaultConfig, DefaultThemeUrl, ThemesMap} from "./config";
import {fromEntries, unreachable} from "./helpers";
import {toTitleCase} from "./builder/titleCase";
import {
	AppActions,
	ConfigBuildingContext,
	ConfigContext,
	LayoutContext,
	OSContext,
	SearchContext,
	setApp
} from "./appVar";
import {useMemo} from "preact/hooks";
import {SC} from "./layout/sc";
import {SearchBoard} from "./searchView";

export const enum AppMode {
	MAIN = 0,
	SEARCH = 1,
	SETTINGS = 2
}

const AppModes = [AppMode.MAIN, AppMode.SEARCH, AppMode.SETTINGS] as const;

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
			[AppMode.MAIN]: getMainBoard(),
			[AppMode.SEARCH]: new SearchBoard(),
			[AppMode.SETTINGS]: new ConfigBoard(),
		},
		parentBoards: fromEntries(AppModes.map(m => [m, []] as const)),
		building: false,
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
					case 'size':
						this.updateConfig({width: e.data[1], height: e.data[2]});
						break;
					default:
						console.log("message", e.data[0], e.data)
				}
			} else if (typeof e.data === 'string') {
				const command = e.data.split(',', 1)[0];
				const rest = e.data.slice(command.length + 1);
				switch (command) {
					case 'config':
						this.setConfig(rest);
						break;
					case 'defaultConfig':
						this.defaultConfig();
						break;
					case 'os':
						this.setOS(rest);
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
		})
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
					<ConfigBuildingContext.Provider value={s.building}>
						<SearchContext.Provider value={s.searchText}>
							<div className={`root ${s.config.themeMode}-color-scheme ${l.cssClass}`}>{c}</div>
						</SearchContext.Provider>
					</ConfigBuildingContext.Provider>
				</ConfigContext.Provider>
			</OSContext.Provider>
		</LayoutContext.Provider>;
	}

	public setMode(mode: AppMode) {
		this.setState((s) => {
			if (s.mode != mode) {
				if (mode == AppMode.SEARCH) ahkSetSearch(true);
				if (s.mode == AppMode.SEARCH) ahkSetSearch(false);
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
				const board = s.currentBoard[s.mode];
				ahkTitle(board.name + (text?.length ? `: ${toTitleCase(text)}` : ''));
				break;
			case AppMode.SEARCH:
				ahkTitle('Emoji Keyboard - Search' + (s.searchText.length ? `: ${toTitleCase(s.searchText)}` : '') + (text ? ': ' + text : ''));
				break;
			case AppMode.SETTINGS:
				ahkTitle('Emoji Keyboard - Settings');
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

	public setConfig(config: string) {
		this.updateConfig(JSON.parse(config), false);
	}

	public defaultConfig() {
		ahkSaveConfig(JSON.stringify(this.state.config));
		ahkSetOpacity(this.state.config.opacity);
	}

	public updateConfig(config: Partial<AppConfig>, save = true) {
		this.setState((s) => {
			if (config.theme && s.config.theme != config.theme) {
				const link = document.getElementById('themeCSS') as HTMLLinkElement;
				link.href = ThemesMap.get(config.theme)?.url ?? DefaultThemeUrl;
			}
			if (config.opacity && s.config.opacity != config.opacity) {
				ahkSetOpacity(config.opacity);
			}
			if (config.devTools && !s.config.devTools) {
				ahkOpenDevTools();
			}
			return {config: {...s.config, ...config}};
		}, () => {
			if (save) ahkSaveConfig(JSON.stringify(this.state.config));
		})
	}

	public setOS(os: string) {
		os = os.replace(/^WIN_/, '');
		this.setState({os: new Version(os)})
	}

	public setSystemLayout(layout: SystemLayout) {
		this.setState({layout: {...SystemLayoutUS, ...layout}});
	}

	public setSearchText(searchText: string) {
		this.setState({searchText},
			() => this.updateStatus());
	}

	public setBoard(board: Board): void {
		this.setState((s) => ({
				currentBoard: {...s.currentBoard, [s.mode]: board},
				parentBoards: {...s.parentBoards, [s.mode]: [s.currentBoard[s.mode], ...s.parentBoards[s.mode]]},
			}),
			() => this.updateStatus());
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
				const [board, ...parents] = s.parentBoards[s.mode];
				return {
					parentBoards: {...s.parentBoards, [s.mode]: parents},
					currentBoard: {...s.currentBoard, [s.mode]: board},
				};
			}
			return {};
		});
	}
}

const main = document.querySelector('main') as HTMLElement;
options.debounceRendering = f => setTimeout(f, 0);  // Use setTimeout for debounce to avoid the use of the Promise polyfill, which causes issues with IE

render(<App/>, main);
setTimeout(() => ahkReady(), 0);

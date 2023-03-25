import {Component, h, options, render} from 'preact';
import {AnsiLayout, BaseLayout, IsoLayout,  Layout, SystemLayout, SystemLayoutUS} from "./layout";
import {Board, BoardState, getMainBoard, SlottedKeys} from "./board";
import {Version} from "./osversion";
import {ahkOpenDevTools, ahkReady, ahkSaveConfig, ahkSetOpacity, ahkSetOpenAt, ahkSetPosSize, ahkSetSearch, ahkTitle} from "./ahk";
import {search} from "./emojis";
import {AppConfig, ConfigBoard, DefaultConfig, DefaultThemeUrl, ThemesMap} from "./config";
import {fromEntries, unreachable} from "./helpers";
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
import { RecentEmoji } from './config';

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
				ahkTitle('Emoji Keyboard - ' + board.name + ': '+ (text?.length ? text : ''));
				break;
			case AppMode.SEARCH:
				ahkTitle('Emoji Keyboard - Search: ' + (text?.length ? text : ''));
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
				// animate keypress
				var keydiv = document.querySelector('[data-keycode="' + key +'"]')
				var symboldiv = keydiv?.getElementsByClassName("symbol")[0]
				symboldiv?.classList.add("keypress")
				setTimeout(() => {symboldiv?.classList.remove("keypress")}, 100)

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
		ahkSaveConfig(JSON.stringify(this.state.config, null, 4));
		ahkSetOpacity(this.state.config.opacity);
	}

	public updateConfig(config: Partial<AppConfig>, save = true) {
		this.setState((s) => {
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
			if (save) ahkSaveConfig(JSON.stringify(this.state.config, null, 4));
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

	public getLayout(): BaseLayout
	{
		return this.state.config.isoKeyboard ? IsoLayout : AnsiLayout;
	}

	public getRecent() : RecentEmoji[] {
		return this.state.config.recent;
	}
}

const main = document.querySelector('main') as HTMLElement;
options.debounceRendering = f => setTimeout(f, 0);  // Use setTimeout for debounce to avoid the use of the Promise polyfill, which causes issues with IE

render(<App/>, main);
setTimeout(() => ahkReady(), 0);

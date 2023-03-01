import {Component, createContext, h, options, render} from 'preact';
import {SC, SystemLayout} from "./data";
import {SystemLayoutUS} from "./layout";
import {Board, getMainBoard, LegacyKeyboardView, SharedState, SlottedKeys} from "./board";
import {Version} from "./osversion";
import {ahkOpenDevTools, ahkReady, ahkSaveConfig, ahkSetOpacity, ahkSetSearch, ahkTitle} from "./ahk";
import {getSearchBoard, SearchView} from "./search";
import {search} from "./emojis";
import {
	AppConfig,
	ConfigPage,
	ConfigView,
	DefaultConfig,
	DefaultConfigPage,
	DefaultThemeUrl,
	ThemesMap
} from "./config";
import {unreachable} from "./helpers";
import {toTitleCase} from "./builder/titleCase";

export const enum AppMode {
	MAIN = 0,
	SEARCH = 1,
	SETTINGS = 2
}

type AppState = {
	mode: AppMode;
	searchText: string;
	layout: SystemLayout;
	config: AppConfig;
	sharedState: SharedState;
	os: Version;
}
export type AppRenderProps = AppState & { app: AppActions };

export interface AppActions {
	keyHandlers: SlottedKeys;
	setBoard(parent: Board): void;
	setSearchBoard(searchBoard: Board): void;
	setConfigPage(configPage: ConfigPage): void;
	setSearchText(searchText: string): void;
	updateConfig(config: Partial<AppConfig>): void;
	setPage(name: string, page: number): void;
	updateStatus(name: string): void;
	setMode(mode: AppMode): void;
}
export const AppContext = createContext<AppActions>(null as any);

class App extends Component<{}, AppState> implements AppActions {
	keyHandlers: SlottedKeys = {}
	state = {
		mode: AppMode.MAIN,
		searchText: '',
		layout: SystemLayoutUS,
		config: {...DefaultConfig, opacity: 1},
		sharedState: {
			board: getMainBoard(),
			searchBoard: getSearchBoard(''),
			configPage: DefaultConfigPage,
			state: {}
		},
		os: new Version('99')
	}

	constructor(props: {}) {
		super(props);
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
		let c;
		switch (s.mode) {
			case AppMode.MAIN:
				c = <LegacyKeyboardView {...s} app={this}/>;
				break;
			case AppMode.SEARCH:
				c = <SearchView {...s} app={this}/>
				break;
			case AppMode.SETTINGS:
				c = <ConfigView {...s} app={this}/>
				break;
			default:
				return unreachable(s.mode);
		}
		const layout = s.config.isoKeyboard ? 'iso-layout' : 'ansi-layout';
		return <AppContext.Provider value={this}>
			<div className={`root ${s.config.themeMode}-color-scheme ${layout}`}>{c}</div>
		</AppContext.Provider>;
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
				ahkTitle(s.sharedState.board.name + (text?.length ? `: ${toTitleCase(text)}` : ''));
				break;
			case AppMode.SEARCH:
				ahkTitle('Emoji Keyboard - Search' + (s.searchText.length ? `: ${toTitleCase(s.searchText)}` : ''));
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
					if (shift) k.actAlternate(this);
					else k.act(this);
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
		this.setState((s) => ({sharedState: {...s.sharedState, board}}),
			() => this.updateStatus());
	}

	public setSearchBoard(searchBoard: Board) {
		this.setState((s) => ({sharedState: {...s.sharedState, searchBoard}}),
			() => this.updateStatus());
	}

	public setConfigPage(configPage: ConfigPage) {
		this.setState((s) => ({sharedState: {...s.sharedState, configPage}}))
	}

	public setPage(name: string, page: number): void {
		this.setState((s) => ({sharedState: {...s.sharedState, state: {...s.sharedState.state, [name]: {page}}}}));
	}
}

const main = document.querySelector('main') as HTMLElement;
options.debounceRendering = f => setTimeout(f, 0);  // Use setTimeout for debounce to avoid the use of the Promise polyfill, which causes issues with IE

render(<App/>, main);
setTimeout(() => ahkReady(), 0);

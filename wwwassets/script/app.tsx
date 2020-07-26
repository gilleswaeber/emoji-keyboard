import {Component, h, options, render} from 'preact';
import {KeyboardLayout} from "./def/data";
import {DefaultLayout} from "./layout";
import {Board, BoardState, DefaultBoardState, getMainBoard, KeyboardView} from "./board";
import {Version} from "./osversion";
import {ahkReady, ahkTitle} from "./ahk";
import {getSearchBoard, SearchView} from "./search";
import {search} from "./emojis";

type AppState = {
	search: boolean;
	searchText: string;
	searchBoard: Board;
	layout: KeyboardLayout;
	board: Board;
	boardState: BoardState;
	os: Version;
}

export interface AppActions {
	showBoard(parent: Board): void;
	setPage(page: number): void;
}

class App extends Component<{}, AppState> implements AppActions {
	state = {
		search: false,
		searchText: '',
		searchBoard: getSearchBoard(''),
		layout: DefaultLayout,
		board: getMainBoard(),
		boardState: DefaultBoardState,
		os: new Version('99')
	}

	constructor(props: {}) {
		super(props);
		(window as any).document.ahk = this;
		(window as any).s = search;
	}

	render() {
		const s = this.state;
		if (this.state.search) {
			return <SearchView layout={s.layout} os={s.os} board={s.searchBoard} app={this}/>;
		} else {
			return <KeyboardView layout={s.layout} board={s.board} boardState={s.boardState} os={s.os} app={this}/>
		}
	}

	public setSearch(search: boolean) {
		this.setState({search})
		if (search) ahkTitle('Emoji Keyboard - Search');
		else ahkTitle(this.state.board.name);
	}

	public input(key: number, shift: boolean = false) {
		const s = this.state;
		if (s.search) {
			s.searchBoard.input(this, {page: 0}, key, shift);
		} else {
			s.board.input(this, s.boardState, key, shift);
		}
	}

	public setKeymap(keymap: string) {
		if (data.keymaps[keymap]) {
			const k = data.keymaps[keymap];
			const layout: KeyboardLayout = {name: k.name, keys: {...DefaultLayout.keys, ...k.keys}};
			this.setState({layout})
		} else {
			const keymaps = Array.from(Object.keys(data.keymaps)).slice(1).join(", ");
			alert(keymap + " is not a valid keymap!\nValid keymaps are " + keymaps);
		}
	}

	public setOS(os: string) {
		os = os.replace(/^WIN_/, '');
		this.setState({os: new Version(os)})
	}

	public setSearchText(searchText: string) {
		this.setState({searchText, searchBoard: getSearchBoard(searchText)});
		ahkTitle('Text: ' + searchText);
	}

	public showBoard(board: Board): void {
		this.setState({board, boardState: board.lastState})
		ahkTitle(board.name);
	}

	public setPage(page: number): void {
		this.setState({boardState: {page}});
	}
}

const main = document.querySelector('main') as HTMLElement;
options.debounceRendering = f => setTimeout(f, 0);  // Use setTimeout for debounce to avoid the use of the Promise polyfill, which causes issues with IE

render(<App/>, main);
setTimeout(() => ahkReady(), 0);

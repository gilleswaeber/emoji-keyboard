import {Version} from "./osversion";
import {AppActions} from "./app";
import {h} from "preact";
import {Board} from "./board";
import {Emoji, EmojiStyle, KeyboardLayout, KeyCode} from "./data";
import {ahkSend, ahkSetSearch} from "./ahk";

function toTwemojiFilename(symbol: string) {
	let name: string[] = [];
	for (var i = 0; i < symbol.length; i++) {
		let c = (symbol.codePointAt(i) as number).toString(16);
		name.push(c);
		if (symbol.charCodeAt(i) != symbol.codePointAt(i)) i++;
	}
	let filename = name.join('-') + '.svg';
	if (filename.indexOf('200d') === -1) filename = filename.replace(/-fe0f/g, '');
	return 'img/' + filename;
}

export class Key {
	public readonly name: string;
	public readonly upperName: string;
	public readonly symbol: string;
	public readonly style: string;
	public readonly requiredOS: string;
	public readonly active: boolean;

	constructor(
		props: { name: string, upperName?: string, symbol: string, style?: EmojiStyle, requiredOS?: string, active?: boolean }
	) {
		this.name = props.name;
		this.upperName = props.upperName ?? '';
		this.symbol = props.symbol;
		this.style = props.style ?? '';
		this.requiredOS = props.requiredOS ?? '0';
		this.active = props.active ?? false;
	}

	render(app: AppActions, b: Board, code: KeyCode, layout: KeyboardLayout, os: Version) {
		const useFallback = os.ge(this.requiredOS);
		let keyType = "action";
		if (!this.name.length) {
			keyType = "empty";
		} else if (this instanceof CharKey) {
			keyType = "char";
		} else if (this instanceof BackKey) {
			keyType = "back";
		}

		return <div
			class={`key ${keyType} ${this.hasAlternate() && 'alt'} ${this.isLULetter() && 'lu'} ${this.active && 'active'}`}
			onClick={(e) => {e.preventDefault(); e.shiftKey ? this.actAlternate(app, b) : this.act(app, b);}}
			onContextMenu={(e) => {e.preventDefault(); this.actAlternate(app, b);}}
			onMouseOver={() => b.showStatus(this.name)}
		>
			<div class="keyname">{layout.keys[code]}</div>
			<div class="name">{this.name}</div>
			<div class="uname">{this.upperName}</div>
			<div class={`symbol ${this.style && 's-' + this.style}`}>
				{useFallback ? <img src={toTwemojiFilename(this.symbol)} alt={this.symbol}/> : this.symbol}
			</div>
		</div>;
	}

	act(app: AppActions, parent: Board): void {
		// Default: do nothing
	}

	actAlternate(app: AppActions, parent: Board): void {
		this.act(app, parent);
	}

	hasAlternate(): boolean {
		return false;
	}

	isLULetter(): boolean {
		return false;
	}
}

export const BlankKey = new Key({name: '', symbol: ''});

export class BackKey extends Key {
	constructor(private parent: Board) {
		super({name: 'back', symbol: '←'});
	}

	act(app: AppActions) {
		app.showBoard(this.parent);
	}
}

export class KeyboardKey extends Key {
	constructor(private target: Board) {
		super({name: target.name, symbol: target.symbol, requiredOS: target.requiredOS});
	}

	act(app: AppActions) {
		app.showBoard(this.target);
	}
}

export class PageKey extends Key {
	constructor(private page: number, active: boolean) {
		super({name: `page ${page + 1}`, symbol: '' + (page + 1), active});
	}

	act(app: AppActions) {
		if (!this.active) app.setPage(this.page);
	}
}

export class SearchKey extends Key {
	constructor() {
		super({name: 'search', symbol: '🔎'});
	}

	act(app: AppActions) {
		ahkSetSearch(true);
	}
}

export class ExitSearchKey extends Key {
	constructor() {
		super({name: 'back', symbol: '←'});
	}

	act(app: AppActions) {
		ahkSetSearch(false);
	}
}

export class CharKey extends Key {
	constructor(private char: Emoji) {
		super({
			name: (char.name || char.fullName).toLowerCase(),
			upperName: char.alternates?.length == 2 ? char.alternates[1].show : "",
			style: char.style,
			symbol: char.show ?? char.symbol,
			requiredOS: char.requiredVersion,
		});
	}

	act(app: AppActions) {
		ahkSend(this.char.symbol);
	}

	actAlternate(app: AppActions, parent: Board) {
		if (this.hasAlternate()) {
			app.showBoard(Board.fromAlternates(parent, this.char));
		} else if (this.isLULetter()) {
			ahkSend(this.char.alternates![1].symbol);
		} else return this.act(app);
	}

	getUName(): string {
		if (this.isLULetter()) return this.char.alternates![1].show;
		else return "";
	}

	hasAlternate(): boolean {
		return !!this.char.alternates && this.char.alternates.length > 2;
	}

	isLULetter(): boolean {
		return this.char.alternates?.length == 2;
	}
}

import {AppActions, AppMode, AppRenderProps} from "./app";
import {h} from "preact";
import {Board} from "./board";
import {Emoji, EmojiStyle, SC} from "./data";
import {ahkSend} from "./ahk";
import {ConfigPage} from "./config";

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

	render({os, app, layout}: AppRenderProps, code: SC) {
		const useFallback = os.ge(this.requiredOS);
		let keyType = "action";
		if (!this.name.length) {
			keyType = "empty";
		} else if (this instanceof LegacyCharKey) {
			keyType = "char";
		} else if (this instanceof BackKey) {
			keyType = "back";
		}

		return <div
			class={`key ${keyType} ${this.hasAlternate() && 'alt'} ${this.isLULetter() && 'lu'} ${this.active && 'active'}`}
			onClick={(e) => {
				e.preventDefault();
				e.shiftKey ? this.actAlternate(app) : this.act(app);
			}}
			onContextMenu={(e) => {
				e.preventDefault();
				this.actAlternate(app);
			}}
			onMouseOver={() => app.updateStatus(this.name)}
			key={code}
		>
			<div class="keyname">{layout[code]?.name}</div>
			<div class="name">{this.name}</div>
			<div class="uname">{this.upperName}</div>
			<div class={`symbol ${this.style && 's-' + this.style}`}>
				{useFallback ? <img src={toTwemojiFilename(this.symbol)} alt={this.symbol}/> : this.symbol}
			</div>
		</div>;
	}

	act(app: AppActions): void {
		// Default: do nothing
	}

	actAlternate(app: AppActions): void {
		this.act(app);
	}

	hasAlternate(): boolean {
		return false;
	}

	isLULetter(): boolean {
		return false;
	}
}

export class ConfigKey extends Key {
	constructor() {
		super({name: "Settings", symbol: "🛠️"});
	}

	render({os, app, layout}: AppRenderProps, code: SC) {
		const useFallback = os.ge(this.requiredOS);

		return <div
			class={`key action`}
			onClick={(e) => {
				e.preventDefault();
				this.actAlternate(app);
			}}
			onContextMenu={(e) => {
				e.preventDefault();
				this.actAlternate(app);
			}}
			onMouseOver={() => app.updateStatus(this.name)}
		>
			<div class="keyname">{`⇧${layout[code]?.name}`}</div>
			<div class="name">{this.name}</div>
			<div class={`symbol`}>
				{useFallback ? <img src={toTwemojiFilename(this.symbol)} alt={this.symbol}/> : this.symbol}
			</div>
		</div>;
	}

	act(app: AppActions): void {
		// Do nothing
	}

	actAlternate(app: AppActions): void {
		app.setMode(AppMode.SETTINGS);
	}
}

export class ConfigActionKey extends Key {
	protected action: () => void;

	constructor({active, action, name, symbol}: { active?: boolean, action(): void, name?: string, symbol?: string }) {
		active = active ?? false;
		super({
			name: name ?? (active ? "On" : "Off"),
			symbol: symbol ?? (active ? "✔️" : "❌"),
			active
		});
		this.action = action;
	}

	act(app: AppActions) {
		this.action();
	}
}

export class ConfigToggleKey extends ConfigActionKey {
	act(app: AppActions) {
		this.action();
	}
}

export class ConfigLabelKey extends Key {
	constructor(text: string) {
		super({name: "", symbol: text});
	}

	render({os, app, layout}: AppRenderProps, code: SC) {
		return <div class={`key label`}>
			<div class="keyname">{layout[code]?.name}</div>
			<div class="name">{this.name}</div>
			<div class="symbol">{this.symbol}</div>
		</div>;
	}
}

export const BlankKey = new Key({name: '', symbol: ''});

export class BackKey extends Key {
	constructor(private parent: Board) {
		super({name: 'back/🛠️', symbol: '←'});
	}

	act(app: AppActions) {
		app.setBoard(this.parent);
	}

	actAlternate(app: AppActions) {
		app.setMode(AppMode.SETTINGS);
	}
}

export class KeyboardKey extends Key {
	constructor(private target: Board) {
		super({name: target.name, symbol: target.symbol, requiredOS: target.requiredOS});
	}

	act(app: AppActions) {
		app.setBoard(this.target);
	}
}

export class PageKey extends Key {
	constructor(private board: Board, private page: number, active: boolean) {
		super({name: `page ${page + 1}`, symbol: '' + (page + 1), active});
	}

	act(app: AppActions) {
		if (!this.active) app.setPage(this.board.name, this.page);
	}
}

export class ConfigPageKey extends Key {
	constructor(private page: ConfigPage, active: boolean) {
		super({name: page.name, symbol: page.symbol, active});
	}

	act(app: AppActions) {
		if (!this.active) app.setConfigPage(this.page);
	}
}

export class SearchKey extends Key {
	constructor() {
		super({name: 'search', symbol: '🔎'});
	}

	act(app: AppActions) {
		app.setMode(AppMode.SEARCH);
	}
}

export class ExitSearchKey extends Key {
	constructor() {
		super({name: 'back', symbol: '←'});
	}

	act(app: AppActions) {
		app.setMode(AppMode.MAIN);
	}
}

export class LegacyCharKey extends Key {
	constructor(private char: Emoji, private board: Board) {
		super({
			name: (char.name ?? char.fullName ?? "").toLowerCase(),
			upperName: char.alternates?.length == 2 ? char.alternates[1].show : "",
			style: char.style,
			symbol: char.show ?? char.symbol,
			requiredOS: char.requiredVersion,
		});
	}

	act(app: AppActions) {
		ahkSend(this.char.symbol);
	}

	actAlternate(app: AppActions) {
		if (this.hasAlternate()) {
			app.setBoard(Board.fromAlternates(this.board!!, this.char));
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

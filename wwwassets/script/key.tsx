import {AppMode, AppRenderProps} from "./app";
import {h} from "preact";
import {Board} from "./board";
import {EmojiStyle, SC} from "./data";
import {ahkSend} from "./ahk";
import {ConfigPage} from "./config";
import {app} from "./appVar";
import {cl} from "./helpers";
import {clusterName, clusterVariants} from "./unicodeInterface";

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

function Symbol({symbol, style}: { symbol: string, style?: string }) {
	const useFallback = false;
	return <div className={`symbol ${style && 's-' + style}`}>
		{useFallback ? <img src={/*toTwemojiFilename*/(symbol)} alt={symbol}/> : symbol}
	</div>
}

export class Key {
	public readonly name: string;
	public readonly upperName: string;
	public readonly symbol: string;
	public readonly style: string;
	public readonly active: boolean;
	private readonly clickAlwaysAlternate: boolean;
	private readonly keyNamePrefix: string;
	protected readonly alt: boolean;
	protected readonly lu: boolean;

	constructor(
		p: { name: string, upperName?: string, symbol: string, style?: EmojiStyle, active?: boolean, clickAlwaysAlternate?: boolean, keyNamePrefix?: string, alt?: boolean, lu?: boolean }
	) {
		this.name = p.name;
		this.upperName = p.upperName ?? '';
		this.symbol = p.symbol;
		this.style = p.style ?? '';
		this.active = p.active ?? false;
		this.clickAlwaysAlternate = p.clickAlwaysAlternate ?? false;
		this.keyNamePrefix = p.keyNamePrefix ?? '';
		this.alt = p.alt ?? false;
		this.lu = p.lu ?? false;
	}

	render({os, layout}: AppRenderProps, code: SC) {
		let keyType = "action";
		if (!this.name.length) {
			keyType = "empty";
		} else if (this instanceof ClusterKey) {
			keyType = "char";
		} else if (this instanceof BackKey) {
			keyType = "back";
		}

		return <div
			className={cl('key', keyType, {alt: this.alt, lu: this.lu, active: this.active})}
			onClick={(e) => {
				e.preventDefault();
				e.shiftKey || this.clickAlwaysAlternate ? this.actAlternate() : this.act();
			}}
			onContextMenu={(e) => {
				e.preventDefault();
				this.actAlternate();
			}}
			onMouseOver={() => app().updateStatus(this.name)}
			key={code}
		>
			<div className="keyname">{this.keyNamePrefix}{layout[code]?.name}</div>
			<div className="name">{this.name}</div>
			<div className="uname">{this.upperName}</div>
			<Symbol symbol={this.symbol} style={this.style}/>
		</div>;
	}

	act(): void {
		// Default: do nothing
	}

	actAlternate(): void {
		this.act();
	}
}

export class ConfigKey extends Key {
	constructor() {
		super({name: "Settings", symbol: "🛠️", clickAlwaysAlternate: true});
	}

	actAlternate(): void {
		app().setMode(AppMode.SETTINGS);
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

	act() {
		this.action();
	}
}

export class ConfigToggleKey extends ConfigActionKey {
	act() {
		this.action();
	}
}

export class ConfigLabelKey extends Key {
	constructor(text: string) {
		super({name: "", symbol: text});
	}

	render({os, layout}: AppRenderProps, code: SC) {
		return <div class={`key label`}>
			<div class="keyname">{layout[code]?.name}</div>
			<div class="name">{this.name}</div>
			<div class="symbol">{this.symbol}</div>
		</div>;
	}
}

export const BlankKey = new Key({name: '', symbol: ''});

export class BackKey extends Key {
	constructor() {
		super({name: 'back/🛠️', symbol: '←'});
	}

	act() {
		app().back();
	}

	actAlternate() {
		app().setMode(AppMode.SETTINGS);
	}
}

export class KeyboardKey extends Key {
	constructor(private target: Board) {
		super({name: target.name, symbol: target.symbol});
	}

	act() {
		app().setBoard(this.target);
	}
}

export class PageKey extends Key {
	constructor(private page: number, active: boolean) {
		super({name: `page ${page + 1}`, symbol: '' + (page + 1), active});
	}

	act() {
		if (!this.active) app().setPage(this.page);
	}
}

export class ConfigPageKey extends Key {
	constructor(private page: ConfigPage, active: boolean) {
		super({name: page.name, symbol: page.symbol, active});
	}

	act() {
		if (!this.active) app().setConfigPage(this.page);
	}
}

export class SearchKey extends Key {
	constructor() {
		super({name: 'search', symbol: '🔎'});
	}

	act() {
		app().setMode(AppMode.SEARCH);
	}
}

export class ExitSearchKey extends Key {
	constructor() {
		super({name: 'back', symbol: '←'});
	}

	act() {
		app().setMode(AppMode.MAIN);
	}
}

export class ClusterKey extends Key {
	private readonly variants: string[] | undefined;
	constructor(private cluster: string) {
		const name = clusterName(cluster);
		const variants = clusterVariants(cluster);
		super({
			name,
			upperName: variants?.length == 2 ? variants[1] : "",
			symbol: cluster,
			alt: !!variants && variants.length > 2,
			lu: variants?.length === 2,
		});
		this.variants = variants;
	}

	act() {
		ahkSend(this.cluster);
	}

	actAlternate() {
		if (this.alt) {
			app().setBoard(Board.clusterAlternates(this.cluster));
		} else if (this.lu) {
			ahkSend(this.variants![1]);
		} else return this.act();
	}
}

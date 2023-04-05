import {AppMode} from "./app";
import {ComponentChild, Fragment, h} from "preact";
import {Board, RecentBoard} from "./board";
import {ahkSend} from "./ahk";
import {app, ConfigBuildingContext, LayoutContext, OSContext} from "./appVar";
import {cl} from "./helpers";
import {charInfo, clusterName, clusterVariants, requiredOS} from "./unicodeInterface";
import {makeBuild, toCodePoints} from "./builder/builder";
import {GeneralCategory} from "./builder/unicode";
import {useContext, useMemo} from "preact/hooks";
import {SC} from "./layout/sc";
import {RecentEmoji} from "./config";
import {VarSel15} from "./chars";

function Symbol({symbol}: { symbol: string }) {
	const os = useContext(OSContext);
	return useMemo(() => {
		if ([...symbol].length == 1) {
			const info = charInfo(toCodePoints(symbol)[0]);
			if (info?.ca === GeneralCategory.Space_Separator || info?.ca === GeneralCategory.Format || info?.ca === GeneralCategory.Control) {
				return <div className="symbol s-space">{info.n}</div>
			} else if (info?.ca === GeneralCategory.Nonspacing_Mark) {
				symbol = '◌' + symbol;
			}
		}
		const req = requiredOS(symbol);
		// here we consider that symbol = 1 grapheme cluster
		// note that the browser doesn't apply the text-style selector by itself since the chars are in different fonts
		// also, we may need a fallback for a sequence so font-family fallback won't work either
		const fallbackFont = os.lt(req);
		const textStyle = symbol.endsWith(VarSel15);
		return <div className={cl(`symbol`, {fallbackFont, textStyle})}>
			{symbol}
		</div>
	}, [symbol, os]);
}

export function KeyName({code}: { code: SC }) {
	const layout = useContext(LayoutContext);
	return <Fragment>{layout.sys[code]?.name ?? ''}</Fragment>;
}

export class Key {
	public readonly name: string;
	public readonly upperName: string;
	public readonly symbol: string;
	public readonly active: boolean;
	public readonly blank: boolean;
	protected readonly clickAlwaysAlternate: boolean;
	private readonly keyNamePrefix: string;
	protected readonly alt: boolean;
	protected readonly lu: boolean;


	constructor(
		p: { name: string, upperName?: string, symbol: string, active?: boolean, clickAlwaysAlternate?: boolean, keyNamePrefix?: string, alt?: boolean, lu?: boolean, blank?: boolean }
	) {
		this.name = p.name;
		this.upperName = p.upperName ?? '';
		this.symbol = p.symbol;
		this.active = p.active ?? false;
		this.clickAlwaysAlternate = p.clickAlwaysAlternate ?? false;
		this.keyNamePrefix = p.keyNamePrefix ?? '';
		this.alt = p.alt ?? false;
		this.lu = p.lu ?? false;
		this.blank = p.blank ?? false;
	}

	Contents = ({code}: { code: SC }) => {
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
			data-keycode={code}
		>
			<div className="keyname">{this.keyNamePrefix}<KeyName code={code}/></div>
			<div className="name">{this.name}</div>
			<div className="uname">{this.upperName}</div>
			<Symbol symbol={this.symbol}/>
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
		super({name: "Settings", symbol: "🛠️", clickAlwaysAlternate: true, keyNamePrefix: "⇧"});
	}

	actAlternate(): void {
		app().setMode(AppMode.SETTINGS);
	}
}

export class ConfigActionKey extends Key {
	protected action: () => void;

	constructor({active, action, name, symbol}: { active?: boolean, action(): void, name: string, symbol: string }) {
		super({name, symbol, active});
		this.action = action;
	}

	act() {
		this.action();
	}
}

export class ConfigToggleKey extends ConfigActionKey {
	constructor({active, action, name, symbol}: { active?: boolean, action(): void, name?: string, symbol?: string }) {
		active = active ?? false;
		super({
			name: name ?? (active ? "On" : "Off"),
			symbol: symbol ?? (active ? "✔️" : "❌"),
			active, action,
		});
	}
}

export class ConfigLabelKey extends Key {
	constructor(private text: ComponentChild) {
		super({name: "", symbol: ""});
	}

	Contents = ({code}: { code: SC }) => {
		return <div class={`key label`}>
			<div class="keyname"><KeyName code={code}/></div>
			<div class="symbol">{this.text}</div>
		</div>;
	}
}

export class ConfigBuildKey extends Key {
	constructor() {
		super({name: "Build", symbol: "🏗️"})
	}

	act() {
		makeBuild();
	}

	Contents = ({code}: { code: SC }) => {
		const active = useContext(ConfigBuildingContext);
		return <div
			className={cl('key action', {active})}
			onClick={(e) => {
				e.preventDefault();
				e.shiftKey || this.clickAlwaysAlternate ? this.actAlternate() : this.act();
			}}
			onContextMenu={(e) => {
				e.preventDefault();
				this.actAlternate();
			}}
			onMouseOver={() => app().updateStatus(this.name)}
		>
			<div className="keyname"><KeyName code={code}/></div>
			<div className="name">{this.name}</div>
			<Symbol symbol={this.symbol}/>
		</div>;
	}
}

export const BlankKey = new Key({name: '', symbol: '', blank: true});

export class BackKey extends Key {
	constructor() {
		super({name: 'Back/🛠️', symbol: '←'});
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
	constructor(private page: number, active: boolean, name?: string, symbol?: string) {
		super({name: name ?? `page ${page + 1}`, symbol: symbol ?? '' + (page + 1), active});
	}

	act() {
		if (!this.active) app().setPage(this.page);
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
	constructor(private cluster: string, variants?: string[]) {
		const name = clusterName(cluster);
		variants ??= clusterVariants(cluster);
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
		this.addRecent(this.cluster);
	}

	actAlternate() {
		if (this.alt) {
			app().setBoard(Board.clusterAlternates(this.cluster, this.variants!));
		} else if (this.lu) {
			ahkSend(this.variants![1]);
			this.addRecent(this.variants![1]);
		} else return this.act();
	}

	addRecent(symbol: string) {
		var r: RecentEmoji[] = app().getRecent();
		const riseValue = 11;

		// rise if it exists, others sink and >=100 are sticky
		r.forEach(ue => {
			if (ue.useCount < 100) {
				if (ue.symbol == symbol) {
					ue.useCount += riseValue;
				}
				else if (ue.useCount > 0) {
					ue.useCount -= 1;
				}
			}
		});

		// add new one with higher useCount so it comes before outdated ones
		var ue = r.filter(ue => ue.symbol == symbol);
		if (ue.length == 0) {
			r.unshift({ symbol: symbol, useCount: riseValue })
		}

		r = r.slice(0, app().getLayout().free.length);
		r.sort((a, b) => b.useCount - a.useCount);
		app().updateConfig({ recent: r });
	}
}

export class RecentKey extends Key {
	constructor() {
		super({ name: 'Recent', symbol: '⟲' });
	}

	act() {
		app().setBoard(new RecentBoard());
	}
}

export class ExitRecentKey extends Key {
	constructor() {
		super({ name: 'Back', symbol: '←' });
	}

	act() {
		app().back();
		// app().setMode(AppMode.MAIN);
	}
}

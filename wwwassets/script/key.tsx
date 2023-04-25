import {AppMode} from "./app";
import {ComponentChild, h} from "preact";
import {Board} from "./board";
import {ahkSend} from "./ahk";
import {app, ConfigBuildingContext} from "./appVar";
import {cl} from "./helpers";
import {clusterName, clusterVariants} from "./unicodeInterface";
import {makeBuild} from "./builder/builder";
import {useContext} from "preact/hooks";
import {SC} from "./layout/sc";
import {VarSel15} from "./chars";
import {Key, KeyName} from "./keys/base";
import {Symbol} from "./keys/symbol";
import {increaseRecent} from "./recentsActions";

export class ConfigKey extends Key {
	constructor() {
		super({name: "Settings", symbol: "🛠️" + VarSel15, clickAlwaysAlternate: true, keyNamePrefix: "⇧"});
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

export class BackKey extends Key {
	constructor() {
		super({name: 'Back/🛠️', symbol: '←', keyType: "back"});
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
		super({name: 'search', symbol: '🔎' + VarSel15});
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
	private readonly noRecent: boolean;

	constructor(private cluster: string, p?: { variants?: string[], noRecent?: boolean }) {
		const name = clusterName(cluster);
		const variants = p?.variants ?? clusterVariants(cluster);
		super({
			name,
			upperName: variants?.length == 2 ? variants[1] : "",
			symbol: cluster,
			alt: !!variants && variants.length > 2,
			lu: variants?.length === 2,
			keyType: "char",
		});
		this.noRecent = p?.noRecent ?? false;
		this.variants = variants;
	}

	act() {
		ahkSend(this.cluster);
		if (!this.noRecent) increaseRecent(this.cluster);
	}

	actAlternate() {
		if (this.alt) {
			app().setBoard(Board.clusterAlternates(this.cluster, this.variants!, {noRecent: this.noRecent}));
		} else if (this.lu) {
			ahkSend(this.variants![1]);
			if (!this.noRecent) increaseRecent(this.variants![1]);
		} else return this.act();
	}
}

export class RecentKey extends Key {
	constructor() {
		super({name: 'Recent', symbol: '↺'});
	}

	act() {
		app().setMode(AppMode.RECENTS);
	}
}

export class ExitRecentKey extends Key {
	constructor() {
		super({name: 'Back', symbol: '←', keyType: "back"});
	}

	act() {
		app().setMode(AppMode.MAIN);
	}
}

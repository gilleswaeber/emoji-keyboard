import {AppMode} from "./app";
import {ComponentChild, h} from "preact";
import {Board} from "./board";
import {app, ConfigBuildingContext} from "./appVar";
import {cl} from "./helpers";
import {clusterName, clusterVariants} from "./unicodeInterface";
import {makeBuild} from "./builder/builder";
import {useContext} from "preact/hooks";
import {SC} from "./layout/sc";
import {VarSel15} from "./chars";
import {Key, KeyName} from "./keys/base";
import {Symbol} from "./keys/symbol";

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

	constructor({action, ...p}: {
		active?: boolean,
		action(): void,
		name: string,
		statusName?: string,
		symbol: string
	}) {
		super(p);
		this.action = action;
	}

	act() {
		this.action();
	}
}

export class ConfigToggleKey extends ConfigActionKey {
	constructor({active, ...p}: {
		active?: boolean,
		action(): void,
		name?: string,
		statusName?: string,
		symbol?: string
	}) {
		active = active ?? false;
		super({
			name: active ? "On" : "Off",
			symbol: active ? "✔️" : "❌",
			active,
			...p,
		});
	}
}

export class ConfigLabelKey extends Key {
	constructor(private text: ComponentChild) {
		super({name: "", symbol: ""});
	}

	Contents = ({code}: { code: SC }) => {
		return <div className={`key label`}>
			<div className="keyname"><KeyName code={code}/></div>
			<div className="symbol">{this.text}</div>
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
		app().send(this.cluster, {noRecent: this.noRecent});
	}

	actAlternate() {
		if (this.alt) {
			app().setBoard(Board.clusterAlternates(this.cluster, this.variants!, {noRecent: this.noRecent}));
		} else if (this.lu) {
			app().send(this.variants![1], {noRecent: this.noRecent});
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

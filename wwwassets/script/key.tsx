import {AppMode} from "./app";
import {ComponentChild, h} from "preact";
import {Board} from "./board";
import {app, ConfigBuildingContext, ConfigContext} from "./appVar";
import {cl} from "./helpers";
import {clusterAliases, clusterName, clusterVariants} from "./unicodeInterface";
import {makeBuild, toCodePoints} from "./builder/builder";
import {useContext} from "preact/hooks";
import {SC} from "./layout/sc";
import {VarSel15} from "./chars";
import {Key, KeyName} from "./keys/base";
import {Symbol} from "./keys/symbol";
import {AppConfig} from "./config";
import {toHex} from "./builder/consolidated";
import {KeyCap} from "./config/boards";

export class ConfigKey extends Key {
	constructor() {
		super({name: "Settings", symbol: "🛠️" + VarSel15, clickAlwaysAlternate: true, keyNamePrefix: "⇧"});
	}

	actSecondary(): void {
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
				e.shiftKey || this.clickAlwaysAlternate ? this.actSecondary(e.altKey) : this.act();
			}}
			onContextMenu={(e) => {
				e.preventDefault();
				this.actSecondary(e.altKey);
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

	actSecondary() {
		app().setMode(AppMode.SETTINGS);
	}
}

export class KeyboardKey extends Key {
	constructor(private target: Board) {
		super({name: target.name, statusName: target.statusName, symbol: target.symbol});
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
	private readonly variantOf: string | undefined;
	private readonly noRecent: boolean;
	private readonly alt: boolean;
	private readonly lu: boolean;
	private readonly upperName: string;

	constructor(private cluster: string, p?: { variants?: string[], variantOf?: string, noRecent?: boolean, symbol?: KeyCap, name?: string }) {
		const name = p?.name ?? clusterName(cluster);
		const variants = p?.variants ?? clusterVariants(cluster);
		super({
			name,
			symbol: p?.symbol ?? cluster,
			keyType: "char",
		});
		this.alt = !!variants && variants.length > 2;
		this.lu = variants?.length === 2;
		this.upperName = variants?.length == 2 ? variants[1] : "";
		this.noRecent = p?.noRecent ?? false;
		this.variants = variants;
		this.variantOf = p?.variantOf;
	}

	act(alt: boolean, config?: AppConfig) {
		if (this.alt) {
			config ??= app().getConfig();
			const cluster = config.preferredVariant[this.cluster] ?? this.cluster;
			app().send(cluster, {noRecent: this.noRecent, variantOf: this.variantOf, alt});
		} else {
			app().send(this.cluster, {noRecent: this.noRecent, variantOf: this.variantOf, alt});
		}
	}

	actSecondary(alt: boolean, config?: AppConfig) {
		if (this.alt) {
			app().setBoard(Board.clusterAlternates(this.cluster, this.variants!, {noRecent: this.noRecent}));
		} else if (this.lu) {
			app().send(this.variants![1], {noRecent: this.noRecent, alt});
		} else {
			app().send(this.cluster, {noRecent: this.noRecent, alt});  // no variant change
		}
	}

	Contents = ({code}: { code: SC }) => {
		const config = useContext(ConfigContext);
		const cluster = this.alt ? config.preferredVariant[this.cluster] ?? this.cluster : this.cluster;
		const symbol = this.alt ? cluster : this.symbol;
		let status = this.alt ? clusterName(config.preferredVariant[this.cluster] ?? this.cluster) : this.name;
		if (config.showAliases) {
			const aliases = clusterAliases(this.cluster);
			if (aliases.length) status += ` (${aliases.join(', ')})`;
		}
		if (config.showCharCodes) {
			status += ` [${toCodePoints(cluster).map(toHex).join(' ')}]`
		}
		return <div
			className={cl('key', this.keyType, {alt: this.alt, lu: this.lu, active: this.active})}
			onClick={(e) => {
				e.preventDefault();
				e.shiftKey || this.clickAlwaysAlternate ? this.actSecondary(e.altKey, config) : this.act(e.altKey, config);
			}}
			onContextMenu={(e) => {
				e.preventDefault();
				this.actSecondary(e.altKey, config);
			}}
			onMouseOver={() => app().updateStatus(status)}
			data-keycode={code}
		>
			<div className="keyname">{this.keyNamePrefix}<KeyName code={code}/></div>
			<div className="uname">{this.upperName}</div>
			<Symbol symbol={symbol}/>
		</div>;
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

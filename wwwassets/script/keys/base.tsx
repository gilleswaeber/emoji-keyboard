import {SC} from "../layout/sc";
import {useContext} from "preact/hooks";
import {app, LayoutContext} from "../appVar";
import {Fragment, h} from "preact";
import {cl} from "../helpers";
import {Symbol} from "./symbol";
import {KeyCap} from "../config/boards";

export function KeyName({code}: { code: SC }) {
	const layout = useContext(LayoutContext);
	return <Fragment>{layout.sys[code]?.name ?? ''}</Fragment>;
}

export type KeyType = "action" | "empty" | "char" | "back";

export class Key {
	public readonly name: string;
	/** Name used in the title bar */
	protected readonly statusName: string;
	public readonly symbol: KeyCap;
	public readonly active: boolean;
	public readonly blank: boolean;
	public readonly keyType: KeyType;
	protected readonly clickAlwaysAlternate: boolean;
	protected readonly keyNamePrefix: string;


	constructor(
		p: {
			name: string,
			statusName?: string,
			symbol: KeyCap,
			active?: boolean,
			clickAlwaysAlternate?: boolean,
			keyNamePrefix?: string,
			blank?: boolean,
			keyType?: KeyType
		}
	) {
		this.name = p.name;
		this.statusName = p.statusName ?? p.name;
		this.symbol = p.symbol;
		this.active = p.active ?? false;
		this.clickAlwaysAlternate = p.clickAlwaysAlternate ?? false;
		this.keyNamePrefix = p.keyNamePrefix ?? '';
		this.blank = p.blank ?? false;
		this.keyType = !p.name.length ? "empty" : p.keyType ?? "action";
	}

	Contents = ({code}: { code: SC }) => {
		return <div
			className={cl('key', this.keyType, {active: this.active})}
			onClick={(e) => {
				e.preventDefault();
				e.shiftKey || this.clickAlwaysAlternate ? this.actAlternate() : this.act();
			}}
			onContextMenu={(e) => {
				e.preventDefault();
				this.actAlternate();
			}}
			onMouseOver={() => app().updateStatus(this.statusName)}
			data-keycode={code}
		>
			<div className="keyname">{this.keyNamePrefix}<KeyName code={code}/></div>
			<div className="name">{this.name}</div>
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

export const BlankKey = new Key({name: '', symbol: '', blank: true, keyType: "empty"});

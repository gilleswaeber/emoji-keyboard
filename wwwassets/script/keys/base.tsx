import {SC} from "../layout/sc";
import {useContext} from "preact/hooks";
import {app, LayoutContext} from "../appVar";
import {Fragment, h} from "preact";
import {cl} from "../helpers";
import {Symbol} from "./symbol";

export function KeyName({code}: { code: SC }) {
	const layout = useContext(LayoutContext);
	return <Fragment>{layout.sys[code]?.name ?? ''}</Fragment>;
}

export type KeyType = "action" | "empty" | "char" | "back";

export class Key {
	public readonly name: string;
	public readonly upperName: string;
	public readonly symbol: string;
	public readonly active: boolean;
	public readonly blank: boolean;
	public readonly keyType: KeyType;
	protected readonly clickAlwaysAlternate: boolean;
	private readonly keyNamePrefix: string;
	protected readonly alt: boolean;
	protected readonly lu: boolean;


	constructor(
		p: {
			name: string,
			upperName?: string,
			symbol: string,
			active?: boolean,
			clickAlwaysAlternate?: boolean,
			keyNamePrefix?: string,
			alt?: boolean,
			lu?: boolean,
			blank?: boolean,
			keyType?: KeyType
		}
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
		this.keyType = !p.name.length ? "empty" : p.keyType ?? "action";
	}

	Contents = ({code}: { code: SC }) => {
		return <div
			className={cl('key', this.keyType, {alt: this.alt, lu: this.lu, active: this.active})}
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

export const BlankKey = new Key({name: '', symbol: '', blank: true, keyType: "empty"});

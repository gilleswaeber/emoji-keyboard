import {Emoji, SC} from "./data";
import {BackKey, BlankKey, ConfigKey, Key, KeyboardKey, LegacyCharKey, PageKey, SearchKey} from "./key";
import {AppActions, AppContext, AppRenderProps} from "./app";
import {createContext, h} from "preact";
import {AnsiCodesList, AnsiFreeKeys, IsoCodesList, IsoFreeKeys, KeyCodesList, Layout, SystemLayoutUS} from "./layout";
import {ahkSend, ahkTitle} from "./ahk";
import {getSubGroup} from "./emojis";
import {useCallback, useContext, useMemo} from "preact/hooks";
import {AppConfig, ConfigPage} from "./config";
import {toTitleCase} from "./builder/titleCase";
import {DEFAULT_KEYBOARDS, EmojiKeyboard} from "./config/boards";
import {FC} from "react";
import {cl} from "./helpers";
import {UnicodeContext, UnicodeInterface} from "./unicodeInterface";

export interface BoardState {
	page?: number;
}
export interface SharedState {
	board: Board;
	searchBoard: Board;
	configPage: ConfigPage;
	state: {[board: string]: BoardState};
}

export function getMainBoard(): Board {
	return Board.fromKeys('Main keyboard', '⌨', (b) => DEFAULT_KEYBOARDS.map((k) => new KeyboardKey(Board.fromEmoji(k, b))));
}

const MAX_PAGES = 12;

export function LegacyKeyboardView(p: AppRenderProps) {
	const board = p.sharedState.board;
	const state = p.sharedState.state[board.name];
	const pages = useMemo(() => board.getPages(p.config), [board, p.config]);
	const keys = pages[state?.page ?? 0] ?? pages[0];
	p.app.keyHandlers = keys;
	const codes = p.config.isoKeyboard ? IsoCodesList : AnsiCodesList;
	return <div class="keyboard">{codes.map((code) => (keys[code] ?? BlankKey).render(p, code))}</div>
}

const LayoutContext = createContext<Layout>({all: AnsiCodesList, free: AnsiFreeKeys, sys: SystemLayoutUS});
function charKey(cluster: string): FC<{code: SC}> {
	const act = () => ahkSend(cluster);
	return (p) => {
		const u = useContext(UnicodeContext);
		const name = useMemo(() => u.name(cluster), [u]);
		return <Key symbol={cluster} name={name} act={act} {...p} />;
	}
}
function blankKey(): FC<{code: SC}> {
	return (p) => <Key symbol="" name="" {...p} />;
}

type KeyProps = {
	code: SC;
	name: string;
	symbol: string;
	upperName?: string;
	style?: string;
	active?: boolean;
	alt?: boolean;
	lu?: boolean;
	keyType?: string;
	act?: () => void;
	actAlternate?: () => void;
};
function Symbol({symbol, style}: {symbol: string, style?: string}) {
	const useFallback = false;
	return <div className={`symbol ${style && 's-' + style}`}>
		{useFallback ? <img src={/*toTwemojiFilename*/(symbol)} alt={symbol}/> : symbol}
	</div>
}
function Key({code, name, symbol, upperName, style, active, alt, lu, keyType, act, actAlternate}: KeyProps) {
	const layout = useContext(LayoutContext);
	const app = useContext(AppContext);
	return <div
		className={cl('key', keyType, {active, alt, lu})}
		onClick={(e) => {
			e.preventDefault();
			e.shiftKey ? actAlternate?.() : act?.();
		}}
		onContextMenu={(e) => {
			e.preventDefault();
			actAlternate?.();
		}}
		onMouseOver={() => app.updateStatus(name)}
		key={code}
	>
		<div className="keyname">{layout.sys[code]?.name}</div>
		<div className="name">{name}</div>
		<div className="uname">{upperName}</div>
		<Symbol symbol={symbol} style={style}/>
	</div>;
}
function useCharKeys(k: EmojiKeyboard) {
	return useMemo(() => {
		const keys: FC<{code: SC}>[] = [];
		for (const c of k.content) {
			if (typeof c === 'string') keys.push(charKey(c));
			else keys.push(blankKey());
		}
		return keys;
	}, [k]);
}
function useKeys(k: EmojiKeyboard, layout: Layout) {
	const charKeys = useCharKeys(k);
	return useMemo(() => {
		const keys = [...charKeys];
	}, [charKeys]);
}

export function KeyboardView({k}: {k: EmojiKeyboard}) {
	const layout = useContext(LayoutContext);
	const keys = useKeys(k, layout);
	return <div className="keyboard">

	</div>;
}

export type SlottedKeys = {
	[key in SC]?: Key
}

export function mapKeysToSlots(codes: KeyCodesList, keys: Key[]): SlottedKeys {
	const mapped: SlottedKeys = {}
	for (const [index, code] of Array.from(codes.entries())) {
		if (keys[index]) mapped[code] = keys[index];
	}
	return mapped;
}

function range(stop: number): number[] {
	return Array.from((new Array(stop)).keys());
}

export abstract class View<ViewState> {
	abstract input(app: AppActions, key: number, shift: boolean): void;
	abstract render(state: ViewState): void;
}

export class KeysBoard {
	constructor(
		private name: string,
		private symbol: string,
		private keysFn: (b: Board) => Key[],
		private parent?: Board,
		private requiredVersion?: string
	) {
	}
}

/**
 * A board has several pages of keys
 */
export class Board {
	constructor(
		public readonly name: string,
		public readonly symbol: string,
		private readonly pagesFn: (b: Board, freeKeys: KeyCodesList) => SlottedKeys[],
		public readonly requiredOS: string | undefined = undefined
	) {}

	getPages(settings: AppConfig): SlottedKeys[] {
		return this.pagesFn(this, settings.isoKeyboard ? IsoFreeKeys : AnsiFreeKeys)
	}

	static fromKeys(name: string, symbol: string, keysFn: (b: Board) => Key[], parent?: Board, requiredVersion?: string): Board {
		return new Board(name, symbol, (b, freeKeys) => {
			const keys = keysFn(b);

			const fixedKeys = {
				[SC.Backtick]: parent ? new BackKey(parent) : new ConfigKey(),
				[SC.Tab]: new SearchKey()
			};

			if (keys.length > freeKeys.length) {
				let pages = 1;
				while (keys.length > pages * (freeKeys.length - Math.min(pages, MAX_PAGES))) {
					pages++;
				}
				pages = Math.min(pages, MAX_PAGES);
				const perPage = freeKeys.length - Math.min(pages, MAX_PAGES);

				return range(pages).map((i) => {
					const page = ([] as Key[])
						.concat(range(pages).map((j) => new PageKey(b, j, i == j)))
						.concat(keys.slice(i * perPage, i * perPage + perPage))
					return {...fixedKeys, ...mapKeysToSlots(freeKeys, page)}
				});
			} else {
				return [{...fixedKeys, ...mapKeysToSlots(freeKeys, keys)}];
			}
		}, requiredVersion);
	}

	static fromEmoji(k: EmojiKeyboard, parent: Board): Board {
		return this.fromKeys(k.name, k.symbol, (b) => {
			const keys: Key[] = [];
			for (const content of k.content) {
				if (content === null) {
					keys.push(BlankKey);
				} else if (typeof content === 'string') {
					keys.push(new LegacyCharKey())
				}
				for (const chr of getSubGroup(content.group, content.subGroup)) {
					keys.push(chr.symbol.length ? new LegacyCharKey(chr, b) : BlankKey);
				}
			}
			return keys;
		}, parent);
	}

	static fromAlternates(parent: Board, base: Emoji) {
		return this.fromKeys(base.name, base.symbol,
			(b) => base.alternates?.map((chr) => new LegacyCharKey(chr, b)) ?? [],
			parent, base.requiredVersion);
	}

	showStatus(str: string): void {
		if (!str.length) return this.hideStatus();
		ahkTitle(this.name + ": " + toTitleCase(str));
	}

	private hideStatus(): void {
		ahkTitle(this.name);
	}
}

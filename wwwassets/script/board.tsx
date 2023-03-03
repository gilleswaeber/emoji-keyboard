import {SC} from "./data";
import {AppRenderProps} from "./app";
import {h} from "preact";
import {KeyCodesList, Layout} from "./layout";
import {ahkTitle} from "./ahk";
import {useContext, useMemo} from "preact/hooks";
import {AppConfig, ConfigPage} from "./config";
import {toTitleCase} from "./builder/titleCase";
import {DEFAULT_KEYBOARDS, EmojiKeyboard} from "./config/boards";
import {AppActions, LayoutContext} from "./appVar";
import {BackKey, BlankKey, ClusterKey, ConfigKey, Key, KeyboardKey, PageKey, SearchKey} from "./key";
import memoizeOne from "memoize-one";
import {clusterName, clusterVariants, emojiGroup} from "./unicodeInterface";

export interface BoardState {
	page?: number;
}

export interface SharedState {
	board: Board;
	searchBoard: Board;
	configPage: ConfigPage;
	state: { [board: string]: BoardState };
}

export function getMainBoard(): Board {
	return Board.fromKeys({name: 'Main keyboard', top: true, symbol: '⌨', keys: DEFAULT_KEYBOARDS.map((k) => new KeyboardKey(Board.fromEmoji(k)))});
}

const MAX_PAGES = 12;

export function KeyboardView(p: AppRenderProps) {
	const board = p.sharedState.board;
	const state = p.sharedState.state[board.name];
	const l = useContext(LayoutContext);
	const pages = useMemo(() => board.keys(l, p.config), [board, l, p.config]);
	const keys = pages[state?.page ?? 0] ?? pages[0];
	p.app.keyHandlers = keys;
	return <div className="keyboard">
		{l.all.map((code) => (keys[code] ?? BlankKey).render(p, code))}
	</div>
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

/** A board has several pages of keys */
export abstract class Board {
	constructor(p: {name: string, symbol: string}) {
		this.name = p.name;
		this.symbol = p.symbol;
	}
	public readonly name: string;
	public readonly symbol: string;
	public abstract keys(layout: Layout, config: AppConfig): SlottedKeys[];

	showStatus(str: string): void {
		if (!str.length) return this.hideStatus();
		ahkTitle(this.name + ": " + toTitleCase(str));
	}

	private hideStatus(): void {
		ahkTitle(this.name);
	}

	static fromKeys({name, symbol, keys, top}: {name: string, symbol: string, keys: Key[], top?: boolean}): Board {
		return new StaticBoard({name, symbol, keys: (layout) => {
				const fixedKeys = {
					[SC.Backtick]: top ? new ConfigKey() : new BackKey(),
					[SC.Tab]: new SearchKey()
				};

				if (keys.length > layout.free.length) {
					let pages = 1;
					while (keys.length > pages * (layout.free.length - Math.min(pages, MAX_PAGES))) {
						pages++;
					}
					const pageKeys = Math.min(pages, MAX_PAGES);
					pages = pageKeys;
					const perPage = layout.free.length - pageKeys;

					return range(pages).map((i) => {
						const page = ([] as Key[])
							.concat(range(pageKeys).map((j) => new PageKey(j, i == j)))
							.concat(keys.slice(i * perPage, i * perPage + perPage))
						return {...fixedKeys, ...mapKeysToSlots(layout.free, page)}
					});
				} else {
					return [{...fixedKeys, ...mapKeysToSlots(layout.free, keys)}];
				}
			}});
	}

	static fromEmoji(k: EmojiKeyboard): Board {
		const keys: Key[] = [];
		for (const content of k.content) {
			if (content === null) {
				keys.push(BlankKey);
			} else if (typeof content === 'string') {
				keys.push(new ClusterKey(content));
			} else if (content.group) {
				keys.push(...emojiGroup(content).map(c => new ClusterKey(c)));
			}
		}

		return this.fromKeys({name: k.name, symbol: k.symbol, keys});
	}

	static clusterAlternates(cluster: string) {
		const keys = clusterVariants(cluster)?.map((c) => new ClusterKey(c)) ?? [];
		return this.fromKeys({name: clusterName(cluster), symbol: cluster, keys});
	}

}

/** On a static board the keys and their locations depend only on the layout */
export class StaticBoard extends Board {
	private readonly _keys: (layout: Layout) => SlottedKeys[];

	constructor(
		{keys, ...p}: {
			name: string;
			symbol: string;
			keys: (layout: Layout) => SlottedKeys[];
		}
	) {
		super(p);
		this._keys = memoizeOne(keys);
	}

	keys(layout: Layout, config: AppConfig): SlottedKeys[] {
		return this._keys(layout);
	}
}

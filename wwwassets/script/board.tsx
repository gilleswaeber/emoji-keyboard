import {SC, VK} from "./data";
import {AppRenderProps} from "./app";
import {h} from "preact";
import {KeyCodesList, Layout} from "./layout";
import {ahkTitle} from "./ahk";
import {useContext, useMemo} from "preact/hooks";
import {AppConfig, ConfigPage} from "./config";
import {toTitleCase} from "./builder/titleCase";
import {DEFAULT_KEYBOARDS, EmojiKeyboard, KeyboardContent, KeyboardItem} from "./config/boards";
import {AppActions, LayoutContext} from "./appVar";
import {BackKey, BlankKey, ClusterKey, ConfigKey, Key, KeyboardKey, PageKey, SearchKey} from "./key";
import memoizeOne from "memoize-one";
import {clusterName, clusterVariants, emojiGroup} from "./unicodeInterface";
import {fromEntries, unreachable} from "./helpers";
import {toCodePoints} from "./builder/builder";

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
	return Board.fromKeys({
		name: 'Main keyboard',
		top: true,
		symbol: '⌨',
		keys: DEFAULT_KEYBOARDS.map((k) => new KeyboardKey(Board.fromEmoji(k)))
	});
}

const MAX_PAGE_KEYS = 9;

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
	constructor(p: { name: string, symbol: string }) {
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

	static fromKeys(
		{name, symbol, keys, top, bySC, byVK}:
			{ name: string, symbol: string, keys: Key[], bySC?: SlottedKeys, byVK?: { [vk in VK]?: Key }, top?: boolean }): Board {
		return new StaticBoard({
			name, symbol, keys: (layout) => {
				let freeKeys: readonly SC[] = layout.free;
				const fixedKeys: SlottedKeys = {
					[SC.Backtick]: top ? new ConfigKey() : new BackKey(),
					[SC.Tab]: new SearchKey(),
				};
				if (bySC) {
					Object.assign(fixedKeys, bySC);
					freeKeys = freeKeys.filter(sc => !fixedKeys[sc]);
				}
				if (byVK) {
					for (const sc of freeKeys) {
						const vk = layout.sys[sc].vk;
						if (byVK[vk]) {
							fixedKeys[sc] = byVK[vk];
						}
					}
					freeKeys = freeKeys.filter(sc => !fixedKeys[sc]);
				}

				if (keys.length > freeKeys.length) {
					let pages = 1;
					while (keys.length > pages * (freeKeys.length - Math.min(pages, MAX_PAGE_KEYS))) {
						pages++;
					}
					const pageKeys = Math.min(pages, MAX_PAGE_KEYS);
					const perPage = freeKeys.length - pageKeys;

					return range(pages).map((i) => {
						const pagesStart = i <= 4;
						const pagesEnd = i >= pages - 5;
						const page = ([] as Key[])
							.concat(range(pageKeys).map((j) => {
								if (pages == pageKeys) return new PageKey(j, i == j);
								else switch (j) {
									case 0:
										return new PageKey(0, i == 0);
									case 1:
										if (pagesStart) return new PageKey(1, i == 1);
										if (pagesEnd) return new PageKey(pages - 8, i == pages - 8);
										return new PageKey(i - 3, false);
									case 2:
										if (pagesStart) return new PageKey(2, i == 2);
										if (pagesEnd) return new PageKey(pages - 7, i == pages - 7);
										return new PageKey(i - 2, false);
									case 3:
										if (pagesStart) return new PageKey(3, i == 3);
										if (pagesEnd) return new PageKey(pages - 6, i == pages - 6);
										return new PageKey(i - 1, false);
									case 4:
										if (pagesStart) return new PageKey(4, i == 4);
										if (pagesEnd) return new PageKey(pages - 5, i == pages - 5);
										return new PageKey(i, true);
									case 5:
										if (pagesStart) return new PageKey(5, i == 5);
										if (pagesEnd) return new PageKey(pages - 4, i == pages - 4);
										return new PageKey(i + 1, false);
									case 6:
										if (pagesStart) return new PageKey(6, i == 6);
										if (pagesEnd) return new PageKey(pages - 3, i == pages - 3);
										return new PageKey(i + 2, false);
									case 7:
										if (pagesStart) return new PageKey(7, i == 7);
										if (pagesEnd) return new PageKey(pages - 2, i == pages - 2);
										return new PageKey(i + 3, false);
									case 8:
										return new PageKey(pages - 1, i == pages - 1);
									default:
										return BlankKey;
								}
							}))
							.concat(keys.slice(i * perPage, i * perPage + perPage))
						return {...fixedKeys, ...mapKeysToSlots(freeKeys, page)}
					});
				} else {
					return [{...fixedKeys, ...mapKeysToSlots(freeKeys, keys)}];
				}
			}
		});
	}

	private static fromItem(item: KeyboardItem): Key {
		if (item === null) {
			return BlankKey;
		} else if (typeof item === 'string') {
			return new ClusterKey(item);
		} else if (Array.isArray(item)) {
			if (item.length) {
				return new ClusterKey(item[0], item);
			}
			return BlankKey;
		} else {
			return unreachable(item);
		}
	}

	private static fromContents(contents: KeyboardContent[]): Key[] {
		const keys: Key[] = [];
		for (const item of contents) {
			if (item === null || typeof item === 'string' || Array.isArray(item)) {
				keys.push(this.fromItem(item));
			} else if (item.group) {
				keys.push(...emojiGroup(item).map(c => new ClusterKey(c)));
			} else if (typeof item.from !== 'undefined') {
				const from = typeof item.from === 'number' ? item.from : toCodePoints(item.from)[0];
				const to = typeof item.to === 'number' ? item.to : toCodePoints(item.to)[0];
				if (from && to && to > from) {
					for (let i = from; i <= to; ++i) keys.push(new ClusterKey(String.fromCodePoint(i)));
				}
			} else {
				return unreachable(item);
			}
		}
		return keys;
	}

	static fromEmoji(k: EmojiKeyboard): Board {
		const keys = this.fromContents(k.content ?? []);
		const bySC = fromEntries(k.bySC ? Object.entries(k.bySC).map(([k, v]) => [k, this.fromItem(v)] as const) : []);
		const byVK = fromEntries(k.byVK ? Object.entries(k.byVK).map(([k, v]) => [k, this.fromItem(v)] as const) : []);

		return this.fromKeys({name: k.name, symbol: k.symbol, keys, bySC, byVK});
	}

	static clusterAlternates(cluster: string, variants: string[]) {
		const keys = variants.map((c) => new ClusterKey(c, []));
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

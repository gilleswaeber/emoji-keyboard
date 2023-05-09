import {h, VNode} from "preact";
import {Layout} from "./layout";
import {useContext, useEffect, useMemo} from "preact/hooks";
import {EmojiKeyboard, KeyboardContent, KeyboardItem, MAIN_BOARD} from "./config/boards";
import {app, LayoutContext} from "./appVar";
import {BackKey, ClusterKey, ConfigKey, KeyboardKey, PageKey, RecentKey, SearchKey} from "./key";
import memoizeOne from "memoize-one";
import {clusterName, emojiGroup} from "./unicodeInterface";
import {fromEntries} from "./helpers";
import {toCodePoints} from "./builder/builder";
import {VK} from "./layout/vk";
import {SC} from "./layout/sc";
import {BoardState, Keys, mapKeysToSlots, MAX_PAGE_KEYS, SlottedKeys} from "./boards/utils";
import {BlankKey, Key} from "./keys/base";

export function getMainBoard(): Board {
	return Board.fromEmoji(MAIN_BOARD);
}

function range(stop: number): number[] {
	return Array.from((new Array(stop)).keys());
}

/** A board has several pages of keys */
export abstract class Board {
	protected constructor(p: { name: string, symbol: string }) {
		this.name = p.name;
		this.symbol = p.symbol;
	}

	public readonly name: string;
	public readonly symbol: string;

	public abstract Contents(p: { state: BoardState | undefined }): VNode;

	private static fromKeys(
		{name, symbol, keys, top, noRecent, byRow, byVK}:
			{
				name: string,
				symbol: string,
				keys: Key[],
				byRow?: Key[][],
				byVK?: { [vk in VK]?: Key },
				top?: boolean,
				noRecent?: boolean
			}): Board {
		return new StaticBoard({
			name, symbol, noRecent, keys: (layout) => {
				let freeKeys = new Set<SC>(layout.free);
				const fixedKeys: SlottedKeys = {
					[SC.Backtick]: top ? new ConfigKey() : new BackKey(),
					[SC.Tab]: new SearchKey(),
					[SC.CapsLock]: new RecentKey(),
				};
				const notPlaceable: Key[] = [];
				if (byRow) {
					const f = layout.freeRows;
					for (const [r, row] of byRow.entries()) {
						for (const [c, key] of row.entries()) {
							if (key.blank) continue;
							if (r < f.length && c < f[r].length && freeKeys.has(f[r][c])) {
								fixedKeys[f[r][c]] = key;
								freeKeys.delete(f[r][c]);
							} else {
								notPlaceable.push(key);
							}
						}
					}
				}
				if (byVK) {
					const vkPlaced = new Set<VK>();
					for (const sc of freeKeys) {
						const vk = layout.sys[sc].vk;
						if (byVK[vk]) {
							fixedKeys[sc] = byVK[vk];
							vkPlaced.add(vk);
							freeKeys.delete(sc);
						}
					}
					for (const [vk, key] of Object.entries(byVK)) {
						if (!vkPlaced.has(parseInt(vk, 10))) notPlaceable.push(key);
					}
				}
				if (notPlaceable.length) keys.unshift(...notPlaceable);

				if (keys.length > freeKeys.size) {
					let pages = 1;
					while (keys.length > pages * (freeKeys.size - Math.min(pages, MAX_PAGE_KEYS))) {
						pages++;
					}
					const pageKeys = Math.min(pages, MAX_PAGE_KEYS);
					const perPage = freeKeys.size - pageKeys;

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
						return {...fixedKeys, ...mapKeysToSlots([...freeKeys], page)}
					});
				} else {
					return [{...fixedKeys, ...mapKeysToSlots([...freeKeys], keys)}];
				}
			}
		});
	}

	private static fromItem(item: KeyboardItem, p: { noRecent?: boolean }): Key {
		if (item === null) {
			return BlankKey;
		} else if (typeof item === 'string') {
			return new ClusterKey(item, p);
		} else if (Array.isArray(item)) {
			if (item.length) {
				return new ClusterKey(item[0], {variants: item, ...p});
			}
			return BlankKey;
		} else {
			return new KeyboardKey(Board.fromEmoji(item));
		}
	}

	private static fromContents(contents: KeyboardContent[], p: { noRecent?: boolean }): Key[] {
		const keys: Key[] = [];
		for (const item of contents) {
			if (item === null || typeof item === 'string' || Array.isArray(item)) {
				keys.push(this.fromItem(item, p));
			} else if (item.group) {
				keys.push(...emojiGroup(item).map(c => new ClusterKey(c, p)));
			} else if (typeof item.from !== 'undefined') {
				const from = typeof item.from === 'number' ? item.from : toCodePoints(item.from)[0];
				const to = typeof item.to === 'number' ? item.to : toCodePoints(item.to)[0];
				if (from && to && to > from) {
					for (let i = from; i <= to; ++i) keys.push(new ClusterKey(String.fromCodePoint(i), p));
				}
			} else {
				keys.push(this.fromItem(item, p));
			}
		}
		return keys;
	}

	static fromEmoji(k: EmojiKeyboard): Board {
		const p = {noRecent: k.noRecent};
		const keys = this.fromContents(k.content ?? [], p);
		const byRow = (k.byRow ?? []).map(row => row.map(key => this.fromItem(key, p)));
		const byVK = fromEntries(k.byVK ? Object.entries(k.byVK).map(([k, v]) => [k, this.fromItem(v, p)] as const) : []);

		return this.fromKeys({name: k.name, symbol: k.symbol, top: k.top, noRecent: k.noRecent, keys, byRow, byVK});
	}

	static clusterAlternates(cluster: string, variants: string[], k?: { noRecent?: boolean }) {
		const keys = variants.map((c) => new ClusterKey(c, {variants: [], variantOf: cluster, ...k}));
		if (keys.length == 6) {
			// place on home row
			const byRow = [[], [], keys];
			return this.fromKeys({name: clusterName(cluster), symbol: cluster, keys: [], byRow});
		} else if (keys.length == 18) {
			// center on home row
			const byRow = [[], keys.slice(0, 6), keys.slice(6, 12), keys.slice(12)];
			return this.fromKeys({name: clusterName(cluster), symbol: cluster, keys: [], byRow});
		}
		{
			return this.fromKeys({name: clusterName(cluster), symbol: cluster, keys});
		}
	}
}

/** On a static board the keys and their locations depend only on the layout */
export class StaticBoard extends Board {
	private readonly keys: (layout: Layout) => SlottedKeys[];

	constructor(
		{keys, ...p}: {
			name: string;
			symbol: string;
			keys: (layout: Layout) => SlottedKeys[];
			noRecent?: boolean;
		}
	) {
		super(p);
		this.keys = memoizeOne(keys);
	}

	Contents = ({state}: { state: BoardState | undefined }) => {
		const l = useContext(LayoutContext);
		const pages = useMemo(() => this.keys(l), [l]);
		useEffect(() => app().updateStatus(), []);
		const keys = pages[state?.page ?? 0] ?? pages[0];
		return <Keys keys={keys}/>;
	}
}

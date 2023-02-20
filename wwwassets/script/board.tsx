import {Emoji, EmojiKeyboard, SC} from "./data";
import {BackKey, BlankKey, CharKey, ConfigKey, Key, KeyboardKey, PageKey, SearchKey} from "./key";
import {AppActions, AppRenderProps} from "./app";
import {h} from "preact";
import {AnsiCodesList, AnsiFreeKeys, IsoCodesList, IsoFreeKeys, KeyCodesList} from "./layout";
import {ahkTitle} from "./ahk";
import {getSubGroup} from "./emojis";
import {useMemo} from "preact/hooks";
import {AppConfig, ConfigPage} from "./config";
import {Fragment} from "preact";

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
	return Board.fromKeys('Main keyboard', '⌨', (b) => data.keyboards.map((k) => new KeyboardKey(Board.fromEmoji(k, b))));
}

const MAX_PAGES = 12;

export function KeyboardView(p: AppRenderProps) {
	const board = p.sharedState.board;
	const state = p.sharedState.state[board.name];
	const pages = useMemo(() => board.getPages(p.config), [board, p.config]);
	const keys = pages[state?.page ?? 0] ?? pages[0];
	p.app.keyHandlers = keys;
	const codes = p.config.isoKeyboard ? IsoCodesList : AnsiCodesList;
	return <div class="keyboard">{codes.map((code) => (keys[code] ?? BlankKey).render(p, code))}</div>
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

export function toTitleCase(str: string): string {
	return str.replace(/\\?\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
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
				for (const chr of getSubGroup(content.group, content.subGroup)) {
					keys.push(chr.symbol.length ? new CharKey(chr, b) : BlankKey);
				}
			}
			return keys;
		}, parent, k.requiredVersion);
	}

	static fromAlternates(parent: Board, base: Emoji) {
		return this.fromKeys(base.name, base.symbol,
			(b) => base.alternates?.map((chr) => new CharKey(chr, b)) ?? [],
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

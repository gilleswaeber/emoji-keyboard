import {Emoji, EmojiKeyboard, KeyboardLayout, KeyCode} from "./def/data";
import {BackKey, BlankKey, CharKey, Key, KeyboardKey, PageKey, SearchKey} from "./key";
import {AppActions} from "./app";
import {h} from "preact";
import {KeyCodes, KeyCodesList, KeyCodesTable} from "./layout";
import {Version} from "./osversion";
import {ahkTitle} from "./ahk";
import {getSubGroup} from "./emojis";

export interface BoardState {
	page: number
}

export const DefaultBoardState: BoardState = {page: 0}

export function getMainBoard(): Board {
	return Board.fromKeys('Main keyboard', '⌨', (b) => data.keyboards.map((k) => new KeyboardKey(Board.fromEmoji(k, b))));
}

const MAX_PAGES = 12;

export function KeyboardView({layout, board, boardState, os, app}: { layout: KeyboardLayout, board: Board, boardState: BoardState, os: Version, app: AppActions }) {
	const keys = board.getPage(boardState)
	return <div class="keyboard">{KeyCodesTable.map((codes, row) =>
		<div class="row" key={row} style={{height: 100 / KeyCodesTable.length + 'vh'}}>
			{codes.map((code) => (keys[code] ?? BlankKey).render(app, board, code, layout, os))}
		</div>
	)}</div>
}

type BoardPage = {
	[key in KeyCode]?: Key
}

export function createPage(codes: KeyCodesList, keys: Key[]): BoardPage {
	const mapped: BoardPage = {}
	for (const [index, code] of Array.from(codes.entries())) {
		if (keys[index]) mapped[code] = keys[index];
	}
	return mapped;
}

function toTitleCase(str: string): string {
	return str.replace(/\\?\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

function range(stop: number): number[] {
	return Array.from((new Array(stop)).keys());
}

/**
 * A board has several pages of keys
 */
export class Board {
	public lastState: BoardState = DefaultBoardState
	private readonly pages: BoardPage[];

	constructor(
		public readonly name: string,
		public readonly symbol: string,
		private readonly pagesFn: (b: Board) => BoardPage[],
		public readonly requiredOS: string | undefined = undefined
	) {
		this.pages = pagesFn(this);
	}

	static fromKeys(name: string, symbol: string, keysFn: (b: Board) => Key[], parent?: Board, requiredVersion?: string): Board {
		return new Board(name, symbol, (b) => {
			const keys = keysFn(b);

			const fixedKeys = [
				parent ? new BackKey(parent) : BlankKey,
				new SearchKey()
			];

			if (fixedKeys.length + keys.length > KeyCodes.length) {
				let pages = 1;
				while (keys.length > pages * (KeyCodes.length - fixedKeys.length - Math.min(pages, MAX_PAGES))) {
					pages++;
				}
				pages = Math.min(pages, MAX_PAGES);
				const perPage = KeyCodes.length - fixedKeys.length - Math.min(pages, MAX_PAGES);

				return range(pages).map((i) => {
					const page = ([] as Key[])
						.concat(fixedKeys)
						.concat(range(pages).map((j) => new PageKey(j, i == j)))
						.concat(keys.slice(i * perPage, i * perPage + perPage))
					return createPage(KeyCodes, page)
				})
			} else {
				return [createPage(KeyCodes, fixedKeys.concat(keys))];
			}
		}, requiredVersion);
	}

	static fromEmoji(k: EmojiKeyboard, parent: Board): Board {
		const keys: Key[] = [];
		for (const content of k.content) {
			for (const chr of getSubGroup(content.group, content.subGroup)) {
				keys.push(chr.symbol.length ? new CharKey(chr) : BlankKey);
			}
		}
		return this.fromKeys(k.name, k.symbol, () => keys, parent, k.requiredVersion);
	}

	static fromAlternates(parent: Board, base: Emoji) {
		const keys: CharKey[] = base.alternates?.map((chr) => new CharKey(chr)) ?? [];
		return this.fromKeys(base.name, base.symbol, () => keys, parent, base.requiredVersion);
	}

	getPage(state: BoardState): BoardPage {
		this.lastState = state;
		return this.pages[state.page] ?? this.pages[0];
	}

	showStatus(str: string): void {
		if (!str.length) return this.hideStatus();
		ahkTitle(this.name + ": " + toTitleCase(str));
	}

	private hideStatus(): void {
		ahkTitle(this.name);
	}

	input(app: AppActions, state: BoardState, key: number, shift: boolean) {
		const page = this.getPage(state);
		const k = page[key as KeyCode];
		if (k) {
			if (shift) k.actAlternate(app, this);
			else k.act(app, this);
		}
	}
}

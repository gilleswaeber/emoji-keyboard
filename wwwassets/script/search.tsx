import {KeyboardLayout} from "./data";
import {Version} from "./osversion";
import {h} from "preact";
import {AppActions} from "./app";
import {SearchKeyCodes, SearchKeyCodesTable} from "./layout";
import {BlankKey, CharKey, ExitSearchKey} from "./key";
import {Board, createPage} from "./board";
import {search} from "./emojis";

export function SearchView({layout, os, board, app}: { layout: KeyboardLayout, os: Version, board: Board; app: AppActions }) {

	const keys = board.getPage({page: 0});

	const table = SearchKeyCodesTable;

	return <div class="keyboard">{table.map((codes, row) =>
		<div class="row" key={row} style={{height: 100 / table.length + 'vh'}}>
			{codes.map((code) => (keys[code] ?? BlankKey).render(app, board, code, layout, os))}
		</div>
	)}</div>
}

export function getSearchBoard(needle: string): Board {
	return new Board('Search', '🔎', () => {
		const fixedKeys = [new ExitSearchKey()];
		const result = search(needle);
		const keys = result
			.slice(0, SearchKeyCodes.length)
			.map((c) => new CharKey(c));
		return [createPage(SearchKeyCodes, fixedKeys.concat(keys))];
	})
}

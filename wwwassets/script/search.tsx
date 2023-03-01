import {SC} from "./data";
import {h} from "preact";
import {AppRenderProps} from "./app";
import {SearchKeyCodes, SearchKeyCodesTable} from "./layout";
import {BlankKey, LegacyCharKey, ExitSearchKey} from "./key";
import {Board, mapKeysToSlots} from "./board";
import {search} from "./emojis";
import {useCallback, useEffect, useMemo} from "preact/hooks";
import {ChangeEvent} from "react";
import {Fragment} from "preact";

export function SearchView(p: AppRenderProps) {
	useEffect(() => p.app.setSearchBoard(getSearchBoard(p.searchText)), [p.searchText]);
	useEffect(() => (document.querySelector('input[type="search"]') as HTMLInputElement)?.focus(), []);
	const pages = useMemo(() => p.sharedState.searchBoard.getPages(p.config), [p.sharedState.searchBoard, p.config]);
	const keys = pages[0];
	p.app.keyHandlers = keys;

	const table = SearchKeyCodesTable;
	const onInput = useCallback((e: ChangeEvent<HTMLInputElement>) => p.app.setSearchText(e.target.value), [p.app]);
	return <div class="keyboard">
		<input type="search" value={p.searchText} onInput={onInput as any}/>
		{table.map((code, row) =>
		<Fragment key={code}>{(keys[code] ?? BlankKey).render(p, code)}</Fragment>
	)}</div>
}

export function getSearchBoard(needle: string): Board {
	return new Board("Search", "🔎", (b) => [
		{
			[SC.Backtick]: new ExitSearchKey(),
			[SC.Tab]: new ExitSearchKey(),
			...mapKeysToSlots(SearchKeyCodes, search(needle).map((c) => new LegacyCharKey(c, b)))
		}
	]);
}

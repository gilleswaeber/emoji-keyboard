import {Fragment, h} from "preact";
import {AppRenderProps} from "./app";
import {SearchKeyCodes, SearchKeyCodesTable} from "./layout";
import {Board, mapKeysToSlots, StaticBoard} from "./board";
import {search} from "./emojis";
import {useCallback, useContext, useEffect, useMemo} from "preact/hooks";
import {BlankKey, ClusterKey, ExitSearchKey} from "./key";
import {LayoutContext} from "./appVar";
import {SC} from "./layout/sc";

export class SearchBoard extends Board {
	Contents(): preact.VNode {
		const table = SearchKeyCodesTable;
		const onInput = useCallback((e: InputEvent) => p.app.setSearchText((e.target as HTMLInputElement).value), [p.app]);
		return <div class="keyboard">
			<input type="search" value={p.searchText} onInput={onInput as any}/>
			{table.map((code, row) =>
				<Fragment key={code}>{(keys[code] ?? BlankKey).render(p, code)}</Fragment>
			)}</div>
	}
}

export function SearchView(p: AppRenderProps) {
	useEffect(() => p.app.setSearchBoard(getSearchBoard(p.searchText)), [p.searchText]);
	useEffect(() => (document.querySelector('input[type="search"]') as HTMLInputElement)?.focus(), []);
	const layout = useContext(LayoutContext);
	const pages = useMemo(() => p.sharedState.searchBoard.keys(layout, p.config), [p.sharedState.searchBoard, p.config]);
	const keys = pages[0];
	p.app.keyHandlers = keys;


}

export function getSearchBoard(needle: string): Board {
	return new StaticBoard({name: "Search", symbol: "🔎", keys: (l) => [
		{
			[SC.Backtick]: new ExitSearchKey(),
			[SC.Tab]: new ExitSearchKey(),
			...mapKeysToSlots(SearchKeyCodes, search(needle).map((c) => new ClusterKey(c)))
		}
	]});
}

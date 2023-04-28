import {h} from "preact";
import {SearchKeyCodes, SearchKeyCodesTable} from "./layout";
import {Board} from "./board";
import {search} from "./emojis";
import {useCallback, useContext, useEffect, useMemo} from "preact/hooks";
import {ClusterKey, ExitSearchKey, RecentKey} from "./key";
import {app, SearchContext} from "./appVar";
import {SC} from "./layout/sc";
import {mapKeysToSlots} from "./boards/utils";
import {BlankKey} from "./keys/base";

export class SearchBoard extends Board {
	constructor() {
		super({name: "Search", symbol: "🔎"});
	}

	Contents(): preact.VNode {
		const searchText = useContext(SearchContext);
		const onInput = useCallback((e: InputEvent) => app().setSearchText((e.target as HTMLInputElement).value), []);
		useEffect(() => (document.querySelector('input[type="search"]') as HTMLInputElement)?.focus(), []);
		const keys = useMemo(() => ({
			[SC.Backtick]: new ExitSearchKey(),
			[SC.Tab]: new ExitSearchKey(),
			[SC.CapsLock]: new RecentKey(),
			...mapKeysToSlots(SearchKeyCodes, search(searchText).map((c) => new ClusterKey(c)))
		}), [searchText]);
		app().keyHandlers = keys;
		return <div class="keyboard">
			<input type="search" value={searchText} onInput={onInput as any}/>
			{SearchKeyCodesTable.map((code) => {
				const K = (keys[code] ?? BlankKey);
				return <K.Contents code={code} key={code}/>;
			})}
		</div>
	}
}

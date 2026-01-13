import {h} from "preact";
import {SearchKeyCodes, SearchKeyCodesTable, SystemLayout} from "./layout";
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
		useEffect(() => {
			const input = document.querySelector('input[type="search"]') as HTMLInputElement;
			if (input) {
				// Select all text after focus
				requestAnimationFrame(() => input.select());
			}
		}, []);
		const keys = useMemo(() => ({
			[SC.Backtick]: new ExitSearchKey(),
			[SC.CapsLock]: new RecentKey(),
			...mapKeysToSlots(SearchKeyCodes, search(searchText).slice(0, SearchKeyCodes.length).map((c) => new ClusterKey(c)))
		}), [searchText]);
		app().keyHandlers = keys;
		return <div class="keyboard">
			<input type="search" spellcheck={false} placeholder="Space separated keywords"
				   value={searchText} onInput={onInput as any}/>
			{SearchKeyCodesTable.map((code) => {
				const K = (keys[code] ?? BlankKey);
				return <K.Contents code={code} key={code}/>;
			})}
		</div>
	}
}

const handledKeys: SC[] = [
	SC.Backspace, SC.Space,
	SC.Q, SC.W, SC.E, SC.R, SC.T, SC.Y, SC.U, SC.I, SC.O, SC.P,
	SC.A, SC.S, SC.D, SC.F, SC.G, SC.H, SC.J, SC.K, SC.L,
	SC.Z, SC.X, SC.C, SC.V, SC.B, SC.N, SC.M
]

// allows for limited editing even if we do not have the focus
export function handleSearchInput(layout: SystemLayout, key: SC): string | undefined{
	if (!handledKeys.includes(key)) {
		return undefined
	}
	const input = document.querySelector('input[type="search"]') as HTMLInputElement;
	if (!input) {
		return undefined
	}
	const selStart = input.selectionStart ?? 0
	const selEnd = input.selectionEnd ?? 0
	if (selStart != selEnd) {
		input.value = input.value.slice(0, selStart) + input.value.slice(selEnd)
		// sets the cursor
		input.setSelectionRange(selStart, selStart)
	}
	if (key == SC.Backspace) {
		if (selStart == selEnd) {
			input.value = input.value.slice(0, selStart - 1) + input.value.slice(selStart)
			input.setSelectionRange(selStart - 1, selStart - 1)
		}
	}
	else if (key == SC.Space) {
		if (input.value.slice(selStart -1, selStart) != " ") {
			input.value = input.value.slice(0, selStart) + " " + input.value.slice(selStart)
			input.setSelectionRange(selStart + 1, selStart + 1)
		}
	}
	else {
		let char = layout[key as SC]?.name ?? ''
		input.value = input.value.slice(0, selStart) + char + input.value.slice(selStart)
		input.setSelectionRange(selStart + 1, selStart + 1)
	}

	return input.value
}
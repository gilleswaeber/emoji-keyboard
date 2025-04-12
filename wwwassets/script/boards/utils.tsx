import {SC} from "../layout/sc";
import {KeyCodesList} from "../layout";
import {useContext} from "preact/hooks";
import {app, ConfigContext, LayoutContext} from "../appVar";
import {h} from "preact";
import {BlankKey, Key} from "../keys/base";
import {cl} from "../helpers";

export interface BoardState {
	page?: number;
}

export const MAX_PAGE_KEYS = 9;

export function Keys({keys}: { keys: SlottedKeys }) {
	const l = useContext(LayoutContext);
	const config = useContext(ConfigContext);
	app().keyHandlers = keys;
	return <div className={cl('keyboard', l.cssClass, config.ortholinear ? 'ortholinear' : 'staggered')}>
		{l.all.map((code) => {
			const K = (keys[code] ?? BlankKey);
			return <K.Contents code={code} key={code}/>;
		})}
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

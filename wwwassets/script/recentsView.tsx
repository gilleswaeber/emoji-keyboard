import {useContext, useEffect, useMemo} from "preact/hooks";
import {app, ConfigContext, LayoutContext} from "./appVar";
import {SC} from "./layout/sc";
import {BackKey, ConfigActionKey, ConfigLabelKey, ConfigToggleKey, ExitRecentKey, SearchKey} from "./key";
import {Keys, mapKeysToSlots, SlottedKeys} from "./boards/utils";
import {h} from "preact";
import {Board} from "./board";
import {Key} from "./keys/base";
import {clusterName} from "./unicodeInterface";
import {DigitsRow} from "./layout";
import {FAVORITE_SCORE, removeRecent, SCORE_DECR, SCORE_INCR, toggleFavorite} from "./recentsActions";

export class RecentBoard extends Board {
	constructor() {
		super({name: "Recent", symbol: "⟲"});
	}

	Contents = () => {
		useEffect(() => app().updateStatus(), []);
		const l = useContext(LayoutContext);
		const recentEmojis = useContext(ConfigContext).recent;
		const keys = useMemo<SlottedKeys>(() => ({
			[SC.Backtick]: new ExitRecentKey(),
			[SC.Tab]: new SearchKey(),
			[SC.CapsLock]: new ExitRecentKey(),
			...mapKeysToSlots(l.free, recentEmojis.map(r => new RecentClusterKey(r.symbol)))
		}), [l, recentEmojis]);
		return <Keys keys={keys}/>;
	}
}

function useUseCount(cluster: string) {
	const recent = useContext(ConfigContext).recent;
	return useMemo(() => recent.find(r => r.symbol == cluster)?.useCount ?? 0, [cluster, recent]);
}

export class RecentClusterKey extends Key {
	constructor(private cluster: string) {
		const useCount = useUseCount(cluster);
		const name = clusterName(cluster);
		super({
			name: `${name}, score: ${useCount >= 100 ? "★" : useCount}`,
			symbol: cluster,
			keyType: "char",
		});
	}

	act() {
		app().send(this.cluster, {noRecent: true});
	}

	actAlternate() {
		app().setBoard(new RecentSettingsBoard(this.cluster));
	}
}

export class RecentSettingsBoard extends Board {
	constructor(private cluster: string) {
		super({
			name: `Settings for ${cluster}`,
			symbol: cluster,
		})
	}

	Contents = () => {
		useEffect(() => app().updateStatus(), []);
		const useCount = useUseCount(this.cluster);
		const keys: SlottedKeys = {
			[SC.Backtick]: new BackKey(),
			...mapKeysToSlots(DigitsRow, [
				new ConfigToggleKey({
					name: "Favorite",
					symbol: "⭐",
					active: useCount >= FAVORITE_SCORE,
					action: () => toggleFavorite(this.cluster)
				}),
				new ConfigActionKey({
					name: "Remove", symbol: "🗑️", action: () => {
						removeRecent(this.cluster);
						app().back();
					}
				})
			]),
			[SC.Q]: new ConfigLabelKey(`Score: ${useCount}, +${SCORE_INCR} when used, -${SCORE_DECR} when others used`),
			[SC.A]: new ConfigLabelKey(`Favorite when score ≥ ${FAVORITE_SCORE}`),
		}
		return <Keys keys={keys}/>
	}
}

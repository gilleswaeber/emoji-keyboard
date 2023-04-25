import {RecentEmoji} from "./config";
import {app} from "./appVar";

export const FAVORITE_SCORE = 100;
export const SCORE_INCR = 11;
export const SCORE_DECR = 1;
export const MAX_RECENT_ITEMS = 47;

function sortRecent(arr: RecentEmoji[]): void {
	arr.sort((a, b) => b.useCount - a.useCount);
}

export function increaseRecent(cluster: string) {
	app().updateConfig(c => {
		const current = c.recent.find(r => r.symbol == cluster);
		let recent: RecentEmoji[] = [
			{symbol: cluster, useCount: Math.min((current?.useCount ?? 0) + SCORE_INCR, 100)},
			...c.recent.filter(r => r.symbol != cluster).map(r => ({
				symbol: r.symbol,
				useCount: r.useCount < FAVORITE_SCORE ? Math.max(r.useCount - SCORE_DECR, 0) : FAVORITE_SCORE,
			}))
		];
		sortRecent(recent);
		if (recent.length > MAX_RECENT_ITEMS) recent = recent.slice(0, MAX_RECENT_ITEMS);
		return {recent};
	}, false);
}

export function removeRecent(cluster: string) {
	app().updateConfig(c => {
		return {recent: c.recent.filter(r => r.symbol != cluster)}
	});
}

export function toggleFavorite(cluster: string) {
	app().updateConfig(c => {
		const r = c.recent.find(r => r.symbol == cluster);
		if (!r) return {recent: [{symbol: cluster, useCount: FAVORITE_SCORE}, ...c.recent]}
		else {
			const rest = c.recent.filter(r => r.symbol != cluster);
			if (r.useCount < FAVORITE_SCORE) {
				return {recent: [{symbol: cluster, useCount: FAVORITE_SCORE}, ...rest]}
			} else {
				return {
					recent: [{
						symbol: cluster,
						useCount: FAVORITE_SCORE / 2
					}, ...rest].sort((a, b) => b.useCount - a.useCount)
				}
			}
		}
	})
}

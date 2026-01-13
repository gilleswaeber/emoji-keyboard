import {RecentEmoji} from "./config";
import {app} from "./appVar";

export const FAVORITE_SCORE = 100;
export const SCORE_INCR = 11;
export const SCORE_DECR = 1;
export const MAX_RECENT_ITEMS = 47;

export function sortRecent(arr: RecentEmoji[]): void {
	arr.sort((a, b) => b.score - a.score);
}

function increaseScore(score: number)
{
	if (score >= FAVORITE_SCORE) return score
	return Math.min(score + SCORE_INCR, FAVORITE_SCORE)
}

function decreaseScore(score: number)
{
	if (score >= FAVORITE_SCORE) return score
	return Math.max(score - SCORE_DECR, 0)
}

export function increaseRecent(cluster: string) {
	app().updateConfig(c => {
		let recent: RecentEmoji[]= c.recent
		// insert new element after last favorite
		if (!c.recent.find(r => r.symbol == cluster)) {
			recent.splice(recent.findLastIndex(r => r.score >= FAVORITE_SCORE) + 1,
						  0, { symbol: cluster, score: 0})
		}
		recent = recent.map(r => {
			// increase score of used emoji
			if (r.symbol == cluster) {
				return {symbol: r.symbol, score: increaseScore(r?.score ?? 0)}
			}
			// decrease score of others which are no favorite
			else {
				return {symbol: r.symbol, score: decreaseScore(r?.score ?? 0)}
			}
		})

		// Do not sort here as items might jump around when picked from recent board,
		// just sort when opening the recent board.

		if (recent.length > MAX_RECENT_ITEMS) recent = recent.slice(0, MAX_RECENT_ITEMS);

		return {recent: recent};
	});
}

export function removeRecent(cluster: string) {
	app().updateConfig(c => {
		return {recent: c.recent.filter(r => r.symbol != cluster)}
	});
}

export function toggleFavorite(cluster: string) {
	app().updateConfig(c => {
		const r = c.recent.find(r => r.symbol == cluster);
		let recent: RecentEmoji[]= c.recent.filter(r => r.symbol != cluster)
		if (r) {
			r.score = r.score >= FAVORITE_SCORE ? FAVORITE_SCORE / 2: FAVORITE_SCORE
			recent.splice(recent.findLastIndex(o => o.score >= r.score) + 1,
							0, { symbol: cluster, score: r.score})
		}
		return {recent: recent}
	})
}

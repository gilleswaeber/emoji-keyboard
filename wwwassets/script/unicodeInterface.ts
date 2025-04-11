import {ExtendedCharInformation, getUnicodeData} from "./builder/consolidated";
import {toCodePoints} from "./builder/builder";
import {IconFallback, IconRequirement} from "./config/fallback";
import {UnicodeEmojiGroup} from "./unidata";

export const IgnoreForName = [
	8205, // Zero Width Joiner,
	65039, // Variation Selector-16
]
const u = getUnicodeData();
export const UnicodeData = u;

function charName(code: number): string {
	if (u.chars[code]) return u.chars[code]!.n;
	for (const b of u.blocks) {
		if (code >= b.start && code <= b.end) {
			return `${b.name}: U+${code.toString(16)}`;
		}
	}
	return `U+${code.toString(16)}`;
}

function clusterFullName(cluster: string): string {
	const c = toCodePoints(cluster);
	if (c.length === 1) return charName(c[0]!);
	return c
		.filter(c => !IgnoreForName.includes(c))
		.map(c => charName(c))
		.join(', ');
}

export function charInfo(code: number): ExtendedCharInformation | undefined {
	return u.chars[code];
}

function charAliases(code: number): string[] {
	const info = charInfo(code);
	return [...info?.falias ?? [], ...info?.alias ?? []];
}

export function clusterName(cluster: string): string {
	return u.clusters[cluster]?.name ?? clusterFullName(cluster);
}

export function clusterVariants(cluster: string): string[] | undefined {
	return u.clusters[cluster]?.variants;
}

export function clusterAliases(cluster: string): string[] {
	const cp = toCodePoints(cluster);
	if (cp.length === 1) return charAliases(cp[0]!);
	return u.clusters[cluster]?.alias ?? [];
}

export function emojiGroup(g: UnicodeEmojiGroup): string[] {
	return u.groups[g.group]?.sub[g.subGroup]?.clusters ?? [];
}

export function symbolRequirements(cluster: string): IconRequirement {
	const info = u.clusters[cluster];
	for (const f of IconFallback) {
		if (info && f.version && info.version && f.version.lte(info.version)) return f.requirement;
		if (f.clusters && f.clusters.has(cluster)) return f.requirement;
		if (f.ranges) for (const r of f.ranges) {
			if (cluster >= r.from && cluster <= r.to) return f.requirement;
		}
	}
	return {type: "windows", windows: "0"};
}

import {ExtendedCharInformation, getUnicodeData} from "./builder/consolidated";
import {toCodePoints} from "./builder/builder";
import {IconFallback} from "./config/fallback";

export const IgnoreForName = [
	8205, // Zero Width Joiner,
	65039, // Variation Selector-16
]
const u = getUnicodeData();
export const UnicodeData = u;
// Make it accessible in the DevTools
(window as any).u = u;

function charName(code: number): string {
	if (code >= 19968 && code <= 40956) {
		return `CJK UNIFIED IDEOGRAPH-${code.toString(16)}`;
	} else {
		return u.chars[code]?.n ?? `U+${code.toString(16)}`;
	}
}
function clusterFullName(cluster: string): string {
	const c = toCodePoints(cluster);
	if (c.length === 1) return charName(c[0]!);
	return c
		.filter(c => !IgnoreForName.includes(c))
		.map(c => charName(c))
		.join(', ');
}

export function charInfo(code: number): ExtendedCharInformation|undefined {
	return u.chars[code];
}

export function clusterName(cluster: string): string {
	return u.clusters[cluster]?.name ?? clusterFullName(cluster);
}

export function clusterVariants(cluster: string): string[]|undefined {
	return u.clusters[cluster]?.variants;
}

export function emojiGroup(g: {group: string, subGroup: string}): string[] {
	return u.groups[g.group]?.sub[g.subGroup]?.clusters ?? [];
}

export function requiredOS(cluster: string): string {
	const info = u.clusters[cluster];
	for (const f of IconFallback) {
		if (info && f.version && info.version >= f.version) return f.windows;
		if (f.clusters && f.clusters.has(cluster)) return f.windows;
		if (f.ranges) for (const r of f.ranges) {
			if (cluster >= r.from && cluster <= r.to) return f.windows;
		}
	}
	return "0";
}

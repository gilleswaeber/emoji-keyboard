import {createContext} from "preact";
import {ExtendedUnicodeData, getUnicodeData} from "./builder/consolidated";
import {UnicodeData} from "./builder/unicode";

export const IgnoreForName = [
	8205, // Zero Width Joiner,
	65039, // Variation Selector-16
]
const u = getUnicodeData();

function charName(code: number): string {
	if (code >= 19968 && code <= 40956) {
		return `CJK UNIFIED IDEOGRAPH-${code.toString(16)}`;
	} else {
		return u.chars[code]?.name ?? `U+${code.toString(16)}`;
	}
}
function clusterFullName(cluster: string): string {
	return [...cluster]
		.map(c => c.codePointAt(0)!)
		.filter(c => !IgnoreForName.includes(c))
		.map(c => charName(c))
		.join(', ');
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

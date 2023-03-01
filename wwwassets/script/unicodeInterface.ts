import {createContext} from "preact";
import {ExtendedUnicodeData, getUnicodeData} from "./builder/consolidated";
import {UnicodeData} from "./builder/unicode";

export const IgnoreForName = [
	8205, // Zero Width Joiner,
	65039, // Variation Selector-16
]

export type UnicodeInterface = {
	name(cluster: string): string;
}

function getUnicodeInterface(data: ExtendedUnicodeData): UnicodeInterface {
	function charName(code: number): string {
		if (code >= 19968 && code <= 40956) {
			return `CJK UNIFIED IDEOGRAPH-${code.toString(16)}`;
		} else {
			return data.chars[code]?.name ?? `U+${code.toString(16)}`;
		}
	}
	function fullName(cluster: string): string {
		return [...cluster]
			.map(c => c.codePointAt(0)!)
			.filter(c => !IgnoreForName.includes(c))
			.map(c => charName(c))
			.join(', ');
	}

	return {
		name(cluster: string) {
			return data.clusters[cluster]?.name ?? fullName(cluster);
		}
	}
}

export const UnicodeContext = createContext<UnicodeInterface>(getUnicodeInterface(getUnicodeData()));

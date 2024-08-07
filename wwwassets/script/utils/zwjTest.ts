import {ZeroWidthJoiner} from "../chars";

export const hiddenBox = document.createElement('div');
const knownZWJ = new Map<string, boolean>();

export function supportsZWJ(sequence: string): boolean {
	/** Check if the ZWJ sequence is supported by the base font */
	if (!knownZWJ.has(sequence)) {
		const el = document.createElement('span');
		el.className = 'symbol';
		hiddenBox.appendChild(el);
		el.textContent = sequence;
		const len1 = el.offsetWidth;
		el.textContent = sequence.replace(ZeroWidthJoiner, '');
		const len2 = el.offsetWidth;
		hiddenBox.removeChild(el);
		const supported = len1 < len2;
		knownZWJ.set(sequence, supported);
	}
	return knownZWJ.get(sequence)!;
}

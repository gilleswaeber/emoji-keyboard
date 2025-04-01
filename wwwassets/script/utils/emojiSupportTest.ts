import {ZeroWidthJoiner} from "../chars";
import {IconRequirement} from "../config/fallback";
import {unreachable} from "../helpers";
import {Version} from "../osversion";

export const hiddenBox = document.createElement('div');
document.body.appendChild(hiddenBox);
hiddenBox.style.position = 'absolute';
hiddenBox.style.left = '-1000px';
hiddenBox.style.top = '-1000px';
const knownZWJ = new Map<string, boolean>();
const knownEmoji = new Map<string, boolean>();


export function supportsRequirements(req: IconRequirement, os: Version): boolean {
	if (req.type === "windows") return os.gte(req.windows);
	else if (req.type === "zwjEmoji") return supportsZWJ(req.zwjEmoji);
	else if (req.type === "emoji") return supportsEmoji(req.emoji);
	else return unreachable(req);
}

/** Check if the ZWJ sequence is supported by the base font, i.e. it's shorter than character taken separately */
function supportsZWJ(sequence: string): boolean {
	//if (!knownZWJ.has(sequence)) {
		const el = document.createElement('span');
		hiddenBox.appendChild(el);
		el.textContent = sequence;
		const len1 = el.offsetWidth;
		el.textContent = sequence.replace(ZeroWidthJoiner, '');
		const len2 = el.offsetWidth;
		hiddenBox.removeChild(el);
		const supported = len1 > 0 && len1 < len2;
		knownZWJ.set(sequence, supported);
	//}
	return knownZWJ.get(sequence)!;
}

document.fonts.load("16px AdobeBlank");
/** Check if the emoji is supported by the base font, i.e. a glyph is displayed using the base font when setting Adobe Blank as fallback */
function supportsEmoji(emoji: string): boolean {
	if (!knownEmoji.has(emoji)) {
		const el = document.createElement('span');
		el.style.fontFamily = '"Segoe UI Emoji", "Segoe UI", AdobeBlank';
		hiddenBox.appendChild(el);
		el.textContent = 'a' + emoji;
		const len1 = el.offsetWidth;
		el.textContent = 'a';
		const len2 = el.offsetWidth;
		hiddenBox.removeChild(el);
		const supported = len1 > 0 && len1 > len2;
		knownEmoji.set(emoji, supported);
	}
	return knownEmoji.get(emoji)!;
}


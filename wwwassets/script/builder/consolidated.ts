import {
	BidiClass,
	CanonicalCombiningClass,
	EmojiTestData,
	EmojiVersion,
	GeneralCategory,
	NamesListChar,
	NamesListData,
	UnicodeData,
	UnicodeDataChar
} from "./unicode";
import {toTitleCase} from "./titleCase";
import {ZeroWidthJoiner} from "../chars";

type BlockInformation = {
	start: number;
	end: number;
	name: string;
	sub: SubBlockInformation[];
}
type SubBlockInformation = {
	name: string;
	notice?: string[];
	char: number[];
}
type ExtendedBlockInformation = BlockInformation & {
	sub: ExtendedSubBlockInformation[];
}
type ExtendedSubBlockInformation = SubBlockInformation & {
	block: WeakRef<ExtendedBlockInformation>;
}
type CharInformation = UnicodeDataChar & NamesListChar & {
	emojiVersion?: number;
}
export type ExtendedCharInformation = CharInformation & {
	block: ExtendedBlockInformation;
	sub: ExtendedSubBlockInformation;
}
type ClusterInformation = {
	cluster: string;
	name: string;
	version: number;
	parent?: string;
	variants?: string[];
};
type ExtendedClusterInformation = ClusterInformation & {
	group?: ExtendedGroupInformation;
	subGroup?: ExtendedSubGroupInformation;
}
type GroupInformation = {
	name: string;
	sub: SubGroupInformation[];
};
type ExtendedGroupInformation = {
	name: string;
	sub: Record<string, ExtendedSubGroupInformation>;
}
type SubGroupInformation = {
	name: string;
	clusters: string[];
}
type ExtendedSubGroupInformation = SubGroupInformation & {
	group: WeakRef<ExtendedGroupInformation>;
}
export type ConsolidatedUnicodeData = {
	name: string;
	blocks: BlockInformation[];
	chars: CharInformation[];
	groups: GroupInformation[];
	clusters: ClusterInformation[];
}
const ExcludeStem = new Set(["keycap", "flag", "family"]);

export function consolidateUnicodeData(
	{namesList, unicodeData, emojiVersion, emojiTest}:
		{ namesList: NamesListData, unicodeData: UnicodeData, emojiVersion: EmojiVersion, emojiTest: EmojiTestData }): ConsolidatedUnicodeData {
	const blocks: BlockInformation[] = [];
	const chars: CharInformation[] = [];
	const groups: GroupInformation[] = [];
	const clusters: ClusterInformation[] = [];

	for (const block of namesList.block) {
		const b: BlockInformation = {
			start: block.start,
			end: block.end,
			name: block.name,
			sub: [],
		}
		blocks.push(b);
		for (const sub of block.sub) {
			const s: SubBlockInformation = {
				name: sub.name,
				notice: sub.notice,
				char: [],
				// block: new WeakRef(b),
			};
			b.sub.push(s);
			for (const char of (sub.char ?? [])) {
				const u = unicodeData[char.code];
				const ev = emojiVersion[char.code];
				const seq = emojiTest.sequences[String.fromCodePoint(char.code)];

				s.char.push(char.code);
				const c: CharInformation = {
					name: char.name,
					code: char.code,
					category: u?.category ?? GeneralCategory.Unassigned,
					combining: u?.combining ?? CanonicalCombiningClass.Not_Reordered,
					bidiClass: u?.bidiClass ?? BidiClass.Other_Neutral,
					bidiMirrored: u?.bidiMirrored ?? false,
					// block: b,
					// sub: s,
				}

				if (char.alias) c.alias = char.alias;
				if (char.falias) c.falias = char.falias;
				if (char.ref) c.ref = char.ref;
				if (char.decomposition) c.decomposition = char.decomposition;
				if (char.variation) c.variation = char.variation;
				if (char.notice) c.notice = char.notice;
				if (char.comment?.length || u?.comment?.length) {
					c.comment = [...(char.comment ?? []), ...(u?.comment ?? [])];
				}
				if (u?.decompositionUD) c.decompositionUD = u.decompositionUD;
				if (u?.decimalDigit) c.decimalDigit = u.decimalDigit;
				if (u?.digit) c.digit = u.digit;
				if (u?.numeric) c.numeric = u.numeric;
				if (u?.unicode1) c.unicode1 = u.unicode1;
				if (u?.uppercase) c.uppercase = u.uppercase;
				if (u?.lowercase) c.lowercase = u.lowercase;
				if (u?.titlecase) c.titlecase = u.titlecase;

				if (ev) c.emojiVersion = ev;
				if (seq) c.name = seq.name;
				c.name = toTitleCase(c.name);

				chars.push(c);
			}
		}
	}
	for (const group of emojiTest.groups) {
		const g: GroupInformation = {
			name: toTitleCase(group.name),
			sub: [],
		}
		groups.push(g);
		for (const sub of group.sub) {
			const s: SubGroupInformation = {
				name: sub.name,
				clusters: [],
			}
			g.sub.push(s);
			const stems = new Map<string, ClusterInformation>();
			for (const cluster of sub.clusters) {
				const info = emojiTest.sequences[cluster];
				if (!info || info.type !== 'fully-qualified') continue;
				const stem = info.name.split(':', 1)[0];
				const name = toTitleCase(info.name);

				// Grapheme clusters are grouped by stem
				if (stems.has(stem) && !ExcludeStem.has(stem)) {
					const c = stems.get(stem)!;
					c.variants ??= [c.cluster];
					if (name == c.name.split(':', 1)[0]) {
						// need to swap it out
						const c2: ClusterInformation = {
							cluster,
							name: name,
							version: info.version,
							variants: [cluster, ...c.variants],
						};
						clusters.push(c2);
						delete c.variants;
						c.parent = cluster;
						s.clusters[s.clusters.indexOf(c.cluster)] = cluster;
						stems.set(stem, c2);
					} else {
						c.variants.push(cluster);
						clusters.push({
							cluster,
							name: name,
							version: info.version,
							parent: c.cluster,
						});
					}
				} else {
					const c: ClusterInformation = {
						cluster,
						name: name,
						version: info.version,
					}
					stems.set(stem, c);
					clusters.push(c);
					s.clusters.push(cluster);
				}
			}
		}
	}
	return {blocks, chars, groups, clusters, name: namesList.title.title};
}

declare global {
	interface Window {
		unicodeData?: ConsolidatedUnicodeData
	}
}
export type ExtendedUnicodeData = {
	blocks: ExtendedBlockInformation[];
	chars: Record<number, ExtendedCharInformation>;
	groups: Record<string, ExtendedGroupInformation>;
	clusters: Record<string, ClusterInformation>;
};

const SKIN_TONES = ["🏻", "🏼", "🏽", "🏾", "🏿"] as const;
const SKIN_TONES_NAMES = {
	"🏻": "Light Skin Tone",
	"🏼": "Medium-Light Skin Tone",
	"🏽": "Medium Skin Tone",
	"🏾": "Medium-Dark Skin Tone",
	"🏿": "Dark Skin Tone",
} as const;
const SKIN_TONE_REGEX = new RegExp(`(?:${SKIN_TONES.join('|')})`, 'g');

export function getUnicodeData(): ExtendedUnicodeData {
	const u: ConsolidatedUnicodeData = window.unicodeData ?? {
		name: "No Unicode Data Available",
		blocks: [],
		chars: [],
		clusters: [],
		groups: [],
	};

	const idxChars: Record<number, CharInformation> = Object.fromEntries(u.chars.map(c => [c.code, c]));

	const blocks: ExtendedBlockInformation[] = [];
	const chars: Record<number, ExtendedCharInformation> = {};
	const groups: Record<string, ExtendedGroupInformation> = {};
	const clusters: Record<string, ExtendedClusterInformation> = Object.fromEntries(u.clusters.map(c => [c.cluster, {...c}]));

	for (const block of u.blocks) {
		const b: ExtendedBlockInformation = {...block, sub: []};
		b.sub = block.sub.map(s => ({...s, block: new WeakRef(b)}));
		blocks.push(b);
		for (const s of b.sub) {
			for (const c of s.char) {
				if (!idxChars[c]) continue;
				chars[c] = {
					...idxChars[c],
					block: b,
					sub: s,
				};
			}
		}
	}
	for (const group of u.groups) {
		const g: ExtendedGroupInformation = {...group, sub: {}};
		groups[group.name] = g;
		for (const sub of group.sub) {
			const s: ExtendedSubGroupInformation = {...sub, group: new WeakRef(g)};
			g.sub[sub.name] = s;
			for (const cluster of sub.clusters) {
				if (!clusters[cluster]) continue;
				clusters[cluster].group = g;
				clusters[cluster].subGroup = s;
			}
		}
	}

	// Add skin tone variants to family sequences
	for (const c of ["👨‍👩‍👦", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👨‍👨‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👦", "👨‍👦‍👦", "👨‍👧", "👨‍👧‍👦", "👨‍👧‍👧", "👩‍👦", "👩‍👦‍👦", "👩‍👧", "👩‍👧‍👦", "👩‍👧‍👧"]) {
		if (clusters[c] && !clusters[c].variants) {
			const parts = c.split(ZeroWidthJoiner);
			for (let i = 1; i < parts.length; ++i) parts[i] = ZeroWidthJoiner + parts[i];
			let variants = [""];
			for (const p of parts) {
				variants = variants.flatMap(v => SKIN_TONES.map(k => v + p + k))
			}
			for (const v of variants) {
				clusters[v] = {
					cluster: v,
					parent: c,
					name: clusters[c].name + ': ' + [...v.matchAll(SKIN_TONE_REGEX)].map(v => SKIN_TONES_NAMES[v[0] as keyof typeof SKIN_TONES_NAMES]).join(', '),
					version: clusters[c].version,
				}
			}
			variants.unshift(c);
			clusters[c].variants = variants;
		}
	}

	return {blocks, chars, groups, clusters};
}

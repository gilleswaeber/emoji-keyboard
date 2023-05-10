import {
	AnnotationsData,
	BidiClass,
	CanonicalCombiningClass,
	EmojiTestData,
	EmojiVersion,
	GeneralCategory,
	NamedSequencesData,
	NamesListData,
	UnicodeData
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
type CharInformation = {
	/** name */
	n: string;
	code: number;
	alias?: string[];
	falias?: string[];
	ref?: number[];
	decomposition?: string[];
	variation?: {
		code: number;
		sel: string;
		name: string;
	}[];
	notice?: string[];
	/** category */
	ca?: GeneralCategory;
	/** combining */
	cb?: CanonicalCombiningClass;
	/** bidiClass */
	bc?: BidiClass;
	/** decompositionUD */
	de2?: string;
	decimalDigit?: number;
	digit?: number;
	numeric?: string;
	/** bidiMirrored */
	bm?: true;
	/** unicode1 */
	u1?: string;
	comment?: string[];
	uppercase?: string;
	lowercase?: string;
	titlecase?: string;
	emojiVersion?: number;
	control?: true;
	reserved?: true;
	notACharacter?: true;
}
export type ExtendedCharInformation = CharInformation & {
	block: ExtendedBlockInformation;
	sub: ExtendedSubBlockInformation;
}
type ClusterInformation = {
	cluster: string;
	name: string;
	version?: number;
	parent?: string;
	variants?: string[];
	alias?: string[];
};
export type ExtendedClusterInformation = ClusterInformation & {
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
export type UnicodeDataSource = {
	namedSequences: NamedSequencesData;
	namesList: NamesListData;
	unicodeData: UnicodeData;
	emojiVersion: EmojiVersion;
	emojiTest: EmojiTestData;
	annotations: AnnotationsData;
};
export type ConsolidatedUnicodeData = {
	name: string;
	blocks: BlockInformation[];
	chars: CharInformation[];
	groups: GroupInformation[];
	clusters: ClusterInformation[];
}
const ExcludeStem = new Set(["keycap", "flag", "family"]);

export function toHex(code: number) {
	return code.toString(16).toUpperCase().padStart(4, '0');
}

export function consolidateUnicodeData(
	{
		annotations,
		namedSequences,
		namesList,
		unicodeData,
		emojiVersion,
		emojiTest
	}: UnicodeDataSource): ConsolidatedUnicodeData {
	const blocks: BlockInformation[] = [];
	const chars: CharInformation[] = [];
	const groups: GroupInformation[] = [];
	const clusters: ClusterInformation[] = [];
	const knownClusters = new Set<string>();

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
				const str = String.fromCodePoint(char.code);

				const u = unicodeData[char.code];
				const ev = emojiVersion[char.code];
				const seq = emojiTest.sequences[str];
				const a = annotations.annotations[str];

				const c: CharInformation = {
					n: char.name,
					code: char.code,
					// block: b,
					// sub: s,
				};

				if (char.alias || a?.default) {
					c.alias = [...(char.alias ?? []), ...(a?.default ?? [])]
				}
				if (char.falias) c.falias = char.falias;
				if (char.ref) c.ref = char.ref;
				if (char.decomposition) c.decomposition = char.decomposition;
				if (char.variation) c.variation = char.variation;
				if (char.notice) c.notice = char.notice;
				if (char.comment?.length || u?.comment?.length) {
					c.comment = [...(char.comment ?? []), ...(u?.comment ?? [])];
				}

				if (u?.category) c.ca = u.category;
				if (u?.combining) c.cb = u.combining;
				if (u?.bidiClass) c.bc = u.bidiClass;
				if (u?.bidiMirrored) c.bm = u.bidiMirrored;
				if (u?.decompositionUD) c.de2 = u.decompositionUD;
				if (u?.decimalDigit) c.decimalDigit = u.decimalDigit;
				if (u?.digit) c.digit = u.digit;
				if (u?.numeric) c.numeric = u.numeric;
				if (u?.unicode1) c.u1 = u.unicode1;
				if (u?.uppercase) c.uppercase = u.uppercase;
				if (u?.lowercase) c.lowercase = u.lowercase;
				if (u?.titlecase) c.titlecase = u.titlecase;

				if (ev) c.emojiVersion = ev;
				if (seq) c.n = seq.name;

				if (c.n === '<control>') {
					c.n = c.alias?.[0] ?? 'Control U+' + toHex(c.code);
					c.control = true;
				}
				if (c.n === '<reserved>') {
					c.n = 'Reserved U+' + toHex(c.code);
					c.reserved = true;
				}
				if (c.n === '<not a character>') {
					c.n = 'Not a Character U+' + toHex(c.code);
					c.notACharacter = true;
				}

				s.char.push(char.code);
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
				const a = annotations.annotations[cluster];

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
						if (a?.default) c2.alias = a.default;
						clusters.push(c2);
						knownClusters.add(cluster);
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
						knownClusters.add(cluster);
					}
				} else {
					const c: ClusterInformation = {
						cluster,
						name: name,
						version: info.version,
					}
					if (a?.default) c.alias = a.default;
					stems.set(stem, c);
					clusters.push(c);
					knownClusters.add(cluster);
					s.clusters.push(cluster);
				}
			}
		}
	}
	for (const ns of namedSequences) {
		if (!knownClusters.has(ns.cluster)) {
			clusters.push({
				cluster: ns.cluster,
				name: ns.name,
			});
			knownClusters.add(ns.cluster);
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
	clusters: Record<string, ExtendedClusterInformation>;
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
	const clusters: Record<string, ExtendedClusterInformation> = Object.fromEntries(u.clusters.map(c => [c.cluster, {
		...c,
		name: toTitleCase(c.name),
	}]));

	for (const block of u.blocks) {
		const b: ExtendedBlockInformation = {...block, sub: []};
		b.sub = block.sub.map(s => ({...s, block: new WeakRef(b)}));
		blocks.push(b);
		for (const s of b.sub) {
			for (const c of s.char) {
				if (!idxChars[c]) continue;
				chars[c] = {
					...idxChars[c],
					n: toTitleCase(idxChars[c].n),
					block: b,
					sub: s,
				};
			}
		}
	}

	// Additional folding pass
	const clustersByName = new Map(Object.values(clusters).map(c => [c.name, c] as const));
	for (const c of Object.values(clusters)) {
		if (!c.parent) {
			let variants: string[] = [];
			if (c.name.match(/^People /) && !c.name.match(/ Holding Hands$/)) {
				const baseName = c.name.replace(/^People /, '');
				variants = [
					`Men ${baseName}`,
					`Women ${baseName}`,
				]
			} else if (c.name.match(/ (?:Man|Woman|Person)$/) && !c.name.match(/^Old/)) {
				const baseName = c.name.replace(/ (?:Man|Woman|Person)$/, '');
				variants = [
					`${baseName} Person`,
					`${baseName} Man`,
					`${baseName} Woman`,
				]
			} else if (c.name == 'Merperson') {
				const baseName = c.name.replace(/person$/, '');
				variants = [
					`${baseName}man`,
					`${baseName}maid`,
				]
			} else if (c.name == 'Person With Crown') {
				variants = [
					`Prince`,
					`Princess`,
				]
			} else {
				const baseName = c.name.replace(/^Person /, '');
				variants = [
					`Man ${baseName}`,
					`Woman ${baseName}`,
				]
			}
			for (const v of variants) {
				if (v != c.name && clustersByName.has(v)) {
					const sc = clustersByName.get(v)!;
					if (!sc.parent) {
						sc.parent = c.cluster;
						if (!c.variants) c.variants = [c.cluster];
						if (sc.variants) {
							c.variants.push(...sc.variants);
							delete sc.variants;
						} else c.variants.push(sc.cluster);
						if (sc.alias) {
							c.alias ??= [];
							for (const a in sc.alias) if (!c.alias.includes(a)) c.alias.push(a);
							delete sc.alias;
						}
					}
				}
			}
		}
	}

	// For some reason, woman variants place bearded woman first...
	clusters["👩"].variants?.sort((a, b) => +clusters[a]!.name.includes('Beard') - +clusters[b]!.name.includes('Beard'))

	// Extend group information
	for (const group of u.groups) {
		const g: ExtendedGroupInformation = {...group, sub: {}};
		groups[group.name] = g;
		for (const sub of group.sub) {
			const s: ExtendedSubGroupInformation = {...sub, group: new WeakRef(g)};
			g.sub[sub.name] = s;
			s.clusters = s.clusters.filter(c => !clusters[c] || !clusters[c].parent);
			for (const cluster of s.clusters) {
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

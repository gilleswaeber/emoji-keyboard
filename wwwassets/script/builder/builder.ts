import {Config, ConfigAddon, Paths} from "./config";
import {Dictionary} from "../data";
import {parseEmojiTest, parseEmojiVersions, parseNamesList, parseUnicodeData, UnicodeData} from "./unicode";
import {consolidateUnicodeData} from "./consolidated";
import {ahkSaveUnicodeData} from "../ahk";
import {IgnoreForName} from "../unicodeInterface";

function getFullName(code: number[], ctx: { unicodeData: UnicodeData }): string {
	const parts: string[] = [];
	for (const c of code) {
		if (IgnoreForName.includes(c)) continue;
		if (c >= 19968 && c <= 40956) {
			parts.push(`CJK UNIFIED IDEOGRAPH-${c.toString(16)}`);
		} else {
			parts.push(ctx.unicodeData[c].name ?? `U+${c.toString(16)}`);
		}
	}
	return parts.join(", ");
}

function toCodePoints(s: string): number[] {
	return [...s].map(c => c.codePointAt(0)!);
}

type FirstPassEmoji = {
	keywords?: string[];
	symbol: string;
	group: string;
	subGroup: string;
	name: string;
	fullName?: string;
	code?: number[];
	alternates?: FirstPassEmoji[];
	style?: "space" | null;
	show?: string;
}

function getEmoji(addon: ConfigAddon, symbol: string | string[] | null, ctx: { unicodeData: UnicodeData }): FirstPassEmoji {
	let blank = 0;
	if (symbol === null) {
		return {
			symbol: "",
			group: addon.group,
			subGroup: addon.subGroup,
			name: "BLANK " + blank++
		};
	} else if (typeof symbol === "string") {
		const code = toCodePoints(symbol);
		const fullName = getFullName(code, ctx);
		const name = fullName.toLocaleLowerCase().replace(/\b\w/g, l => l.toUpperCase());
		return {
			symbol,
			group: addon.group,
			subGroup: addon.subGroup,
			fullName,
			name,
			code
		};
	} else if (Array.isArray(symbol)) {
		const emoji = getEmoji(addon, symbol[0], ctx);
		emoji.alternates = [];
		for (const sym of symbol) {
			emoji.alternates.push(getEmoji(addon, sym, ctx));
		}
		return emoji;
	} else {
		throw new Error("Unexpected value: " + symbol);
	}
}

/*
function secondPass(e: FirstPassEmoji, ctx: {unicodeData: UnicodeData}) {
	const code = e.code ?? toCodePoints(e.symbol);

	return {
		code,
		fullName: e.fullName ?? getFullName(code, ctx),
		show: e.show ?? e.symbol,
	};

	if (e.code.length) {
		e.version = this.chars.latest[e.code[0]]
			? parseFloat(this.chars.latest[e.code[0]].Version)
			: 0;
		e.emojiVersion = this.findEmojiVersion(e);
	} else {
		e.version = e.emojiVersion = 0;
	}

	if (!e.show) {
		e.show = e.symbol;
	}

	if (!e.keywords && e.code.length && this.annotations[e.code[0]]?.keywords) {
		e.keywords = this.annotations[e.code[0]].keywords;
	}

	this.setRequiredVersion(e);

	if (e.alternates) {
		for (const a of e.alternates) {
			this.applySecondPass(a);
		}
	}
}*/

export async function makeBuild() {
	await build({
		addons: [],
		noGroup: [],
		iconFallback: [],
		keyboards: [],
		symbols: [],
	});
}

async function build(config: Config) {
	const paths: Paths = {
		emojiTestPath: '../res/data/emoji-15.0/emoji-test.txt',
		emojiDataPath: '../res/data/ucd-15.0.0/emoji/emoji-data.txt',
		unicodeDataPath: '../res/data/ucd-15.0.0/UnicodeData.txt',
		namesListPath: '../res/data/ucd-15.0.0/NamesList.txt',
	};
	const emojis: Dictionary<FirstPassEmoji> = {};
	const groups = [];

	const ctx = {
		unicodeData: await parseUnicodeData(paths),
		emojiVersion: await parseEmojiVersions(paths.emojiDataPath),
		emojiTest: await parseEmojiTest(paths),
		namesList: await parseNamesList(paths),
	};

	const uni = consolidateUnicodeData(ctx);
	console.log(uni);

	debugger;

	ahkSaveUnicodeData(uni);

	/*
	// Parse Addons
	if (config.addons) {
		for (const addon of config.addons) {
			if (addon.symbols) {
				for (const symbol of addon.symbols) {
					if (symbol && typeof symbol !== 'string') {
						const fromCode = toCodePoints(symbol.from);
						const toCode = toCodePoints(symbol.to);
						if (fromCode.length !== 1 || toCode.length !== 1 || fromCode[0] > toCode[0]) {
							throw new Error(`Invalid range: ${symbol.from} — ${symbol.to}`);
						}
						const from = fromCode[0];
						const to = toCode[0];
						for (let c = from; c <= to; c++) {
							const emoji = getEmoji(addon, String.fromCodePoint(c), ctx);
							emojis[emoji.name] = emoji;
						}
					} else {
						const emoji = getEmoji(addon, symbol, ctx);
						emojis[emoji.name] = emoji;
					}
				}
			} else {
				const name = addon.name ?? getFullName(toCodePoints(addon.symbol), ctx);
				const style = addon.style ?? null;
				emojis[name] = {
					symbol: addon.symbol,
					group: addon.group,
					subGroup: addon.subGroup,
					name,
					show: addon.show ?? addon.symbol,
				};
				if (style !== null) {
					emojis[name].style = style;
				}
				if (addon.keywords) {
					emojis[name].keywords = addon.keywords;
				}
				if (addon.alternates) {
					emojis[name].alternates = [emojis[name]];
					for (const alt of addon.alternates) {
						const c: FirstPassEmoji = {
							symbol: alt.symbol,
							group: addon.group,
							subGroup: addon.subGroup,
							name: alt.name ?? getFullName(toCodePoints(alt.symbol), ctx),
							show: alt.show ?? alt.symbol
						};
						if (alt.keywords) {
							c.keywords = addon.keywords;
						}
						if (style !== null) {
							c.style = style;
						}
						emojis[name].alternates!.push(c);
					}
				}
			}
		}
	}
	*/
}


import {charInfo, UnicodeData} from "../unicodeInterface";
import {GeneralCategory} from "../builder/unicode";
import {toHex} from "../builder/consolidated";
import type {EmojiKeyboard} from "./boards";

const BlockSymbolOverride: Record<number, string> = {
	0x2000: "†",
	0x2800: "⠳",
	0xFFF0: "�",
	0x1D100: "𝄞",
	0x1F300: "🌌",
	0x1F900: "🤔",
};

function validCode(code: number): boolean {
	const info = charInfo(code);
	if (!info) return false;
	return !info.control && !info.reserved && !info.notACharacter;
}

export const UnicodeKeyboard: EmojiKeyboard = {
	name: "Unicode Blocks",
	symbol: "∪",
	content: UnicodeData.blocks.filter(b => b.sub.some(s => s.char?.some(validCode))).map(block => {
		const codes = block.sub.map(sub => sub.char).flat().filter(validCode);
		let symbol = String.fromCodePoint(codes[0]);
		for (const code of codes) {
			const info = charInfo(code);
			if (info?.ca?.startsWith(GeneralCategory.Letter)) {
				symbol = String.fromCodePoint(code);
				break;
			}
		}
		if (BlockSymbolOverride[block.start]) symbol = BlockSymbolOverride[block.start];
		return {
			name: block.name,
			statusName: `${block.name} ${toHex(block.start)}–${toHex(block.end)}`,
			symbol,
			content: codes.map(c => String.fromCodePoint(c)),
		} as EmojiKeyboard;
	})
};

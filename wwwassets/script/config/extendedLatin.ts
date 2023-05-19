import {VK} from "../layout/vk";
import {EmojiKeyboard} from "./boards";

const ae = VK.Digit1;
const alpha = VK.Digit2;
const turnedV = VK.Digit3;
const openE = VK.Digit4;
const schwa = VK.Digit5;
const turnedE = VK.Digit6;
const gamma = VK.Digit7;
const openO = VK.Digit8;
const thorn = VK.Digit9;
const yogh = VK.Digit0;
const hookV = VK.Period;
const ezh = VK.RightBrace;
const stop = VK.LeftBrace;

const below = VK.Minus;

const DotAboveAndAcute = {
	s: ["ṥ", "Ṥ"],
};
const AcuteAndBreve = {
	a: ["ắ", "Ắ"],
};
const DotAboveAndCaron = {
	s: ["ṧ", "Ṧ"],
};
const AcuteAndCedilla = {
	c: ["ḉ", "Ḉ"],
}
const BreveAndCedilla = {
	e: ["ḝ", "Ḝ"],
}
const AcuteAndCircumflex = {
	a: ["ấ", "Ấ"],
	e: ["ế", "Ế"],
	o: ["ố", "Ố"],
};
const AcuteAndDiaeresis = {
	i: ["ḯ", "Ḯ"],
	u: ["ǘ", "Ǘ"],
};
const CaronAndDiaeresis = {
	u: ["ǚ", "Ǚ"],
};
const BreveAndGrave = {
	a: ["ằ", "Ằ"]
};
const CircumflexAndGrave = {
	a: ["ầ", "Ầ"],
	e: ["ề", "Ề"],
	o: ["ồ", "Ồ"],
};
const DiaeresisAndGrave = {
	u: ["ǜ", "Ǜ"]
};
const DotAboveAndMacron = {
	a: ["ǡ", "Ǡ"],
	o: ["ȱ", "Ȱ"],
};
const AcuteAndMacron = {
	e: ["ḗ", "Ḗ"],
	o: ["ṓ", "Ṓ"],
};
const DiaeresisAndMacron = {
	a: ["ǟ", "Ǟ"],
	o: ["ȫ", "Ȫ"],
	u: ["ṻ", "Ṻ"],
};
const GraveAndMacron = {
	e: ["ḕ", "Ḕ"],
	o: ["ṑ", "Ṑ"],
};
const MacronAndOgonek = {
	o: ["ǭ", "Ǭ"],
};
const AcuteAndRingAbove = {
	a: ["ǻ", "Ǻ"],
};
const DotAboveAndStroke = {
	j: "ɟ"
};
const AcuteAndStroke = {
	o: ["ǿ", "Ǿ"],
}
const AcuteAndTilde = {
	o: ["ṍ", "Ṍ"],
	u: ["ṹ", "Ṹ"],
};
const BreveAndTilde = {
	a: ["ẵ", "Ẵ"],
};
const CircumflexAndTile = {
	a: ["ẫ", "Ẫ"],
	e: ["ễ", "Ễ"],
	o: ["ỗ", "Ỗ"],
};
const DiaeresisAndTilde = {
	o: ["ṏ", "Ṏ"],
};
const MacronAndTilde = {
	o: ["ȭ", "Ȭ"],
}
const AcuteAndHorn = {
	o: ["ớ", "Ớ"],
	u: ["ứ", "Ứ"],
};
const GraveAndHorn = {
	o: ["ờ", "Ờ"],
	u: ["ừ", "Ừ"],
};
const TildeAndHorn = {
	o: ["ỡ", "Ỡ"],
	u: ["ữ", "Ữ"],
};
const BreveAndHook = {
	a: ["ẳ", "Ẳ"],
};
const CircumflexAndHook = {
	a: ["ẩ", "Ẩ"],
	e: ["ể", "Ể"],
	o: ["ổ", "Ổ"],
};
const HornAndHook = {
	o: ["ở", "Ở"],
	u: ["ử", "Ử"],
};
const DotAboveAndDotBelow = {
	s: ["ṩ", "Ṩ"],
};
const BreveAndDotBelow = {
	a: ["ặ", "Ặ"],
};
const CircumflexAndDotBelow = {
	a: ["ậ", "Ậ"],
	e: ["ệ", "Ệ"],
	o: ["ộ", "Ộ"],
};
const MacronAndDotBelow = {
	l: ["ḹ", "Ḹ"],
	r: ["ṝ", "Ṝ"],
};
const HornAndDotBelow = {
	o: ["ợ", "Ợ"],
	u: ["ự", "Ự"],
};

const DoubleAcute: EmojiKeyboard = {
	name: "Double Acute",
	symbol: "a̋",
	byVK: {
		a: ["a̋", "A̋"],
		e: ["e̋", "E̋"],
		i: ["i̋", "I̋"],
		j: ["j̋", "J̋"],
		o: ["ő", "Ő"],
		u: ["ű", "Ű"],
		v: ["v̋", "V̋"]
	}
};
const Acute: EmojiKeyboard = {
	name: "Acute",
	symbol: "á",
	byVK: {
		a: ["á", "Á"],
		[ae]: ["ǽ", "Ǽ"],
		[alpha]: ["ɑ́", "Ɑ́ "],
		[turnedV]: ["ʌ́", "Ʌ́"],
		b: ["b́", "B́"],
		c: ["ć", "Ć"],
		d: ["d́", "D́"],
		e: ["é", "É"],
		[openE]: ["ɛ́", "Ɛ́"],
		[schwa]: ["ə́", "Ə́"],
		[turnedE]: ["ǝ́", "Ǝ́"],
		f: ["f́", "F́"],
		g: ["ǵ", "Ǵ"],
		h: ["h́", "H́"],
		i: ["í", "Í"],
		j: ["j́", "J́"],
		k: ["ḱ", "Ḱ"],
		l: ["ĺ", "Ĺ"],
		m: ["ḿ", "Ḿ"],
		n: ["ń", "Ń"],
		o: ["ó", "Ó"],
		[openO]: ["ɔ́", "Ɔ́"],
		p: ["ṕ", "Ṕ"],
		q: ["q́", "Q́"],
		r: ["ŕ", "Ŕ"],
		s: ["ś", "Ś"],
		t: ["t́", "T́"],
		u: ["ú", "Ú"],
		v: ["v́", "V́"],
		[hookV]: ["ʋ́", "Ʋ́"],
		w: ["ẃ", "Ẃ"],
		y: ["ý", "Ý"],
		z: ["ź", "Ź"],
		[ezh]: ["ʒ́", "Ʒ́"],

		[VK.Comma]: {
			name: "Acute+",
			symbol: "ắ",
			content: [
				DotAboveAndAcute,
				AcuteAndBreve,
				AcuteAndCedilla,
				AcuteAndCircumflex,
				AcuteAndDiaeresis,
				AcuteAndMacron,
				AcuteAndRingAbove,
				AcuteAndStroke,
				AcuteAndTilde,
				AcuteAndHorn
			].flatMap(Object.values)
		}
	},
};
const InvertedBreve = {
	a: ["ȃ", "Ȃ"],
	e: ["ȇ", "Ȇ"],
	i: ["ȋ", "Ȋ"],
	o: ["ȏ", "Ȏ"],
	r: ["ȓ", "Ȓ"],
	u: ["ȗ", "Ȗ"],
}
const BreveBelow = {
	h: ["ḫ", "Ḫ"],
	l: ["l̮", "L̮"],
	r: ["r̮", "R̮"]
};
const InvertedBreveBelow = {
	b: ["b̯", "B̯"],
	i: ["i̯", "I̯"],
	t: ["t̯", "T̯"],
	u: ["u̯", "U̯"],
}
const Breve: EmojiKeyboard = {
	name: "Breve",
	symbol: "ă",
	byVK: {
		a: ["ă", "Ă"],
		c: ["c̆", "C̆"],
		e: ["ĕ", "Ĕ"],
		g: ["ğ", "Ğ"],
		i: ["ĭ", "Ĭ"],
		o: ["ŏ", "Ŏ"],
		u: ["ŭ", "Ŭ"],
		y: ["y̆", "Y̆"],
		z: ["z̆", "Z̆"],

		[VK.Comma]: {
			name: "Breve+",
			symbol: "ắ",
			content: [
				AcuteAndBreve,
				BreveAndCedilla,
				BreveAndGrave,
				BreveAndTilde,
				BreveAndHook,
				BreveAndDotBelow,
			].flatMap(Object.values)
		}
	},
	content: [
		...Object.values(InvertedBreve),
		...Object.values(BreveBelow),
		...Object.values(InvertedBreveBelow),
	]
};
const Caron: EmojiKeyboard = {
	name: "Caron",
	symbol: "ǎ",
	byVK: {
		a: ["ǎ", "Ǎ"],
		[alpha]: ["ɑ̌", "Ɑ̌"],
		c: ["č", "Č"],
		d: ["ď", "Ď"],
		e: ["ě", "Ě"],
		[openE]: ["ɛ̌", "Ɛ̌"],
		[schwa]: ["ə̌", "Ə̌"],
		[turnedE]: ["ǝ̌", "Ǝ̌"],
		g: ["ǧ", "Ǧ"],
		h: ["ȟ", "Ȟ"],
		i: ["ǐ", "Ǐ"],
		j: "ǰ",
		k: ["ǩ", "Ǩ"],
		l: ["ľ", "Ľ"],
		n: ["ň", "Ň"],
		o: ["ǒ", "Ǒ"],
		[openO]: ["ɔ̌", "Ɔ̌"],
		r: ["ř", "Ř"],
		s: ["š", "Š"],
		t: ["ť", "Ť"],
		u: ["ǔ", "Ǔ"],
		x: ["x̌", "X̌"],
		z: ["ž", "Ž"],
		[ezh]: ["ǯ", "Ǯ"],

		[VK.Comma]: {
			name: "Caron+",
			symbol: "ṧ",
			content: [
				DotAboveAndCaron,
				CaronAndDiaeresis,
			].flatMap(Object.values)
		}
	}
};
const Cedilla: EmojiKeyboard = {
	name: "Cedilla",
	symbol: "a̧",
	byVK: {
		a: ["a̧", "A̧"],
		c: ["ç", "Ç"],
		d: ["ḑ", "Ḑ"],
		e: ["ȩ", "Ȩ"],
		[openE]: ["ɛ̧", "Ɛ̧"],
		[schwa]: ["ə̧", "Ə̧"],
		f: ["f̧", "F̧"],
		g: ["ģ", "Ģ"],
		h: ["ḩ", "Ḩ"],
		i: ["i̧", "I̧"],
		k: ["ķ", "Ķ"],
		l: ["ļ", "Ļ"],
		m: ["m̧", "M̧"],
		n: ["ņ", "Ņ"],
		o: ["o̧", "O̧"],
		[openO]: ["ɔ̧", "Ɔ̧"],
		r: ["ŗ", "Ŗ"],
		s: ["ş", "Ş"],
		t: ["ţ", "Ţ"],
		x: ["x̧", "X̧"],
		z: ["z̧", "Z̧"],
		[VK.Comma]: {
			name: "Cedilla+",
			symbol: "ḉ",
			content: [
				AcuteAndCedilla,
				BreveAndCedilla,
			].flatMap(Object.values)
		},
	}
};
const Circumflex: EmojiKeyboard = {
	name: "Circumflex",
	symbol: "â",
	byVK: {
		a: ["â", "Â"],
		[ae]: ["æ̂", "Æ̂"],
		[alpha]: ["ɑ̂", "Ɑ̂"],
		[turnedV]: ["ʌ̂", "Ʌ̂"],
		c: ["ĉ", "Ĉ"],
		d: ["d̂", "D̂"],
		e: ["ê", "Ê"],
		[openE]: ["ɛ̂", "Ɛ̂"],
		[schwa]: ["ə̂", "Ə̂"],
		[turnedE]: ["ǝ̂", "Ǝ̂"],
		g: ["ĝ", "Ĝ"],
		h: ["ĥ", "Ĥ"],
		i: ["î", "Î"],
		j: ["ĵ", "Ĵ"],
		k: ["k̂", "K̂"],
		l: ["l̂", "L̂"],
		m: ["m̂", "M̂"],
		n: ["n̂", "N̂"],
		o: ["ô", "Ô"],
		[openO]: ["ɔ̂", "Ɔ̂"],
		r: ["r̂", "R̂"],
		s: ["ŝ", "Ŝ"],
		u: ["û", "Û"],
		w: ["ŵ", "Ŵ"],
		x: ["x̂", "X̂"],
		y: ["ŷ", "Ŷ"],
		z: ["ẑ", "Ẑ"],

		[below]: {
			name: "Circumflex Below",
			symbol: "a̭",
			byVK: {
				a: ["a̭", "A̭"],
				d: ["ḓ", "Ḓ"],
				e: ["ḙ", "Ḙ"],
				l: ["ḽ", "Ḽ"],
				n: ["ṋ", "Ṋ"],
				o: ["o̭", "O̭"],
				t: ["ṱ", "Ṱ"],
				u: ["ṷ", "Ṷ"],
			}
		},

		[VK.Comma]: {
			name: "Circumflex+",
			symbol: "ấ",
			content: [
				AcuteAndCircumflex,
				CircumflexAndGrave,
				CircumflexAndTile,
				CircumflexAndHook,
				CircumflexAndDotBelow,
			].flatMap(Object.values)
		}
	}
};
const Hook: EmojiKeyboard = {
	name: "Hook Horn",
	symbol: "ɓ",
	byVK: {
		// Horn
		e: ["e̛", "E̛"],
		o: ["ơ", "Ơ"],
		u: ["ư", "Ư"],
		// Hook
		b: ["ɓ", "Ɓ"],
		c: ["ƈ", "Ƈ"],
		d: ["ɗ", "Ɗ"],
		a: ["ɖ", "Ɖ"],
		f: ["ƒ", "Ƒ"],
		g: ["ɠ", "Ɠ"],
		k: ["ƙ", "Ƙ"],
		m: ["ɱ", "Ɱ"],
		n: ["ɲ", "Ɲ"],
		p: ["ƥ", "Ƥ"],
		t: ["ƭ", "Ƭ"],
		r: ["ʈ", "Ʈ"],
		v: ["ʋ", "Ʋ"],
		y: ["ƴ", "Ƴ"],
		w: ["ⱳ", "Ⱳ"],
		// Descender
		h: ["ⱨ", "Ⱨ"],
		z: ["ⱬ", "Ⱬ"],

		[VK.Comma]: {
			name: "Hook+ Horn+",
			symbol: "ẳ",
			content: [
				AcuteAndHorn,
				GraveAndHorn,
				TildeAndHorn,
				HornAndHook,
				HornAndDotBelow,

				BreveAndHook,
				CircumflexAndHook,
				HornAndHook,
			].flatMap(Object.values)
		}
	},
	content: [
		// Descender
		...Object.values({
			k: ["ⱪ", "Ⱪ"],
			n: ["ꞑ", "Ꞑ"],
		}),
	]
}
const Macron: EmojiKeyboard = {
	name: "Macron",
	symbol: "ā",
	byVK: {
		a: ["ā", "Ā"],
		[ae]: ["ǣ", "Ǣ"],
		c: ["c̄", "C̄"],
		e: ["ē", "Ē"],
		[openE]: ["ɛ̄", "Ɛ̄"],
		[schwa]: ["ə̄", "Ə̄"],
		[turnedE]: ["ǝ̄", "Ǝ̄"],
		f: ["f̄", "F̄"],
		g: ["ḡ", "Ḡ"],
		h: ["h̄", "H̄"],
		i: ["ī", "Ī"],
		j: ["j̄", "J̄"],
		k: ["k̄", "K̄"],
		m: ["m̄", "M̄"],
		n: ["n̄", "N̄"],
		o: ["ō", "Ō"],
		[openO]: ["ɔ̄", "Ɔ̄"],
		p: ["p̄", "P̄"],
		r: ["r̄", "R̄"],
		s: ["s̄", "S̄"],
		u: ["ū", "Ū"],
		v: ["v̄", "V̄"],
		y: ["ȳ", "Ȳ"],
		z: ["z̄", "Z̄"],

		[VK.Comma]: {
			name: "Macron+",
			symbol: "ǡ",
			content: [
				DotAboveAndMacron,
				AcuteAndMacron,
				DiaeresisAndMacron,
				GraveAndMacron,
				MacronAndOgonek,
				MacronAndTilde,
				MacronAndDotBelow,
			].flatMap(Object.values)
		}
	}
};
const MacronBelow: EmojiKeyboard = {
	name: "Macron Below",
	symbol: "a̱",
	byVK: {
		a: ["a̱", "A̱"],
		b: ["ḇ", "Ḇ"],
		d: ["ḏ", "Ḏ"],
		e: ["e̱", "E̱"],
		g: ["g̱", "G̱"],
		h: ["ẖ", "H̱"],
		i: ["i̱", "I̱"],
		k: ["ḵ", "Ḵ"],
		l: ["ḻ", "Ḻ"],
		n: ["ṉ", "Ṉ"],
		o: ["o̱", "O̱"],
		[openO]: ["ɔ̱", "Ɔ̱"],
		r: ["ṟ", "Ṟ"],
		t: ["ṯ", "Ṯ"],
		u: ["u̱", "U̱"],
		z: ["ẕ", "Ẕ"],
	}
}
const Ogonek: EmojiKeyboard = {
	name: "Ogonek",
	symbol: "ą",
	byVK: {
		a: ["ą", "Ą"],
		e: ["ę", "Ę"],
		i: ["į", "Į"],
		o: ["ǫ", "Ǫ"],
		[openO]: ["ɔ̨", "Ɔ̨"],
		u: ["ų", "Ų"],
		y: ["y̨", "Y̨"],

		[VK.Comma]: {
			name: "Ogonek+",
			symbol: "ǭ",
			content: [
				MacronAndOgonek,
			].flatMap(Object.values)
		}
	},
	content: [
		// Ogonek Above
		...Object.values({
			a: ["a᷎", "A᷎"],
			e: ["e᷎", "E᷎"],
			i: ["i᷎", "I᷎"],
			o: ["o᷎", "O᷎"],
			u: ["u᷎", "U᷎"],
			y: ["y᷎", "Y᷎"],
		}),
	]
};
const Grave: EmojiKeyboard = {
	name: "Grave",
	symbol: "à",
	byVK: {
		a: ["à", "À"],
		[ae]: ["æ̀", "Æ̀"],
		[alpha]: ["ɑ̀", "Ɑ̀"],
		[turnedV]: ["ʌ̀", "Ʌ̀"],
		c: ["c̀", "C̀"],
		e: ["è", "È"],
		[openE]: ["ɛ̀", "Ɛ̀"],
		[schwa]: ["ə̀", "Ə̀"],
		[turnedE]: ["ǝ̀", "Ǝ̀"],
		f: ["f̀", "F̀"],
		g: ["g̀", "G̀"],
		i: ["ì", "Ì"],
		j: ["ɩ̀", "Ɩ̀"],
		k: ["k̀", "K̀"],
		m: ["m̀", "M̀"],
		n: ["ǹ", "Ǹ"],
		o: ["ò", "Ò"],
		[openO]: ["ɔ̀", "Ɔ̀"],
		p: ["p̀", "P̀"],
		s: ["s̀", "S̀"],
		t: ["t̀", "T̀"],
		u: ["ù", "Ù"],
		[hookV]: ["ʋ̀", "Ʋ̀"],
		w: ["ẁ", "Ẁ"],
		y: ["ỳ", "Ỳ"],

		[VK.Comma]: {
			name: "Grave+",
			symbol: "ằ",
			content: [
				BreveAndGrave,
				CircumflexAndGrave,
				DiaeresisAndGrave,
				GraveAndMacron,
				GraveAndHorn,
			].flatMap(Object.values)
		}
	},
	content: [
		// Double grave
		...Object.values({
			a: ["ȁ", "Ȁ"],
			e: ["ȅ", "Ȅ"],
			i: ["ȉ", "Ȉ"],
			o: ["ȍ", "Ȍ"],
			r: ["ȑ", "Ȑ"],
			u: ["ȕ", "Ȕ"],
		}),
	]
};
const DotBelow: EmojiKeyboard = {
	name: "Dot Below",
	symbol: "ạ",
	byVK: {
		a: ["ạ", "Ạ"],
		b: ["ḅ", "Ḅ"],
		c: ["c̣", "C̣"],
		d: ["ḍ", "Ḍ"],
		e: ["ẹ", "Ẹ"],
		f: ["f̣", "F̣"],
		g: ["g̣", "G̣"],
		h: ["ḥ", "Ḥ"],
		i: ["ị", "Ị"],
		j: ["j̣", "J̣"],
		k: ["ḳ", "Ḳ"],
		l: ["ḷ", "Ḷ"],
		m: ["ṃ", "Ṃ"],
		n: ["ṇ", "Ṇ"],
		o: ["ọ", "Ọ"],
		p: ["p̣", "P̣"],
		r: ["ṛ", "Ṛ"],
		s: ["ṣ", "Ṣ"],
		t: ["ṭ", "Ṭ"],
		[thorn]: ["þ̣", "Þ̣"],
		u: ["ụ", "Ụ"],
		v: ["ṿ", "Ṿ"],
		w: ["ẉ", "Ẉ"],
		x: ["x̣", "X̣"],
		y: ["ỵ", "Ỵ"],
		z: ["ẓ", "Ẓ"],

		[VK.Comma]: {
			name: "Dot Below+",
			symbol: "ặ",
			content: [
				DotAboveAndDotBelow,
				BreveAndDotBelow,
				CircumflexAndDotBelow,
				MacronAndDotBelow,
				HornAndDotBelow,
			].flatMap(Object.values)
		},
	}
}
const DotAbove: EmojiKeyboard = {
	name: "Dot Above",
	symbol: "ȧ",
	byVK: {
		a: ["ȧ", "Ȧ"],
		b: ["ḃ", "Ḃ"],
		c: ["ċ", "Ċ"],
		d: ["ḋ", "Ḋ"],
		e: ["ė", "Ė"],
		f: ["ḟ", "Ḟ"],
		g: ["ġ", "Ġ"],
		h: ["ḣ", "Ḣ"],
		i: ["ı", "İ",],
		j: ["ȷ", "J̇"],
		k: ["k̇", "K̇"],
		l: ["l̇", "L̇"],
		m: ["ṁ", "Ṁ"],
		n: ["ṅ", "Ṅ"],
		o: ["ȯ", "Ȯ"],
		p: ["ṗ", "Ṗ"],
		r: ["ṙ", "Ṙ"],
		s: ["ṡ", "Ṡ"],
		t: ["ṫ", "Ṫ"],
		u: ["u̇", "U̇"],
		w: ["ẇ", "Ẇ"],
		x: ["ẋ", "Ẋ"],
		y: ["ẏ", "Ẏ"],
		z: ["ż", "Ż"],

		[VK.Comma]: {
			name: "Dot Above+",
			symbol: "ǡ",
			content: [
				DotAboveAndAcute,
				DotAboveAndCaron,
				DotAboveAndMacron,
				DotAboveAndStroke,
				DotAboveAndDotBelow
			].flatMap(Object.values)
		},
	}
};
const Ring: EmojiKeyboard = {
	name: "Ring",
	symbol: "å",
	byVK: {
		// Ring Above
		a: ["å", "Å"],
		u: ["ů", "Ů"],
		e: ["e̊", "E̊"],
		o: ["o̊", "O̊"],
		v: ["v̊", "V̊"],
		w: ["ẘ", "W̊"],
		y: ["ẙ", "Y̊"],
		// Ring Below
		q: ["ḁ", "Ḁ"],
		l: ["l̥", "L̥"],
		m: ["m̥", "M̥"],
		n: ["n̥", "N̥"],
		r: ["r̥", "R̥"],

		[VK.Comma]: {
			name: "Ring+",
			symbol: "ǻ",
			content: [
				AcuteAndRingAbove,
			].flatMap(Object.values)
		},
	},
};
const Tilde: EmojiKeyboard = {
	name: "Tilde",
	symbol: "ã",
	byVK: {
		a: ["ã", "Ã"],
		[ae]: ["æ̃", "Æ̃"],
		[turnedV]: ["ʌ̃", "Ʌ̃"],
		b: ["b̃", "B̃"],
		c: ["c̃", "C̃"],
		e: ["ẽ", "Ẽ"],
		[openE]: ["ɛ̃", "Ɛ̃"],
		[schwa]: ["ə̃", "Ə̃"],
		g: ["g̃", "G̃"],
		i: ["ĩ", "Ĩ"],
		j: ["j̃", "J̃"],
		k: ["k̃", "K̃"],
		l: ["l̃", "L̃"],
		m: ["m̃", "M̃"],
		n: ["ñ", "Ñ"],
		o: ["õ", "Õ"],
		[openO]: ["ɔ̃", "Ɔ̃"],
		p: ["p̃", "P̃"],
		q: ["q̃", "Q̃"],
		r: ["r̃", "R̃"],
		s: ["s̃", "S̃"],
		t: ["t̃", "T̃"],
		u: ["ũ", "Ũ"],
		v: ["ṽ", "Ṽ"],
		w: ["w̃", "W̃"],
		y: ["ỹ", "Ỹ"],
		z: ["z̃", "Z̃"],

		[VK.Comma]: {
			name: "Tilde+",
			symbol: "ẵ",
			content: [
				AcuteAndTilde,
				BreveAndTilde,
				CircumflexAndTile,
				DiaeresisAndTilde,
				MacronAndTilde,
				TildeAndHorn,
			].flatMap(Object.values)
		}
	},
	content: [
		...Object.values({
			iota: ["ɩ̃", "Ɩ̃"],
		}),
		// Tilde below
		...Object.values({
			a: ["a̰", "A̰"],
			e: ["ḛ", "Ḛ"],
			i: ["ḭ", "Ḭ"],
			n: ["n̰", "N̰"],
			o: ["o̰", "O̰"],
			r: ["r̰", "R̰"],
			u: ["ṵ", "Ṵ"],
			y: ["y̰", "Y̰"],
		}),
	]
};
const Diaeresis: EmojiKeyboard = {
	name: "Diaeresis",
	symbol: "ä",
	byVK: {
		a: ["ä", "Ä"],
		[ae]: ["æ̈", "Æ̈"],
		[turnedV]: ["ʌ̈", "Ʌ̈"],
		c: ["c̈", "C̈"],
		e: ["ë", "Ë"],
		[openE]: ["ɛ̈", "Ɛ̈"],
		g: ["g̈", "G̈"],
		h: ["ḧ", "Ḧ"],
		i: ["ï", "Ï"],
		m: ["m̈", "M̈"],
		n: ["n̈", "N̈"],
		o: ["ö", "Ö"],
		[openO]: ["ɔ̈", "Ɔ̈"],
		p: ["p̈", "P̈"],
		s: ["s̈", "S̈"],
		t: ["ẗ", "T̈"],
		u: ["ü", "Ü"],
		v: ["v̈", "V̈"],
		w: ["ẅ", "Ẅ"],
		x: ["ẍ", "Ẍ"],
		y: ["ÿ", "Ÿ"],
		z: ["z̈", "Z̈"],

		[VK.Comma]: {
			name: "Diaeresis+",
			symbol: "ǟ",
			content: [
				AcuteAndDiaeresis,
				CaronAndDiaeresis,
				DiaeresisAndGrave,
				DiaeresisAndMacron,
				DiaeresisAndTilde,
			].flatMap(Object.values)
		}
	},
	content: [
		// Diaeresis below
		...Object.values({
			h: ["h̤", "H̤"],
			t: ["t̤", "T̤"],
			u: ["ṳ", "Ṳ"],
			w: ["w̤", "W̤"],
		})
	]
};
const Stroke: EmojiKeyboard = {
	name: "Stroke",
	symbol: "ⱥ",
	byVK: {
		a: ["ⱥ", "Ⱥ"],
		b: ["ƀ", "Ƀ"],
		c: ["ȼ", "Ȼ"],
		d: ["đ", "Đ"],
		g: ["ǥ", "Ǥ"],
		h: ["ħ", "Ħ"],
		i: ["ɨ", "Ɨ"],
		j: ["ɉ", "Ɉ"],
		k: ["ꝁ", "Ꝁ"],
		l: ["ł", "Ł"],
		n: ["ꞥ", "Ꞥ"],
		o: ["ø", "Ø"],
		p: ["ᵽ", "Ᵽ"],
		q: ["ꝗ", "Ꝗ"],
		r: ["ɍ", "Ɍ"],
		t: ["ŧ", "Ŧ"],
		[thorn]: ["ꝥ", "Ꝥ"],
		u: ["ʉ", "Ʉ"],
		y: ["ɏ", "Ɏ"],
		z: ["ƶ", "Ƶ"],

		[VK.Comma]: {
			name: "Stroke+",
			symbol: "ǿ",
			content: [
				DotAboveAndStroke,
				AcuteAndStroke,
			].flatMap(Object.values)
		}
	},
	content: [
		["ꞓ", "Ꞓ"],
		["ꞡ", "Ꞡ"],
		["ꝃ", "Ꝃ"],
		["ꝅ", "Ꝅ"],
		["ꞣ", "Ꞣ"],
		["ƚ", "Ƚ"],
		["ƛ"],
		["ɵ", "Ɵ"],
		["ꝋ", "Ꝋ"],
		["ꝑ", "Ꝑ"],
		["ꝙ", "Ꝙ"],
		["ꞧ", "Ꞧ"],
		["ⱦ", "Ⱦ"],
		["ꝧ", "Ꝧ"],
		["ꞹ", "Ꞹ"],

	]
};
const Comma: EmojiKeyboard = {
	name: "Comma",
	symbol: "a̓",
	byVK: {
		a: ["a̓", "A̓"],
		b: ["b̓", "B̓"],
		c: ["c̓", "C̓"],
		g: ["g̓", "G̓"],
		[gamma]: ["ɣ̓", "Ɣ̓"],
		h: ["h̓", "H̓"],
		i: ["i̓", "I̓"],
		k: ["k̓", "K̓"],
		l: ["l̓", "L̓"],
		m: ["m̓", "M̓"],
		n: ["n̓", "N̓"],
		p: ["p̓", "P̓"],
		q: ["q̓", "Q̓"],
		r: ["r̓", "R̓"],
		u: ["u̓", "U̓"],
		w: ["w̓", "W̓"],
		y: ["y̓", "Y̓"],
		z: ["z̓", "Z̓"],
		[stop]: ["ʕ̓", "ʕ̓"],
		// Comma below
		d: ["d̦", "D̦"],
		s: ["ș", "Ș"],
		t: ["ț", "Ț"],
	},
	content: [
		// Comma below
		...Object.values({
			l: ["l̦", "L̦"],
			m: ["m̦", "M̦"],
			n: ["n̦", "N̦"],
			p: ["p̦", "P̦"],
			r: ["r̦", "R̦"],
			z: ["z̦", "Z̦"],
		})
	]
}
export const ExtendedLatin: EmojiKeyboard = {
	name: "Extended Latin",
	symbol: "œ",
	byVK: {
		[ae]: ["æ", "Æ"],
		[alpha]: ["ɑ", "Ɑ"],
		[turnedV]: ["ʌ", "Ʌ"],
		[openE]: ["ɛ", "Ɛ"],
		[schwa]: ["ə", "Ə"],
		[turnedE]: ["ǝ", "Ǝ"],
		[gamma]: ["ɣ", "Ɣ"],
		[openO]: ["ɔ", "Ɔ"],
		[thorn]: ["þ", "Þ"],
		[yogh]: ["ȝ", "Ȝ"],
		[ezh]: ["ʒ", "Ʒ"],
		[stop]: {
			name: "Latin Stops",
			symbol: "Ɂ",
			content: [
				["ɂ", "Ɂ"],
				["ʔ"],
				"ʕ"
			]
		},

		a: Acute,
		b: Breve,
		c: Cedilla,
		d: DotAbove,
		e: ["ð", "Ð"],
		g: Grave,
		h: Circumflex,
		i: DoubleAcute,
		k: ["ĸ", "Kʼ"],
		l: MacronBelow,
		m: Macron,
		n: ["ŋ", "Ŋ"],
		o: Ogonek,
		p: DotBelow,
		q: Comma,
		r: Ring,
		s: ["ß", "ẞ"],
		t: Tilde,
		u: Diaeresis,
		v: Caron,
		w: ["œ", "Œ"],
		x: Stroke,
		y: Hook,
		z: "ſ",
	},
	content: [
		["ɐ", "Ɐ"],
		["ȣ", "Ȣ"],
		["ʃ", "Ʃ"],
		["ƿ", "Ƿ"],
		["ƕ", "Ƕ"],
		["ꞌ", "Ꞌ"],
	]
};

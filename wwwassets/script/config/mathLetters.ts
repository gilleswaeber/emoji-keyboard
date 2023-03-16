import {EmojiKeyboard} from "./boards";
import {VK} from "../layout/vk";

// See the symbols table on Wikipedia
// https://en.wikipedia.org/wiki/Mathematical_Alphanumeric_Symbols
// Note that some symbols are not located in the same blocks

export const LatinBold: EmojiKeyboard = {
	name: "Latin Bold",
	symbol: "𝐚",
	byVK: {
		[VK.Digit0]: "𝟎", // \mbfzero	mathematical bold digit 0
		[VK.Digit1]: "𝟏", // \mbfone	mathematical bold digit 1
		[VK.Digit2]: "𝟐", // \mbftwo	mathematical bold digit 2
		[VK.Digit3]: "𝟑", // \mbfthree	mathematical bold digit 3
		[VK.Digit4]: "𝟒", // \mbffour	mathematical bold digit 4
		[VK.Digit5]: "𝟓", // \mbffive	mathematical bold digit 5
		[VK.Digit6]: "𝟔", // \mbfsix	mathematical bold digit 6
		[VK.Digit7]: "𝟕", // \mbfseven	mathematical bold digit 7
		[VK.Digit8]: "𝟖", // \mbfeight	mathematical bold digit 8
		[VK.Digit9]: "𝟗", // \mbfnine	mathematical bold digit 9
		[VK.A]: ["𝐚", "𝐀"],
		[VK.B]: ["𝐛", "𝐁"],
		[VK.C]: ["𝐜", "𝐂"],
		[VK.D]: ["𝐝", "𝐃"],
		[VK.E]: ["𝐞", "𝐄"],
		[VK.F]: ["𝐟", "𝐅"],
		[VK.G]: ["𝐠", "𝐆"],
		[VK.H]: ["𝐡", "𝐇"],
		[VK.I]: ["𝐢", "𝐈"],
		[VK.J]: ["𝐣", "𝐉"],
		[VK.K]: ["𝐤", "𝐊"],
		[VK.L]: ["𝐥", "𝐋"],
		[VK.M]: ["𝐦", "𝐌"],
		[VK.N]: ["𝐧", "𝐍"],
		[VK.O]: ["𝐨", "𝐎"],
		[VK.P]: ["𝐩", "𝐏"],
		[VK.Q]: ["𝐪", "𝐐"],
		[VK.R]: ["𝐫", "𝐑"],
		[VK.S]: ["𝐬", "𝐒"],
		[VK.T]: ["𝐭", "𝐓"],
		[VK.U]: ["𝐮", "𝐔"],
		[VK.V]: ["𝐯", "𝐕"],
		[VK.W]: ["𝐰", "𝐖"],
		[VK.X]: ["𝐱", "𝐗"],
		[VK.Y]: ["𝐲", "𝐘"],
		[VK.Z]: ["𝐳", "𝐙 "],
	},
};
export const LatinItalic: EmojiKeyboard = {
	name: "Latin Italic",
	symbol: "𝑎",
	byVK: {
		[VK.A]: ["𝑎", "𝐴"],
		[VK.B]: ["𝑏", "𝐵"],
		[VK.C]: ["𝑐", "𝐶"],
		[VK.D]: ["𝑑", "𝐷"],
		[VK.E]: ["𝑒", "𝐸"],
		[VK.F]: ["𝑓", "𝐹"],
		[VK.G]: ["𝑔", "𝐺"],
		[VK.H]: ["ℎ", "𝐻"],
		[VK.I]: ["𝑖", "𝐼"],
		[VK.J]: ["𝑗", "𝐽"],
		[VK.K]: ["𝑘", "𝐾"],
		[VK.L]: ["𝑙", "𝐿"],
		[VK.M]: ["𝑚", "𝑀"],
		[VK.N]: ["𝑛", "𝑁"],
		[VK.O]: ["𝑜", "𝑂"],
		[VK.P]: ["𝑝", "𝑃"],
		[VK.Q]: ["𝑞", "𝑄"],
		[VK.R]: ["𝑟", "𝑅"],
		[VK.S]: ["𝑠", "𝑆"],
		[VK.T]: ["𝑡", "𝑇"],
		[VK.U]: ["𝑢", "𝑈"],
		[VK.V]: ["𝑣", "𝑉"],
		[VK.W]: ["𝑤", "𝑊"],
		[VK.X]: ["𝑥", "𝑋"],
		[VK.Y]: ["𝑦", "𝑌"],
		[VK.Z]: ["𝑧", "𝑍"],
	},
	content: [
		"𝚤",
		"𝚥",
	]
};

export const LatinBoldItalic: EmojiKeyboard = {
	name: "Latin Bold Italic",
	symbol: "𝒂",
	byVK: {
		[VK.A]: ["𝒂", "𝑨"],
		[VK.B]: ["𝒃", "𝑩"],
		[VK.C]: ["𝒄", "𝑪"],
		[VK.D]: ["𝒅", "𝑫"],
		[VK.E]: ["𝒆", "𝑬"],
		[VK.F]: ["𝒇", "𝑭"],
		[VK.G]: ["𝒈", "𝑮"],
		[VK.H]: ["𝒉", "𝑯"],
		[VK.I]: ["𝒊", "𝑰"],
		[VK.J]: ["𝒋", "𝑱"],
		[VK.K]: ["𝒌", "𝑲"],
		[VK.L]: ["𝒍", "𝑳"],
		[VK.M]: ["𝒎", "𝑴"],
		[VK.N]: ["𝒏", "𝑵"],
		[VK.O]: ["𝒐", "𝑶"],
		[VK.P]: ["𝒑", "𝑷"],
		[VK.Q]: ["𝒒", "𝑸"],
		[VK.R]: ["𝒓", "𝑹"],
		[VK.S]: ["𝒔", "𝑺"],
		[VK.T]: ["𝒕", "𝑻"],
		[VK.U]: ["𝒖", "𝑼"],
		[VK.V]: ["𝒗", "𝑽"],
		[VK.W]: ["𝒘", "𝑾"],
		[VK.X]: ["𝒙", "𝑿"],
		[VK.Y]: ["𝒚", "𝒀"],
		[VK.Z]: ["𝒛", "𝒁"],
	}
};

export const LatinSans: EmojiKeyboard = {
	name: "Latin Sans-Serif",
	symbol: "𝖺",
	byVK: {
		[VK.Digit0]: "𝟢", // \msanszero	mathematical sans-serif digit 0
		[VK.Digit1]: "𝟣", // \msansone	mathematical sans-serif digit 1
		[VK.Digit2]: "𝟤", // \msanstwo	mathematical sans-serif digit 2
		[VK.Digit3]: "𝟥", // \msansthree	mathematical sans-serif digit 3
		[VK.Digit4]: "𝟦", // \msansfour	mathematical sans-serif digit 4
		[VK.Digit5]: "𝟧", // \msansfive	mathematical sans-serif digit 5
		[VK.Digit6]: "𝟨", // \msanssix	mathematical sans-serif digit 6
		[VK.Digit7]: "𝟩", // \msansseven	mathematical sans-serif digit 7
		[VK.Digit8]: "𝟪", // \msanseight	mathematical sans-serif digit 8
		[VK.Digit9]: "𝟫", // \msansnine	mathematical sans-serif digit 9
		[VK.A]: ["𝖺", "𝖠"],
		[VK.B]: ["𝖻", "𝖡"],
		[VK.C]: ["𝖼", "𝖢"],
		[VK.D]: ["𝖽", "𝖣"],
		[VK.E]: ["𝖾", "𝖤"],
		[VK.F]: ["𝖿", "𝖥"],
		[VK.G]: ["𝗀", "𝖦"],
		[VK.H]: ["𝗁", "𝖧"],
		[VK.I]: ["𝗂", "𝖨"],
		[VK.J]: ["𝗃", "𝖩"],
		[VK.K]: ["𝗄", "𝖪"],
		[VK.L]: ["𝗅", "𝖫"],
		[VK.M]: ["𝗆", "𝖬"],
		[VK.N]: ["𝗇", "𝖭"],
		[VK.O]: ["𝗈", "𝖮"],
		[VK.P]: ["𝗉", "𝖯"],
		[VK.Q]: ["𝗊", "𝖰"],
		[VK.R]: ["𝗋", "𝖱"],
		[VK.S]: ["𝗌", "𝖲"],
		[VK.T]: ["𝗍", "𝖳"],
		[VK.U]: ["𝗎", "𝖴"],
		[VK.V]: ["𝗏", "𝖵"],
		[VK.W]: ["𝗐", "𝖶"],
		[VK.X]: ["𝗑", "𝖷"],
		[VK.Y]: ["𝗒", "𝖸"],
		[VK.Z]: ["𝗓", "𝖹"],
	},
};

export const LatinSansBold: EmojiKeyboard = {
	name: "Latin Sans-Serif Bold",
	symbol: "𝗮",
	byVK: {
		[VK.Digit0]: "𝟬", // \mbfsanszero	mathematical sans-serif bold digit 0
		[VK.Digit1]: "𝟭", // \mbfsansone	mathematical sans-serif bold digit 1
		[VK.Digit2]: "𝟮", // \mbfsanstwo	mathematical sans-serif bold digit 2
		[VK.Digit3]: "𝟯", // \mbfsansthree	mathematical sans-serif bold digit 3
		[VK.Digit4]: "𝟰", // \mbfsansfour	mathematical sans-serif bold digit 4
		[VK.Digit5]: "𝟱", // \mbfsansfive	mathematical sans-serif bold digit 5
		[VK.Digit6]: "𝟲", // \mbfsanssix	mathematical sans-serif bold digit 6
		[VK.Digit7]: "𝟳", // \mbfsansseven	mathematical sans-serif bold digit 7
		[VK.Digit8]: "𝟴", // \mbfsanseight	mathematical sans-serif bold digit 8
		[VK.Digit9]: "𝟵", // \mbfsansnine	mathematical sans-serif bold digit 9
		[VK.A]: ["𝗮", "𝗔"],
		[VK.B]: ["𝗯", "𝗕"],
		[VK.C]: ["𝗰", "𝗖"],
		[VK.D]: ["𝗱", "𝗗"],
		[VK.E]: ["𝗲", "𝗘"],
		[VK.F]: ["𝗳", "𝗙"],
		[VK.G]: ["𝗴", "𝗚"],
		[VK.H]: ["𝗵", "𝗛"],
		[VK.I]: ["𝗶", "𝗜"],
		[VK.J]: ["𝗷", "𝗝"],
		[VK.K]: ["𝗸", "𝗞"],
		[VK.L]: ["𝗹", "𝗟"],
		[VK.M]: ["𝗺", "𝗠"],
		[VK.N]: ["𝗻", "𝗡"],
		[VK.O]: ["𝗼", "𝗢"],
		[VK.P]: ["𝗽", "𝗣"],
		[VK.Q]: ["𝗾", "𝗤"],
		[VK.R]: ["𝗿", "𝗥"],
		[VK.S]: ["𝘀", "𝗦"],
		[VK.T]: ["𝘁", "𝗧"],
		[VK.U]: ["𝘂", "𝗨"],
		[VK.V]: ["𝘃", "𝗩"],
		[VK.W]: ["𝘄", "𝗪"],
		[VK.X]: ["𝘅", "𝗫"],
		[VK.Y]: ["𝘆", "𝗬"],
		[VK.Z]: ["𝘇", "𝗭"],
	},
};

export const LatinSansItalic: EmojiKeyboard = {
	name: "Latin Sans Italic",
	symbol: "𝘢",
	byVK: {
		[VK.A]: ["𝘢", "𝘈"],
		[VK.B]: ["𝘣", "𝘉"],
		[VK.C]: ["𝘤", "𝘊"],
		[VK.D]: ["𝘥", "𝘋"],
		[VK.E]: ["𝘦", "𝘌"],
		[VK.F]: ["𝘧", "𝘍"],
		[VK.G]: ["𝘨", "𝘎"],
		[VK.H]: ["𝘩", "𝘏"],
		[VK.I]: ["𝘪", "𝘐"],
		[VK.J]: ["𝘫", "𝘑"],
		[VK.K]: ["𝘬", "𝘒"],
		[VK.L]: ["𝘭", "𝘓"],
		[VK.M]: ["𝘮", "𝘔"],
		[VK.N]: ["𝘯", "𝘕"],
		[VK.O]: ["𝘰", "𝘖"],
		[VK.P]: ["𝘱", "𝘗"],
		[VK.Q]: ["𝘲", "𝘘"],
		[VK.R]: ["𝘳", "𝘙"],
		[VK.S]: ["𝘴", "𝘚"],
		[VK.T]: ["𝘵", "𝘛"],
		[VK.U]: ["𝘶", "𝘜"],
		[VK.V]: ["𝘷", "𝘝"],
		[VK.W]: ["𝘸", "𝘞"],
		[VK.X]: ["𝘹", "𝘟"],
		[VK.Y]: ["𝘺", "𝘠"],
		[VK.Z]: ["𝘻", "𝘡"],
	}
}

export const LatinSansBoldItalic: EmojiKeyboard = {
	name: "Latin Sans Bold Italic",
	symbol: "𝙖",
	byVK: {
		[VK.A]: ["𝙖", "𝘼"],
		[VK.B]: ["𝙗", "𝘽"],
		[VK.C]: ["𝙘", "𝘾"],
		[VK.D]: ["𝙙", "𝘿"],
		[VK.E]: ["𝙚", "𝙀"],
		[VK.F]: ["𝙛", "𝙁"],
		[VK.G]: ["𝙜", "𝙂"],
		[VK.H]: ["𝙝", "𝙃"],
		[VK.I]: ["𝙞", "𝙄"],
		[VK.J]: ["𝙟", "𝙅"],
		[VK.K]: ["𝙠", "𝙆"],
		[VK.L]: ["𝙡", "𝙇"],
		[VK.M]: ["𝙢", "𝙈"],
		[VK.N]: ["𝙣", "𝙉"],
		[VK.O]: ["𝙤", "𝙊"],
		[VK.P]: ["𝙥", "𝙋"],
		[VK.Q]: ["𝙦", "𝙌"],
		[VK.R]: ["𝙧", "𝙍"],
		[VK.S]: ["𝙨", "𝙎"],
		[VK.T]: ["𝙩", "𝙏"],
		[VK.U]: ["𝙪", "𝙐"],
		[VK.V]: ["𝙫", "𝙑"],
		[VK.W]: ["𝙬", "𝙒"],
		[VK.X]: ["𝙭", "𝙓"],
		[VK.Y]: ["𝙮", "𝙔"],
		[VK.Z]: ["𝙯", "𝙕"],
	}
}

export const LatinScript: EmojiKeyboard = {
	name: "Latin Script",
	symbol: "𝒶",
	byVK: {
		[VK.A]: ["𝒶", "𝒜"],
		[VK.B]: ["𝒷", "ℬ"],
		[VK.C]: ["𝒸", "𝒞"],
		[VK.D]: ["𝒹", "𝒟"],
		[VK.E]: ["ℯ", "ℰ"],
		[VK.F]: ["𝒻", "ℱ"],
		[VK.G]: ["ℊ", "𝒢"],
		[VK.H]: ["𝒽", "ℋ"],
		[VK.I]: ["𝒾", "ℐ"],
		[VK.J]: ["𝒿", "𝒥"],
		[VK.K]: ["𝓀", "𝒦"],
		[VK.L]: ["𝓁", "ℒ"],
		[VK.M]: ["𝓂", "ℳ"],
		[VK.N]: ["𝓃", "𝒩"],
		[VK.O]: ["ℴ", "𝒪"],
		[VK.P]: ["𝓅", "𝒫"],
		[VK.Q]: ["𝓆", "𝒬"],
		[VK.R]: ["𝓇", "ℛ"],
		[VK.S]: ["𝓈", "𝒮"],
		[VK.T]: ["𝓉", "𝒯"],
		[VK.U]: ["𝓊", "𝒰"],
		[VK.V]: ["𝓋", "𝒱"],
		[VK.W]: ["𝓌", "𝒲"],
		[VK.X]: ["𝓍", "𝒳"],
		[VK.Y]: ["𝓎", "𝒴"],
		[VK.Z]: ["𝓏", "𝒵"],
	}
};

export const LatinScriptBold: EmojiKeyboard = {
	name: "Latin Script Bold",
	symbol: "𝓪",
	byVK: {
		[VK.A]: ["𝓪", "𝓐"],
		[VK.B]: ["𝓫", "𝓑"],
		[VK.C]: ["𝓬", "𝓒"],
		[VK.D]: ["𝓭", "𝓓"],
		[VK.E]: ["𝓮", "𝓔"],
		[VK.F]: ["𝓯", "𝓕"],
		[VK.G]: ["𝓰", "𝓖"],
		[VK.H]: ["𝓱", "𝓗"],
		[VK.I]: ["𝓲", "𝓘"],
		[VK.J]: ["𝓳", "𝓙"],
		[VK.K]: ["𝓴", "𝓚"],
		[VK.L]: ["𝓵", "𝓛"],
		[VK.M]: ["𝓶", "𝓜"],
		[VK.N]: ["𝓷", "𝓝"],
		[VK.O]: ["𝓸", "𝓞"],
		[VK.P]: ["𝓹", "𝓟"],
		[VK.Q]: ["𝓺", "𝓠"],
		[VK.R]: ["𝓻", "𝓡"],
		[VK.S]: ["𝓼", "𝓢"],
		[VK.T]: ["𝓽", "𝓣"],
		[VK.U]: ["𝓾", "𝓤"],
		[VK.V]: ["𝓿", "𝓥"],
		[VK.W]: ["𝔀", "𝓦"],
		[VK.X]: ["𝔁", "𝓧"],
		[VK.Y]: ["𝔂", "𝓨"],
		[VK.Z]: ["𝔃", "𝓩"],
	}
};

export const LatinFraktur: EmojiKeyboard = {
	name: "Latin Fraktur",
	symbol: "𝔞",
	byVK: {
		[VK.A]: ["𝔞", "𝔄"],
		[VK.B]: ["𝔟", "𝔅"],
		[VK.C]: ["𝔠", "ℭ"],
		[VK.D]: ["𝔡", "𝔇"],
		[VK.E]: ["𝔢", "𝔈"],
		[VK.F]: ["𝔣", "𝔉"],
		[VK.G]: ["𝔤", "𝔊"],
		[VK.H]: ["𝔥", "ℌ"],
		[VK.I]: ["𝔦", "ℑ"],
		[VK.J]: ["𝔧", "𝔍"],
		[VK.K]: ["𝔨", "𝔎"],
		[VK.L]: ["𝔩", "𝔏"],
		[VK.M]: ["𝔪", "𝔐"],
		[VK.N]: ["𝔫", "𝔑"],
		[VK.O]: ["𝔬", "𝔒"],
		[VK.P]: ["𝔭", "𝔓"],
		[VK.Q]: ["𝔮", "𝔔"],
		[VK.R]: ["𝔯", "ℜ"],
		[VK.S]: ["𝔰", "𝔖"],
		[VK.T]: ["𝔱", "𝔗"],
		[VK.U]: ["𝔲", "𝔘"],
		[VK.V]: ["𝔳", "𝔙"],
		[VK.W]: ["𝔴", "𝔚"],
		[VK.X]: ["𝔵", "𝔛"],
		[VK.Y]: ["𝔶", "𝔜"],
		[VK.Z]: ["𝔷", "ℨ"],
	}
};

export const LatinFrakturBold: EmojiKeyboard = {
	name: "Latin Fraktur Bold",
	symbol: "𝖆",
	byVK: {
		[VK.A]: ["𝖆", "𝕬"],
		[VK.B]: ["𝖇", "𝕭"],
		[VK.C]: ["𝖈", "𝕮"],
		[VK.D]: ["𝖉", "𝕯"],
		[VK.E]: ["𝖊", "𝕰"],
		[VK.F]: ["𝖋", "𝕱"],
		[VK.G]: ["𝖌", "𝕲"],
		[VK.H]: ["𝖍", "𝕳"],
		[VK.I]: ["𝖎", "𝕴"],
		[VK.J]: ["𝖏", "𝕵"],
		[VK.K]: ["𝖐", "𝕶"],
		[VK.L]: ["𝖑", "𝕷"],
		[VK.M]: ["𝖒", "𝕸"],
		[VK.N]: ["𝖓", "𝕹"],
		[VK.O]: ["𝖔", "𝕺"],
		[VK.P]: ["𝖕", "𝕻"],
		[VK.Q]: ["𝖖", "𝕼"],
		[VK.R]: ["𝖗", "𝕽"],
		[VK.S]: ["𝖘", "𝕾"],
		[VK.T]: ["𝖙", "𝕿"],
		[VK.U]: ["𝖚", "𝖀"],
		[VK.V]: ["𝖛", "𝖁"],
		[VK.W]: ["𝖜", "𝖂"],
		[VK.X]: ["𝖝", "𝖃"],
		[VK.Y]: ["𝖞", "𝖄"],
		[VK.Z]: ["𝖟", "𝖅"],
	}
};

export const LatinMono: EmojiKeyboard = {
	name: "Latin Mono",
	symbol: "𝚊",
	byVK: {
		[VK.Digit0]: "𝟶", // \mttzero	mathematical monospace digit 0
		[VK.Digit1]: "𝟷", // \mttone	mathematical monospace digit 1
		[VK.Digit2]: "𝟸", // \mtttwo	mathematical monospace digit 2
		[VK.Digit3]: "𝟹", // \mttthree	mathematical monospace digit 3
		[VK.Digit4]: "𝟺", // \mttfour	mathematical monospace digit 4
		[VK.Digit5]: "𝟻", // \mttfive	mathematical monospace digit 5
		[VK.Digit6]: "𝟼", // \mttsix	mathematical monospace digit 6
		[VK.Digit7]: "𝟽", // \mttseven	mathematical monospace digit 7
		[VK.Digit8]: "𝟾", // \mtteight	mathematical monospace digit 8
		[VK.Digit9]: "𝟿", // \mttnine	mathematical monospace digit 9
		[VK.A]: ["𝚊", "𝙰"],
		[VK.B]: ["𝚋", "𝙱"],
		[VK.C]: ["𝚌", "𝙲"],
		[VK.D]: ["𝚍", "𝙳"],
		[VK.E]: ["𝚎", "𝙴"],
		[VK.F]: ["𝚏", "𝙵"],
		[VK.G]: ["𝚐", "𝙶"],
		[VK.H]: ["𝚑", "𝙷"],
		[VK.I]: ["𝚒", "𝙸"],
		[VK.J]: ["𝚓", "𝙹"],
		[VK.K]: ["𝚔", "𝙺"],
		[VK.L]: ["𝚕", "𝙻"],
		[VK.M]: ["𝚖", "𝙼"],
		[VK.N]: ["𝚗", "𝙽"],
		[VK.O]: ["𝚘", "𝙾"],
		[VK.P]: ["𝚙", "𝙿"],
		[VK.Q]: ["𝚚", "𝚀"],
		[VK.R]: ["𝚛", "𝚁"],
		[VK.S]: ["𝚜", "𝚂"],
		[VK.T]: ["𝚝", "𝚃"],
		[VK.U]: ["𝚞", "𝚄"],
		[VK.V]: ["𝚟", "𝚅"],
		[VK.W]: ["𝚠", "𝚆"],
		[VK.X]: ["𝚡", "𝚇"],
		[VK.Y]: ["𝚢", "𝚈"],
		[VK.Z]: ["𝚣", "𝚉"],
	}
};

export const LatinDoubleStruck: EmojiKeyboard = {
	name: "Double-Struck",
	symbol: "𝕒",
	byVK: {
		[VK.Digit0]: "𝟘", // \Bbbzero	mathematical double-struck digit 0
		[VK.Digit1]: "𝟙", // \Bbbone	mathematical double-struck digit 1
		[VK.Digit2]: "𝟚", // \Bbbtwo	mathematical double-struck digit 2
		[VK.Digit3]: "𝟛", // \Bbbthree	mathematical double-struck digit 3
		[VK.Digit4]: "𝟜", // \Bbbfour	mathematical double-struck digit 4
		[VK.Digit5]: "𝟝", // \Bbbfive	mathematical double-struck digit 5
		[VK.Digit6]: "𝟞", // \Bbbsix	mathematical double-struck digit 6
		[VK.Digit7]: "𝟟", // \Bbbseven	mathematical double-struck digit 7
		[VK.Digit8]: "𝟠", // \Bbbeight	mathematical double-struck digit 8
		[VK.Digit9]: "𝟡", // \Bbbnine	mathematical double-struck digit 9
		[VK.A]: ["𝕒", "𝔸"],
		[VK.B]: ["𝕓", "𝔹"],
		[VK.C]: ["𝕔", "ℂ"],
		[VK.D]: ["𝕕", "𝔻"],
		[VK.E]: ["𝕖", "𝔼"],
		[VK.F]: ["𝕗", "𝔽"],
		[VK.G]: ["𝕘", "𝔾"],
		[VK.H]: ["𝕙", "ℍ"],
		[VK.I]: ["𝕚", "𝕀"],
		[VK.J]: ["𝕛", "𝕁"],
		[VK.K]: ["𝕜", "𝕂"],
		[VK.L]: ["𝕝", "𝕃"],
		[VK.M]: ["𝕞", "𝕄"],
		[VK.N]: ["𝕟", "ℕ"],
		[VK.O]: ["𝕠", "𝕆"],
		[VK.P]: ["𝕡", "ℙ"],
		[VK.Q]: ["𝕢", "ℚ"],
		[VK.R]: ["𝕣", "ℝ"],
		[VK.S]: ["𝕤", "𝕊"],
		[VK.T]: ["𝕥", "𝕋"],
		[VK.U]: ["𝕦", "𝕌"],
		[VK.V]: ["𝕧", "𝕍"],
		[VK.W]: ["𝕨", "𝕎"],
		[VK.X]: ["𝕩", "𝕏"],
		[VK.Y]: ["𝕪", "𝕐"],
		[VK.Z]: ["𝕫", "ℤ "],
	},
};

export const GreekBold: EmojiKeyboard = {
	name: "Greek Bold",
	symbol: "𝛂",
	byVK: {
		[VK.A]: ["𝛂", "𝚨"],
		[VK.B]: ["𝛃", "𝚩"],
		[VK.C]: ["𝛙", "𝚿"],
		[VK.D]: ["𝛅", "𝚫"],
		[VK.E]: ["𝛆", "𝚬"],
		[VK.F]: ["𝛗", "𝚽"],
		[VK.G]: ["𝛄", "𝚪"],
		[VK.H]: ["𝛈", "𝚮"],
		[VK.I]: ["𝛊", "𝚰"],
		[VK.J]: ["𝛏", "𝚵"],
		[VK.K]: ["𝛋", "𝚱"],
		[VK.L]: ["𝛌", "𝚲"],
		[VK.M]: ["𝛍", "𝚳"],
		[VK.N]: ["𝛎", "𝚴"],
		[VK.O]: ["𝛐", "𝚶"],
		[VK.P]: ["𝛑", "𝚷"],
		[VK.R]: ["𝛒", "𝚸"],
		[VK.S]: ["𝛔", "𝚺"],
		[VK.T]: ["𝛕", "𝚻"],
		[VK.U]: ["𝛉", "𝚯"],
		[VK.V]: ["𝛚", "𝛀"],
		[VK.W]: "𝛓",
		[VK.X]: ["𝛘", "𝚾"],
		[VK.Y]: ["𝛖", "𝚼"],
		[VK.Z]: ["𝛇", "𝚭"],
	},
	content: ["𝛛", "𝛜", "𝛝", "𝛞", "𝛟", "𝛠", "𝛡", "𝚹", "𝛁"]
};
export const GreekItalic: EmojiKeyboard = {
	name: "Greek Italic",
	symbol: "𝛼",
	byVK: {
		[VK.A]: ["𝛼", "𝛢"],
		[VK.B]: ["𝛽", "𝛣"],
		[VK.C]: ["𝜓", "𝛹"],
		[VK.D]: ["𝛿", "𝛥"],
		[VK.E]: ["𝜀", "𝛦"],
		[VK.F]: ["𝜑", "𝛷"],
		[VK.G]: ["𝛾", "𝛤"],
		[VK.H]: ["𝜂", "𝛨"],
		[VK.I]: ["𝜄", "𝛪"],
		[VK.J]: ["𝜉", "𝛯"],
		[VK.K]: ["𝜅", "𝛫"],
		[VK.L]: ["𝜆", "𝛬"],
		[VK.M]: ["𝜇", "𝛭"],
		[VK.N]: ["𝜈", "𝛮"],
		[VK.O]: ["𝜊", "𝛰"],
		[VK.P]: ["𝜋", "𝛱"],
		[VK.R]: ["𝜌", "𝛲"],
		[VK.S]: ["𝜎", "𝛴"],
		[VK.T]: ["𝜏", "𝛵"],
		[VK.U]: ["𝜃", "𝛩"],
		[VK.V]: ["𝜔", "𝛺"],
		[VK.W]: "𝜍",
		[VK.X]: ["𝜒", "𝛸"],
		[VK.Y]: ["𝜐", "𝛶"],
		[VK.Z]: ["𝜁", "𝛧"],
	},
	content: ["𝜕", "𝜖", "𝜗", "𝜘", "𝜙", "𝜚", "𝜛", "𝛳", "𝛻"]
};
export const GreekBoldItalic: EmojiKeyboard = {
	name: "Greek Bold Italic",
	symbol: "𝜶",
	byVK: {
		[VK.A]: ["𝜶", "𝜜"],
		[VK.B]: ["𝜷", "𝜝"],
		[VK.C]: ["𝝍", "𝜳"],
		[VK.D]: ["𝜹", "𝜟"],
		[VK.E]: ["𝜺", "𝜠"],
		[VK.F]: ["𝝋", "𝜱"],
		[VK.G]: ["𝜸", "𝜞"],
		[VK.H]: ["𝜼", "𝜢"],
		[VK.I]: ["𝜾", "𝜤"],
		[VK.J]: ["𝝃", "𝜩"],
		[VK.K]: ["𝜿", "𝜥"],
		[VK.L]: ["𝝀", "𝜦"],
		[VK.M]: ["𝝁", "𝜧"],
		[VK.N]: ["𝝂", "𝜨"],
		[VK.O]: ["𝝄", "𝜪"],
		[VK.P]: ["𝝅", "𝜫"],
		[VK.R]: ["𝝆", "𝜬"],
		[VK.S]: ["𝝈", "𝜮"],
		[VK.T]: ["𝝉", "𝜯"],
		[VK.U]: ["𝜽", "𝜣"],
		[VK.V]: ["𝝎", "𝜴"],
		[VK.W]: "𝝇",
		[VK.X]: ["𝝌", "𝜲"],
		[VK.Y]: ["𝝊", "𝜰"],
		[VK.Z]: ["𝜻", "𝜡"],
	},
	content: ["𝝏", "𝝐", "𝝑", "𝝒", "𝝓", "𝝔", "𝝕", "𝜭", "𝜵"]
};
export const GreekSansBold: EmojiKeyboard = {
	name: "Greek Sans Bold",
	symbol: "𝝰",
	byVK: {
		[VK.A]: ["𝝰", "𝝖"],
		[VK.B]: ["𝝱", "𝝗"],
		[VK.C]: ["𝞇", "𝝭"],
		[VK.D]: ["𝝳", "𝝙"],
		[VK.E]: ["𝝴", "𝝚"],
		[VK.F]: ["𝞅", "𝝫"],
		[VK.G]: ["𝝲", "𝝘"],
		[VK.H]: ["𝝶", "𝝜"],
		[VK.I]: ["𝝸", "𝝞"],
		[VK.J]: ["𝝽", "𝝣"],
		[VK.K]: ["𝝹", "𝝟"],
		[VK.L]: ["𝝺", "𝝠"],
		[VK.M]: ["𝝻", "𝝡"],
		[VK.N]: ["𝝼", "𝝢"],
		[VK.O]: ["𝝾", "𝝤"],
		[VK.P]: ["𝝿", "𝝥"],
		[VK.R]: ["𝞀", "𝝦"],
		[VK.S]: ["𝞂", "𝝨"],
		[VK.T]: ["𝞃", "𝝩"],
		[VK.U]: ["𝝷", "𝝝"],
		[VK.V]: ["𝞈", "𝝮"],
		[VK.W]: "𝞁",
		[VK.X]: ["𝞆", "𝝬"],
		[VK.Y]: ["𝞄", "𝝪"],
		[VK.Z]: ["𝝵", "𝝛"],
	},
	content: ["𝞉", "𝞊", "𝞋", "𝞌", "𝞍", "𝞎", "𝞏", "𝝧", "𝝯"]
};
export const GreekSansBoldItalic: EmojiKeyboard = {
	name: "Greek Sans Bold Italic",
	symbol: "𝞪",
	byVK: {
		[VK.A]: ["𝞪", "𝞐"],
		[VK.B]: ["𝞫", "𝞑"],
		[VK.C]: ["𝟁", "𝞧"],
		[VK.D]: ["𝞭", "𝞓"],
		[VK.E]: ["𝞮", "𝞔"],
		[VK.F]: ["𝞿", "𝞥"],
		[VK.G]: ["𝞬", "𝞒"],
		[VK.H]: ["𝞰", "𝞖"],
		[VK.I]: ["𝞲", "𝞘"],
		[VK.J]: ["𝞷", "𝞝"],
		[VK.K]: ["𝞳", "𝞙"],
		[VK.L]: ["𝞴", "𝞚"],
		[VK.M]: ["𝞵", "𝞛"],
		[VK.N]: ["𝞶", "𝞜"],
		[VK.O]: ["𝞸", "𝞞"],
		[VK.P]: ["𝞹", "𝞟"],
		[VK.R]: ["𝞺", "𝞠"],
		[VK.S]: ["𝞼", "𝞢"],
		[VK.T]: ["𝞽", "𝞣"],
		[VK.U]: ["𝞱", "𝞗"],
		[VK.V]: ["𝟂", "𝞨"],
		[VK.W]: "𝞻",
		[VK.X]: ["𝟀", "𝞦"],
		[VK.Y]: ["𝞾", "𝞤"],
		[VK.Z]: ["𝞯", "𝞕"],
	},
	content: ["𝟃", "𝟄", "𝟅", "𝟆", "𝟇", "𝟈", "𝟉", "𝞡", "𝞩"]
};

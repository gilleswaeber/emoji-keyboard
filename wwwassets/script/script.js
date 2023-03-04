"use strict";
define("builder/config", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("builder/unicode", ["require", "exports", "peggy"], function (require, exports, peggy) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseEmojiTest = exports.parseNamesList = exports.parseUnicodeData = exports.BidiClass = exports.CanonicalCombiningClass = exports.GeneralCategory = exports.parseEmojiVersions = void 0;
    const EmojiDataRegex = new RegExp(`^(?<char>[0-9A-F]+(?:..[0-9A-F]+)?)\\s*;\\s*(?<attr>[A-Za-z_]+)\\s*#\\s*E?(?<version>[0-9.]+)\\s*\\[`);
    async function parseEmojiVersions(emojiDataPath) {
        const emojiVersion = {};
        const text = await fetch(emojiDataPath).then(r => r.text());
        for (const line of text.split('\n')) {
            if (!line.length || line.startsWith('#'))
                continue;
            const m = line.match(EmojiDataRegex)?.groups;
            if (m) {
                const version = parseFloat(m['version']);
                if (m['char'].includes('..')) {
                    const [from, to] = m['char'].split('..').map(s => parseInt(s, 16));
                    for (let char = from; char <= to; char++) {
                        emojiVersion[char] = version;
                    }
                }
                else {
                    const char = parseInt(m['char'], 16);
                    emojiVersion[char] = version;
                }
            }
        }
        return emojiVersion;
    }
    exports.parseEmojiVersions = parseEmojiVersions;
    var GeneralCategory;
    (function (GeneralCategory) {
        GeneralCategory["Uppercase_Letter"] = "Lu";
        GeneralCategory["Lowercase_Letter"] = "Ll";
        GeneralCategory["Titlecase_Letter"] = "Lt";
        GeneralCategory["Cased_Letter"] = "LC";
        GeneralCategory["Modifier_Letter"] = "Lm";
        GeneralCategory["Other_Letter"] = "Lo";
        GeneralCategory["Letter"] = "L";
        GeneralCategory["Nonspacing_Mark"] = "Mn";
        GeneralCategory["Spacing_Mark"] = "Mc";
        GeneralCategory["Enclosing_Mark"] = "Me";
        GeneralCategory["Mark"] = "M";
        GeneralCategory["Decimal_Number"] = "Nd";
        GeneralCategory["Letter_Number"] = "Nl";
        GeneralCategory["Other_Number"] = "No";
        GeneralCategory["Number"] = "N";
        GeneralCategory["Connector_Punctuation"] = "Pc";
        GeneralCategory["Dash_Punctuation"] = "Pd";
        GeneralCategory["Open_Punctuation"] = "Ps";
        GeneralCategory["Close_Punctuation"] = "Pe";
        GeneralCategory["Initial_Punctuation"] = "Pi";
        GeneralCategory["Final_Punctuation"] = "Pf";
        GeneralCategory["Other_Punctuation"] = "Po";
        GeneralCategory["Punctuation"] = "P";
        GeneralCategory["Math_Symbol"] = "Sm";
        GeneralCategory["Currency_Symbol"] = "Sc";
        GeneralCategory["Modifier_Symbol"] = "Sk";
        GeneralCategory["Other_Symbol"] = "So";
        GeneralCategory["Symbol"] = "S";
        GeneralCategory["Space_Separator"] = "Zs";
        GeneralCategory["Line_Separator"] = "Zl";
        GeneralCategory["Paragraph_Separator"] = "Zp";
        GeneralCategory["Separator"] = "Z";
        GeneralCategory["Control"] = "Cc";
        GeneralCategory["Format"] = "Cf";
        GeneralCategory["Surrogate"] = "Cs";
        GeneralCategory["Private_Use"] = "Co";
        GeneralCategory["Unassigned"] = "Cn";
        GeneralCategory["Other"] = "C";
    })(GeneralCategory = exports.GeneralCategory || (exports.GeneralCategory = {}));
    var CanonicalCombiningClass;
    (function (CanonicalCombiningClass) {
        CanonicalCombiningClass[CanonicalCombiningClass["Not_Reordered"] = 0] = "Not_Reordered";
        CanonicalCombiningClass[CanonicalCombiningClass["Overlay"] = 1] = "Overlay";
        CanonicalCombiningClass[CanonicalCombiningClass["Han_Reading"] = 6] = "Han_Reading";
        CanonicalCombiningClass[CanonicalCombiningClass["Nukta"] = 7] = "Nukta";
        CanonicalCombiningClass[CanonicalCombiningClass["Kana_Voicing"] = 8] = "Kana_Voicing";
        CanonicalCombiningClass[CanonicalCombiningClass["Virama"] = 9] = "Virama";
        CanonicalCombiningClass[CanonicalCombiningClass["Ccc10"] = 10] = "Ccc10";
        CanonicalCombiningClass[CanonicalCombiningClass["Ccc199"] = 199] = "Ccc199";
        CanonicalCombiningClass[CanonicalCombiningClass["Attached_Below_Left"] = 200] = "Attached_Below_Left";
        CanonicalCombiningClass[CanonicalCombiningClass["Attached_Below"] = 202] = "Attached_Below";
        CanonicalCombiningClass[CanonicalCombiningClass["Ccc204"] = 204] = "Ccc204";
        CanonicalCombiningClass[CanonicalCombiningClass["Ccc208"] = 208] = "Ccc208";
        CanonicalCombiningClass[CanonicalCombiningClass["Ccc210"] = 210] = "Ccc210";
        CanonicalCombiningClass[CanonicalCombiningClass["Ccc212"] = 212] = "Ccc212";
        CanonicalCombiningClass[CanonicalCombiningClass["Attached_Above"] = 214] = "Attached_Above";
        CanonicalCombiningClass[CanonicalCombiningClass["Attached_Above_Right"] = 216] = "Attached_Above_Right";
        CanonicalCombiningClass[CanonicalCombiningClass["Below_Left"] = 218] = "Below_Left";
        CanonicalCombiningClass[CanonicalCombiningClass["Below"] = 220] = "Below";
        CanonicalCombiningClass[CanonicalCombiningClass["Below_Right"] = 222] = "Below_Right";
        CanonicalCombiningClass[CanonicalCombiningClass["Left"] = 224] = "Left";
        CanonicalCombiningClass[CanonicalCombiningClass["Right"] = 226] = "Right";
        CanonicalCombiningClass[CanonicalCombiningClass["Above_Left"] = 228] = "Above_Left";
        CanonicalCombiningClass[CanonicalCombiningClass["Above"] = 230] = "Above";
        CanonicalCombiningClass[CanonicalCombiningClass["Above_Right"] = 232] = "Above_Right";
        CanonicalCombiningClass[CanonicalCombiningClass["Double_Below"] = 233] = "Double_Below";
        CanonicalCombiningClass[CanonicalCombiningClass["Double_Above"] = 234] = "Double_Above";
        CanonicalCombiningClass[CanonicalCombiningClass["Iota_Subscript"] = 240] = "Iota_Subscript";
    })(CanonicalCombiningClass = exports.CanonicalCombiningClass || (exports.CanonicalCombiningClass = {}));
    var BidiClass;
    (function (BidiClass) {
        BidiClass["Left_To_Right"] = "L";
        BidiClass["Right_To_Left"] = "R";
        BidiClass["Arabic_Letter"] = "AL";
        BidiClass["European_Number"] = "EN";
        BidiClass["European_Separator"] = "ES";
        BidiClass["European_Terminator"] = "ET";
        BidiClass["Arabic_Number"] = "AN";
        BidiClass["Common_Separator"] = "CS";
        BidiClass["Nonspacing_Mark"] = "NSM";
        BidiClass["Boundary_Neutral"] = "BN";
        BidiClass["Paragraph_Separator"] = "B";
        BidiClass["Segment_Separator"] = "S";
        BidiClass["White_Space"] = "WS";
        BidiClass["Other_Neutral"] = "ON";
        BidiClass["Left_To_Right_Embedding"] = "LRE";
        BidiClass["Left_To_Right_Override"] = "LRO";
        BidiClass["Right_To_Left_Embedding"] = "RLE";
        BidiClass["Right_To_Left_Override"] = "RLO";
        BidiClass["Pop_Directional_Format"] = "PDF";
        BidiClass["Left_To_Right_Isolate"] = "LRI";
        BidiClass["Right_To_Left_Isolate"] = "RLI";
        BidiClass["First_Strong_Isolate"] = "FSI";
        BidiClass["Pop_Directional_Isolate"] = "PDI";
    })(BidiClass = exports.BidiClass || (exports.BidiClass = {}));
    async function parseUnicodeData(p) {
        const data = {};
        const text = await fetch(p.unicodeDataPath).then(r => r.text());
        for (const line of text.split('\n')) {
            if (!line.length)
                continue;
            const [hex, name, category, combining, bidiClass, decomposition, decimalDigit, digit, numeric, bidiMirrored, unicode1, comment, uppercase, lowercase, titlecase] = line.split(';');
            const code = parseInt(hex, 16);
            data[code] = {
                name, code,
                category: category,
                combining: parseInt(combining, 10),
                bidiClass: bidiClass,
                decompositionUD: decomposition.length ? decomposition : undefined,
                decimalDigit: decimalDigit.length ? parseInt(decimalDigit, 10) : undefined,
                digit: digit.length ? parseInt(digit, 10) : undefined,
                numeric: numeric.length ? numeric : undefined,
                bidiMirrored: bidiMirrored === 'Y',
                unicode1: unicode1.length ? unicode1 : undefined,
                comment: comment.length ? [comment] : undefined,
                uppercase: uppercase.length ? uppercase : undefined,
                lowercase: lowercase.length ? lowercase : undefined,
                titlecase: titlecase.length ? titlecase : undefined,
            };
        }
        return data;
    }
    exports.parseUnicodeData = parseUnicodeData;
    async function parseNamesList(p) {
        const text = await fetch(p.namesListPath).then(r => r.text());
        const parser = peggy.generate(await fetch('./script/namesList.pegjs').then(r => r.text()));
        return parser.parse(text);
    }
    exports.parseNamesList = parseNamesList;
    async function parseEmojiTest(p) {
        const groups = [];
        const sequences = {};
        let g = { name: '', sub: [] };
        let s = { name: '', clusters: [] };
        const data = await fetch(p.emojiTestPath).then(f => f.text());
        for (const line of data.split('\n')) {
            const m = line.match(/^# group: (?<group>.+)$|^# subgroup: (?<subGroup>.+)$|^(?<code>[0-9a-f]+(?: [0-9a-f]+)*) +; +(?<type>[a-z-]+) +# (?<symbol>[^ ]+) E(?<version>[\d.]+) (?<name>.+)$/i)?.groups;
            if (m) {
                if (m['group']) {
                    g = { name: m['group'], sub: [] };
                    groups.push(g);
                }
                else if (m['subGroup']) {
                    s = { name: m['subGroup'], clusters: [] };
                    g.sub.push(s);
                }
                else if (m['code']) {
                    const sequence = String.fromCodePoint(...m['code'].split(' ').map((hex) => parseInt(hex, 16)));
                    s.clusters.push(sequence);
                    sequences[sequence] = {
                        sequence,
                        type: m['type'],
                        name: m['name'],
                        version: parseFloat(m['version']),
                    };
                }
            }
        }
        return { groups, sequences };
    }
    exports.parseEmojiTest = parseEmojiTest;
});
define("builder/titleCase", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toTitleCase = void 0;
    const SEPARATORS = /([ -])/;
    function toTitleCase(text) {
        return text
            .split(SEPARATORS)
            .map((word, index) => {
            if (index % 2 === 0 && word.length) {
                const [first, ...rest] = word;
                return first.toUpperCase() + rest.join('').toLowerCase();
            }
            else {
                return word;
            }
        })
            .join('');
    }
    exports.toTitleCase = toTitleCase;
});
define("chars", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ZeroWidthJoiner = exports.SoftHyphen = void 0;
    exports.SoftHyphen = "\u00ad";
    exports.ZeroWidthJoiner = '\u200D';
});
define("builder/consolidated", ["require", "exports", "builder/titleCase", "chars"], function (require, exports, titleCase_1, chars_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getUnicodeData = exports.consolidateUnicodeData = void 0;
    const ExcludeStem = new Set(["keycap", "flag", "family"]);
    function consolidateUnicodeData({ namesList, unicodeData, emojiVersion, emojiTest }) {
        const blocks = [];
        const chars = [];
        const groups = [];
        const clusters = [];
        for (const block of namesList.block) {
            const b = {
                start: block.start,
                end: block.end,
                name: block.name,
                sub: [],
            };
            blocks.push(b);
            for (const sub of block.sub) {
                const s = {
                    name: sub.name,
                    notice: sub.notice,
                    char: [],
                };
                b.sub.push(s);
                for (const char of (sub.char ?? [])) {
                    const u = unicodeData[char.code];
                    const ev = emojiVersion[char.code];
                    const seq = emojiTest.sequences[String.fromCodePoint(char.code)];
                    s.char.push(char.code);
                    const c = {
                        name: char.name,
                        code: char.code,
                        category: u?.category ?? "Cn",
                        combining: u?.combining ?? 0,
                        bidiClass: u?.bidiClass ?? "ON",
                        bidiMirrored: u?.bidiMirrored ?? false,
                    };
                    if (char.alias)
                        c.alias = char.alias;
                    if (char.falias)
                        c.falias = char.falias;
                    if (char.ref)
                        c.ref = char.ref;
                    if (char.decomposition)
                        c.decomposition = char.decomposition;
                    if (char.variation)
                        c.variation = char.variation;
                    if (char.notice)
                        c.notice = char.notice;
                    if (char.comment?.length || u?.comment?.length) {
                        c.comment = [...(char.comment ?? []), ...(u?.comment ?? [])];
                    }
                    if (u?.decompositionUD)
                        c.decompositionUD = u.decompositionUD;
                    if (u?.decimalDigit)
                        c.decimalDigit = u.decimalDigit;
                    if (u?.digit)
                        c.digit = u.digit;
                    if (u?.numeric)
                        c.numeric = u.numeric;
                    if (u?.unicode1)
                        c.unicode1 = u.unicode1;
                    if (u?.uppercase)
                        c.uppercase = u.uppercase;
                    if (u?.lowercase)
                        c.lowercase = u.lowercase;
                    if (u?.titlecase)
                        c.titlecase = u.titlecase;
                    if (ev)
                        c.emojiVersion = ev;
                    if (seq)
                        c.name = seq.name;
                    c.name = (0, titleCase_1.toTitleCase)(c.name);
                    chars.push(c);
                }
            }
        }
        for (const group of emojiTest.groups) {
            const g = {
                name: (0, titleCase_1.toTitleCase)(group.name),
                sub: [],
            };
            groups.push(g);
            for (const sub of group.sub) {
                const s = {
                    name: sub.name,
                    clusters: [],
                };
                g.sub.push(s);
                const stems = new Map();
                for (const cluster of sub.clusters) {
                    const info = emojiTest.sequences[cluster];
                    if (!info || info.type !== 'fully-qualified')
                        continue;
                    const stem = info.name.split(':', 1)[0];
                    const name = (0, titleCase_1.toTitleCase)(info.name);
                    if (stems.has(stem) && !ExcludeStem.has(stem)) {
                        const c = stems.get(stem);
                        c.variants ??= [c.cluster];
                        if (name == c.name.split(':', 1)[0]) {
                            const c2 = {
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
                        }
                        else {
                            c.variants.push(cluster);
                            clusters.push({
                                cluster,
                                name: name,
                                version: info.version,
                                parent: c.cluster,
                            });
                        }
                    }
                    else {
                        const c = {
                            cluster,
                            name: name,
                            version: info.version,
                        };
                        stems.set(stem, c);
                        clusters.push(c);
                        s.clusters.push(cluster);
                    }
                }
            }
        }
        return { blocks, chars, groups, clusters, name: namesList.title.title };
    }
    exports.consolidateUnicodeData = consolidateUnicodeData;
    const SKIN_TONES = ["🏻", "🏼", "🏽", "🏾", "🏿"];
    const SKIN_TONES_NAMES = {
        "🏻": "Light Skin Tone",
        "🏼": "Medium-Light Skin Tone",
        "🏽": "Medium Skin Tone",
        "🏾": "Medium-Dark Skin Tone",
        "🏿": "Dark Skin Tone",
    };
    const SKIN_TONE_REGEX = new RegExp(`(?:${SKIN_TONES.join('|')})`, 'g');
    function getUnicodeData() {
        const u = window.unicodeData ?? {
            name: "No Unicode Data Available",
            blocks: [],
            chars: [],
            clusters: [],
            groups: [],
        };
        const idxChars = Object.fromEntries(u.chars.map(c => [c.code, c]));
        const blocks = [];
        const chars = {};
        const groups = {};
        const clusters = Object.fromEntries(u.clusters.map(c => [c.cluster, { ...c }]));
        for (const block of u.blocks) {
            const b = { ...block, sub: [] };
            b.sub = block.sub.map(s => ({ ...s, block: new WeakRef(b) }));
            blocks.push(b);
            for (const s of b.sub) {
                for (const c of s.char) {
                    if (!idxChars[c])
                        continue;
                    chars[c] = {
                        ...idxChars[c],
                        block: b,
                        sub: s,
                    };
                }
            }
        }
        for (const group of u.groups) {
            const g = { ...group, sub: {} };
            groups[group.name] = g;
            for (const sub of group.sub) {
                const s = { ...sub, group: new WeakRef(g) };
                g.sub[sub.name] = s;
                for (const cluster of sub.clusters) {
                    if (!clusters[cluster])
                        continue;
                    clusters[cluster].group = g;
                    clusters[cluster].subGroup = s;
                }
            }
        }
        for (const c of ["👨‍👩‍👦", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👨‍👨‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👦", "👨‍👦‍👦", "👨‍👧", "👨‍👧‍👦", "👨‍👧‍👧", "👩‍👦", "👩‍👦‍👦", "👩‍👧", "👩‍👧‍👦", "👩‍👧‍👧"]) {
            if (clusters[c] && !clusters[c].variants) {
                const parts = c.split(chars_1.ZeroWidthJoiner);
                for (let i = 1; i < parts.length; ++i)
                    parts[i] = chars_1.ZeroWidthJoiner + parts[i];
                let variants = [""];
                for (const p of parts) {
                    variants = variants.flatMap(v => SKIN_TONES.map(k => v + p + k));
                }
                for (const v of variants) {
                    clusters[v] = {
                        cluster: v,
                        parent: c,
                        name: clusters[c].name + ': ' + [...v.matchAll(SKIN_TONE_REGEX)].map(v => SKIN_TONES_NAMES[v[0]]).join(', '),
                        version: clusters[c].version,
                    };
                }
                variants.unshift(c);
                clusters[c].variants = variants;
            }
        }
        return { blocks, chars, groups, clusters };
    }
    exports.getUnicodeData = getUnicodeData;
});
define("ahk", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ahkOpenDevTools = exports.ahkSetOpacity = exports.ahkSetSize = exports.ahkSaveUnicodeData = exports.ahkSaveConfig = exports.ahkSetSearch = exports.ahkSend = exports.ahkReady = exports.ahkTitle = exports.ahkDownloadUnicode = void 0;
    let AHK = null;
    window.chrome?.webview?.hostObjects?.ahk.then((ahk) => AHK = ahk);
    function isAHK() {
        return AHK !== null;
    }
    function ahkDownloadUnicode() {
        if (isAHK())
            AHK.downloadUnicode();
        else
            console.log("DownloadUnicode");
    }
    exports.ahkDownloadUnicode = ahkDownloadUnicode;
    function ahkTitle(title) {
        if (isAHK())
            AHK.setTitle(title);
        else
            document.title = title;
    }
    exports.ahkTitle = ahkTitle;
    function ahkReady() {
        if (isAHK())
            AHK.ready();
        else
            console.log("Ready");
    }
    exports.ahkReady = ahkReady;
    function ahkSend(symbol) {
        if (isAHK())
            AHK.send(symbol);
        else
            console.log("Send", symbol);
    }
    exports.ahkSend = ahkSend;
    function ahkSetSearch(state) {
        if (isAHK())
            AHK.setSearch(state);
        else
            console.log("SetSearch", state);
    }
    exports.ahkSetSearch = ahkSetSearch;
    function ahkSaveConfig(config) {
        if (isAHK())
            AHK.saveConfig(config);
        else
            console.log("SaveConfig", config);
    }
    exports.ahkSaveConfig = ahkSaveConfig;
    function ahkSaveUnicodeData(data) {
        if (isAHK()) {
            AHK.saveUnicodeData(JSON.stringify(data), 'export type UnicodeEmojiGroup = \n\t' + data.groups.flatMap(g => g.sub.flatMap(s => `{group: ${JSON.stringify(g.name)}, subGroup: ${JSON.stringify(s.name)}}`)).join('\n\t| ') + ';\n');
        }
        else
            console.log("SaveUnicodeData", data);
    }
    exports.ahkSaveUnicodeData = ahkSaveUnicodeData;
    function ahkSetSize(width, height) {
        if (isAHK())
            AHK.setSize(width, height);
        else
            console.log("SetSize", width, height);
    }
    exports.ahkSetSize = ahkSetSize;
    function ahkSetOpacity(opacity) {
        if (isAHK())
            AHK.setOpacity(opacity);
        else
            console.log("SetOpacity", opacity);
    }
    exports.ahkSetOpacity = ahkSetOpacity;
    function ahkOpenDevTools() {
        if (isAHK())
            AHK.openDevTools();
        else
            console.log("OpenDevTools");
    }
    exports.ahkOpenDevTools = ahkOpenDevTools;
});
define("layout", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SearchKeyCodes = exports.IsoLayout = exports.AnsiLayout = exports.SearchKeyCodesTable = exports.ThirdRow = exports.SecondRow = exports.FirstRow = exports.DigitsRow = exports.SystemLayoutUS = void 0;
    exports.SystemLayoutUS = {
        [0]: { vk: 0, name: "" },
        [1]: { vk: 27, name: "Esc" },
        [2]: { vk: 49, name: "1" },
        [3]: { vk: 50, name: "2" },
        [4]: { vk: 51, name: "3" },
        [5]: { vk: 52, name: "4" },
        [6]: { vk: 53, name: "5" },
        [7]: { vk: 54, name: "6" },
        [8]: { vk: 55, name: "7" },
        [9]: { vk: 56, name: "8" },
        [10]: { vk: 57, name: "9" },
        [11]: { vk: 48, name: "0" },
        [12]: { vk: 189, name: "-" },
        [13]: { vk: 187, name: "=" },
        [14]: { vk: 8, name: "Backspace" },
        [15]: { vk: 9, name: "Tab" },
        [16]: { vk: 81, name: "q" },
        [17]: { vk: 87, name: "w" },
        [18]: { vk: 69, name: "e" },
        [19]: { vk: 82, name: "r" },
        [20]: { vk: 84, name: "t" },
        [21]: { vk: 89, name: "y" },
        [22]: { vk: 85, name: "u" },
        [23]: { vk: 73, name: "i" },
        [24]: { vk: 79, name: "o" },
        [25]: { vk: 80, name: "p" },
        [26]: { vk: 219, name: "[" },
        [27]: { vk: 221, name: "]" },
        [28]: { vk: 13, name: "Enter" },
        [29]: { vk: 162, name: "Ctrl" },
        [30]: { vk: 65, name: "a" },
        [31]: { vk: 83, name: "s" },
        [32]: { vk: 68, name: "d" },
        [33]: { vk: 70, name: "f" },
        [34]: { vk: 71, name: "g" },
        [35]: { vk: 72, name: "h" },
        [36]: { vk: 74, name: "j" },
        [37]: { vk: 75, name: "k" },
        [38]: { vk: 76, name: "l" },
        [39]: { vk: 186, name: ";" },
        [40]: { vk: 222, name: "'" },
        [41]: { vk: 192, name: "`" },
        [42]: { vk: 160, name: "Shift" },
        [43]: { vk: 220, name: "\\" },
        [44]: { vk: 90, name: "z" },
        [45]: { vk: 88, name: "x" },
        [46]: { vk: 67, name: "c" },
        [47]: { vk: 86, name: "v" },
        [48]: { vk: 66, name: "b" },
        [49]: { vk: 78, name: "n" },
        [50]: { vk: 77, name: "m" },
        [51]: { vk: 188, name: "," },
        [52]: { vk: 190, name: "." },
        [53]: { vk: 191, name: "/" },
        [54]: { vk: 16, name: "Right Shift" },
        [55]: { vk: 106, name: "Num *" },
        [56]: { vk: 164, name: "Alt" },
        [57]: { vk: 32, name: "Space" },
        [58]: { vk: 20, name: "Caps Lock" },
        [59]: { vk: 112, name: "F1" },
        [60]: { vk: 113, name: "F2" },
        [61]: { vk: 114, name: "F3" },
        [62]: { vk: 115, name: "F4" },
        [63]: { vk: 116, name: "F5" },
        [64]: { vk: 117, name: "F6" },
        [65]: { vk: 118, name: "F7" },
        [66]: { vk: 119, name: "F8" },
        [67]: { vk: 120, name: "F9" },
        [68]: { vk: 121, name: "F10" },
        [69]: { vk: 19, name: "Pause" },
        [70]: { vk: 145, name: "Scroll Lock" },
        [71]: { vk: 103, name: "Num 7" },
        [72]: { vk: 104, name: "Num 8" },
        [73]: { vk: 105, name: "Num 9" },
        [74]: { vk: 109, name: "Num -" },
        [75]: { vk: 100, name: "Num 4" },
        [76]: { vk: 101, name: "Num 5" },
        [77]: { vk: 102, name: "Num 6" },
        [78]: { vk: 107, name: "Num +" },
        [79]: { vk: 97, name: "Num 1" },
        [80]: { vk: 98, name: "Num 2" },
        [81]: { vk: 99, name: "Num 3" },
        [82]: { vk: 96, name: "Num 0" },
        [83]: { vk: 110, name: "Num Del" },
        [84]: { vk: 44, name: "Sys Req" },
        [86]: { vk: 226, name: "\\" },
        [87]: { vk: 122, name: "F11" },
        [88]: { vk: 123, name: "F12" },
        [285]: { vk: 163, name: "Right Ctrl" },
        [309]: { vk: 111, name: "Num /" },
        [311]: { vk: 44, name: "Prnt Scrn" },
        [312]: { vk: 165, name: "Right Alt" },
        [325]: { vk: 144, name: "Num Lock" },
        [91]: { vk: 91, name: "Win" }
    };
    exports.DigitsRow = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    exports.FirstRow = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27];
    exports.SecondRow = [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 43];
    exports.ThirdRow = [44, 45, 46, 47, 48, 49, 50, 51, 52, 53];
    exports.SearchKeyCodesTable = [
        41, ...exports.DigitsRow,
        1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013,
        1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026,
    ];
    exports.AnsiLayout = {
        all: [
            41, ...exports.DigitsRow,
            15, ...exports.FirstRow,
            58, ...exports.SecondRow,
            42, ...exports.ThirdRow, 1100, 1101
        ],
        free: [...exports.DigitsRow, ...exports.FirstRow, ...exports.SecondRow, ...exports.ThirdRow],
        cssClass: 'ansi-layout',
    };
    exports.IsoLayout = {
        all: [
            41, ...exports.DigitsRow,
            15, ...exports.FirstRow,
            58, ...exports.SecondRow,
            86, ...exports.ThirdRow, 1100, 1101
        ],
        free: [...exports.DigitsRow, ...exports.FirstRow, ...exports.SecondRow, 86, ...exports.ThirdRow],
        cssClass: 'iso-layout',
    };
    exports.SearchKeyCodes = [
        ...exports.DigitsRow,
        1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013,
        1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026
    ];
});
define("osversion", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Version = void 0;
    class Version {
        version;
        known = new Set();
        knownLesser = new Set();
        knownGreater = new Set();
        knownSame = new Set();
        constructor(version) {
            this.version = Version.parse(version);
        }
        static parse(v) {
            if (!/^[.0-9]+$/.test(v.trim())) {
                console.error("Invalid version", v);
                return [0];
            }
            return v.split(/\./).map(part => parseInt(part, 10));
        }
        static compare(a, b) {
            for (let i = 0; i < a.length; i++) {
                if (i >= b.length)
                    return a.slice(i).some((p) => p > 0) ? 1 : 0;
                if (a[i] > b[i])
                    return 1;
                if (a[i] < b[i])
                    return -1;
            }
            if (a.length == b.length)
                return 0;
            return b.slice(a.length).some((p) => p > 0) ? -1 : 0;
        }
        add(other) {
            const cmp = Version.compare(this.version, Version.parse(other));
            this.known.add(other);
            if (cmp > 0)
                this.knownLesser.add(other);
            else if (cmp < 0)
                this.knownGreater.add(other);
            else
                this.knownSame.add(other);
        }
        lt(other) {
            if (!this.known.has(other))
                this.add(other);
            return this.knownGreater.has(other);
        }
        gt(other) {
            if (!this.known.has(other))
                this.add(other);
            return this.knownLesser.has(other);
        }
        ge(other) {
            return !this.lt(other);
        }
        le(other) {
            return !this.gt(other);
        }
        eq(other) {
            if (!this.known.has(other))
                this.add(other);
            return this.knownSame.has(other);
        }
    }
    exports.Version = Version;
});
define("appVar", ["require", "exports", "preact", "layout", "osversion"], function (require, exports, preact_1, layout_1, osversion_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.OSContext = exports.LayoutContext = exports.app = exports.setApp = void 0;
    let appVar;
    function setApp(app) {
        appVar = app;
    }
    exports.setApp = setApp;
    function app() {
        return appVar;
    }
    exports.app = app;
    exports.LayoutContext = (0, preact_1.createContext)({ ...layout_1.AnsiLayout, sys: layout_1.SystemLayoutUS });
    exports.OSContext = (0, preact_1.createContext)(new osversion_1.Version('99'));
});
define("helpers", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fromEntries = exports.cl = exports.unreachable = void 0;
    function unreachable(x) {
        console.error("Unexpected", x);
        throw new Error("Unexpected: " + x);
    }
    exports.unreachable = unreachable;
    function cl(...args) {
        return args.flatMap(a => {
            if (typeof a === "string")
                return a;
            if (a === null || a === undefined)
                return "";
            return Object.entries(a).map(([k, v]) => v ? k : "");
        }).join(' ');
    }
    exports.cl = cl;
    function fromEntries(entries) {
        const object = {};
        for (const [k, v] of entries) {
            object[k] = v;
        }
        return object;
    }
    exports.fromEntries = fromEntries;
});
define("builder/builder", ["require", "exports", "builder/unicode", "builder/consolidated", "ahk", "unicodeInterface"], function (require, exports, unicode_1, consolidated_1, ahk_1, unicodeInterface_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeBuild = exports.toCodePoints = void 0;
    function getFullName(code, ctx) {
        const parts = [];
        for (const c of code) {
            if (unicodeInterface_1.IgnoreForName.includes(c))
                continue;
            if (c >= 19968 && c <= 40956) {
                parts.push(`CJK UNIFIED IDEOGRAPH-${c.toString(16)}`);
            }
            else {
                parts.push(ctx.unicodeData[c].name ?? `U+${c.toString(16)}`);
            }
        }
        return parts.join(", ");
    }
    function toCodePoints(s) {
        return [...s].map(c => c.codePointAt(0));
    }
    exports.toCodePoints = toCodePoints;
    function getEmoji(addon, symbol, ctx) {
        let blank = 0;
        if (symbol === null) {
            return {
                symbol: "",
                group: addon.group,
                subGroup: addon.subGroup,
                name: "BLANK " + blank++
            };
        }
        else if (typeof symbol === "string") {
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
        }
        else if (Array.isArray(symbol)) {
            const emoji = getEmoji(addon, symbol[0], ctx);
            emoji.alternates = [];
            for (const sym of symbol) {
                emoji.alternates.push(getEmoji(addon, sym, ctx));
            }
            return emoji;
        }
        else {
            throw new Error("Unexpected value: " + symbol);
        }
    }
    async function makeBuild() {
        try {
            await build();
        }
        catch (e) {
            console.error(e);
            alert(`Build failed: ${e}`);
        }
    }
    exports.makeBuild = makeBuild;
    async function build() {
        (0, ahk_1.ahkDownloadUnicode)();
        const paths = {
            emojiTestPath: '../res/data/emoji/15.0/emoji-test.txt',
            emojiDataPath: '../res/data/15.0.0/ucd/emoji/emoji-data.txt',
            unicodeDataPath: '../res/data/15.0.0/ucd/UnicodeData.txt',
            namesListPath: '../res/data/15.0.0/ucd/NamesList.txt',
        };
        const ctx = {
            unicodeData: await (0, unicode_1.parseUnicodeData)(paths),
            emojiVersion: await (0, unicode_1.parseEmojiVersions)(paths.emojiDataPath),
            emojiTest: await (0, unicode_1.parseEmojiTest)(paths),
            namesList: await (0, unicode_1.parseNamesList)(paths),
        };
        const u = (0, consolidated_1.consolidateUnicodeData)(ctx);
        console.log(u);
        (0, ahk_1.ahkSaveUnicodeData)(u);
        const emojiCount = u.groups.map(g => g.sub.reduce((v, s) => v + (s.clusters?.length ?? 0), 0)).reduce((a, b) => a + b, 0);
        alert(`Finished building “${u.name}”\n` +
            ` – ${u.chars.length} codepoints in ${u.blocks.length} blocks\n` +
            ` – ${u.clusters.length} grapheme clusters with length > 1\n` +
            ` – ${u.groups.length} emoji groups with ${emojiCount} base emojis\n\n` +
            `Reload the app to load the new data file`);
    }
});
define("config/fallback", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IconFallback = void 0;
    exports.IconFallback = [
        {
            windows: "99",
            ranges: [
                { from: "🇦", to: "🇿🇿" },
                {
                    from: "\ud83c\udff4\udb40\udc61",
                    to: "\ud83c\udff4\udb40\udc7a\udb40\udc7a",
                }
            ]
        },
        {
            windows: "10.0.25300",
            version: 15,
        },
        {
            windows: "10.0.22563",
            version: 14,
        },
        {
            windows: "10.0.21277",
            version: 13,
            clusters: new Set([
                "*️⃣",
                "🧑‍🦰", "🧑🏻‍🦰", "🧑🏼‍🦰", "🧑🏽‍🦰", "🧑🏾‍🦰", "🧑🏿‍🦰",
                "🧑‍🦱", "🧑🏻‍🦱", "🧑🏼‍🦱", "🧑🏽‍🦱", "🧑🏾‍🦱", "🧑🏿‍🦱",
                "🧑‍🦳", "🧑🏻‍🦳", "🧑🏼‍🦳", "🧑🏽‍🦳", "🧑🏾‍🦳", "🧑🏿‍🦳",
                "🧑‍🦲", "🧑🏻‍🦲", "🧑🏼‍🦲", "🧑🏽‍🦲", "🧑🏾‍🦲", "🧑🏿‍🦲",
                "🧑‍⚕️", "🧑🏻‍⚕", "🧑🏼‍⚕", "🧑🏽‍⚕", "🧑🏾‍⚕", "🧑🏿‍⚕",
                "🧑‍🎓", "🧑🏻‍🎓", "🧑🏼‍🎓", "🧑🏽‍🎓", "🧑🏾‍🎓", "🧑🏿‍🎓",
                "🧑‍🏫", "🧑🏻‍🏫", "🧑🏼‍🏫", "🧑🏽‍🏫", "🧑🏾‍🏫", "🧑🏿‍🏫",
                "🧑‍⚖️", "🧑🏻‍⚖", "🧑🏼‍⚖", "🧑🏽‍⚖", "🧑🏾‍⚖", "🧑🏿‍⚖",
                "🧑‍🌾", "🧑🏻‍🌾", "🧑🏼‍🌾", "🧑🏽‍🌾", "🧑🏾‍🌾", "🧑🏿‍🌾",
                "🧑‍🍳", "🧑🏻‍🍳", "🧑🏼‍🍳", "🧑🏽‍🍳", "🧑🏾‍🍳", "🧑🏿‍🍳",
                "🧑‍🔧", "🧑🏻‍🔧", "🧑🏼‍🔧", "🧑🏽‍🔧", "🧑🏾‍🔧", "🧑🏿‍🔧",
                "🧑‍🏭", "🧑🏻‍🏭", "🧑🏼‍🏭", "🧑🏽‍🏭", "🧑🏾‍🏭", "🧑🏿‍🏭",
                "🧑‍💼", "🧑🏻‍💼", "🧑🏼‍💼", "🧑🏽‍💼", "🧑🏾‍💼", "🧑🏿‍💼",
                "🧑‍🔬", "🧑🏻‍🔬", "🧑🏼‍🔬", "🧑🏽‍🔬", "🧑🏾‍🔬", "🧑🏿‍🔬",
                "🧑‍💻", "🧑🏻‍💻", "🧑🏼‍💻", "🧑🏽‍💻", "🧑🏾‍💻", "🧑🏿‍💻",
                "🧑‍🎤", "🧑🏻‍🎤", "🧑🏼‍🎤", "🧑🏽‍🎤", "🧑🏾‍🎤", "🧑🏿‍🎤",
                "🧑‍🎨", "🧑🏻‍🎨", "🧑🏼‍🎨", "🧑🏽‍🎨", "🧑🏾‍🎨", "🧑🏿‍🎨",
                "🧑‍✈️", "🧑🏻‍✈", "🧑🏼‍✈", "🧑🏽‍✈", "🧑🏾‍✈", "🧑🏿‍✈",
                "🧑‍🚀", "🧑🏻‍🚀", "🧑🏼‍🚀", "🧑🏽‍🚀", "🧑🏾‍🚀", "🧑🏿‍🚀",
                "🧑‍🚒", "🧑🏻‍🚒", "🧑🏼‍🚒", "🧑🏽‍🚒", "🧑🏾‍🚒", "🧑🏿‍🚒",
                "🧑‍🦯", "🧑🏻‍🦯", "🧑🏼‍🦯", "🧑🏽‍🦯", "🧑🏾‍🦯", "🧑🏿‍🦯",
                "🧑‍🦼", "🧑🏻‍🦼", "🧑🏼‍🦼", "🧑🏽‍🦼", "🧑🏾‍🦼", "🧑🏿‍🦼",
                "🧑‍🦽", "🧑🏻‍🦽", "🧑🏼‍🦽", "🧑🏽‍🦽", "🧑🏾‍🦽", "🧑🏿‍🦽",
            ]),
        },
        {
            windows: "10.0.18277",
            version: 12,
            clusters: new Set([
                "🏴‍☠️",
                "#\ufe0f\u20e3",
                "0\ufe0f\u20e3",
                "1\ufe0f\u20e3",
                "2\ufe0f\u20e3",
                "3\ufe0f\u20e3",
                "4\ufe0f\u20e3",
                "5\ufe0f\u20e3",
                "6\ufe0f\u20e3",
                "7\ufe0f\u20e3",
                "8\ufe0f\u20e3",
                "9\ufe0f\u20e3"
            ])
        },
        {
            windows: "10.0.17723",
            version: 11
        },
        {
            windows: "10.0.16226",
            version: 5,
        },
        {
            windows: "10.0.15063",
            version: 4,
        },
        {
            windows: "10.0.14393",
        },
        {
            windows: "10",
            version: 0,
        },
    ];
});
define("unicodeInterface", ["require", "exports", "builder/consolidated", "builder/builder", "config/fallback"], function (require, exports, consolidated_2, builder_1, fallback_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.requiredOS = exports.emojiGroup = exports.clusterVariants = exports.clusterName = exports.charInfo = exports.IgnoreForName = void 0;
    exports.IgnoreForName = [
        8205,
        65039,
    ];
    const u = (0, consolidated_2.getUnicodeData)();
    window.u = u;
    function charName(code) {
        if (code >= 19968 && code <= 40956) {
            return `CJK UNIFIED IDEOGRAPH-${code.toString(16)}`;
        }
        else {
            return u.chars[code]?.name ?? `U+${code.toString(16)}`;
        }
    }
    function clusterFullName(cluster) {
        const c = (0, builder_1.toCodePoints)(cluster);
        if (c.length === 1)
            return charName(c[0]);
        return c
            .filter(c => !exports.IgnoreForName.includes(c))
            .map(c => charName(c))
            .join(', ');
    }
    function charInfo(code) {
        return u.chars[code];
    }
    exports.charInfo = charInfo;
    function clusterName(cluster) {
        return u.clusters[cluster]?.name ?? clusterFullName(cluster);
    }
    exports.clusterName = clusterName;
    function clusterVariants(cluster) {
        return u.clusters[cluster]?.variants;
    }
    exports.clusterVariants = clusterVariants;
    function emojiGroup(g) {
        return u.groups[g.group]?.sub[g.subGroup]?.clusters ?? [];
    }
    exports.emojiGroup = emojiGroup;
    function requiredOS(cluster) {
        const info = u.clusters[cluster];
        for (const f of fallback_1.IconFallback) {
            if (info && f.version && info.version >= f.version)
                return f.windows;
            if (f.clusters && f.clusters.has(cluster))
                return f.windows;
            if (f.ranges)
                for (const r of f.ranges) {
                    if (cluster >= r.from && cluster <= r.to)
                        return f.windows;
                }
        }
        return "0";
    }
    exports.requiredOS = requiredOS;
});
define("key", ["require", "exports", "preact", "board", "ahk", "appVar", "helpers", "unicodeInterface", "builder/builder", "preact/hooks"], function (require, exports, preact_2, board_1, ahk_2, appVar_1, helpers_1, unicodeInterface_2, builder_2, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ClusterKey = exports.ExitSearchKey = exports.SearchKey = exports.ConfigPageKey = exports.PageKey = exports.KeyboardKey = exports.BackKey = exports.BlankKey = exports.ConfigLabelKey = exports.ConfigToggleKey = exports.ConfigActionKey = exports.ConfigKey = exports.Key = void 0;
    function toTwemojiFilename(symbol) {
        let name = [];
        for (var i = 0; i < symbol.length; i++) {
            let c = symbol.codePointAt(i).toString(16);
            name.push(c);
            if (symbol.charCodeAt(i) != symbol.codePointAt(i))
                i++;
        }
        let filename = name.join('-') + '.svg';
        if (filename.indexOf('200d') === -1)
            filename = filename.replace(/-fe0f/g, '');
        return 'img/' + filename;
    }
    function Symbol({ symbol }) {
        const os = (0, hooks_1.useContext)(appVar_1.OSContext);
        return (0, hooks_1.useMemo)(() => {
            if ([...symbol].length == 1) {
                const info = (0, unicodeInterface_2.charInfo)((0, builder_2.toCodePoints)(symbol)[0]);
                if (info?.category === "Zs" || info?.category === "Cf") {
                    return (0, preact_2.h)("div", { className: "symbol s-space" }, info.name);
                }
            }
            const req = (0, unicodeInterface_2.requiredOS)(symbol);
            const fallback = os.lt(req);
            return (0, preact_2.h)("div", { className: (0, helpers_1.cl)(`symbol`, { fallback }) }, symbol);
        }, [symbol, os]);
    }
    class Key {
        name;
        upperName;
        symbol;
        active;
        clickAlwaysAlternate;
        keyNamePrefix;
        alt;
        lu;
        constructor(p) {
            this.name = p.name;
            this.upperName = p.upperName ?? '';
            this.symbol = p.symbol;
            this.active = p.active ?? false;
            this.clickAlwaysAlternate = p.clickAlwaysAlternate ?? false;
            this.keyNamePrefix = p.keyNamePrefix ?? '';
            this.alt = p.alt ?? false;
            this.lu = p.lu ?? false;
        }
        render({ os, layout }, code) {
            let keyType = "action";
            if (!this.name.length) {
                keyType = "empty";
            }
            else if (this instanceof ClusterKey) {
                keyType = "char";
            }
            else if (this instanceof BackKey) {
                keyType = "back";
            }
            return (0, preact_2.h)("div", { className: (0, helpers_1.cl)('key', keyType, { alt: this.alt, lu: this.lu, active: this.active }), onClick: (e) => {
                    e.preventDefault();
                    e.shiftKey || this.clickAlwaysAlternate ? this.actAlternate() : this.act();
                }, onContextMenu: (e) => {
                    e.preventDefault();
                    this.actAlternate();
                }, onMouseOver: () => (0, appVar_1.app)().updateStatus(this.name), key: code },
                (0, preact_2.h)("div", { className: "keyname" },
                    this.keyNamePrefix,
                    layout[code]?.name),
                (0, preact_2.h)("div", { className: "name" }, this.name),
                (0, preact_2.h)("div", { className: "uname" }, this.upperName),
                (0, preact_2.h)(Symbol, { symbol: this.symbol }));
        }
        act() {
        }
        actAlternate() {
            this.act();
        }
    }
    exports.Key = Key;
    class ConfigKey extends Key {
        constructor() {
            super({ name: "Settings", symbol: "🛠️", clickAlwaysAlternate: true, keyNamePrefix: "⇧" });
        }
        actAlternate() {
            (0, appVar_1.app)().setMode(2);
        }
    }
    exports.ConfigKey = ConfigKey;
    class ConfigActionKey extends Key {
        action;
        constructor({ active, action, name, symbol }) {
            active = active ?? false;
            super({
                name: name ?? (active ? "On" : "Off"),
                symbol: symbol ?? (active ? "✔️" : "❌"),
                active
            });
            this.action = action;
        }
        act() {
            this.action();
        }
    }
    exports.ConfigActionKey = ConfigActionKey;
    class ConfigToggleKey extends ConfigActionKey {
        act() {
            this.action();
        }
    }
    exports.ConfigToggleKey = ConfigToggleKey;
    class ConfigLabelKey extends Key {
        constructor(text) {
            super({ name: "", symbol: text });
        }
        render({ os, layout }, code) {
            return (0, preact_2.h)("div", { class: `key label` },
                (0, preact_2.h)("div", { class: "keyname" }, layout[code]?.name),
                (0, preact_2.h)("div", { class: "name" }, this.name),
                (0, preact_2.h)("div", { class: "symbol" }, this.symbol));
        }
    }
    exports.ConfigLabelKey = ConfigLabelKey;
    exports.BlankKey = new Key({ name: '', symbol: '' });
    class BackKey extends Key {
        constructor() {
            super({ name: 'back/🛠️', symbol: '←' });
        }
        act() {
            (0, appVar_1.app)().back();
        }
        actAlternate() {
            (0, appVar_1.app)().setMode(2);
        }
    }
    exports.BackKey = BackKey;
    class KeyboardKey extends Key {
        target;
        constructor(target) {
            super({ name: target.name, symbol: target.symbol });
            this.target = target;
        }
        act() {
            (0, appVar_1.app)().setBoard(this.target);
        }
    }
    exports.KeyboardKey = KeyboardKey;
    class PageKey extends Key {
        page;
        constructor(page, active) {
            super({ name: `page ${page + 1}`, symbol: '' + (page + 1), active });
            this.page = page;
        }
        act() {
            if (!this.active)
                (0, appVar_1.app)().setPage(this.page);
        }
    }
    exports.PageKey = PageKey;
    class ConfigPageKey extends Key {
        page;
        constructor(page, active) {
            super({ name: page.name, symbol: page.symbol, active });
            this.page = page;
        }
        act() {
            if (!this.active)
                (0, appVar_1.app)().setConfigPage(this.page);
        }
    }
    exports.ConfigPageKey = ConfigPageKey;
    class SearchKey extends Key {
        constructor() {
            super({ name: 'search', symbol: '🔎' });
        }
        act() {
            (0, appVar_1.app)().setMode(1);
        }
    }
    exports.SearchKey = SearchKey;
    class ExitSearchKey extends Key {
        constructor() {
            super({ name: 'back', symbol: '←' });
        }
        act() {
            (0, appVar_1.app)().setMode(0);
        }
    }
    exports.ExitSearchKey = ExitSearchKey;
    class ClusterKey extends Key {
        cluster;
        variants;
        constructor(cluster, variants) {
            const name = (0, unicodeInterface_2.clusterName)(cluster);
            variants ??= (0, unicodeInterface_2.clusterVariants)(cluster);
            super({
                name,
                upperName: variants?.length == 2 ? variants[1] : "",
                symbol: cluster,
                alt: !!variants && variants.length > 2,
                lu: variants?.length === 2,
            });
            this.cluster = cluster;
            this.variants = variants;
        }
        act() {
            (0, ahk_2.ahkSend)(this.cluster);
        }
        actAlternate() {
            if (this.alt) {
                (0, appVar_1.app)().setBoard(board_1.Board.clusterAlternates(this.cluster, this.variants));
            }
            else if (this.lu) {
                (0, ahk_2.ahkSend)(this.variants[1]);
            }
            else
                return this.act();
        }
    }
    exports.ClusterKey = ClusterKey;
});
define("config", ["require", "exports", "preact", "layout", "key", "board", "preact/hooks", "builder/builder", "appVar"], function (require, exports, preact_3, layout_2, key_1, board_2, hooks_2, builder_3, appVar_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConfigView = exports.DefaultConfigPage = exports.DefaultThemeUrl = exports.ThemesMap = exports.DefaultConfig = exports.DefaultOpacity = exports.Themes = exports.DefaultTheme = void 0;
    const SHORTCUT_KEYS = [
        {
            name: "Function Row", keys: [
                1,
                59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 87, 88,
            ]
        }, {
            name: "Numbers Row", keys: [
                41,
                2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
                12, 13,
                14,
            ]
        }, {
            name: "First Row", keys: [
                15,
                16, 17, 18, 19, 20, 21, 22, 23, 24, 25,
                26, 27, 43, 28,
            ]
        }, {
            name: "Second Row", keys: [
                58,
                30, 31, 32, 33, 34, 35, 36, 37, 38,
                39, 40, 43, 28,
            ]
        }, {
            name: "Third Row", keys: [
                86,
                44, 45, 46, 47, 48, 49, 50,
                51, 52, 53,
            ]
        }, {
            name: "Fourth Row", keys: [
                57
            ]
        }, {
            name: "Numpad", keys: [
                82, 79, 80, 81,
                75, 76, 77,
                71, 72, 73,
                83,
                309,
                55,
                74,
                78,
                325,
            ]
        }
    ];
    const SkinTones = [
        { name: "neutral", symbol: "👤" },
        { name: "light", symbol: "🏻" },
        { name: "medium-light", symbol: "🏼" },
        { name: "medium", symbol: "🏽" },
        { name: "medium-dark", symbol: "🏾" },
        { name: "dark", symbol: "🏿" },
    ];
    exports.DefaultTheme = "material";
    exports.Themes = [
        { name: exports.DefaultTheme, url: "style/material.css", symbol: "🔳" },
        { name: "legacy", url: "style/legacy.css", symbol: "⬜" },
    ];
    exports.DefaultOpacity = .90;
    exports.DefaultConfig = {
        isoKeyboard: false,
        theme: exports.DefaultTheme,
        themeMode: "system",
        width: 764,
        height: 240,
        devTools: false,
        opacity: exports.DefaultOpacity,
        skinTone: 0,
    };
    exports.ThemesMap = new Map(exports.Themes.map((t) => [t.name, t]));
    exports.DefaultThemeUrl = exports.ThemesMap.get(exports.DefaultTheme).url;
    const ConfigPages = [
        {
            name: "General",
            symbol: "🛠️",
            keys(p) {
                return {
                    [16]: new key_1.ConfigToggleKey({
                        active: p.config.isoKeyboard,
                        action() {
                            p.app.updateConfig({ isoKeyboard: !p.config.isoKeyboard });
                        }
                    }),
                    [17]: new key_1.ConfigLabelKey(`ISO layout (additional key between ${p.layout[42].name} and ${p.layout[44].name})`),
                };
            }
        },
        {
            name: "Theme",
            symbol: "🎨",
            keys(p) {
                return {
                    ...(0, board_2.mapKeysToSlots)(layout_2.FirstRow, exports.Themes.map((t) => new key_1.ConfigActionKey({
                        active: p.config.theme == t.name,
                        name: t.name,
                        symbol: t.symbol,
                        action() {
                            p.app.updateConfig({ theme: t.name });
                        }
                    }))),
                    ...(0, board_2.mapKeysToSlots)(layout_2.SecondRow, [
                        ...[
                            ["light", "🌞"],
                            ["dark", "🌚"],
                            ["system", "📟"]
                        ].map(([mode, symbol]) => new key_1.ConfigActionKey({
                            active: p.config.themeMode == mode,
                            name: mode, symbol: symbol,
                            action() {
                                p.app.updateConfig({ themeMode: mode });
                            }
                        }))
                    ])
                };
            }
        },
        {
            name: "Display",
            symbol: "🖥️",
            keys(p) {
                return {
                    ...(0, board_2.mapKeysToSlots)(layout_2.FirstRow, [
                        new key_1.ConfigActionKey({
                            symbol: "--", name: "-10", action() {
                                p.app.updateConfig({ opacity: Math.max(p.config.opacity - .1, .2) });
                            }
                        }),
                        new key_1.ConfigActionKey({
                            symbol: "-", name: "-1", action() {
                                p.app.updateConfig({ opacity: Math.max(p.config.opacity - .01, .2) });
                            }
                        }),
                        new key_1.ConfigActionKey({
                            symbol: "+", name: "+1", action() {
                                p.app.updateConfig({ opacity: Math.min(p.config.opacity + .01, 1) });
                            }
                        }),
                        new key_1.ConfigActionKey({
                            symbol: "++", name: "+10", action() {
                                p.app.updateConfig({ opacity: Math.min(p.config.opacity + .1, 1) });
                            }
                        }),
                        new key_1.ConfigActionKey({
                            symbol: `${Math.round(p.config.opacity * 100)}`, name: "reset", action() {
                                p.app.updateConfig({ opacity: exports.DefaultOpacity });
                            }
                        }),
                        new key_1.ConfigLabelKey("Opacity")
                    ]),
                    ...(0, board_2.mapKeysToSlots)(layout_2.SecondRow, [
                        new key_1.ConfigToggleKey({
                            active: p.config.devTools,
                            action() {
                                p.app.updateConfig({ devTools: !p.config.devTools });
                            }
                        }),
                        new key_1.ConfigLabelKey("Open DevTools")
                    ]),
                };
            }
        },
        {
            "name": "Tools",
            "symbol": "🔨",
            keys(p) {
                if (!p.config.devTools)
                    return {};
                return {
                    ...(0, board_2.mapKeysToSlots)(layout_2.FirstRow, [
                        new key_1.ConfigActionKey({
                            name: "Build",
                            symbol: "🏗️",
                            action() {
                                (0, builder_3.makeBuild)();
                            }
                        })
                    ]),
                };
            }
        }
    ];
    exports.DefaultConfigPage = ConfigPages[0];
    function ConfigView(p) {
        const keys = (0, hooks_2.useMemo)(() => ({
            [41]: new key_1.ExitSearchKey(),
            ...(0, board_2.mapKeysToSlots)(layout_2.DigitsRow, ConfigPages.map((c) => new key_1.ConfigPageKey(c, c == p.sharedState.configPage))),
            ...p.sharedState.configPage.keys(p)
        }), [p.sharedState.configPage, p.layout, p.config]);
        p.app.keyHandlers = keys;
        const layout = (0, hooks_2.useContext)(appVar_2.LayoutContext);
        return (0, preact_3.h)("div", { className: "keyboard" }, layout.all.map((code) => (keys[code] ?? key_1.BlankKey).render(p, code)));
    }
    exports.ConfigView = ConfigView;
});
define("config/boards", ["require", "exports", "chars"], function (require, exports, chars_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DEFAULT_KEYBOARDS = void 0;
    exports.DEFAULT_KEYBOARDS = [
        {
            name: "Happy",
            symbol: "😀",
            content: [
                { group: "Smileys & Emotion", subGroup: "face-smiling" },
                { group: "Smileys & Emotion", subGroup: "face-affection" },
                { group: "Smileys & Emotion", subGroup: "face-tongue" },
                { group: "Smileys & Emotion", subGroup: "face-hand" },
                { group: "Smileys & Emotion", subGroup: "face-neutral-skeptical" },
                { group: "Smileys & Emotion", subGroup: "face-hat" },
                { group: "Smileys & Emotion", subGroup: "face-glasses" },
            ]
        },
        {
            name: "Unwell",
            symbol: "😱",
            content: [
                { group: "Smileys & Emotion", subGroup: "face-sleepy" },
                { group: "Smileys & Emotion", subGroup: "face-unwell" },
                { group: "Smileys & Emotion", subGroup: "face-concerned" },
                { group: "Smileys & Emotion", subGroup: "face-negative" },
            ]
        },
        {
            name: "Roles",
            symbol: "👻",
            content: [
                { group: "Smileys & Emotion", subGroup: "face-costume" },
                { group: "People & Body", subGroup: "person-fantasy" }
            ]
        },
        {
            name: "Body",
            symbol: "👍",
            content: [
                { group: "People & Body", subGroup: "hand-fingers-open" },
                { group: "People & Body", subGroup: "hand-fingers-partial" },
                { group: "People & Body", subGroup: "hand-single-finger" },
                { group: "People & Body", subGroup: "hand-fingers-closed" },
                { group: "People & Body", subGroup: "hands" },
                { group: "People & Body", subGroup: "hand-prop" },
                { group: "People & Body", subGroup: "body-parts" },
            ]
        },
        {
            name: "Gestures & activities",
            symbol: "💃",
            content: [
                { group: "People & Body", subGroup: "person-gesture" },
                { group: "People & Body", subGroup: "person-activity" },
                { group: "People & Body", subGroup: "person-resting" }
            ]
        },
        {
            name: "Persons",
            symbol: "👤",
            content: [
                { group: "People & Body", subGroup: "person" },
                { group: "People & Body", subGroup: "person-role" },
                { group: "People & Body", subGroup: "person-symbol" }
            ]
        },
        {
            name: "Emotions",
            symbol: "😺",
            content: [
                { group: "Smileys & Emotion", subGroup: "cat-face" },
                { group: "Smileys & Emotion", subGroup: "monkey-face" },
                { group: "Smileys & Emotion", subGroup: "heart" },
                { group: "Smileys & Emotion", subGroup: "emotion" }
            ]
        },
        {
            name: "Families",
            symbol: "👪",
            content: [
                { group: "People & Body", subGroup: "family" }
            ]
        },
        {
            name: "Clothing",
            symbol: "👖",
            content: [
                { group: "Objects", subGroup: "clothing" }
            ]
        },
        {
            name: "Animals",
            symbol: "🐦",
            content: [
                { group: "Animals & Nature", subGroup: "animal-mammal" },
                { group: "Animals & Nature", subGroup: "animal-bird" },
                { group: "Animals & Nature", subGroup: "animal-amphibian" },
                { group: "Animals & Nature", subGroup: "animal-reptile" },
                { group: "Animals & Nature", subGroup: "animal-marine" },
                { group: "Animals & Nature", subGroup: "animal-bug" }
            ]
        },
        {
            name: "Plants",
            symbol: "🌹",
            content: [
                { group: "Animals & Nature", subGroup: "plant-flower" },
                { group: "Animals & Nature", subGroup: "plant-other" }
            ]
        },
        {
            name: "Raw food",
            symbol: "🥝",
            content: [
                { group: "Food & Drink", subGroup: "food-fruit" },
                { group: "Food & Drink", subGroup: "food-vegetable" },
                { group: "Food & Drink", subGroup: "food-marine" },
                { group: "Food & Drink", subGroup: "drink" },
                { group: "Food & Drink", subGroup: "dishware" }
            ]
        },
        {
            name: "Cooked",
            symbol: "🌭",
            content: [
                { group: "Food & Drink", subGroup: "food-prepared" },
                { group: "Food & Drink", subGroup: "food-asian" },
                { group: "Food & Drink", subGroup: "food-sweet" }
            ]
        },
        {
            name: "Places",
            symbol: "🏡",
            content: [
                { group: "Travel & Places", subGroup: "place-map" },
                { group: "Travel & Places", subGroup: "place-geographic" },
                { group: "Travel & Places", subGroup: "place-building" },
                { group: "Travel & Places", subGroup: "place-religious" },
                { group: "Travel & Places", subGroup: "place-other" },
                { group: "Travel & Places", subGroup: "hotel" }
            ]
        },
        {
            name: "Vehicles",
            symbol: "🚗",
            content: [
                { group: "Travel & Places", subGroup: "transport-ground" }
            ]
        },
        {
            name: "Ships",
            symbol: "✈",
            content: [
                { group: "Travel & Places", subGroup: "transport-air" },
                { group: "Travel & Places", subGroup: "transport-water" }
            ]
        },
        {
            name: "Time",
            symbol: "⌛",
            content: [
                { group: "Travel & Places", subGroup: "time" }
            ]
        },
        {
            name: "Weather",
            symbol: "⛅",
            content: [
                { group: "Travel & Places", subGroup: "sky & weather" }
            ]
        },
        {
            name: "Sports",
            symbol: "🎽",
            content: [
                { group: "Activities", subGroup: "sport" },
                { group: "People & Body", subGroup: "person-sport" }
            ]
        },
        {
            name: "Activities",
            symbol: "🎮",
            content: [
                { group: "Activities", subGroup: "event" },
                { group: "Activities", subGroup: "award-medal" },
                { group: "Activities", subGroup: "game" },
                { group: "Activities", subGroup: "arts & crafts" }
            ]
        },
        {
            name: "Sound & light",
            symbol: "🎥",
            content: [
                { group: "Objects", subGroup: "sound" },
                { group: "Objects", subGroup: "music" },
                { group: "Objects", subGroup: "musical-instrument" },
                { group: "Objects", subGroup: "light & video" }
            ]
        },
        {
            name: "Tech",
            symbol: "💻",
            content: [
                { group: "Objects", subGroup: "phone" },
                { group: "Objects", subGroup: "computer" },
                { group: "Objects", subGroup: "mail" },
            ]
        },
        {
            name: "Paper & things",
            symbol: "📜",
            content: [
                { group: "Objects", subGroup: "book-paper" },
                { group: "Objects", subGroup: "money" },
                { group: "Objects", subGroup: "writing" },
                { group: "Objects", subGroup: "science" },
                { group: "Objects", subGroup: "medical" },
                { group: "Objects", subGroup: "household" },
                { group: "Objects", subGroup: "other-object" },
            ]
        },
        {
            name: "Work",
            symbol: "💼",
            content: [
                { group: "Objects", subGroup: "office" },
                { group: "Objects", subGroup: "lock" },
                { group: "Objects", subGroup: "tool" }
            ]
        },
        {
            name: "Signs",
            symbol: "⛔",
            content: [
                { group: "Symbols", subGroup: "transport-sign" },
                { group: "Symbols", subGroup: "warning" },
                { group: "Symbols", subGroup: "zodiac" }
            ]
        },
        {
            name: "Symbols",
            symbol: "⚜",
            content: [
                { group: "Symbols", subGroup: "religion" },
                { group: "Symbols", subGroup: "gender" },
                { group: "Symbols", subGroup: "punctuation" },
                { group: "Symbols", subGroup: "currency" },
                { group: "Symbols", subGroup: "other-symbol" }
            ]
        },
        {
            name: "Arrows",
            symbol: "↕",
            content: [
                { group: "Symbols", subGroup: "arrow" },
                { "from": "←", "to": "⇿" }
            ]
        },
        {
            name: "Alphanum",
            symbol: "🔤",
            content: [
                { group: "Symbols", subGroup: "alphanum" }
            ]
        },
        {
            name: "Geometric & keys",
            symbol: "🔷",
            content: [
                { group: "Symbols", subGroup: "keycap" },
                { group: "Symbols", subGroup: "geometric" },
                { group: "Symbols", subGroup: "av-symbol" }
            ]
        },
        {
            name: "Country Flags",
            symbol: "🌐",
            content: [
                { group: "Flags", subGroup: "country-flag" }
            ]
        },
        {
            name: "Flags",
            symbol: "🏁",
            content: [
                { group: "Flags", subGroup: "subdivision-flag" },
                { group: "Flags", subGroup: "flag" }
            ]
        },
        {
            name: "Greek",
            symbol: "π",
            content: [
                "ϕ",
            ],
            byVK: {
                [65]: ["α", "Α"],
                [66]: ["β", "Β"],
                [67]: ["ψ", "Ψ"],
                [68]: ["δ", "Δ"],
                [69]: ["ε", "Ε"],
                [70]: ["φ", "Φ"],
                [71]: ["γ", "Γ"],
                [72]: ["η", "Η"],
                [73]: ["ι", "Ι"],
                [74]: ["ξ", "Ξ"],
                [75]: ["κ", "Κ"],
                [76]: ["λ", "Λ"],
                [77]: ["μ", "Μ"],
                [78]: ["ν", "Ν"],
                [79]: ["ο", "Ο"],
                [80]: ["π", "Π"],
                [81]: ";",
                [82]: ["ρ", "Ρ"],
                [83]: ["σ", "Σ"],
                [84]: ["τ", "Τ"],
                [85]: ["θ", "Θ"],
                [86]: ["ω", "Ω"],
                [87]: ["ς", "ϐ"],
                [88]: ["χ", "Χ"],
                [89]: ["υ", "Υ"],
                [90]: ["ζ", "Ζ"],
                [188]: "ϵ",
                [190]: "·",
            }
        },
        {
            name: "Boxes",
            symbol: "╚",
            bySC: {
                [2]: ["┌", "╔"],
                [3]: ["┬", "╦"],
                [4]: ["┐", "╗"],
                [16]: ["├", "╠"],
                [17]: ["┼", "╬"],
                [18]: ["┤", "╣"],
                [30]: ["└", "╚"],
                [31]: ["┴", "╩"],
                [32]: ["┘", "╝"],
                [44]: ["│", "║"],
                [45]: ["─", "═"],
                [46]: "╳",
                [5]: ["┏", "┍", "┎"],
                [6]: ["┳", "┭", "┮", "┯", "┰", "┱", "┲"],
                [7]: ["┓", "┑", "┒"],
                [19]: ["┣", "┝", "┞", "┟", "┠", "┡", "┢"],
                [20]: ["╋", "┽", "┾", "┿", "╀", "╁", "╂", "╃", "╄", "╅", "╆", "╇", "╈", "╉", "╊"],
                [21]: ["┫", "┥", "┦", "┧", "┨", "┩", "┪"],
                [33]: ["┗", "┕", "┖"],
                [34]: ["┻", "┵", "┶", "┷", "┸", "┹", "┺"],
                [35]: ["┛", "┙", "┚"],
                [47]: ["┃", "┆", "┇", "┊", "┋", "╎", "╏", "╽", "╿"],
                [48]: ["━", "┄", "┅", "┈", "┉", "╌", "╍", "╼", "╾"],
                [49]: ["╴", "╸"],
                [8]: ["╒", "╓"],
                [9]: ["╤", "╥"],
                [10]: ["╕", "╖"],
                [22]: ["╞", "╟"],
                [23]: ["╪", "╫"],
                [24]: ["╡", "╢"],
                [36]: ["╘", "╙"],
                [37]: ["╧", "╨"],
                [38]: ["╛", "╜"],
                [50]: ["╵", "╹"],
                [51]: ["╷", "╻"],
                [52]: ["╶", "╺"],
                [11]: "╭",
                [12]: "╮",
                [25]: "╰",
                [26]: "╯",
                [39]: "╱",
                [40]: "╲",
            }
        },
        {
            name: `Typo${chars_2.SoftHyphen}graphy`,
            symbol: "‽",
            content: [
                "\u00a0",
                "\u202f",
                "\u2001",
                "\u2000",
                "\u2003",
                "\u2002",
                "\u2004",
                "\u2005",
                "\u2006",
                "\u2009",
                "\u200a",
                "\u2007",
                "\u2008",
                "\u200b",
                "\u200c",
                chars_2.ZeroWidthJoiner,
                "\u205f",
                "\u3000",
                chars_2.SoftHyphen,
                "–", "—", "―",
                "“", "”", "‟", "„", "«", "»", "‹", "›", "‘", "’", "‛", "‚",
                "¿", "¡", "‽", "‼", "°", "¦",
            ]
        },
        {
            name: "Currency",
            symbol: "¤",
            content: [
                "¤",
                "₳", "؋", "฿", "₵", "¢", "₡", "₢", "$", "₫", "₯", "₠", "€", "ƒ", "₣", "₲", "₴", "₭", "₤", "ℳ", "₥", "₦", "₪", "₧", "₱", "₰", "£", "﷼", "៛", "૱", "௹", "₨", "৳", "৲", "₮", "₩", "円", "¥", "元", "圓"
            ]
        }
    ];
});
define("board", ["require", "exports", "preact", "ahk", "preact/hooks", "builder/titleCase", "config/boards", "appVar", "key", "memoize-one", "unicodeInterface", "helpers", "builder/builder"], function (require, exports, preact_4, ahk_3, hooks_3, titleCase_2, boards_1, appVar_3, key_2, memoize_one_1, unicodeInterface_3, helpers_2, builder_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StaticBoard = exports.Board = exports.View = exports.mapKeysToSlots = exports.KeyboardView = exports.getMainBoard = void 0;
    function getMainBoard() {
        return Board.fromKeys({
            name: 'Main keyboard',
            top: true,
            symbol: '⌨',
            keys: boards_1.DEFAULT_KEYBOARDS.map((k) => new key_2.KeyboardKey(Board.fromEmoji(k)))
        });
    }
    exports.getMainBoard = getMainBoard;
    const MAX_PAGE_KEYS = 9;
    function KeyboardView(p) {
        const board = p.sharedState.board;
        const state = p.sharedState.state[board.name];
        const l = (0, hooks_3.useContext)(appVar_3.LayoutContext);
        const pages = (0, hooks_3.useMemo)(() => board.keys(l, p.config), [board, l, p.config]);
        const keys = pages[state?.page ?? 0] ?? pages[0];
        p.app.keyHandlers = keys;
        return (0, preact_4.h)("div", { className: "keyboard" }, l.all.map((code) => (keys[code] ?? key_2.BlankKey).render(p, code)));
    }
    exports.KeyboardView = KeyboardView;
    function mapKeysToSlots(codes, keys) {
        const mapped = {};
        for (const [index, code] of Array.from(codes.entries())) {
            if (keys[index])
                mapped[code] = keys[index];
        }
        return mapped;
    }
    exports.mapKeysToSlots = mapKeysToSlots;
    function range(stop) {
        return Array.from((new Array(stop)).keys());
    }
    class View {
    }
    exports.View = View;
    class Board {
        constructor(p) {
            this.name = p.name;
            this.symbol = p.symbol;
        }
        name;
        symbol;
        showStatus(str) {
            if (!str.length)
                return this.hideStatus();
            (0, ahk_3.ahkTitle)(this.name + ": " + (0, titleCase_2.toTitleCase)(str));
        }
        hideStatus() {
            (0, ahk_3.ahkTitle)(this.name);
        }
        static fromKeys({ name, symbol, keys, top, bySC, byVK }) {
            return new StaticBoard({
                name, symbol, keys: (layout) => {
                    let freeKeys = layout.free;
                    const fixedKeys = {
                        [41]: top ? new key_2.ConfigKey() : new key_2.BackKey(),
                        [15]: new key_2.SearchKey(),
                    };
                    if (bySC) {
                        Object.assign(fixedKeys, bySC);
                        freeKeys = freeKeys.filter(sc => !fixedKeys[sc]);
                    }
                    if (byVK) {
                        for (const sc of freeKeys) {
                            const vk = layout.sys[sc].vk;
                            if (byVK[vk]) {
                                fixedKeys[sc] = byVK[vk];
                            }
                        }
                        freeKeys = freeKeys.filter(sc => !fixedKeys[sc]);
                    }
                    if (keys.length > freeKeys.length) {
                        let pages = 1;
                        while (keys.length > pages * (freeKeys.length - Math.min(pages, MAX_PAGE_KEYS))) {
                            pages++;
                        }
                        const pageKeys = Math.min(pages, MAX_PAGE_KEYS);
                        const perPage = freeKeys.length - pageKeys;
                        return range(pages).map((i) => {
                            const pagesStart = i <= 4;
                            const pagesEnd = i >= pages - 5;
                            const page = []
                                .concat(range(pageKeys).map((j) => {
                                if (pages == pageKeys)
                                    return new key_2.PageKey(j, i == j);
                                else
                                    switch (j) {
                                        case 0:
                                            return new key_2.PageKey(0, i == 0);
                                        case 1:
                                            if (pagesStart)
                                                return new key_2.PageKey(1, i == 1);
                                            if (pagesEnd)
                                                return new key_2.PageKey(pages - 8, i == pages - 8);
                                            return new key_2.PageKey(i - 3, false);
                                        case 2:
                                            if (pagesStart)
                                                return new key_2.PageKey(2, i == 2);
                                            if (pagesEnd)
                                                return new key_2.PageKey(pages - 7, i == pages - 7);
                                            return new key_2.PageKey(i - 2, false);
                                        case 3:
                                            if (pagesStart)
                                                return new key_2.PageKey(3, i == 3);
                                            if (pagesEnd)
                                                return new key_2.PageKey(pages - 6, i == pages - 6);
                                            return new key_2.PageKey(i - 1, false);
                                        case 4:
                                            if (pagesStart)
                                                return new key_2.PageKey(4, i == 4);
                                            if (pagesEnd)
                                                return new key_2.PageKey(pages - 5, i == pages - 5);
                                            return new key_2.PageKey(i, true);
                                        case 5:
                                            if (pagesStart)
                                                return new key_2.PageKey(5, i == 5);
                                            if (pagesEnd)
                                                return new key_2.PageKey(pages - 4, i == pages - 4);
                                            return new key_2.PageKey(i + 1, false);
                                        case 6:
                                            if (pagesStart)
                                                return new key_2.PageKey(6, i == 6);
                                            if (pagesEnd)
                                                return new key_2.PageKey(pages - 3, i == pages - 3);
                                            return new key_2.PageKey(i + 2, false);
                                        case 7:
                                            if (pagesStart)
                                                return new key_2.PageKey(7, i == 7);
                                            if (pagesEnd)
                                                return new key_2.PageKey(pages - 2, i == pages - 2);
                                            return new key_2.PageKey(i + 3, false);
                                        case 8:
                                            return new key_2.PageKey(pages - 1, i == pages - 1);
                                        default:
                                            return key_2.BlankKey;
                                    }
                            }))
                                .concat(keys.slice(i * perPage, i * perPage + perPage));
                            return { ...fixedKeys, ...mapKeysToSlots(freeKeys, page) };
                        });
                    }
                    else {
                        return [{ ...fixedKeys, ...mapKeysToSlots(freeKeys, keys) }];
                    }
                }
            });
        }
        static fromItem(item) {
            if (item === null) {
                return key_2.BlankKey;
            }
            else if (typeof item === 'string') {
                return new key_2.ClusterKey(item);
            }
            else if (Array.isArray(item)) {
                if (item.length) {
                    return new key_2.ClusterKey(item[0], item);
                }
                return key_2.BlankKey;
            }
            else {
                return (0, helpers_2.unreachable)(item);
            }
        }
        static fromContents(contents) {
            const keys = [];
            for (const item of contents) {
                if (item === null || typeof item === 'string' || Array.isArray(item)) {
                    keys.push(this.fromItem(item));
                }
                else if (item.group) {
                    keys.push(...(0, unicodeInterface_3.emojiGroup)(item).map(c => new key_2.ClusterKey(c)));
                }
                else if (typeof item.from !== 'undefined') {
                    const from = typeof item.from === 'number' ? item.from : (0, builder_4.toCodePoints)(item.from)[0];
                    const to = typeof item.to === 'number' ? item.to : (0, builder_4.toCodePoints)(item.to)[0];
                    if (from && to && to > from) {
                        for (let i = from; i <= to; ++i)
                            keys.push(new key_2.ClusterKey(String.fromCodePoint(i)));
                    }
                }
                else {
                    return (0, helpers_2.unreachable)(item);
                }
            }
            return keys;
        }
        static fromEmoji(k) {
            const keys = this.fromContents(k.content ?? []);
            const bySC = (0, helpers_2.fromEntries)(k.bySC ? Object.entries(k.bySC).map(([k, v]) => [k, this.fromItem(v)]) : []);
            const byVK = (0, helpers_2.fromEntries)(k.byVK ? Object.entries(k.byVK).map(([k, v]) => [k, this.fromItem(v)]) : []);
            return this.fromKeys({ name: k.name, symbol: k.symbol, keys, bySC, byVK });
        }
        static clusterAlternates(cluster, variants) {
            const keys = variants.map((c) => new key_2.ClusterKey(c, []));
            return this.fromKeys({ name: (0, unicodeInterface_3.clusterName)(cluster), symbol: cluster, keys });
        }
    }
    exports.Board = Board;
    class StaticBoard extends Board {
        _keys;
        constructor({ keys, ...p }) {
            super(p);
            this._keys = (0, memoize_one_1.default)(keys);
        }
        keys(layout, config) {
            return this._keys(layout);
        }
    }
    exports.StaticBoard = StaticBoard;
});
define("emojis", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.search = void 0;
    const indexedEmojis = {};
    const flatEmojis = [];
    let searchHaystack = "";
    const ESCAPE_REGEX = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-'].join('|\\') + ')', 'g');
    const SEPARATOR = '%';
    const SEPARATOR_REGEX_G = /%/g;
    const SEARCH_ID = SEPARATOR + '(\\d+)' + SEPARATOR + '[^' + SEPARATOR + ']+';
    data.emojis.forEach((emoji) => {
        if (!indexedEmojis[emoji.group])
            indexedEmojis[emoji.group] = {};
        if (!indexedEmojis[emoji.group][emoji.subGroup])
            indexedEmojis[emoji.group][emoji.subGroup] = [];
        indexedEmojis[emoji.group][emoji.subGroup].push(emoji);
        (!emoji.alternates || !emoji.alternates.length ? [emoji] : emoji.alternates)
            .forEach(e => {
            searchHaystack +=
                '%' + flatEmojis.length + '%' +
                    (e.fullName + ' ' + e.name + (e.keywords ? ' ' + e.keywords.join(' ') : '')).replace(SEPARATOR_REGEX_G, '');
            flatEmojis.push(e);
        });
    });
    function escapeRegex(str) {
        return str.replace(ESCAPE_REGEX, '\\$1');
    }
    function search(needle) {
        let result = [];
        needle.split(/\s+/g).forEach((n, k) => {
            let filter = [];
            if (!n.length)
                return;
            const re = new RegExp(SEARCH_ID + escapeRegex(n.replace(SEPARATOR_REGEX_G, '')), 'ig');
            for (let m; (m = re.exec(searchHaystack));) {
                filter.push(parseInt(m[1]));
            }
            if (k == 0)
                result = filter;
            else
                result = result.filter(v => filter.indexOf(v) !== -1);
        });
        return result.map(v => flatEmojis[v]);
    }
    exports.search = search;
});
define("search", ["require", "exports", "preact", "layout", "board", "emojis", "preact/hooks", "key", "appVar"], function (require, exports, preact_5, layout_3, board_3, emojis_1, hooks_4, key_3, appVar_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getSearchBoard = exports.SearchView = void 0;
    function SearchView(p) {
        (0, hooks_4.useEffect)(() => p.app.setSearchBoard(getSearchBoard(p.searchText)), [p.searchText]);
        (0, hooks_4.useEffect)(() => document.querySelector('input[type="search"]')?.focus(), []);
        const layout = (0, hooks_4.useContext)(appVar_4.LayoutContext);
        const pages = (0, hooks_4.useMemo)(() => p.sharedState.searchBoard.keys(layout, p.config), [p.sharedState.searchBoard, p.config]);
        const keys = pages[0];
        p.app.keyHandlers = keys;
        const table = layout_3.SearchKeyCodesTable;
        const onInput = (0, hooks_4.useCallback)((e) => p.app.setSearchText(e.target.value), [p.app]);
        return (0, preact_5.h)("div", { class: "keyboard" },
            (0, preact_5.h)("input", { type: "search", value: p.searchText, onInput: onInput }),
            table.map((code, row) => (0, preact_5.h)(preact_5.Fragment, { key: code }, (keys[code] ?? key_3.BlankKey).render(p, code))));
    }
    exports.SearchView = SearchView;
    function getSearchBoard(needle) {
        return new board_3.StaticBoard({ name: "Search", symbol: "🔎", keys: (l) => [
                {
                    [41]: new key_3.ExitSearchKey(),
                    [15]: new key_3.ExitSearchKey(),
                    ...(0, board_3.mapKeysToSlots)(layout_3.SearchKeyCodes, (0, emojis_1.search)(needle).map((c) => new key_3.ClusterKey(c.symbol)))
                }
            ] });
    }
    exports.getSearchBoard = getSearchBoard;
});
define("app", ["require", "exports", "preact", "layout", "board", "osversion", "ahk", "search", "emojis", "config", "helpers", "builder/titleCase", "appVar", "preact/hooks"], function (require, exports, preact_6, layout_4, board_4, osversion_2, ahk_4, search_1, emojis_2, config_1, helpers_3, titleCase_3, appVar_5, hooks_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppMode = void 0;
    var AppMode;
    (function (AppMode) {
        AppMode[AppMode["MAIN"] = 0] = "MAIN";
        AppMode[AppMode["SEARCH"] = 1] = "SEARCH";
        AppMode[AppMode["SETTINGS"] = 2] = "SETTINGS";
    })(AppMode = exports.AppMode || (exports.AppMode = {}));
    const AppModes = [0, 1, 2];
    class App extends preact_6.Component {
        keyHandlers = {};
        state = {
            mode: 0,
            searchText: '',
            layout: layout_4.SystemLayoutUS,
            config: { ...config_1.DefaultConfig, opacity: 1 },
            sharedState: {
                board: (0, board_4.getMainBoard)(),
                searchBoard: (0, search_1.getSearchBoard)(''),
                configPage: config_1.DefaultConfigPage,
                state: {}
            },
            os: new osversion_2.Version('99'),
            parentBoards: (0, helpers_3.fromEntries)(AppModes.map(m => [m, []]))
        };
        constructor(props) {
            super(props);
            (0, appVar_5.setApp)(this);
            window.document.ahk = this;
            window.s = emojis_2.search;
            window.chrome?.webview?.addEventListener('message', (e) => {
                if (Array.isArray(e.data)) {
                    switch (e.data[0]) {
                        case 'input':
                            this.input(e.data[1], e.data[2]);
                            break;
                        case 'layout':
                            this.setSystemLayout(e.data[1]);
                            break;
                        case 'size':
                            this.updateConfig({ width: e.data[1], height: e.data[2] });
                            break;
                        default:
                            console.log("message", e.data[0], e.data);
                    }
                }
                else if (typeof e.data === 'string') {
                    const command = e.data.split(',', 1)[0];
                    const rest = e.data.slice(command.length + 1);
                    switch (command) {
                        case 'config':
                            this.setConfig(rest);
                            break;
                        case 'defaultConfig':
                            this.defaultConfig();
                            break;
                        case 'os':
                            this.setOS(rest);
                            break;
                        default:
                            console.log("message", command, rest);
                    }
                }
                else {
                    console.log("message", e.data);
                }
            });
        }
        render() {
            const s = this.state;
            let c;
            switch (s.mode) {
                case 0:
                    c = (0, preact_6.h)(board_4.KeyboardView, { ...s, app: this });
                    break;
                case 1:
                    c = (0, preact_6.h)(search_1.SearchView, { ...s, app: this });
                    break;
                case 2:
                    c = (0, preact_6.h)(config_1.ConfigView, { ...s, app: this });
                    break;
                default:
                    return (0, helpers_3.unreachable)(s.mode);
            }
            const l = (0, hooks_5.useMemo)(() => {
                const base = s.config.isoKeyboard ? layout_4.IsoLayout : layout_4.AnsiLayout;
                return { ...base, sys: s.layout };
            }, [s.config.isoKeyboard, s.layout]);
            return (0, preact_6.h)(appVar_5.LayoutContext.Provider, { value: l },
                (0, preact_6.h)(appVar_5.OSContext.Provider, { value: s.os },
                    (0, preact_6.h)("div", { className: `root ${s.config.themeMode}-color-scheme ${l.cssClass}` }, c)));
        }
        setMode(mode) {
            this.setState((s) => {
                if (s.mode != mode) {
                    if (mode == 1)
                        (0, ahk_4.ahkSetSearch)(true);
                    if (s.mode == 1)
                        (0, ahk_4.ahkSetSearch)(false);
                }
                return { mode };
            }, () => {
                this.updateStatus();
            });
        }
        updateStatus(text) {
            const s = this.state;
            switch (s.mode) {
                case 0:
                    (0, ahk_4.ahkTitle)(s.sharedState.board.name + (text?.length ? `: ${(0, titleCase_3.toTitleCase)(text)}` : ''));
                    break;
                case 1:
                    (0, ahk_4.ahkTitle)('Emoji Keyboard - Search' + (s.searchText.length ? `: ${(0, titleCase_3.toTitleCase)(s.searchText)}` : ''));
                    break;
                case 2:
                    (0, ahk_4.ahkTitle)('Emoji Keyboard - Settings');
                    break;
                default:
                    return (0, helpers_3.unreachable)(s.mode);
            }
        }
        input(key, shift = false) {
            const s = this.state;
            switch (s.mode) {
                case 0:
                case 1:
                case 2:
                    const k = this.keyHandlers[key];
                    if (k) {
                        if (shift)
                            k.actAlternate();
                        else
                            k.act();
                    }
                    break;
                default:
                    return (0, helpers_3.unreachable)(s.mode);
            }
        }
        setConfig(config) {
            this.updateConfig(JSON.parse(config), false);
        }
        defaultConfig() {
            (0, ahk_4.ahkSaveConfig)(JSON.stringify(this.state.config));
            (0, ahk_4.ahkSetOpacity)(this.state.config.opacity);
        }
        updateConfig(config, save = true) {
            this.setState((s) => {
                if (config.theme && s.config.theme != config.theme) {
                    const link = document.getElementById('themeCSS');
                    link.href = config_1.ThemesMap.get(config.theme)?.url ?? config_1.DefaultThemeUrl;
                }
                if (config.opacity && s.config.opacity != config.opacity) {
                    (0, ahk_4.ahkSetOpacity)(config.opacity);
                }
                if (config.devTools && !s.config.devTools) {
                    (0, ahk_4.ahkOpenDevTools)();
                }
                return { config: { ...s.config, ...config } };
            }, () => {
                if (save)
                    (0, ahk_4.ahkSaveConfig)(JSON.stringify(this.state.config));
            });
        }
        setOS(os) {
            os = os.replace(/^WIN_/, '');
            this.setState({ os: new osversion_2.Version(os) });
        }
        setSystemLayout(layout) {
            this.setState({ layout: { ...layout_4.SystemLayoutUS, ...layout } });
        }
        setSearchText(searchText) {
            this.setState({ searchText }, () => this.updateStatus());
        }
        setBoard(board) {
            this.setState((s) => ({
                parentBoards: { ...s.parentBoards, [s.mode]: [s.sharedState.board, ...s.parentBoards[s.mode]] },
                sharedState: { ...s.sharedState, board }
            }), () => this.updateStatus());
        }
        setSearchBoard(searchBoard) {
            this.setState((s) => ({ sharedState: { ...s.sharedState, searchBoard } }), () => this.updateStatus());
        }
        setConfigPage(configPage) {
            this.setState((s) => ({ sharedState: { ...s.sharedState, configPage } }));
        }
        setPage(page) {
            this.setState((s) => ({
                sharedState: {
                    ...s.sharedState,
                    state: { ...s.sharedState.state, [s.sharedState.board.name]: { page } }
                }
            }));
        }
        back() {
            this.setState((s) => {
                if (s.parentBoards[s.mode].length) {
                    const [b, ...p] = s.parentBoards[s.mode];
                    return {
                        parentBoards: { ...s.parentBoards, [s.mode]: p },
                        sharedState: { ...s.sharedState, board: b },
                    };
                }
                return {};
            });
        }
    }
    const main = document.querySelector('main');
    preact_6.options.debounceRendering = f => setTimeout(f, 0);
    (0, preact_6.render)((0, preact_6.h)(App, null), main);
    setTimeout(() => (0, ahk_4.ahkReady)(), 0);
});
//# sourceMappingURL=script.js.map
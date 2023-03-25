"use strict";
define("builder/config", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
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
define("builder/unicode", ["require", "exports", "peggy"], function (require, exports, peggy) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseAnnotations = exports.parseEmojiTest = exports.parseNamesList = exports.parseUnicodeData = exports.BidiClass = exports.CanonicalCombiningClass = exports.GeneralCategory = exports.parseEmojiVersions = void 0;
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
    async function parseAnnotations(paths) {
        const data = await fetch(paths.annotationsPath).then(f => f.json());
        return (data.annotations);
    }
    exports.parseAnnotations = parseAnnotations;
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
    exports.getUnicodeData = exports.consolidateUnicodeData = exports.toHex = void 0;
    const ExcludeStem = new Set(["keycap", "flag", "family"]);
    function toHex(code) {
        return code.toString(16).toUpperCase().padStart(4, '0');
    }
    exports.toHex = toHex;
    function consolidateUnicodeData({ annotations, namesList, unicodeData, emojiVersion, emojiTest }) {
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
                    const str = String.fromCodePoint(char.code);
                    const u = unicodeData[char.code];
                    const ev = emojiVersion[char.code];
                    const seq = emojiTest.sequences[str];
                    const a = annotations.annotations[str];
                    const c = {
                        n: char.name,
                        code: char.code,
                    };
                    if (char.alias || a?.default) {
                        c.alias = [...(char.alias ?? []), ...(a?.default ?? [])];
                    }
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
                    if (u?.category)
                        c.ca = u.category;
                    if (u?.combining)
                        c.cb = u.combining;
                    if (u?.bidiClass)
                        c.bc = u.bidiClass;
                    if (u?.bidiMirrored)
                        c.bm = u.bidiMirrored;
                    if (u?.decompositionUD)
                        c.de2 = u.decompositionUD;
                    if (u?.decimalDigit)
                        c.decimalDigit = u.decimalDigit;
                    if (u?.digit)
                        c.digit = u.digit;
                    if (u?.numeric)
                        c.numeric = u.numeric;
                    if (u?.unicode1)
                        c.u1 = u.unicode1;
                    if (u?.uppercase)
                        c.uppercase = u.uppercase;
                    if (u?.lowercase)
                        c.lowercase = u.lowercase;
                    if (u?.titlecase)
                        c.titlecase = u.titlecase;
                    if (ev)
                        c.emojiVersion = ev;
                    if (seq)
                        c.n = seq.name;
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
                    const a = annotations.annotations[cluster];
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
                            if (a?.default)
                                c2.alias = a.default;
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
                        if (a?.default)
                            c.alias = a.default;
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
        const clusters = Object.fromEntries(u.clusters.map(c => [c.cluster, {
                ...c,
                name: (0, titleCase_1.toTitleCase)(c.name),
            }]));
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
                        n: (0, titleCase_1.toTitleCase)(idxChars[c].n),
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
    exports.ahkOpenDevTools = exports.ahkSetOpacity = exports.ahkSetOpenAt = exports.ahkSetPosSize = exports.ahkSaveUnicodeData = exports.ahkSaveConfig = exports.ahkSetSearch = exports.ahkSend = exports.ahkReady = exports.ahkTitle = exports.ahkDownloadUnicode = void 0;
    let AHK = null;
    window.chrome?.webview?.hostObjects?.ahk.then((ahk) => AHK = ahk);
    function isAHK() {
        return AHK !== null;
    }
    let nextNumber = 0;
    function waitForCallback() {
        const c = nextNumber++;
        return [c, new Promise((resolve, reject) => {
                const ok = `done,${c},`;
                const error = `error,${c},`;
                const listener = (e) => {
                    if (typeof e.data === 'string') {
                        if (e.data.startsWith(ok)) {
                            resolve();
                            window.chrome?.webview?.removeEventListener('message', listener);
                        }
                        if (e.data.startsWith(error)) {
                            reject(e.data.substring(error.length));
                            window.chrome?.webview?.removeEventListener('message', listener);
                        }
                    }
                };
                window.chrome?.webview?.addEventListener('message', listener);
                AHK.downloadUnicode(c);
            })];
    }
    async function ahkDownloadUnicode() {
        if (isAHK()) {
            const [c, p] = waitForCallback();
            setTimeout(() => AHK.downloadUnicode(c), 10);
            43;
            return p;
        }
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
    function ahkSetPosSize(x, y, width, height) {
        if (isAHK())
            AHK.setPosSize(x, y, width, height);
        else
            console.log("SetPosSize", x, y, width, height);
    }
    exports.ahkSetPosSize = ahkSetPosSize;
    function ahkSetOpenAt(at) {
        if (isAHK())
            AHK.setOpenAt(at);
        else
            console.log("SetOpenAt", at);
    }
    exports.ahkSetOpenAt = ahkSetOpenAt;
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
define("layout/vk", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.VK = void 0;
    var VK;
    (function (VK) {
        VK[VK["None"] = 0] = "None";
        VK[VK["Backspace"] = 8] = "Backspace";
        VK[VK["Tab"] = 9] = "Tab";
        VK[VK["Enter"] = 13] = "Enter";
        VK[VK["RightShift"] = 16] = "RightShift";
        VK[VK["Pause"] = 19] = "Pause";
        VK[VK["CapsLock"] = 20] = "CapsLock";
        VK[VK["Esc"] = 27] = "Esc";
        VK[VK["Space"] = 32] = "Space";
        VK[VK["SysReq"] = 44] = "SysReq";
        VK[VK["PrintScreen"] = 44] = "PrintScreen";
        VK[VK["Digit0"] = 48] = "Digit0";
        VK[VK["Digit1"] = 49] = "Digit1";
        VK[VK["Digit2"] = 50] = "Digit2";
        VK[VK["Digit3"] = 51] = "Digit3";
        VK[VK["Digit4"] = 52] = "Digit4";
        VK[VK["Digit5"] = 53] = "Digit5";
        VK[VK["Digit6"] = 54] = "Digit6";
        VK[VK["Digit7"] = 55] = "Digit7";
        VK[VK["Digit8"] = 56] = "Digit8";
        VK[VK["Digit9"] = 57] = "Digit9";
        VK[VK["A"] = 65] = "A";
        VK[VK["B"] = 66] = "B";
        VK[VK["C"] = 67] = "C";
        VK[VK["D"] = 68] = "D";
        VK[VK["E"] = 69] = "E";
        VK[VK["F"] = 70] = "F";
        VK[VK["G"] = 71] = "G";
        VK[VK["H"] = 72] = "H";
        VK[VK["I"] = 73] = "I";
        VK[VK["J"] = 74] = "J";
        VK[VK["K"] = 75] = "K";
        VK[VK["L"] = 76] = "L";
        VK[VK["M"] = 77] = "M";
        VK[VK["N"] = 78] = "N";
        VK[VK["O"] = 79] = "O";
        VK[VK["P"] = 80] = "P";
        VK[VK["Q"] = 81] = "Q";
        VK[VK["R"] = 82] = "R";
        VK[VK["S"] = 83] = "S";
        VK[VK["T"] = 84] = "T";
        VK[VK["U"] = 85] = "U";
        VK[VK["V"] = 86] = "V";
        VK[VK["W"] = 87] = "W";
        VK[VK["X"] = 88] = "X";
        VK[VK["Y"] = 89] = "Y";
        VK[VK["Z"] = 90] = "Z";
        VK[VK["Win"] = 91] = "Win";
        VK[VK["Num0"] = 96] = "Num0";
        VK[VK["Num1"] = 97] = "Num1";
        VK[VK["Num2"] = 98] = "Num2";
        VK[VK["Num3"] = 99] = "Num3";
        VK[VK["Num4"] = 100] = "Num4";
        VK[VK["Num5"] = 101] = "Num5";
        VK[VK["Num6"] = 102] = "Num6";
        VK[VK["Num7"] = 103] = "Num7";
        VK[VK["Num8"] = 104] = "Num8";
        VK[VK["Num9"] = 105] = "Num9";
        VK[VK["NumMult"] = 106] = "NumMult";
        VK[VK["NumAdd"] = 107] = "NumAdd";
        VK[VK["NumSub"] = 109] = "NumSub";
        VK[VK["NumDecimal"] = 110] = "NumDecimal";
        VK[VK["NumDiv"] = 111] = "NumDiv";
        VK[VK["F1"] = 112] = "F1";
        VK[VK["F2"] = 113] = "F2";
        VK[VK["F3"] = 114] = "F3";
        VK[VK["F4"] = 115] = "F4";
        VK[VK["F5"] = 116] = "F5";
        VK[VK["F6"] = 117] = "F6";
        VK[VK["F7"] = 118] = "F7";
        VK[VK["F8"] = 119] = "F8";
        VK[VK["F9"] = 120] = "F9";
        VK[VK["F10"] = 121] = "F10";
        VK[VK["F11"] = 122] = "F11";
        VK[VK["F12"] = 123] = "F12";
        VK[VK["NumLock"] = 144] = "NumLock";
        VK[VK["ScrollLock"] = 145] = "ScrollLock";
        VK[VK["Shift"] = 160] = "Shift";
        VK[VK["Ctrl"] = 162] = "Ctrl";
        VK[VK["RightCtrl"] = 163] = "RightCtrl";
        VK[VK["Alt"] = 164] = "Alt";
        VK[VK["RightAlt"] = 165] = "RightAlt";
        VK[VK["Semicolon"] = 186] = "Semicolon";
        VK[VK["Equal"] = 187] = "Equal";
        VK[VK["Comma"] = 188] = "Comma";
        VK[VK["Minus"] = 189] = "Minus";
        VK[VK["Period"] = 190] = "Period";
        VK[VK["Slash"] = 191] = "Slash";
        VK[VK["Backtick"] = 192] = "Backtick";
        VK[VK["LeftBrace"] = 219] = "LeftBrace";
        VK[VK["Backslash"] = 220] = "Backslash";
        VK[VK["RightBrace"] = 221] = "RightBrace";
        VK[VK["Apostrophe"] = 222] = "Apostrophe";
        VK[VK["LessThan"] = 226] = "LessThan";
    })(VK = exports.VK || (exports.VK = {}));
});
define("layout/sc", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SC = void 0;
    var SC;
    (function (SC) {
        SC[SC["None"] = 0] = "None";
        SC[SC["Esc"] = 1] = "Esc";
        SC[SC["F1"] = 59] = "F1";
        SC[SC["F2"] = 60] = "F2";
        SC[SC["F3"] = 61] = "F3";
        SC[SC["F4"] = 62] = "F4";
        SC[SC["F5"] = 63] = "F5";
        SC[SC["F6"] = 64] = "F6";
        SC[SC["F7"] = 65] = "F7";
        SC[SC["F8"] = 66] = "F8";
        SC[SC["F9"] = 67] = "F9";
        SC[SC["F10"] = 68] = "F10";
        SC[SC["F11"] = 87] = "F11";
        SC[SC["F12"] = 88] = "F12";
        SC[SC["Backspace"] = 14] = "Backspace";
        SC[SC["Tab"] = 15] = "Tab";
        SC[SC["CapsLock"] = 58] = "CapsLock";
        SC[SC["Enter"] = 28] = "Enter";
        SC[SC["Shift"] = 42] = "Shift";
        SC[SC["RightShift"] = 54] = "RightShift";
        SC[SC["Ctrl"] = 29] = "Ctrl";
        SC[SC["RightCtrl"] = 285] = "RightCtrl";
        SC[SC["Win"] = 91] = "Win";
        SC[SC["Alt"] = 56] = "Alt";
        SC[SC["RightAlt"] = 312] = "RightAlt";
        SC[SC["Backtick"] = 41] = "Backtick";
        SC[SC["Digit1"] = 2] = "Digit1";
        SC[SC["Digit2"] = 3] = "Digit2";
        SC[SC["Digit3"] = 4] = "Digit3";
        SC[SC["Digit4"] = 5] = "Digit4";
        SC[SC["Digit5"] = 6] = "Digit5";
        SC[SC["Digit6"] = 7] = "Digit6";
        SC[SC["Digit7"] = 8] = "Digit7";
        SC[SC["Digit8"] = 9] = "Digit8";
        SC[SC["Digit9"] = 10] = "Digit9";
        SC[SC["Digit0"] = 11] = "Digit0";
        SC[SC["Minus"] = 12] = "Minus";
        SC[SC["Equal"] = 13] = "Equal";
        SC[SC["Q"] = 16] = "Q";
        SC[SC["W"] = 17] = "W";
        SC[SC["E"] = 18] = "E";
        SC[SC["R"] = 19] = "R";
        SC[SC["T"] = 20] = "T";
        SC[SC["Y"] = 21] = "Y";
        SC[SC["U"] = 22] = "U";
        SC[SC["I"] = 23] = "I";
        SC[SC["O"] = 24] = "O";
        SC[SC["P"] = 25] = "P";
        SC[SC["LeftBrace"] = 26] = "LeftBrace";
        SC[SC["RightBrace"] = 27] = "RightBrace";
        SC[SC["Backslash"] = 43] = "Backslash";
        SC[SC["A"] = 30] = "A";
        SC[SC["S"] = 31] = "S";
        SC[SC["D"] = 32] = "D";
        SC[SC["F"] = 33] = "F";
        SC[SC["G"] = 34] = "G";
        SC[SC["H"] = 35] = "H";
        SC[SC["J"] = 36] = "J";
        SC[SC["K"] = 37] = "K";
        SC[SC["L"] = 38] = "L";
        SC[SC["Semicolon"] = 39] = "Semicolon";
        SC[SC["Apostrophe"] = 40] = "Apostrophe";
        SC[SC["LessThan"] = 86] = "LessThan";
        SC[SC["Z"] = 44] = "Z";
        SC[SC["X"] = 45] = "X";
        SC[SC["C"] = 46] = "C";
        SC[SC["V"] = 47] = "V";
        SC[SC["B"] = 48] = "B";
        SC[SC["N"] = 49] = "N";
        SC[SC["M"] = 50] = "M";
        SC[SC["Comma"] = 51] = "Comma";
        SC[SC["Period"] = 52] = "Period";
        SC[SC["Slash"] = 53] = "Slash";
        SC[SC["Space"] = 57] = "Space";
        SC[SC["Pause"] = 69] = "Pause";
        SC[SC["ScrollLock"] = 70] = "ScrollLock";
        SC[SC["SysReq"] = 84] = "SysReq";
        SC[SC["PrintScreen"] = 311] = "PrintScreen";
        SC[SC["NumLock"] = 325] = "NumLock";
        SC[SC["NumMult"] = 55] = "NumMult";
        SC[SC["NumSub"] = 74] = "NumSub";
        SC[SC["NumAdd"] = 78] = "NumAdd";
        SC[SC["NumDiv"] = 309] = "NumDiv";
        SC[SC["Num0"] = 82] = "Num0";
        SC[SC["NumDecimal"] = 83] = "NumDecimal";
        SC[SC["Num1"] = 79] = "Num1";
        SC[SC["Num2"] = 80] = "Num2";
        SC[SC["Num3"] = 81] = "Num3";
        SC[SC["Num4"] = 75] = "Num4";
        SC[SC["Num5"] = 76] = "Num5";
        SC[SC["Num6"] = 77] = "Num6";
        SC[SC["Num7"] = 71] = "Num7";
        SC[SC["Num8"] = 72] = "Num8";
        SC[SC["Num9"] = 73] = "Num9";
    })(SC = exports.SC || (exports.SC = {}));
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
        58, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012,
        42, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024
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
            42, 86, ...exports.ThirdRow, 1100
        ],
        free: [...exports.DigitsRow, ...exports.FirstRow, ...exports.SecondRow, 86, ...exports.ThirdRow],
        cssClass: 'iso-layout',
    };
    exports.SearchKeyCodes = [
        ...exports.DigitsRow,
        1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012,
        1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024
    ];
});
define("config/arrows", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ArrowsKeyboard = void 0;
    exports.ArrowsKeyboard = {
        name: "Arrows",
        symbol: "↔",
        bySC: {
            [16]: [
                "↖",
                "↸",
                "↰",
                "⤣",
            ],
            [17]: [
                "↑",
                "⇈",
                "⤉",
                "⇞",
                "↟",
                "↥",
                "⤒",
                "⥉",
                "⇡",
                "↿",
                "⥘",
                "⥠",
                "↾",
                "⥔",
                "⥜",
                "⥣",
            ],
            [18]: [
                "↗",
                "↱",
                "⤤",
            ],
            [30]: [
                "←",
                "↚",
                "⇇",
                "⬱",
                "⟵",
                "↢",
                "⬹",
                "⬺",
                "↤",
                "⟻",
                "↜",
                "⇜",
                "⬿",
                "⬳",
                "↩",
                "↫",
                "↶",
                "⤺",
                "⤽",
                "⇤",
                "⇷",
                "⇺",
                "⤌",
                "⤎",
                "⇠",
                "⬸",
                "↞",
                "⬴",
                "⬵",
                "⬶",
                "⬷",
                "⬻",
                "⬼",
                "⬽",
                "⇽",
                "⤙",
                "⤛",
                "⤝",
                "⤟",
            ],
            [31]: [
                "↔",
                "↮",
                "⟷",
                "↭",
                "⇄",
                "⇆",
                "↹",
                "⇋",
                "⇌",
                "⇹",
                "⇼",
                "⇿",
                "⥂",
                "⥃",
                "⥄",
                "⥈",
                "⥊",
                "⥋",
                "⥎",
                "⥐",
                "⥦",
                "⥧",
                "⥨",
                "⥩",
            ],
            [32]: [
                "→",
                "↛",
                "⇉",
                "⇶",
                "⟶",
                "↠",
                "↣",
                "↦",
                "⤅",
                "⟼",
                "↝",
                "⇝",
                "⤳",
                "⟿",
                "↪",
                "↬",
                "↷",
                "⤼",
                "⤻",
                "⇥",
                "⇸",
                "⤀",
                "⇻",
                "⤁",
                "⤍",
                "⤏",
                "⇢",
                "⤑",
                "⤐",
                "⤔",
                "⤕",
                "⤖",
                "⤗",
                "⤘",
                "⇾",
                "⤚",
                "⤜",
                "⤞",
                "⤠",
            ],
            [44]: [
                "↙",
                "↲",
                "⤦",
                "⤶",
                "⤸",
                "↵",
            ],
            [45]: [
                "↓",
                "⇊",
                "⤈",
                "⇟",
                "↡",
                "↧",
                "⤓",
                "⇣",
                "↯",
                "⇃",
                "⥙",
                "⥡",
                "⇂",
                "⥕",
                "⥝",
                "⥥",
            ],
            [46]: [
                "↘",
                "↳",
                "⤥",
                "⤷",
                "⤹",
                "↴",
            ],
            [19]: [
                "⇖",
            ],
            [20]: [
                "⇑",
                "⤊",
                "⟰",
                "⇧",
                "⇪",
            ],
            [21]: [
                "⇗",
            ],
            [33]: [
                "⇐",
                "⇍",
                "⤂",
                "⤆",
                "⟸",
                "⟽",
                "⇚",
                "⭅",
                "⇦",
            ],
            [34]: [
                "⇔",
                "⇎",
                "⤄",
                "⟺",
            ],
            [35]: [
                "⇒",
                "⇏",
                "⤃",
                "⤇",
                "⟹",
                "⟾",
                "⇛",
                "⭆",
                "⥰",
                "⇨",
            ],
            [47]: [
                "⇙",
                "⏎",
            ],
            [48]: [
                "⇓",
                "⤋",
                "⟱",
                "⇩",
            ],
            [49]: [
                "⇘",
            ],
            [22]: [
                "↼",
                "⥒",
                "⥚",
                "⥪",
            ],
            [36]: [
                "⥢",
            ],
            [50]: [
                "↽",
                "⥖",
                "⥞",
                "⥫",
            ],
            [23]: [
                "⇀",
                "⥓",
                "⥛",
                "⥬",
            ],
            [37]: [
                "⥤",
            ],
            [51]: [
                "⇁",
                "⥗",
                "⥟",
                "⥭",
            ],
        },
        content: [
            {
                name: "Symbol Arrows",
                symbol: "⥵",
                content: [
                    "⥆",
                    "⥅",
                    "⥳",
                    "⥴",
                    "⭋",
                    "⭌",
                    "⭊",
                    "⥵",
                    "⭂",
                    "⭈",
                    "⭀",
                    "⥱",
                    "⭉",
                    "⥲",
                    "⭁",
                    "⭇",
                    "⥶",
                    "⥸",
                    "⥻",
                    "⥹",
                    "⥷",
                    "⭃",
                    "⥺",
                    "⭄",
                    "⬰",
                    "⇴",
                    "⬲",
                    "⟴",
                    "⬾",
                    "⥇",
                ]
            },
            [
                "↕",
                "↨",
                "⇅",
                "⇵",
                "⥌",
                "⥍",
                "⥏",
                "⥑",
                "⥮",
                "⥯",
            ],
            [
                "⇕",
            ],
            [
                "↻",
                "↺",
                "⟳",
                "⟲",
                "⥀",
                "⥁",
                "⤾",
                "⤿",
            ],
            "⤡",
            "⤢",
            [
                "⤧",
                "⤱",
                "⤲",
            ],
            [
                "⤨",
                "⤭",
                "⤮",
            ],
            "⤩",
            "⤪",
            "⤯",
            "⤰",
            "⤴",
            "⤵",
            [
                "◅",
                "◄",
            ],
            [
                "▻",
                "►",
            ], [
                "◃",
                "◂",
            ], [
                "▹",
                "▸",
            ]
        ]
    };
});
define("config/mathLetters", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.GreekSansBoldItalic = exports.GreekSansBold = exports.GreekBoldItalic = exports.GreekItalic = exports.GreekBold = exports.LatinDoubleStruck = exports.LatinMono = exports.LatinFrakturBold = exports.LatinFraktur = exports.LatinScriptBold = exports.LatinScript = exports.LatinSansBoldItalic = exports.LatinSansItalic = exports.LatinSansBold = exports.LatinSans = exports.LatinBoldItalic = exports.LatinItalic = exports.LatinBold = void 0;
    exports.LatinBold = {
        name: "Latin Bold",
        symbol: "𝐚",
        byVK: {
            [48]: "𝟎",
            [49]: "𝟏",
            [50]: "𝟐",
            [51]: "𝟑",
            [52]: "𝟒",
            [53]: "𝟓",
            [54]: "𝟔",
            [55]: "𝟕",
            [56]: "𝟖",
            [57]: "𝟗",
            [65]: ["𝐚", "𝐀"],
            [66]: ["𝐛", "𝐁"],
            [67]: ["𝐜", "𝐂"],
            [68]: ["𝐝", "𝐃"],
            [69]: ["𝐞", "𝐄"],
            [70]: ["𝐟", "𝐅"],
            [71]: ["𝐠", "𝐆"],
            [72]: ["𝐡", "𝐇"],
            [73]: ["𝐢", "𝐈"],
            [74]: ["𝐣", "𝐉"],
            [75]: ["𝐤", "𝐊"],
            [76]: ["𝐥", "𝐋"],
            [77]: ["𝐦", "𝐌"],
            [78]: ["𝐧", "𝐍"],
            [79]: ["𝐨", "𝐎"],
            [80]: ["𝐩", "𝐏"],
            [81]: ["𝐪", "𝐐"],
            [82]: ["𝐫", "𝐑"],
            [83]: ["𝐬", "𝐒"],
            [84]: ["𝐭", "𝐓"],
            [85]: ["𝐮", "𝐔"],
            [86]: ["𝐯", "𝐕"],
            [87]: ["𝐰", "𝐖"],
            [88]: ["𝐱", "𝐗"],
            [89]: ["𝐲", "𝐘"],
            [90]: ["𝐳", "𝐙 "],
        },
    };
    exports.LatinItalic = {
        name: "Latin Italic",
        symbol: "𝑎",
        byVK: {
            [65]: ["𝑎", "𝐴"],
            [66]: ["𝑏", "𝐵"],
            [67]: ["𝑐", "𝐶"],
            [68]: ["𝑑", "𝐷"],
            [69]: ["𝑒", "𝐸"],
            [70]: ["𝑓", "𝐹"],
            [71]: ["𝑔", "𝐺"],
            [72]: ["ℎ", "𝐻"],
            [73]: ["𝑖", "𝐼"],
            [74]: ["𝑗", "𝐽"],
            [75]: ["𝑘", "𝐾"],
            [76]: ["𝑙", "𝐿"],
            [77]: ["𝑚", "𝑀"],
            [78]: ["𝑛", "𝑁"],
            [79]: ["𝑜", "𝑂"],
            [80]: ["𝑝", "𝑃"],
            [81]: ["𝑞", "𝑄"],
            [82]: ["𝑟", "𝑅"],
            [83]: ["𝑠", "𝑆"],
            [84]: ["𝑡", "𝑇"],
            [85]: ["𝑢", "𝑈"],
            [86]: ["𝑣", "𝑉"],
            [87]: ["𝑤", "𝑊"],
            [88]: ["𝑥", "𝑋"],
            [89]: ["𝑦", "𝑌"],
            [90]: ["𝑧", "𝑍"],
        },
        content: [
            "𝚤",
            "𝚥",
        ]
    };
    exports.LatinBoldItalic = {
        name: "Latin Bold Italic",
        symbol: "𝒂",
        byVK: {
            [65]: ["𝒂", "𝑨"],
            [66]: ["𝒃", "𝑩"],
            [67]: ["𝒄", "𝑪"],
            [68]: ["𝒅", "𝑫"],
            [69]: ["𝒆", "𝑬"],
            [70]: ["𝒇", "𝑭"],
            [71]: ["𝒈", "𝑮"],
            [72]: ["𝒉", "𝑯"],
            [73]: ["𝒊", "𝑰"],
            [74]: ["𝒋", "𝑱"],
            [75]: ["𝒌", "𝑲"],
            [76]: ["𝒍", "𝑳"],
            [77]: ["𝒎", "𝑴"],
            [78]: ["𝒏", "𝑵"],
            [79]: ["𝒐", "𝑶"],
            [80]: ["𝒑", "𝑷"],
            [81]: ["𝒒", "𝑸"],
            [82]: ["𝒓", "𝑹"],
            [83]: ["𝒔", "𝑺"],
            [84]: ["𝒕", "𝑻"],
            [85]: ["𝒖", "𝑼"],
            [86]: ["𝒗", "𝑽"],
            [87]: ["𝒘", "𝑾"],
            [88]: ["𝒙", "𝑿"],
            [89]: ["𝒚", "𝒀"],
            [90]: ["𝒛", "𝒁"],
        }
    };
    exports.LatinSans = {
        name: "Latin Sans-Serif",
        symbol: "𝖺",
        byVK: {
            [48]: "𝟢",
            [49]: "𝟣",
            [50]: "𝟤",
            [51]: "𝟥",
            [52]: "𝟦",
            [53]: "𝟧",
            [54]: "𝟨",
            [55]: "𝟩",
            [56]: "𝟪",
            [57]: "𝟫",
            [65]: ["𝖺", "𝖠"],
            [66]: ["𝖻", "𝖡"],
            [67]: ["𝖼", "𝖢"],
            [68]: ["𝖽", "𝖣"],
            [69]: ["𝖾", "𝖤"],
            [70]: ["𝖿", "𝖥"],
            [71]: ["𝗀", "𝖦"],
            [72]: ["𝗁", "𝖧"],
            [73]: ["𝗂", "𝖨"],
            [74]: ["𝗃", "𝖩"],
            [75]: ["𝗄", "𝖪"],
            [76]: ["𝗅", "𝖫"],
            [77]: ["𝗆", "𝖬"],
            [78]: ["𝗇", "𝖭"],
            [79]: ["𝗈", "𝖮"],
            [80]: ["𝗉", "𝖯"],
            [81]: ["𝗊", "𝖰"],
            [82]: ["𝗋", "𝖱"],
            [83]: ["𝗌", "𝖲"],
            [84]: ["𝗍", "𝖳"],
            [85]: ["𝗎", "𝖴"],
            [86]: ["𝗏", "𝖵"],
            [87]: ["𝗐", "𝖶"],
            [88]: ["𝗑", "𝖷"],
            [89]: ["𝗒", "𝖸"],
            [90]: ["𝗓", "𝖹"],
        },
    };
    exports.LatinSansBold = {
        name: "Latin Sans-Serif Bold",
        symbol: "𝗮",
        byVK: {
            [48]: "𝟬",
            [49]: "𝟭",
            [50]: "𝟮",
            [51]: "𝟯",
            [52]: "𝟰",
            [53]: "𝟱",
            [54]: "𝟲",
            [55]: "𝟳",
            [56]: "𝟴",
            [57]: "𝟵",
            [65]: ["𝗮", "𝗔"],
            [66]: ["𝗯", "𝗕"],
            [67]: ["𝗰", "𝗖"],
            [68]: ["𝗱", "𝗗"],
            [69]: ["𝗲", "𝗘"],
            [70]: ["𝗳", "𝗙"],
            [71]: ["𝗴", "𝗚"],
            [72]: ["𝗵", "𝗛"],
            [73]: ["𝗶", "𝗜"],
            [74]: ["𝗷", "𝗝"],
            [75]: ["𝗸", "𝗞"],
            [76]: ["𝗹", "𝗟"],
            [77]: ["𝗺", "𝗠"],
            [78]: ["𝗻", "𝗡"],
            [79]: ["𝗼", "𝗢"],
            [80]: ["𝗽", "𝗣"],
            [81]: ["𝗾", "𝗤"],
            [82]: ["𝗿", "𝗥"],
            [83]: ["𝘀", "𝗦"],
            [84]: ["𝘁", "𝗧"],
            [85]: ["𝘂", "𝗨"],
            [86]: ["𝘃", "𝗩"],
            [87]: ["𝘄", "𝗪"],
            [88]: ["𝘅", "𝗫"],
            [89]: ["𝘆", "𝗬"],
            [90]: ["𝘇", "𝗭"],
        },
    };
    exports.LatinSansItalic = {
        name: "Latin Sans Italic",
        symbol: "𝘢",
        byVK: {
            [65]: ["𝘢", "𝘈"],
            [66]: ["𝘣", "𝘉"],
            [67]: ["𝘤", "𝘊"],
            [68]: ["𝘥", "𝘋"],
            [69]: ["𝘦", "𝘌"],
            [70]: ["𝘧", "𝘍"],
            [71]: ["𝘨", "𝘎"],
            [72]: ["𝘩", "𝘏"],
            [73]: ["𝘪", "𝘐"],
            [74]: ["𝘫", "𝘑"],
            [75]: ["𝘬", "𝘒"],
            [76]: ["𝘭", "𝘓"],
            [77]: ["𝘮", "𝘔"],
            [78]: ["𝘯", "𝘕"],
            [79]: ["𝘰", "𝘖"],
            [80]: ["𝘱", "𝘗"],
            [81]: ["𝘲", "𝘘"],
            [82]: ["𝘳", "𝘙"],
            [83]: ["𝘴", "𝘚"],
            [84]: ["𝘵", "𝘛"],
            [85]: ["𝘶", "𝘜"],
            [86]: ["𝘷", "𝘝"],
            [87]: ["𝘸", "𝘞"],
            [88]: ["𝘹", "𝘟"],
            [89]: ["𝘺", "𝘠"],
            [90]: ["𝘻", "𝘡"],
        }
    };
    exports.LatinSansBoldItalic = {
        name: "Latin Sans Bold Italic",
        symbol: "𝙖",
        byVK: {
            [65]: ["𝙖", "𝘼"],
            [66]: ["𝙗", "𝘽"],
            [67]: ["𝙘", "𝘾"],
            [68]: ["𝙙", "𝘿"],
            [69]: ["𝙚", "𝙀"],
            [70]: ["𝙛", "𝙁"],
            [71]: ["𝙜", "𝙂"],
            [72]: ["𝙝", "𝙃"],
            [73]: ["𝙞", "𝙄"],
            [74]: ["𝙟", "𝙅"],
            [75]: ["𝙠", "𝙆"],
            [76]: ["𝙡", "𝙇"],
            [77]: ["𝙢", "𝙈"],
            [78]: ["𝙣", "𝙉"],
            [79]: ["𝙤", "𝙊"],
            [80]: ["𝙥", "𝙋"],
            [81]: ["𝙦", "𝙌"],
            [82]: ["𝙧", "𝙍"],
            [83]: ["𝙨", "𝙎"],
            [84]: ["𝙩", "𝙏"],
            [85]: ["𝙪", "𝙐"],
            [86]: ["𝙫", "𝙑"],
            [87]: ["𝙬", "𝙒"],
            [88]: ["𝙭", "𝙓"],
            [89]: ["𝙮", "𝙔"],
            [90]: ["𝙯", "𝙕"],
        }
    };
    exports.LatinScript = {
        name: "Latin Script",
        symbol: "𝒶",
        byVK: {
            [65]: ["𝒶", "𝒜"],
            [66]: ["𝒷", "ℬ"],
            [67]: ["𝒸", "𝒞"],
            [68]: ["𝒹", "𝒟"],
            [69]: ["ℯ", "ℰ"],
            [70]: ["𝒻", "ℱ"],
            [71]: ["ℊ", "𝒢"],
            [72]: ["𝒽", "ℋ"],
            [73]: ["𝒾", "ℐ"],
            [74]: ["𝒿", "𝒥"],
            [75]: ["𝓀", "𝒦"],
            [76]: ["𝓁", "ℒ"],
            [77]: ["𝓂", "ℳ"],
            [78]: ["𝓃", "𝒩"],
            [79]: ["ℴ", "𝒪"],
            [80]: ["𝓅", "𝒫"],
            [81]: ["𝓆", "𝒬"],
            [82]: ["𝓇", "ℛ"],
            [83]: ["𝓈", "𝒮"],
            [84]: ["𝓉", "𝒯"],
            [85]: ["𝓊", "𝒰"],
            [86]: ["𝓋", "𝒱"],
            [87]: ["𝓌", "𝒲"],
            [88]: ["𝓍", "𝒳"],
            [89]: ["𝓎", "𝒴"],
            [90]: ["𝓏", "𝒵"],
        }
    };
    exports.LatinScriptBold = {
        name: "Latin Script Bold",
        symbol: "𝓪",
        byVK: {
            [65]: ["𝓪", "𝓐"],
            [66]: ["𝓫", "𝓑"],
            [67]: ["𝓬", "𝓒"],
            [68]: ["𝓭", "𝓓"],
            [69]: ["𝓮", "𝓔"],
            [70]: ["𝓯", "𝓕"],
            [71]: ["𝓰", "𝓖"],
            [72]: ["𝓱", "𝓗"],
            [73]: ["𝓲", "𝓘"],
            [74]: ["𝓳", "𝓙"],
            [75]: ["𝓴", "𝓚"],
            [76]: ["𝓵", "𝓛"],
            [77]: ["𝓶", "𝓜"],
            [78]: ["𝓷", "𝓝"],
            [79]: ["𝓸", "𝓞"],
            [80]: ["𝓹", "𝓟"],
            [81]: ["𝓺", "𝓠"],
            [82]: ["𝓻", "𝓡"],
            [83]: ["𝓼", "𝓢"],
            [84]: ["𝓽", "𝓣"],
            [85]: ["𝓾", "𝓤"],
            [86]: ["𝓿", "𝓥"],
            [87]: ["𝔀", "𝓦"],
            [88]: ["𝔁", "𝓧"],
            [89]: ["𝔂", "𝓨"],
            [90]: ["𝔃", "𝓩"],
        }
    };
    exports.LatinFraktur = {
        name: "Latin Fraktur",
        symbol: "𝔞",
        byVK: {
            [65]: ["𝔞", "𝔄"],
            [66]: ["𝔟", "𝔅"],
            [67]: ["𝔠", "ℭ"],
            [68]: ["𝔡", "𝔇"],
            [69]: ["𝔢", "𝔈"],
            [70]: ["𝔣", "𝔉"],
            [71]: ["𝔤", "𝔊"],
            [72]: ["𝔥", "ℌ"],
            [73]: ["𝔦", "ℑ"],
            [74]: ["𝔧", "𝔍"],
            [75]: ["𝔨", "𝔎"],
            [76]: ["𝔩", "𝔏"],
            [77]: ["𝔪", "𝔐"],
            [78]: ["𝔫", "𝔑"],
            [79]: ["𝔬", "𝔒"],
            [80]: ["𝔭", "𝔓"],
            [81]: ["𝔮", "𝔔"],
            [82]: ["𝔯", "ℜ"],
            [83]: ["𝔰", "𝔖"],
            [84]: ["𝔱", "𝔗"],
            [85]: ["𝔲", "𝔘"],
            [86]: ["𝔳", "𝔙"],
            [87]: ["𝔴", "𝔚"],
            [88]: ["𝔵", "𝔛"],
            [89]: ["𝔶", "𝔜"],
            [90]: ["𝔷", "ℨ"],
        }
    };
    exports.LatinFrakturBold = {
        name: "Latin Fraktur Bold",
        symbol: "𝖆",
        byVK: {
            [65]: ["𝖆", "𝕬"],
            [66]: ["𝖇", "𝕭"],
            [67]: ["𝖈", "𝕮"],
            [68]: ["𝖉", "𝕯"],
            [69]: ["𝖊", "𝕰"],
            [70]: ["𝖋", "𝕱"],
            [71]: ["𝖌", "𝕲"],
            [72]: ["𝖍", "𝕳"],
            [73]: ["𝖎", "𝕴"],
            [74]: ["𝖏", "𝕵"],
            [75]: ["𝖐", "𝕶"],
            [76]: ["𝖑", "𝕷"],
            [77]: ["𝖒", "𝕸"],
            [78]: ["𝖓", "𝕹"],
            [79]: ["𝖔", "𝕺"],
            [80]: ["𝖕", "𝕻"],
            [81]: ["𝖖", "𝕼"],
            [82]: ["𝖗", "𝕽"],
            [83]: ["𝖘", "𝕾"],
            [84]: ["𝖙", "𝕿"],
            [85]: ["𝖚", "𝖀"],
            [86]: ["𝖛", "𝖁"],
            [87]: ["𝖜", "𝖂"],
            [88]: ["𝖝", "𝖃"],
            [89]: ["𝖞", "𝖄"],
            [90]: ["𝖟", "𝖅"],
        }
    };
    exports.LatinMono = {
        name: "Latin Mono",
        symbol: "𝚊",
        byVK: {
            [48]: "𝟶",
            [49]: "𝟷",
            [50]: "𝟸",
            [51]: "𝟹",
            [52]: "𝟺",
            [53]: "𝟻",
            [54]: "𝟼",
            [55]: "𝟽",
            [56]: "𝟾",
            [57]: "𝟿",
            [65]: ["𝚊", "𝙰"],
            [66]: ["𝚋", "𝙱"],
            [67]: ["𝚌", "𝙲"],
            [68]: ["𝚍", "𝙳"],
            [69]: ["𝚎", "𝙴"],
            [70]: ["𝚏", "𝙵"],
            [71]: ["𝚐", "𝙶"],
            [72]: ["𝚑", "𝙷"],
            [73]: ["𝚒", "𝙸"],
            [74]: ["𝚓", "𝙹"],
            [75]: ["𝚔", "𝙺"],
            [76]: ["𝚕", "𝙻"],
            [77]: ["𝚖", "𝙼"],
            [78]: ["𝚗", "𝙽"],
            [79]: ["𝚘", "𝙾"],
            [80]: ["𝚙", "𝙿"],
            [81]: ["𝚚", "𝚀"],
            [82]: ["𝚛", "𝚁"],
            [83]: ["𝚜", "𝚂"],
            [84]: ["𝚝", "𝚃"],
            [85]: ["𝚞", "𝚄"],
            [86]: ["𝚟", "𝚅"],
            [87]: ["𝚠", "𝚆"],
            [88]: ["𝚡", "𝚇"],
            [89]: ["𝚢", "𝚈"],
            [90]: ["𝚣", "𝚉"],
        }
    };
    exports.LatinDoubleStruck = {
        name: "Double-Struck",
        symbol: "𝕒",
        byVK: {
            [48]: "𝟘",
            [49]: "𝟙",
            [50]: "𝟚",
            [51]: "𝟛",
            [52]: "𝟜",
            [53]: "𝟝",
            [54]: "𝟞",
            [55]: "𝟟",
            [56]: "𝟠",
            [57]: "𝟡",
            [65]: ["𝕒", "𝔸"],
            [66]: ["𝕓", "𝔹"],
            [67]: ["𝕔", "ℂ"],
            [68]: ["𝕕", "𝔻"],
            [69]: ["𝕖", "𝔼"],
            [70]: ["𝕗", "𝔽"],
            [71]: ["𝕘", "𝔾"],
            [72]: ["𝕙", "ℍ"],
            [73]: ["𝕚", "𝕀"],
            [74]: ["𝕛", "𝕁"],
            [75]: ["𝕜", "𝕂"],
            [76]: ["𝕝", "𝕃"],
            [77]: ["𝕞", "𝕄"],
            [78]: ["𝕟", "ℕ"],
            [79]: ["𝕠", "𝕆"],
            [80]: ["𝕡", "ℙ"],
            [81]: ["𝕢", "ℚ"],
            [82]: ["𝕣", "ℝ"],
            [83]: ["𝕤", "𝕊"],
            [84]: ["𝕥", "𝕋"],
            [85]: ["𝕦", "𝕌"],
            [86]: ["𝕧", "𝕍"],
            [87]: ["𝕨", "𝕎"],
            [88]: ["𝕩", "𝕏"],
            [89]: ["𝕪", "𝕐"],
            [90]: ["𝕫", "ℤ "],
        },
    };
    exports.GreekBold = {
        name: "Greek Bold",
        symbol: "𝛂",
        byVK: {
            [65]: ["𝛂", "𝚨"],
            [66]: ["𝛃", "𝚩"],
            [67]: ["𝛙", "𝚿"],
            [68]: ["𝛅", "𝚫"],
            [69]: ["𝛆", "𝚬"],
            [70]: ["𝛗", "𝚽"],
            [71]: ["𝛄", "𝚪"],
            [72]: ["𝛈", "𝚮"],
            [73]: ["𝛊", "𝚰"],
            [74]: ["𝛏", "𝚵"],
            [75]: ["𝛋", "𝚱"],
            [76]: ["𝛌", "𝚲"],
            [77]: ["𝛍", "𝚳"],
            [78]: ["𝛎", "𝚴"],
            [79]: ["𝛐", "𝚶"],
            [80]: ["𝛑", "𝚷"],
            [82]: ["𝛒", "𝚸"],
            [83]: ["𝛔", "𝚺"],
            [84]: ["𝛕", "𝚻"],
            [85]: ["𝛉", "𝚯"],
            [86]: ["𝛚", "𝛀"],
            [87]: "𝛓",
            [88]: ["𝛘", "𝚾"],
            [89]: ["𝛖", "𝚼"],
            [90]: ["𝛇", "𝚭"],
        },
        content: ["𝛛", "𝛜", "𝛝", "𝛞", "𝛟", "𝛠", "𝛡", "𝚹", "𝛁"]
    };
    exports.GreekItalic = {
        name: "Greek Italic",
        symbol: "𝛼",
        byVK: {
            [65]: ["𝛼", "𝛢"],
            [66]: ["𝛽", "𝛣"],
            [67]: ["𝜓", "𝛹"],
            [68]: ["𝛿", "𝛥"],
            [69]: ["𝜀", "𝛦"],
            [70]: ["𝜑", "𝛷"],
            [71]: ["𝛾", "𝛤"],
            [72]: ["𝜂", "𝛨"],
            [73]: ["𝜄", "𝛪"],
            [74]: ["𝜉", "𝛯"],
            [75]: ["𝜅", "𝛫"],
            [76]: ["𝜆", "𝛬"],
            [77]: ["𝜇", "𝛭"],
            [78]: ["𝜈", "𝛮"],
            [79]: ["𝜊", "𝛰"],
            [80]: ["𝜋", "𝛱"],
            [82]: ["𝜌", "𝛲"],
            [83]: ["𝜎", "𝛴"],
            [84]: ["𝜏", "𝛵"],
            [85]: ["𝜃", "𝛩"],
            [86]: ["𝜔", "𝛺"],
            [87]: "𝜍",
            [88]: ["𝜒", "𝛸"],
            [89]: ["𝜐", "𝛶"],
            [90]: ["𝜁", "𝛧"],
        },
        content: ["𝜕", "𝜖", "𝜗", "𝜘", "𝜙", "𝜚", "𝜛", "𝛳", "𝛻"]
    };
    exports.GreekBoldItalic = {
        name: "Greek Bold Italic",
        symbol: "𝜶",
        byVK: {
            [65]: ["𝜶", "𝜜"],
            [66]: ["𝜷", "𝜝"],
            [67]: ["𝝍", "𝜳"],
            [68]: ["𝜹", "𝜟"],
            [69]: ["𝜺", "𝜠"],
            [70]: ["𝝋", "𝜱"],
            [71]: ["𝜸", "𝜞"],
            [72]: ["𝜼", "𝜢"],
            [73]: ["𝜾", "𝜤"],
            [74]: ["𝝃", "𝜩"],
            [75]: ["𝜿", "𝜥"],
            [76]: ["𝝀", "𝜦"],
            [77]: ["𝝁", "𝜧"],
            [78]: ["𝝂", "𝜨"],
            [79]: ["𝝄", "𝜪"],
            [80]: ["𝝅", "𝜫"],
            [82]: ["𝝆", "𝜬"],
            [83]: ["𝝈", "𝜮"],
            [84]: ["𝝉", "𝜯"],
            [85]: ["𝜽", "𝜣"],
            [86]: ["𝝎", "𝜴"],
            [87]: "𝝇",
            [88]: ["𝝌", "𝜲"],
            [89]: ["𝝊", "𝜰"],
            [90]: ["𝜻", "𝜡"],
        },
        content: ["𝝏", "𝝐", "𝝑", "𝝒", "𝝓", "𝝔", "𝝕", "𝜭", "𝜵"]
    };
    exports.GreekSansBold = {
        name: "Greek Sans Bold",
        symbol: "𝝰",
        byVK: {
            [65]: ["𝝰", "𝝖"],
            [66]: ["𝝱", "𝝗"],
            [67]: ["𝞇", "𝝭"],
            [68]: ["𝝳", "𝝙"],
            [69]: ["𝝴", "𝝚"],
            [70]: ["𝞅", "𝝫"],
            [71]: ["𝝲", "𝝘"],
            [72]: ["𝝶", "𝝜"],
            [73]: ["𝝸", "𝝞"],
            [74]: ["𝝽", "𝝣"],
            [75]: ["𝝹", "𝝟"],
            [76]: ["𝝺", "𝝠"],
            [77]: ["𝝻", "𝝡"],
            [78]: ["𝝼", "𝝢"],
            [79]: ["𝝾", "𝝤"],
            [80]: ["𝝿", "𝝥"],
            [82]: ["𝞀", "𝝦"],
            [83]: ["𝞂", "𝝨"],
            [84]: ["𝞃", "𝝩"],
            [85]: ["𝝷", "𝝝"],
            [86]: ["𝞈", "𝝮"],
            [87]: "𝞁",
            [88]: ["𝞆", "𝝬"],
            [89]: ["𝞄", "𝝪"],
            [90]: ["𝝵", "𝝛"],
        },
        content: ["𝞉", "𝞊", "𝞋", "𝞌", "𝞍", "𝞎", "𝞏", "𝝧", "𝝯"]
    };
    exports.GreekSansBoldItalic = {
        name: "Greek Sans Bold Italic",
        symbol: "𝞪",
        byVK: {
            [65]: ["𝞪", "𝞐"],
            [66]: ["𝞫", "𝞑"],
            [67]: ["𝟁", "𝞧"],
            [68]: ["𝞭", "𝞓"],
            [69]: ["𝞮", "𝞔"],
            [70]: ["𝞿", "𝞥"],
            [71]: ["𝞬", "𝞒"],
            [72]: ["𝞰", "𝞖"],
            [73]: ["𝞲", "𝞘"],
            [74]: ["𝞷", "𝞝"],
            [75]: ["𝞳", "𝞙"],
            [76]: ["𝞴", "𝞚"],
            [77]: ["𝞵", "𝞛"],
            [78]: ["𝞶", "𝞜"],
            [79]: ["𝞸", "𝞞"],
            [80]: ["𝞹", "𝞟"],
            [82]: ["𝞺", "𝞠"],
            [83]: ["𝞼", "𝞢"],
            [84]: ["𝞽", "𝞣"],
            [85]: ["𝞱", "𝞗"],
            [86]: ["𝟂", "𝞨"],
            [87]: "𝞻",
            [88]: ["𝟀", "𝞦"],
            [89]: ["𝞾", "𝞤"],
            [90]: ["𝞯", "𝞕"],
        },
        content: ["𝟃", "𝟄", "𝟅", "𝟆", "𝟇", "𝟈", "𝟉", "𝞡", "𝞩"]
    };
});
define("config/math", ["require", "exports", "config/mathLetters"], function (require, exports, mathLetters_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MathKeyboard = void 0;
    const MathGroups = {
        name: "Math Groups",
        symbol: "⟨⟩",
        content: [
            "√",
            "∛",
            "∜",
            [
                "‖",
                "⦀",
            ],
            [
                "⌈",
                "⌜",
            ],
            [
                "⌉",
                "⌝",
            ],
            [
                "⌊",
                "⌞",
            ],
            [
                "⌋",
                "⌟",
            ],
            "⎰",
            "⎱",
            "⟅",
            "⟆",
            [
                "⟨",
                "⦑",
            ],
            [
                "⟩",
                "⦒",
            ],
            "⧼",
            "⧽",
            "⟪",
            "⟫",
            "⟮",
            "⟯",
            "❲",
            "⦘",
            "⦗",
            "❳",
            "⦋",
            "⦌",
            "⦍",
            "⦎",
            "⦏",
            "⦐",
            [
                "⦓",
                "⦕",
            ],
            [
                "⦔",
                "⦖",
            ],
            [
                "⦅",
                "⦇",
            ],
            [
                "⦆",
                "⦈",
            ],
            [
                "⟦",
                "⟬",
            ],
            [
                "⟧",
                "⟭",
            ],
            "⦃",
            "⦄",
            "⦉",
            "⦊",
            [
                "⧘",
                "⧚",
            ], [
                "⧙",
                "⧛",
            ],
            "⟌",
        ]
    };
    const MathAccents = {
        name: "Math Accents",
        symbol: "⃗",
        content: [
            "̀",
            "́",
            "̂",
            "̃",
            "\u0305",
            "\u0304",
            "̿",
            "̌",
            "̆",
            "\u0310",
            "\u0312",
            "\u0315",
            "\u031A",
            "̇",
            "̈",
            "⃛",
            "\u20E8",
            "⃜",
            "\u0309",
            "\u030A",
            "⃗",
            "\u20D0",
            "⃑",
            "⃡",
            "\u20D2",
            "\u20E7",
            "\u20E9",
            "\u20F0",
            "′",
            "″",
            "‴",
            "⁗",
            "‵",
            "‶",
            "‷",
        ]
    };
    const MathOverUnder = {
        name: "Math Over Under",
        symbol: "⏞",
        content: [
            "⏞",
            "⏟",
            "⎴",
            "⎵",
            "⏜",
            "⏝",
            "⏠",
            "⏡",
        ]
    };
    const MathNAry = {
        name: "Math N-Ary",
        symbol: "∑",
        content: [
            [
                "∑",
                "⅀",
                "⨊",
            ],
            [
                "∫",
                "∬",
                "∭",
                "⨌",
                "∮",
                "∯",
                "∰",
                "∱",
                "∲",
                "∳",
                "⨍",
                "⨎",
                "⨏",
                "⨐",
                "⨑",
                "⨒",
                "⨓",
                "⨔",
                "⨕",
                "⨖",
                "⨗",
                "⨘",
                "⨙",
                "⨚",
                "⨛",
                "⨜",
            ],
            "⨋",
            "∏",
            "∐",
            [
                "⋀",
                "⨇",
            ],
            [
                "⋁",
                "⨈",
            ],
            "⋂",
            "⋃",
            "⨃",
            "⨄",
            "⨅",
            "⨆",
            [
                "⨝",
                "⟗",
                "⟕",
                "⟖",
                "⨞",
            ],
            "⟘",
            "⟙",
            "⧸",
            "⧹",
            "⨀",
            "⨁",
            "⨂",
            "⨉",
            "⨟",
            "⨠",
            "⨡",
            "⫼",
            "⫿",
            "𞻰",
            "𞻱",
        ]
    };
    const MathBinary = {
        name: "Math Operators",
        symbol: "±",
        content: [
            {
                name: "Circled Operators",
                symbol: "⊕",
                content: [
                    "⊕",
                    "⨭",
                    "⨮",
                    "⊖",
                    "⊙",
                    "⊗",
                    "⨶",
                    "⨴",
                    "⨵",
                    "⨷",
                    "⨸",
                    "⊘",
                    "⊛",
                    "⊚",
                    "⊜",
                    "⊝",
                    "⦵",
                    "⌽",
                    "⦶",
                    "⦷",
                    "⦸",
                    "⦹",
                    "⧀",
                    "⧁",
                    "⦻",
                    "⦼",
                    "⦽",
                    "⦾",
                    "⦿",
                ]
            },
            {
                name: "Boxed Operators",
                symbol: "⊟",
                content: [
                    "⊞",
                    "⊟",
                    "⊡",
                    "⊠",
                    "⧄",
                    "⧆",
                    "⧇",
                ]
            },
            {
                name: "Operators in Triangle",
                symbol: "⨻",
                content: [
                    "⨹",
                    "⨺",
                    "⟠",
                    "◬",
                    "⨻",
                ]
            },
            {
                name: "Misc Arithmetic Operators",
                symbol: "⋇",
                content: [
                    [
                        "⩲",
                        "⩱",
                    ],
                    "∔",
                    "⨢",
                    "⨣",
                    "⨤",
                    "⨥",
                    "⨦",
                    "⨧",
                    "⨨",
                    "⧺",
                    "⧻",
                    "∸",
                    "⨩",
                    "⨪",
                    "⨫",
                    "⨬",
                    "⧾",
                    "⧿",
                    "⋉",
                    "⋊",
                    "⋋",
                    "⋌",
                    "⨰",
                    "⨱",
                    "⨲",
                    "⨳",
                    "⋇",
                    "⫽",
                    "⫻",
                    "⧶",
                ]
            },
            {
                name: "Misc Logic Operators",
                symbol: "⩚",
                content: [
                    "⟑",
                    "⋏",
                    "⌅",
                    "⌆",
                    "⩑",
                    "⩚",
                    "⩜",
                    "⩞",
                    "⩟",
                    "⩠",
                    "⩘",
                    "⩓",
                    "⩕",
                    "⊻",
                    "⟇",
                    "⋎",
                    "⩒",
                    "⩛",
                    "⩝",
                    "⩡",
                    "⩢",
                    "⩣",
                    "⩗",
                    "⩔",
                    "⩖",
                ]
            },
            {
                name: "Misc Set Operators",
                symbol: "⩆",
                content: [
                    "⩀",
                    "⩃",
                    "⩄",
                    "⩋",
                    "⩍",
                    "⋒",
                    "⊌",
                    "⩁",
                    "⩂",
                    "⩅",
                    "⩊",
                    "⩌",
                    "⩐",
                    "⋓",
                    "⩆",
                    "⩈",
                    "⩇",
                    "⩉",
                ]
            },
            [
                "±",
                "∓",
            ],
            "+",
            "−",
            "⋅",
            "⋆",
            "∙",
            [
                "×",
                "⨯",
            ],
            [
                "÷",
            ],
            "∕",
            "⁄",
            [
                "⧵",
                "⧷",
            ],
            "∖",
            "∗",
            "∘",
            [
                "∧",
                "⊼",
            ],
            [
                "∨",
                "⊽",
            ],
            "∩",
            "∪",
            "⊍",
            "⊎",
            [
                "⊓",
                "⩎",
            ],
            [
                "⊔",
                "⩏",
            ],
            [
                "†",
                "‡",
            ],
            "⁀",
            "∾",
            "≀",
            "⅋",
            "⊺",
            [
                "⧖",
                "⧗",
            ],
            "⧢",
            "⨾",
            "⨿",
            [
                "⫴",
                "⫵",
            ],
            "⫶",
            "⫾",
            "⨼",
            "⨽",
        ]
    };
    const MathSymbols = {
        name: "Math Symbols",
        symbol: "∞",
        content: [
            "§",
            [
                "¬",
                "⌐",
            ],
            "¶",
            "Ƶ",
            "϶",
            "―",
            "‗",
            "‥",
            "…",
            "‸",
            "‼",
            "⁃",
            "⁇",
            "ℇ",
            "ℎ",
            "℧",
            "Ⅎ",
            "ℼ",
            "⅁",
            "⅂",
            "⅃",
            "⅄",
            "⅊",
            "∀",
            "∁",
            [
                "∃",
                "∄",
            ],
            [
                "∅",
                "⌀",
                "⦰",
                "⦱",
                "⦲",
                "⦳",
                "⦴",
            ],
            "∆",
            "∎",
            "√",
            [
                "∞",
                "⧜",
                "⧝",
                "⧞",
                "♾",
            ],
            {
                name: "Angle Symbols",
                symbol: "∡",
                content: [
                    "∠",
                    "∟",
                    "∡",
                    "∢",
                    "⊾",
                    "⟀",
                    "⦛",
                    "⦜",
                    "⦝",
                    "⦞",
                    "⦟",
                    "⦠",
                    "⦡",
                    "⦢",
                    "⦣",
                    "⦤",
                    "⦥",
                    "⦦",
                    "⦧",
                    "⦨",
                    "⦩",
                    "⦪",
                    "⦫",
                    "⦬",
                    "⦭",
                    "⦮",
                    "⦯",
                ]
            },
            "∴",
            "∵",
            [
                "∿",
                "⏦",
            ],
            "⊤",
            "⊥",
            "⊹",
            "⋯",
            "⌂",
            "⌒",
            "⌓",
            "⌗",
            "⌙",
            "⌲",
            "⌶",
            "⍀",
            "⍼",
            "⎯",
            "⎶",
            "⎸",
            "⎹",
            "⏠",
            "⏡",
            "⏤",
            "⏧",
            "␢",
            "␣",
            "┆",
            [
                "▀",
                "▄",
                "█",
                "▌",
                "▐",
                "░",
                "▒",
                "▓",
            ],
        ]
    };
    const MathShapes = {
        name: "Math Shapes",
        symbol: "⏢",
        content: [
            "○",
            "⚆",
            "⚈",
            "⚇",
            "⚉",
            "⧂",
            "⧃",
            [
                "⧬",
                "⧭",
            ], [
                "⧲",
                "⧳",
            ],
            "⃝",
            "◍",
            "◎",
            "●",
            "◐",
            "◑",
            "◒",
            "◓",
            "◔",
            "◕",
            "◖",
            "◗",
            "◴",
            "◵",
            "◶",
            "◷",
            "◌",
            "◦",
            "⚬",
            "⦁",
            [
                "⚪",
                "⚫",
            ], [
                "◯",
                "⬤",
            ],
            "◠",
            "◡",
            "◙",
            "◚",
            "◛",
            [
                "⬭",
                "⬬",
            ], [
                "⬯",
                "⬮",
            ], [
                "△",
                "▲",
            ],
            "⟁",
            "⧊",
            "⧋",
            "⧌",
            "◭",
            "◮",
            "▴",
            "⧍",
            "⃤",
            [
                "▽",
                "▼",
            ],
            "⧨",
            "⧩",
            [
                "▿",
                "▾",
            ],
            [
                "◁",
                "◀",
            ],
            "⩤",
            [
                "▷",
                "▶",
            ],
            "⩥",
            "⊿",
            [
                "◿",
                "◢",
            ], [
                "◺",
                "◣",
            ], [
                "◸",
                "◤",
            ], [
                "◹",
                "◥",
            ],
            [
                "◻",
                "◼",
            ], [
                "□",
                "■",
            ],
            "⟤",
            "⟥",
            "⧅",
            "⧈",
            "◫",
            "⃞",
            "▢",
            "▣",
            "▤",
            "▥",
            "▦",
            "▧",
            "▨",
            "▩",
            "◧",
            "◨",
            "◩",
            "◪",
            "⬒",
            "⬓",
            "⬔",
            "⬕",
            "◰",
            "◱",
            "◲",
            "◳",
            "⬚",
            [
                "⬞",
                "⬝",
            ], [
                "▫",
                "▪",
            ], [
                "◽",
                "◾",
            ], [
                "⬜",
                "⬛",
            ], [
                "▯",
                "▮",
            ], [
                "▭",
                "▬",
            ], [
                "▱",
                "▰",
            ],
            "⏢",
            "⏥",
            "⍓",
            "⍰",
            "⟐",
            "⟠",
            "⟡",
            "⟢",
            "⟣",
            "⧪",
            [
                "⧰",
                "⧱",
            ],
            "⌑",
            "⋄",
            "⬩",
            [
                "⬫",
                "⬪",
            ], [
                "⬦",
                "⬥",
            ], [
                "◇",
                "◆",
            ], [
                "⬨",
                "⬧",
            ],
            "◈",
            "⬖",
            "⬗",
            "⬘",
            "⬙",
            "⃟",
            [
                "◊",
                "⧫",
            ], [
                "⬠",
                "⬟",
            ], [
                "⭔",
                "⭓",
            ], [
                "⎔",
                "⬣",
            ], [
                "⬡",
                "⬢",
            ],
            "⌬",
            "⏣",
        ]
    };
    const MathRelations = {
        name: "Math Relations",
        symbol: "≤",
        content: [
            {
                name: "Misc Compare",
                symbol: "⩻",
                content: [
                    "⋖",
                    "⋗",
                    "⩹",
                    "⩺",
                    "⩻",
                    "⩼",
                    "⪇",
                    "⪈",
                    [
                        "≦",
                        "≨",
                    ], [
                        "≧",
                        "≩",
                    ],
                    "⋜",
                    "⋝",
                    "⪙",
                    "⪚",
                    "⩽",
                    "⩾",
                    "⩿",
                    "⪀",
                    "⪁",
                    "⪂",
                    "⪃",
                    "⪄",
                    "⪕",
                    "⪖",
                    "⪗",
                    "⪘",
                    "⫹",
                    "⫺",
                    "⪛",
                    "⪜",
                    [
                        "≲",
                        "≴",
                    ], [
                        "≳",
                        "≵",
                    ],
                    "⋦",
                    "⋧",
                    [
                        "⪅",
                        "⪉",
                    ], [
                        "⪆",
                        "⪊",
                    ],
                    "⪍",
                    "⪎",
                    "⪝",
                    "⪞",
                    "⪟",
                    "⪠",
                    "⪣",
                    [
                        "⋘",
                        "⫷",
                    ], [
                        "⋙",
                        "⫸",
                    ],
                    [
                        "≷",
                        "≹",
                    ],
                    "⋚",
                    "⋛",
                    "⪋",
                    "⪌",
                    "⪏",
                    "⪐",
                    "⪑",
                    "⪒",
                    "⪓",
                    "⪔",
                    "⪤",
                    "⪥",
                    "⪪",
                    "⪫",
                    "⪬",
                    "⪭",
                ]
            },
            {
                name: "Misc Order",
                symbol: "≾",
                content: [
                    "⋞",
                    "⋟",
                    [
                        "⪯",
                        "⪱",
                    ], [
                        "⪰",
                        "⪲",
                    ],
                    [
                        "⪳",
                        "⪵",
                    ], [
                        "⪴",
                        "⪶",
                    ],
                    [
                        "≾",
                        "⋨",
                    ], [
                        "≿",
                        "⋩",
                    ],
                    [
                        "⪷",
                        "⪹",
                    ], [
                        "⪸",
                        "⪺",
                    ],
                    "⪻",
                    "⪼",
                    "⊰",
                    "⊱",
                    "⥽",
                    "⥼",
                ]
            },
            {
                name: "Misc Member",
                symbol: "⋻",
                content: [
                    "∊",
                    "∍",
                    "⋲",
                    "⋺",
                    "⋳",
                    "⋻",
                    "⋴",
                    "⋼",
                    "⋵",
                    "⋶",
                    "⋽",
                    "⋷",
                    "⋾",
                    "⋸",
                    "⋹",
                    "⟒",
                    "⫙",
                    "⋔",
                    "⫚",
                    "⫛",
                    [
                        "⫝̸",
                        "⫝",
                    ],
                    "⋿",
                ]
            },
            {
                name: "Misc Subset",
                symbol: "⫃",
                content: [
                    "⪽",
                    "⪾",
                    "⪿",
                    "⫀",
                    "⫁",
                    "⫂",
                    "⟈",
                    "⟉",
                    "⟃",
                    "⟄",
                    "⋐",
                    "⋑",
                    "⫏",
                    "⫐",
                    "⊊",
                    "⊋",
                    "⫃",
                    "⫄",
                    "⫑",
                    "⫒",
                    "⫅",
                    "⫆",
                    "⫇",
                    "⫈",
                    "⫉",
                    "⫊",
                    "⫋",
                    "⫌",
                    "⫓",
                    "⫔",
                    "⫕",
                    "⫖",
                    "⫗",
                    "⫘",
                    "⊏",
                    "⊐",
                    "⫍",
                    "⫎",
                    [
                        "⊑",
                        "⋢",
                    ], [
                        "⊒",
                        "⋣",
                    ],
                    "⋤",
                    "⋥",
                ],
            },
            {
                name: "Misc Equals",
                symbol: "≛",
                content: [
                    "⩵",
                    "⩶",
                    "⧦",
                    "≖",
                    "≝",
                    "≟",
                    "≗",
                    "≘",
                    "≙",
                    "≚",
                    "≛",
                    "⩮",
                    "≜",
                    "≞",
                    "⪮",
                    "⩦",
                    "⩧",
                    "⋕",
                    "⩨",
                    "⩩",
                    "⧣",
                    "⧤",
                    "⧥",
                    "≍",
                    "≭",
                    "≎",
                    "≏",
                    "≐",
                    "≑",
                    "≒",
                    "≓",
                    "≔",
                    "⩴",
                    "≕",
                    "⩷",
                    "≣",
                    "⩸",
                ]
            },
            {
                name: "Misc Approx",
                symbol: "⩭",
                content: [
                    "⋍",
                    "≅",
                    "≆",
                    "≇",
                    "≌",
                    "≂",
                    "≊",
                    "≋",
                    "⩬",
                    "⩭",
                    "⩯",
                    "⩰",
                    "⩳",
                ]
            },
            {
                name: "Misc Similar",
                symbol: "⩪",
                content: [
                    "∻",
                    "⩪",
                    "⩫",
                    "∽",
                ]
            },
            {
                name: "Rel Triangles",
                symbol: "⪩",
                content: [
                    [
                        "⊲",
                        "⋪",
                    ], [
                        "⊳",
                        "⋫",
                    ],
                    [
                        "⊴",
                        "⋬",
                    ], [
                        "⊵",
                        "⋭",
                    ],
                    "⧡",
                    "⧏",
                    "⧐",
                    "⪦",
                    "⪧",
                    "⪨",
                    "⪩",
                    "⧎",
                ]
            },
            {
                name: "Tacks",
                symbol: "⊨",
                content: [
                    [
                        "⊢",
                        "⊬",
                    ],
                    "⊣",
                    "⊦",
                    "⫞",
                    "⫟",
                    "⫠",
                    "⟝",
                    "⟞",
                    "⊧",
                    [
                        "⊨",
                        "⊭",
                    ],
                    [
                        "⊩",
                        "⊮",
                    ],
                    "⊪",
                    [
                        "⊫",
                        "⊯",
                    ],
                    "⟚",
                    "⟛",
                    "⫢",
                    "⫣",
                    "⫤",
                    "⫥",
                    "⫦",
                    "⫧",
                    "⫨",
                    "⫩",
                    "⫪",
                    "⫫",
                    "⫬",
                    "⫭",
                ]
            },
            [
                "≶",
                "≸",
            ],
            [
                "<",
                "≮",
            ], [
                ">",
                "≯",
            ],
            [
                "≪",
                "⪡",
            ], [
                "≫",
                "⪢",
            ],
            [
                "≤",
                "≰",
            ],
            [
                "≥",
                "≱",
            ],
            [
                "≺",
                "⊀",
            ], [
                "≻",
                "⊁",
            ],
            [
                "≼",
                "⋠",
            ], [
                "≽",
                "⋡",
            ],
            [
                "∈",
                "∉",
            ],
            [
                "∋",
                "∌",
            ],
            "∝",
            [
                "=",
                "≠",
            ],
            [
                "≡",
                "≢",
            ],
            [
                "∼",
                "≁",
            ],
            [
                "≃",
                "≄",
            ],
            [
                "≈",
                "≉",
            ],
            [
                "⊂",
                "⊄",
            ], [
                "⊃",
                "⊅",
            ],
            [
                "⊆",
                "⊈",
            ],
            [
                "⊇",
                "⊉",
            ],
            [
                "⋈",
                "⧓",
            ], [
                "⧔",
                "⧑",
            ], [
                "⧒",
                "⧕",
            ],
            "⋮",
            "⋰",
            "⋱",
            "≬",
            "⁐",
            "⌢",
            "⌣",
            "⌿",
            "▵",
            "⟂",
            "⫡",
            "⟓",
            "⟔",
            "⧟",
            "⊶",
            "⊷",
            "⊸",
            "⫯",
            "⫰",
            "⟜",
            "⟟",
            "⥾",
            "⥿",
            "⦂",
            "∶",
            "∷",
            "∹",
            "∺",
            "⧴",
            "⩙",
            [
                "∣",
                "∤",
            ], [
                "∥",
                "∦",
            ],
            "⫮",
            "⫲",
            "⫳",
        ]
    };
    const MathUTN28 = {
        name: "UTN 28",
        symbol: "█",
        content: [
            "■",
            "█",
            "□",
            "▭",
            "¯",
            "▁",
            "Ⅎ",
            "⟡",
            "⬄",
            "⇳",
            "⬍",
            "⬆",
            "⬇",
            "⬌",
        ]
    };
    exports.MathKeyboard = {
        name: "Math",
        symbol: "∛",
        content: [
            MathGroups,
            MathOverUnder,
            MathAccents,
            MathNAry,
            MathBinary,
            MathSymbols,
            MathShapes,
            MathRelations,
            MathUTN28,
            mathLetters_1.LatinBold,
            mathLetters_1.LatinItalic,
            mathLetters_1.LatinBoldItalic,
            mathLetters_1.LatinSans,
            mathLetters_1.LatinSansBold,
            mathLetters_1.LatinSansItalic,
            mathLetters_1.LatinSansBoldItalic,
            mathLetters_1.LatinScript,
            mathLetters_1.LatinScriptBold,
            mathLetters_1.LatinFraktur,
            mathLetters_1.LatinFrakturBold,
            mathLetters_1.LatinMono,
            mathLetters_1.LatinDoubleStruck,
            mathLetters_1.GreekBold,
            mathLetters_1.GreekItalic,
            mathLetters_1.GreekBoldItalic,
            mathLetters_1.GreekSansBold,
            mathLetters_1.GreekSansBoldItalic,
        ],
    };
    const Suits = [
        [
            "♠",
            "♤",
        ],
        [
            "♡",
            "♥",
        ],
        [
            "♢",
            "♦",
        ],
        [
            "♣",
            "♧",
        ],
    ];
    const Dices = [
        "⚀",
        "⚁",
        "⚂",
        "⚃",
        "⚄",
        "⚅",
    ];
    const MusicSymbols = [
        "♩",
        "♪",
        "♫",
        "♭",
        "♮",
        "♯",
    ];
    const GenderSymbols = [
        "♀",
        "♂",
        "⚥",
        "⚲",
    ];
    const MiscSymbols = [
        "◉",
        "◘",
        "◜",
        "◝",
        "◞",
        "◟",
        "★",
        "☆",
        "☉",
        "☡",
        "☻",
        "☼",
        "☽",
        "☾",
        "✓",
        "✠",
        "✪",
        "✶",
        "✽",
        "➛",
        "⤫",
        "⤬",
        "⦙",
        "⦚",
        "⦺",
        "⧉",
        "⧠",
        "⧧",
        "⧮",
        "⧯",
        "⫱",
        "⭐",
        "⭑",
        "⭒",
        "〒",
        "〰",
    ];
    const Parts = [
        "⎛",
        "⎜",
        "⎝",
        "⎡",
        "⎢",
        "⎣",
        "⎧",
        "⎨",
        "⎪",
        "⎩",
        "⎞",
        "⎟",
        "⎠",
        "⎤",
        "⎥",
        "⎦",
        "⎫",
        "⎬",
        "⎪",
        "⎭",
        "⎲",
        "⎳",
        "⌠",
        "⎮",
        "⌡",
        "⎷",
    ];
});
define("config/boards", ["require", "exports", "chars", "config/arrows", "config/math"], function (require, exports, chars_2, arrows_1, math_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MAIN_BOARD = void 0;
    exports.MAIN_BOARD = {
        name: 'Main Board',
        top: true,
        symbol: '⌨',
        content: [
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
                    "ϐ",
                    "∂",
                    "ϵ",
                    "ϑ",
                    "ϰ",
                    "ϕ", "ϴ",
                    "ϱ",
                    "ϖ",
                    "ϝ", "Ϝ",
                    "∇",
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
                    [87]: "ς",
                    [88]: ["χ", "Χ"],
                    [89]: ["υ", "Υ"],
                    [90]: ["ζ", "Ζ"],
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
            math_1.MathKeyboard,
            arrows_1.ArrowsKeyboard,
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
                    "·",
                    "•",
                ]
            },
            {
                name: "Currency",
                symbol: "¤",
                content: [
                    "¤",
                    "₳", "؋", "฿", "₵", "¢", "₡", "₢", "$", "₫", "₯", "₠", "€", "ƒ", "₣", "₲", "₴", "₭", "₤", "ℳ", "₥", "₦", "₪", "₧", "₱", "₰", "£", "﷼", "៛", "૱", "௹", "₨", "৳", "৲", "₮", "₩", "円", "¥", "元", "圓"
                ]
            },
        ]
    };
});
define("builder/builder", ["require", "exports", "builder/unicode", "builder/consolidated", "ahk", "unicodeInterface", "appVar"], function (require, exports, unicode_1, consolidated_1, ahk_1, unicodeInterface_1, appVar_1) {
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
    let building = false;
    async function makeBuild() {
        if (building)
            return;
        try {
            (0, appVar_1.app)().setBuilding(true);
            building = true;
            await build();
        }
        catch (e) {
            console.error(e);
            alert(`Build failed: ${e}`);
        }
        finally {
            (0, appVar_1.app)().setBuilding(false);
            building = false;
        }
    }
    exports.makeBuild = makeBuild;
    async function build() {
        await (0, ahk_1.ahkDownloadUnicode)();
        const paths = {
            emojiTestPath: '../res/data/emoji/15.0/emoji-test.txt',
            emojiDataPath: '../res/data/15.0.0/ucd/emoji/emoji-data.txt',
            unicodeDataPath: '../res/data/15.0.0/ucd/UnicodeData.txt',
            namesListPath: '../res/data/15.0.0/ucd/NamesList.txt',
            annotationsPath: '../res/data/cldr-json/42.0.0/cldr-json/cldr-annotations-full/annotations/en/annotations.json',
        };
        const ctx = {
            unicodeData: await (0, unicode_1.parseUnicodeData)(paths),
            emojiVersion: await (0, unicode_1.parseEmojiVersions)(paths.emojiDataPath),
            emojiTest: await (0, unicode_1.parseEmojiTest)(paths),
            namesList: await (0, unicode_1.parseNamesList)(paths),
            annotations: await (0, unicode_1.parseAnnotations)(paths),
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
    exports.requiredOS = exports.emojiGroup = exports.clusterVariants = exports.clusterName = exports.charInfo = exports.UnicodeData = exports.IgnoreForName = void 0;
    exports.IgnoreForName = [
        8205,
        65039,
    ];
    const u = (0, consolidated_2.getUnicodeData)();
    exports.UnicodeData = u;
    window.u = u;
    function charName(code) {
        if (code >= 19968 && code <= 40956) {
            return `CJK UNIFIED IDEOGRAPH-${code.toString(16)}`;
        }
        else {
            return u.chars[code]?.n ?? `U+${code.toString(16)}`;
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
define("key", ["require", "exports", "preact", "board", "ahk", "appVar", "helpers", "unicodeInterface", "builder/builder", "preact/hooks"], function (require, exports, preact_1, board_1, ahk_2, appVar_2, helpers_1, unicodeInterface_2, builder_2, hooks_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExitRecentKey = exports.RecentKey = exports.ClusterKey = exports.ExitSearchKey = exports.SearchKey = exports.PageKey = exports.KeyboardKey = exports.BackKey = exports.BlankKey = exports.ConfigBuildKey = exports.ConfigLabelKey = exports.ConfigToggleKey = exports.ConfigActionKey = exports.ConfigKey = exports.Key = exports.KeyName = void 0;
    function Symbol({ symbol }) {
        const os = (0, hooks_1.useContext)(appVar_2.OSContext);
        return (0, hooks_1.useMemo)(() => {
            if ([...symbol].length == 1) {
                const info = (0, unicodeInterface_2.charInfo)((0, builder_2.toCodePoints)(symbol)[0]);
                if (info?.ca === "Zs" || info?.ca === "Cf" || info?.ca === "Cc") {
                    return (0, preact_1.h)("div", { className: "symbol s-space" }, info.n);
                }
                else if (info?.ca === "Mn") {
                    symbol = '◌' + symbol;
                }
            }
            const req = (0, unicodeInterface_2.requiredOS)(symbol);
            const fallback = os.lt(req);
            return (0, preact_1.h)("div", { className: (0, helpers_1.cl)(`symbol`, { fallback }) }, symbol);
        }, [symbol, os]);
    }
    function KeyName({ code }) {
        const layout = (0, hooks_1.useContext)(appVar_2.LayoutContext);
        return (0, preact_1.h)(preact_1.Fragment, null, layout.sys[code]?.name ?? '');
    }
    exports.KeyName = KeyName;
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
        Contents = ({ code }) => {
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
            return (0, preact_1.h)("div", { className: (0, helpers_1.cl)('key', keyType, { alt: this.alt, lu: this.lu, active: this.active }), onClick: (e) => {
                    e.preventDefault();
                    e.shiftKey || this.clickAlwaysAlternate ? this.actAlternate() : this.act();
                }, onContextMenu: (e) => {
                    e.preventDefault();
                    this.actAlternate();
                }, onMouseOver: () => (0, appVar_2.app)().updateStatus(this.name), "data-keycode": code },
                (0, preact_1.h)("div", { className: "keyname" },
                    this.keyNamePrefix,
                    (0, preact_1.h)(KeyName, { code: code })),
                (0, preact_1.h)("div", { className: "name" }, this.name),
                (0, preact_1.h)("div", { className: "uname" }, this.upperName),
                (0, preact_1.h)(Symbol, { symbol: this.symbol }));
        };
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
            (0, appVar_2.app)().setMode(2);
        }
    }
    exports.ConfigKey = ConfigKey;
    class ConfigActionKey extends Key {
        action;
        constructor({ active, action, name, symbol }) {
            super({ name, symbol, active });
            this.action = action;
        }
        act() {
            this.action();
        }
    }
    exports.ConfigActionKey = ConfigActionKey;
    class ConfigToggleKey extends ConfigActionKey {
        constructor({ active, action, name, symbol }) {
            active = active ?? false;
            super({
                name: name ?? (active ? "On" : "Off"),
                symbol: symbol ?? (active ? "✔️" : "❌"),
                active, action,
            });
        }
    }
    exports.ConfigToggleKey = ConfigToggleKey;
    class ConfigLabelKey extends Key {
        text;
        constructor(text) {
            super({ name: "", symbol: "" });
            this.text = text;
        }
        Contents = ({ code }) => {
            return (0, preact_1.h)("div", { class: `key label` },
                (0, preact_1.h)("div", { class: "keyname" },
                    (0, preact_1.h)(KeyName, { code: code })),
                (0, preact_1.h)("div", { class: "symbol" }, this.text));
        };
    }
    exports.ConfigLabelKey = ConfigLabelKey;
    class ConfigBuildKey extends Key {
        constructor() {
            super({ name: "Build", symbol: "🏗️" });
        }
        act() {
            (0, builder_2.makeBuild)();
        }
        Contents = ({ code }) => {
            const active = (0, hooks_1.useContext)(appVar_2.ConfigBuildingContext);
            return (0, preact_1.h)("div", { className: (0, helpers_1.cl)('key action', { active }), onClick: (e) => {
                    e.preventDefault();
                    e.shiftKey || this.clickAlwaysAlternate ? this.actAlternate() : this.act();
                }, onContextMenu: (e) => {
                    e.preventDefault();
                    this.actAlternate();
                }, onMouseOver: () => (0, appVar_2.app)().updateStatus(this.name) },
                (0, preact_1.h)("div", { className: "keyname" },
                    (0, preact_1.h)(KeyName, { code: code })),
                (0, preact_1.h)("div", { className: "name" }, this.name),
                (0, preact_1.h)(Symbol, { symbol: this.symbol }));
        };
    }
    exports.ConfigBuildKey = ConfigBuildKey;
    exports.BlankKey = new Key({ name: '', symbol: '' });
    class BackKey extends Key {
        constructor() {
            super({ name: 'Back/🛠️', symbol: '←' });
        }
        act() {
            (0, appVar_2.app)().back();
        }
        actAlternate() {
            (0, appVar_2.app)().setMode(2);
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
            (0, appVar_2.app)().setBoard(this.target);
        }
    }
    exports.KeyboardKey = KeyboardKey;
    class PageKey extends Key {
        page;
        constructor(page, active, name, symbol) {
            super({ name: name ?? `page ${page + 1}`, symbol: symbol ?? '' + (page + 1), active });
            this.page = page;
        }
        act() {
            if (!this.active)
                (0, appVar_2.app)().setPage(this.page);
        }
    }
    exports.PageKey = PageKey;
    class SearchKey extends Key {
        constructor() {
            super({ name: 'search', symbol: '🔎' });
        }
        act() {
            (0, appVar_2.app)().setMode(1);
        }
    }
    exports.SearchKey = SearchKey;
    class ExitSearchKey extends Key {
        constructor() {
            super({ name: 'back', symbol: '←' });
        }
        act() {
            (0, appVar_2.app)().setMode(0);
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
            this.addRecent(this.cluster);
        }
        actAlternate() {
            if (this.alt) {
                (0, appVar_2.app)().setBoard(board_1.Board.clusterAlternates(this.cluster, this.variants));
            }
            else if (this.lu) {
                (0, ahk_2.ahkSend)(this.variants[1]);
                this.addRecent(this.variants[1]);
            }
            else
                return this.act();
        }
        addRecent(symbol) {
            var r = (0, appVar_2.app)().getRecent();
            const riseValue = 11;
            r.forEach(ue => {
                if (ue.useCount < 100) {
                    if (ue.symbol == symbol) {
                        ue.useCount += riseValue;
                    }
                    else if (ue.useCount > 0) {
                        ue.useCount -= 1;
                    }
                }
            });
            var ue = r.filter(ue => ue.symbol == symbol);
            if (ue.length == 0) {
                r.unshift({ symbol: symbol, useCount: riseValue });
            }
            r = r.slice(0, (0, appVar_2.app)().getLayout().free.length);
            r.sort((a, b) => b.useCount - a.useCount);
            (0, appVar_2.app)().updateConfig({ recent: r });
        }
    }
    exports.ClusterKey = ClusterKey;
    class RecentKey extends Key {
        constructor() {
            super({ name: 'Recent', symbol: '⟲' });
        }
        act() {
            (0, appVar_2.app)().setBoard(new board_1.RecentBoard());
        }
    }
    exports.RecentKey = RecentKey;
    class ExitRecentKey extends Key {
        constructor() {
            super({ name: 'Back', symbol: '←' });
        }
        act() {
            (0, appVar_2.app)().back();
        }
    }
    exports.ExitRecentKey = ExitRecentKey;
});
define("config", ["require", "exports", "preact", "layout", "key", "board", "preact/hooks", "appVar"], function (require, exports, preact_2, layout_1, key_1, board_2, hooks_2, appVar_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConfigBoard = exports.DefaultConfigPage = exports.DefaultThemeUrl = exports.ThemesMap = exports.DefaultConfig = exports.DefaultOpacity = exports.Themes = exports.DefaultTheme = void 0;
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
        x: -1,
        y: -1,
        width: 764,
        height: 240,
        devTools: false,
        openAt: "caret",
        opacity: exports.DefaultOpacity,
        skinTone: 0,
        recent: [],
    };
    exports.ThemesMap = new Map(exports.Themes.map((t) => [t.name, t]));
    exports.DefaultThemeUrl = exports.ThemesMap.get(exports.DefaultTheme).url;
    const ConfigPages = [
        {
            name: "General",
            symbol: "🛠️",
            keys(config) {
                return {
                    [16]: new key_1.ConfigToggleKey({
                        active: config.isoKeyboard,
                        action() {
                            (0, appVar_3.app)().updateConfig({ isoKeyboard: !config.isoKeyboard });
                        }
                    }),
                    [17]: new key_1.ConfigLabelKey((0, preact_2.h)(preact_2.Fragment, null,
                        "ISO layout (< between ",
                        (0, preact_2.h)(key_1.KeyName, { code: 42 }),
                        " and ",
                        (0, preact_2.h)(key_1.KeyName, { code: 44 }),
                        ")")),
                };
            }
        },
        {
            name: "Theme",
            symbol: "🎨",
            keys(config) {
                return {
                    ...(0, board_2.mapKeysToSlots)(layout_1.FirstRow, exports.Themes.map((t) => new key_1.ConfigActionKey({
                        active: config.theme == t.name,
                        name: t.name,
                        symbol: t.symbol,
                        action() {
                            (0, appVar_3.app)().updateConfig({ theme: t.name });
                        }
                    }))),
                    ...(0, board_2.mapKeysToSlots)(layout_1.SecondRow, [
                        ...[
                            ["light", "🌞"],
                            ["dark", "🌚"],
                            ["system", "📟"]
                        ].map(([mode, symbol]) => new key_1.ConfigActionKey({
                            active: config.themeMode == mode,
                            name: mode, symbol: symbol,
                            action() {
                                (0, appVar_3.app)().updateConfig({ themeMode: mode });
                            }
                        }))
                    ])
                };
            }
        },
        {
            name: "Display",
            symbol: "🖥️",
            keys(config) {
                return {
                    ...(0, board_2.mapKeysToSlots)(layout_1.FirstRow, [
                        new key_1.ConfigActionKey({
                            symbol: "--", name: "-10", action() {
                                (0, appVar_3.app)().updateConfig({ opacity: Math.max(config.opacity - .1, .2) });
                            }
                        }),
                        new key_1.ConfigActionKey({
                            symbol: "-", name: "-1", action() {
                                (0, appVar_3.app)().updateConfig({ opacity: Math.max(config.opacity - .01, .2) });
                            }
                        }),
                        new key_1.ConfigActionKey({
                            symbol: "+", name: "+1", action() {
                                (0, appVar_3.app)().updateConfig({ opacity: Math.min(config.opacity + .01, 1) });
                            }
                        }),
                        new key_1.ConfigActionKey({
                            symbol: "++", name: "+10", action() {
                                (0, appVar_3.app)().updateConfig({ opacity: Math.min(config.opacity + .1, 1) });
                            }
                        }),
                        new key_1.ConfigActionKey({
                            symbol: `${Math.round(config.opacity * 100)}`, name: "reset", action() {
                                (0, appVar_3.app)().updateConfig({ opacity: exports.DefaultOpacity });
                            }
                        }),
                        new key_1.ConfigLabelKey("Opacity")
                    ]),
                    ...(0, board_2.mapKeysToSlots)(layout_1.SecondRow, [
                        ...[
                            ["last pos", "+"],
                            ["bottom", "_"],
                            ["caret", "|"],
                            ["mouse", "🖯"]
                        ].map(([mode, symbol]) => new key_1.ConfigActionKey({
                            active: config.openAt == mode,
                            name: mode, symbol: symbol,
                            action() {
                                (0, appVar_3.app)().updateConfig({ openAt: mode });
                            }
                        })),
                        new key_1.ConfigLabelKey("Open At")
                    ])
                };
            }
        },
        {
            name: "Tools",
            symbol: "🔨",
            keys(config) {
                return {
                    ...(0, board_2.mapKeysToSlots)(layout_1.FirstRow, [
                        new key_1.ConfigBuildKey(),
                    ]),
                    ...(0, board_2.mapKeysToSlots)(layout_1.SecondRow, [
                        new key_1.ConfigToggleKey({
                            active: config.devTools,
                            action() {
                                (0, appVar_3.app)().updateConfig({ devTools: !config.devTools });
                            }
                        }),
                        new key_1.ConfigLabelKey("Open DevTools")
                    ]),
                };
            }
        }
    ];
    exports.DefaultConfigPage = ConfigPages[0];
    class ConfigBoard extends board_2.Board {
        constructor() {
            super({ name: '__config', symbol: '🛠️' });
        }
        Contents({ state }) {
            const page = Math.min(state?.page ?? 0, ConfigPages.length - 1);
            const config = (0, hooks_2.useContext)(appVar_3.ConfigContext);
            const pageKeys = ConfigPages.map((c, n) => new key_1.PageKey(n, n === page, c.name, c.symbol));
            const keys = {
                [41]: new key_1.ExitSearchKey(),
                ...(0, board_2.mapKeysToSlots)(layout_1.DigitsRow, pageKeys),
                ...ConfigPages[page].keys(config),
            };
            return (0, preact_2.h)(board_2.Keys, { keys: keys });
        }
    }
    exports.ConfigBoard = ConfigBoard;
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
define("appVar", ["require", "exports", "preact", "layout", "osversion"], function (require, exports, preact_3, layout_2, osversion_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SearchContext = exports.ConfigBuildingContext = exports.ConfigContext = exports.OSContext = exports.LayoutContext = exports.app = exports.setApp = void 0;
    let appVar;
    function setApp(app) {
        appVar = app;
    }
    exports.setApp = setApp;
    function app() {
        return appVar;
    }
    exports.app = app;
    exports.LayoutContext = (0, preact_3.createContext)({ ...layout_2.AnsiLayout, sys: layout_2.SystemLayoutUS });
    exports.OSContext = (0, preact_3.createContext)(new osversion_1.Version('99'));
    exports.ConfigContext = (0, preact_3.createContext)(undefined);
    exports.ConfigBuildingContext = (0, preact_3.createContext)(true);
    exports.SearchContext = (0, preact_3.createContext)('');
});
define("board", ["require", "exports", "preact", "ahk", "preact/hooks", "config/boards", "appVar", "key", "memoize-one", "unicodeInterface", "helpers", "builder/builder"], function (require, exports, preact_4, ahk_3, hooks_3, boards_1, appVar_4, key_2, memoize_one_1, unicodeInterface_3, helpers_2, builder_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RecentBoard = exports.StaticBoard = exports.Board = exports.mapKeysToSlots = exports.Keys = exports.getMainBoard = void 0;
    function getMainBoard() {
        return Board.fromEmoji(boards_1.MAIN_BOARD);
    }
    exports.getMainBoard = getMainBoard;
    const MAX_PAGE_KEYS = 9;
    function Keys({ keys }) {
        const l = (0, hooks_3.useContext)(appVar_4.LayoutContext);
        (0, appVar_4.app)().keyHandlers = keys;
        return (0, preact_4.h)("div", { className: "keyboard" }, l.all.map((code) => {
            const K = (keys[code] ?? key_2.BlankKey);
            return (0, preact_4.h)(K.Contents, { code: code, key: code });
        }));
    }
    exports.Keys = Keys;
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
            (0, ahk_3.ahkTitle)(this.name + ": " + str);
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
                        [58]: new key_2.RecentKey(),
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
                return new key_2.KeyboardKey(Board.fromEmoji(item));
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
                    const from = typeof item.from === 'number' ? item.from : (0, builder_3.toCodePoints)(item.from)[0];
                    const to = typeof item.to === 'number' ? item.to : (0, builder_3.toCodePoints)(item.to)[0];
                    if (from && to && to > from) {
                        for (let i = from; i <= to; ++i)
                            keys.push(new key_2.ClusterKey(String.fromCodePoint(i)));
                    }
                }
                else {
                    keys.push(this.fromItem(item));
                }
            }
            return keys;
        }
        static fromEmoji(k) {
            const keys = this.fromContents(k.content ?? []);
            const bySC = (0, helpers_2.fromEntries)(k.bySC ? Object.entries(k.bySC).map(([k, v]) => [k, this.fromItem(v)]) : []);
            const byVK = (0, helpers_2.fromEntries)(k.byVK ? Object.entries(k.byVK).map(([k, v]) => [k, this.fromItem(v)]) : []);
            return this.fromKeys({ name: k.name, symbol: k.symbol, top: k.top, keys, bySC, byVK });
        }
        static clusterAlternates(cluster, variants) {
            const keys = variants.map((c) => new key_2.ClusterKey(c, []));
            return this.fromKeys({ name: (0, unicodeInterface_3.clusterName)(cluster), symbol: cluster, keys });
        }
    }
    exports.Board = Board;
    class StaticBoard extends Board {
        keys;
        constructor({ keys, ...p }) {
            super(p);
            this.keys = (0, memoize_one_1.default)(keys);
        }
        Contents = ({ state }) => {
            const l = (0, hooks_3.useContext)(appVar_4.LayoutContext);
            const pages = (0, hooks_3.useMemo)(() => this.keys(l), [l]);
            const keys = pages[state?.page ?? 0] ?? pages[0];
            return (0, preact_4.h)(Keys, { keys: keys });
        };
    }
    exports.StaticBoard = StaticBoard;
    class RecentBoard extends Board {
        constructor() {
            super({ name: "Recent", symbol: "⟲" });
        }
        Contents() {
            const layout = (0, appVar_4.app)().getLayout();
            const recentEmojis = (0, appVar_4.app)().getRecent();
            recentEmojis.sort((a, b) => b.useCount - a.useCount);
            const keys = (0, hooks_3.useMemo)(() => ({
                [41]: new key_2.ExitRecentKey(),
                [15]: new key_2.SearchKey(),
                [58]: new key_2.ExitRecentKey(),
                ...mapKeysToSlots(layout.free, recentEmojis.map(r => new key_2.ClusterKey(r.symbol)))
            }), [""]);
            (0, appVar_4.app)().keyHandlers = keys;
            return (0, preact_4.h)("div", { class: "keyboard" }, layout.all.map((code) => {
                const K = (keys[code] ?? key_2.BlankKey);
                return (0, preact_4.h)(K.Contents, { code: code, key: code });
            }));
        }
    }
    exports.RecentBoard = RecentBoard;
});
define("emojis", ["require", "exports", "unicodeInterface", "builder/builder", "helpers"], function (require, exports, unicodeInterface_4, builder_4, helpers_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.search = void 0;
    const u = unicodeInterface_4.UnicodeData;
    const ESCAPE_REGEX = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-'].join('|\\') + ')', 'g');
    const SEPARATOR = '%';
    const SEPARATOR_REGEX_G = /%/g;
    const SEARCH_ID = SEPARATOR + '([\\d,]+)' + SEPARATOR + '[^' + SEPARATOR + ']*';
    const index = new Map();
    for (const c of Object.values(u.clusters)) {
        if (!c.parent) {
            index.set((0, builder_4.toCodePoints)(c.cluster).join(',').toString(), `${c.name} ${c.alias?.join(' ') ?? ''}`);
        }
    }
    for (const c of Object.values(u.chars)) {
        if (!c.reserved && !c.notACharacter) {
            index.set(c.code.toString(), `${c.n} ${c.alias?.join(' ') ?? ''} ${c.falias?.join(' ') ?? ''}`);
        }
    }
    console.log(index);
    const searchHaystack = Array.from(index.entries()).map(([k, v]) => `${SEPARATOR}${k}${SEPARATOR}${v.replace(SEPARATOR_REGEX_G, '')}`).join('');
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
                filter.push(m[1]);
            }
            if (k == 0)
                result = filter;
            else {
                const f = new Set(filter);
                result = result.filter(v => f.has(v));
            }
        });
        const scores = (0, helpers_3.fromEntries)(result.map(v => [v, 0]));
        for (const n of needle.split(/\s+/g)) {
            if (!n.length)
                continue;
            const re1 = new RegExp('(?:[^a-z]|^)' + escapeRegex(n) + '(?:[^a-z]|$)', 'i');
            const re2 = new RegExp('(?:[^a-z]|^)' + escapeRegex(n), 'i');
            for (const r of result) {
                if (re1.test(index.get(r)))
                    scores[r]++;
                else if (!re2.test(index.get(r)))
                    scores[r]--;
            }
        }
        result.sort((a, b) => scores[b] - scores[a]);
        return result.map(v => String.fromCodePoint(...v.split(',').map(v => parseInt(v, 10))));
    }
    exports.search = search;
});
define("searchView", ["require", "exports", "preact", "layout", "board", "emojis", "preact/hooks", "key", "appVar"], function (require, exports, preact_5, layout_3, board_3, emojis_1, hooks_4, key_3, appVar_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SearchBoard = void 0;
    class SearchBoard extends board_3.Board {
        constructor() {
            super({ name: "Search", symbol: "🔎" });
        }
        Contents() {
            const searchText = (0, hooks_4.useContext)(appVar_5.SearchContext);
            const onInput = (0, hooks_4.useCallback)((e) => (0, appVar_5.app)().setSearchText(e.target.value), []);
            (0, hooks_4.useEffect)(() => document.querySelector('input[type="search"]')?.focus(), []);
            const keys = (0, hooks_4.useMemo)(() => ({
                [41]: new key_3.ExitSearchKey(),
                [15]: new key_3.ExitSearchKey(),
                [58]: new key_3.RecentKey(),
                ...(0, board_3.mapKeysToSlots)(layout_3.SearchKeyCodes, (0, emojis_1.search)(searchText).map((c) => new key_3.ClusterKey(c)))
            }), [searchText]);
            (0, appVar_5.app)().keyHandlers = keys;
            return (0, preact_5.h)("div", { class: "keyboard" },
                (0, preact_5.h)("input", { type: "search", value: searchText, onInput: onInput }),
                layout_3.SearchKeyCodesTable.map((code) => {
                    const K = (keys[code] ?? key_3.BlankKey);
                    return (0, preact_5.h)(K.Contents, { code: code, key: code });
                }));
        }
    }
    exports.SearchBoard = SearchBoard;
});
define("app", ["require", "exports", "preact", "layout", "board", "osversion", "ahk", "emojis", "config", "helpers", "appVar", "preact/hooks", "searchView"], function (require, exports, preact_6, layout_4, board_4, osversion_2, ahk_4, emojis_2, config_1, helpers_4, appVar_6, hooks_5, searchView_1) {
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
            boardState: {},
            os: new osversion_2.Version('99'),
            currentBoard: {
                [0]: (0, board_4.getMainBoard)(),
                [1]: new searchView_1.SearchBoard(),
                [2]: new config_1.ConfigBoard(),
            },
            parentBoards: (0, helpers_4.fromEntries)(AppModes.map(m => [m, []])),
            building: false,
        };
        constructor(props) {
            super(props);
            (0, appVar_6.setApp)(this);
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
                        case 'possize':
                            this.updateConfig({ x: e.data[1], y: e.data[2], width: e.data[3], height: e.data[4] });
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
                        case 'done':
                        case 'error':
                            console.log("async callback", command, rest);
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
            const Board = s.currentBoard[s.mode];
            const c = (0, preact_6.h)(Board.Contents, { state: s.boardState[Board.name] });
            const l = (0, hooks_5.useMemo)(() => {
                const base = s.config.isoKeyboard ? layout_4.IsoLayout : layout_4.AnsiLayout;
                return { ...base, sys: s.layout };
            }, [s.config.isoKeyboard, s.layout]);
            return (0, preact_6.h)(appVar_6.LayoutContext.Provider, { value: l },
                (0, preact_6.h)(appVar_6.OSContext.Provider, { value: s.os },
                    (0, preact_6.h)(appVar_6.ConfigContext.Provider, { value: s.config },
                        (0, preact_6.h)(appVar_6.ConfigBuildingContext.Provider, { value: s.building },
                            (0, preact_6.h)(appVar_6.SearchContext.Provider, { value: s.searchText },
                                (0, preact_6.h)("div", { className: `root ${s.config.themeMode}-color-scheme ${l.cssClass}` }, c))))));
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
                    const board = s.currentBoard[s.mode];
                    (0, ahk_4.ahkTitle)('Emoji Keyboard - ' + board.name + ': ' + (text?.length ? text : ''));
                    break;
                case 1:
                    (0, ahk_4.ahkTitle)('Emoji Keyboard - Search: ' + (text?.length ? text : ''));
                    break;
                case 2:
                    (0, ahk_4.ahkTitle)('Emoji Keyboard - Settings');
                    break;
                default:
                    return (0, helpers_4.unreachable)(s.mode);
            }
        }
        input(key, shift = false) {
            const s = this.state;
            switch (s.mode) {
                case 0:
                case 1:
                case 2:
                    var keydiv = document.querySelector('[data-keycode="' + key + '"]');
                    var symboldiv = keydiv?.getElementsByClassName("symbol")[0];
                    symboldiv?.classList.add("keypress");
                    setTimeout(() => { symboldiv?.classList.remove("keypress"); }, 100);
                    const k = this.keyHandlers[key];
                    if (k) {
                        if (shift)
                            k.actAlternate();
                        else
                            k.act();
                    }
                    break;
                default:
                    return (0, helpers_4.unreachable)(s.mode);
            }
        }
        setConfig(config) {
            this.updateConfig(JSON.parse(config), false);
        }
        defaultConfig() {
            (0, ahk_4.ahkSaveConfig)(JSON.stringify(this.state.config, null, 4));
            (0, ahk_4.ahkSetOpacity)(this.state.config.opacity);
        }
        updateConfig(config, save = true) {
            this.setState((s) => {
                if (config.theme && s.config.theme != config.theme) {
                    const link = document.getElementById('themeCSS');
                    link.href = config_1.ThemesMap.get(config.theme)?.url ?? config_1.DefaultThemeUrl;
                }
                if (config.openAt) {
                    (0, ahk_4.ahkSetOpenAt)(config.openAt);
                }
                if ((config.x != undefined && config.y != undefined &&
                    config.width != undefined && config.height != undefined)) {
                    (0, ahk_4.ahkSetPosSize)(config.x, config.y, config.width, config.height);
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
                    (0, ahk_4.ahkSaveConfig)(JSON.stringify(this.state.config, null, 4));
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
                currentBoard: { ...s.currentBoard, [s.mode]: board },
                parentBoards: { ...s.parentBoards, [s.mode]: [s.currentBoard[s.mode], ...s.parentBoards[s.mode]] },
            }), () => this.updateStatus());
        }
        setPage(page) {
            this.setState((s) => {
                const board = s.currentBoard[s.mode];
                return {
                    boardState: {
                        ...s.boardState,
                        [board.name]: { page }
                    }
                };
            });
        }
        setBuilding(building) {
            this.setState({ building });
        }
        back() {
            this.setState((s) => {
                if (s.parentBoards[s.mode].length) {
                    const [board, ...parents] = s.parentBoards[s.mode];
                    return {
                        parentBoards: { ...s.parentBoards, [s.mode]: parents },
                        currentBoard: { ...s.currentBoard, [s.mode]: board },
                    };
                }
                return {};
            });
        }
        getLayout() {
            return this.state.config.isoKeyboard ? layout_4.IsoLayout : layout_4.AnsiLayout;
        }
        getRecent() {
            return this.state.config.recent;
        }
    }
    const main = document.querySelector('main');
    preact_6.options.debounceRendering = f => setTimeout(f, 0);
    (0, preact_6.render)((0, preact_6.h)(App, null), main);
    setTimeout(() => (0, ahk_4.ahkReady)(), 0);
});
//# sourceMappingURL=script.js.map
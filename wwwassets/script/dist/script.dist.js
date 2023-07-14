"use strict";
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
    exports.parseAnnotations = exports.parseNamedSequences = exports.parseEmojiTest = exports.parseNamesList = exports.parseUnicodeData = exports.BidiClass = exports.CanonicalCombiningClass = exports.GeneralCategory = exports.parseEmojiVersions = void 0;
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
    async function parseNamedSequences(p) {
        const data = await fetch(p.namedSequencesPath).then(f => f.text());
        const namedSequences = [];
        for (const line of data.split('\n')) {
            if (!line.length || line.startsWith('#'))
                continue;
            const m = line.match(/^(?<name>[^#;]+[^#;\s])\s*;\s*(?<code>[0-9A-F][0-9A-F ]+[0-9A-F])\s*(?:#|$)/)?.groups;
            if (m) {
                const cluster = String.fromCodePoint(...m['code'].split(/\s+/).map(c => parseInt(c, 16)));
                namedSequences.push({
                    cluster,
                    name: m['name']
                });
            }
            else
                console.warn('[parseNamedSequences] failed to parse', line);
        }
        return namedSequences;
    }
    exports.parseNamedSequences = parseNamedSequences;
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
    exports.VarSel16 = exports.VarSel15 = exports.ZeroWidthJoiner = exports.SoftHyphen = void 0;
    exports.SoftHyphen = "\u00ad";
    exports.ZeroWidthJoiner = '\u200D';
    exports.VarSel15 = '\uFE0E';
    exports.VarSel16 = '\uFE0E';
});
define("config/aliases", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EXTEND_ALIASES = void 0;
    exports.EXTEND_ALIASES = {
        "·": ["\\cdotp", "\\centerdot"],
        "•": ["\\smblkcircle", "\\bullet"],
        "√": ["\\sqrt", "\\surd"],
        "∛": ["\\cuberoot"],
        "∜": ["\\fourthroot"],
        "‖": ["\\Vert"],
        "⦀": ["\\Vvert"],
        "⌈": ["\\lceil"],
        "⌜": ["\\ulcorner", "upper left corner"],
        "⌉": ["\\rceil"],
        "⌝": ["\\urcorner", "upper right corner"],
        "⌊": ["\\lfloor"],
        "⌞": ["\\llcorner", "lower left corner"],
        "⌋": ["\\rfloor"],
        "⌟": ["\\lrcorner", "lower right corner"],
        "⎰": ["\\lmoustache", "upper left or lower right curly bracket section"],
        "⎱": ["\\rmoustache", "upper right or lower left curly bracket section"],
        "⟅": ["\\lbag"],
        "⟆": ["\\rbag"],
        "⟨": ["\\langle"],
        "⦑": ["\\langledot"],
        "⟩": ["\\rangle"],
        "⦒": ["\\rangledot"],
        "⧼": ["\\lcurvyangle"],
        "⧽": ["\\rcurvyangle"],
        "⟪": ["\\lAngle"],
        "⟫": ["\\rAngle"],
        "⟮": ["\\lgroup"],
        "⟯": ["\\rgroup"],
        "❲": ["\\lbrbrak"],
        "⦘": ["\\rblkbrbrak"],
        "⦗": ["\\lblkbrbrak"],
        "❳": ["\\rbrbrak"],
        "⦋": ["\\lbrackubar"],
        "⦌": ["\\rbrackubar"],
        "⦍": ["\\lbrackultick"],
        "⦎": ["\\rbracklrtick"],
        "⦏": ["\\lbracklltick"],
        "⦐": ["\\rbrackurtick"],
        "⦓": ["\\lparenless"],
        "⦕": ["\\Lparengtr"],
        "⦔": ["\\rparengtr"],
        "⦖": ["\\Rparenless"],
        "⦅": ["\\lParen"],
        "⦇": ["\\llparenthesis"],
        "⦆": ["\\rParen"],
        "⦈": ["\\rrparenthesis"],
        "⟦": ["\\lBrack"],
        "⟬": ["\\Lbrbrak"],
        "⟧": ["\\rBrack"],
        "⟭": ["\\Rbrbrak"],
        "⦃": ["\\lBrace"],
        "⦄": ["\\rBrace"],
        "⦉": ["\\llangle"],
        "⦊": ["\\rrangle"],
        "⧘": ["\\lvzigzag"],
        "⧚": ["\\Lvzigzag"],
        "⧙": ["\\rvzigzag"],
        "⧛": ["\\Rvzigzag"],
        "⟌": ["\\longdivision"],
        "̀": ["\\grave"],
        "́": ["\\acute"],
        "̂": ["\\hat"],
        "̃": ["\\tilde"],
        "̅": ["\\overbar"],
        "̄": ["\\bar"],
        "̿": ["\\Bar"],
        "̌": ["\\check"],
        "̆": ["\\breve"],
        "̐": ["\\candra"],
        "̒": ["\\oturnedcomma"],
        "̕": ["\\ocommatopright"],
        "̚": ["\\droang"],
        "̇": ["\\dot"],
        "̈": ["\\ddot"],
        "⃛": ["\\dddot"],
        "⃨": ["\\threeunderdot"],
        "⃜": ["\\ddddot"],
        "̉": ["\\ovhook"],
        "̊": ["\\ocirc"],
        "⃗": ["\\vec"],
        "⃐": ["\\leftharpoonaccent"],
        "⃑": ["\\hvec"],
        "⃡": ["\\tvec"],
        "⃒": ["\\vertoverlay"],
        "⃧": ["\\annuity"],
        "⃩": ["\\widebridgeabove"],
        "⃰": ["\\asteraccent"],
        "′": ["\\prime"],
        "″": ["\\dprime"],
        "‴": ["\\trprime"],
        "⁗": ["\\qprime"],
        "‵": ["\\backprime"],
        "‶": ["\\backdprime"],
        "‷": ["\\backtrprime"],
        "⏞": ["\\overbrace"],
        "⏟": ["\\underbrace"],
        "⎴": ["\\overbracket"],
        "⎵": ["\\underbracket"],
        "⏜": ["\\overparen"],
        "⏝": ["\\underparen"],
        "⏠": ["\\overshell", "\\obrbrak"],
        "⏡": ["\\undershell", "\\ubrbrak"],
        "∑": ["\\sum"],
        "⅀": ["\\Bbbsum"],
        "⨊": ["\\modtwosum"],
        "∫": ["\\int"],
        "∬": ["\\iint"],
        "∭": ["\\iiint"],
        "⨌": ["\\iiiint"],
        "∮": ["\\oint"],
        "∯": ["\\oiint"],
        "∰": ["\\oiiint"],
        "∱": ["\\intclockwise"],
        "∲": ["\\coint", "\\varointclockwise"],
        "∳": ["\\aoint", "\\ointctrclockwise"],
        "⨍": ["\\intbar"],
        "⨎": ["\\intBar"],
        "⨏": ["\\fint"],
        "⨐": ["\\cirfnint"],
        "⨑": ["\\awint"],
        "⨒": ["\\rppolint"],
        "⨓": ["\\scpolint"],
        "⨔": ["\\npolint"],
        "⨕": ["\\pointint"],
        "⨖": ["\\sqint"],
        "⨗": ["\\intlarhk"],
        "⨘": ["\\intx"],
        "⨙": ["\\intcap"],
        "⨚": ["\\intcup"],
        "⨛": ["\\upint"],
        "⨜": ["\\lowint"],
        "⨋": ["\\sumint"],
        "∏": ["\\prod"],
        "∐": ["\\amalg", "\\coprod"],
        "⋀": ["\\bigwedge"],
        "⨇": ["\\conjquant"],
        "⋁": ["\\bigvee"],
        "⨈": ["\\disjquant"],
        "⋂": ["\\bigcap"],
        "⋃": ["\\bigcup"],
        "⨃": ["\\bigcupdot"],
        "⨄": ["\\biguplus"],
        "⨅": ["\\bigsqcap"],
        "⨆": ["\\bigsqcup"],
        "⨝": ["\\Join join⊍"],
        "⟗": ["\\fullouterjoin"],
        "⟕": ["\\leftouterjoin"],
        "⟖": ["\\rightouterjoin"],
        "⨞": ["\\bigtriangleleft"],
        "⧸": ["\\xsol"],
        "⧹": ["\\xbsol"],
        "⨀": ["\\bigodot"],
        "⨁": ["\\bigoplus"],
        "⨂": ["\\bigotimes"],
        "⨉": ["\\bigtimes"],
        "⨟": ["\\zcmp"],
        "⨠": ["\\zpipe"],
        "⨡": ["\\zproject"],
        "⫼": ["\\biginterleave"],
        "⫿": ["\\bigtalloblong"],
        "𞻰": ["\\arabicmaj"],
        "𞻱": ["\\arabichad"],
        "⊕": ["\\oplus"],
        "⨭": ["\\opluslhrim"],
        "⨮": ["\\oplusrhrim"],
        "⊖": ["\\ominus"],
        "⊙": ["\\odot"],
        "⊗": ["\\otimes"],
        "⨶": ["\\otimeshat"],
        "⨴": ["\\otimeslhrim"],
        "⨵": ["\\otimesrhrim"],
        "⨷": ["\\Otimes"],
        "⨸": ["\\odiv"],
        "⊘": ["\\oslash"],
        "⊛": ["\\circledast"],
        "⊚": ["\\circledcirc"],
        "⊜": ["\\circledequal"],
        "⊝": ["\\circleddash"],
        "⦵": ["\\circlehbar"],
        "⌽": ["\\obar"],
        "⦶": ["\\circledvert"],
        "⦷": ["\\circledparallel"],
        "⦸": ["\\obslash"],
        "⦹": ["\\operp"],
        "⧀": ["\\olessthan"],
        "⧁": ["\\ogreaterthan"],
        "⦻": ["\\olcross"],
        "⦼": ["\\odotslashdot"],
        "⦽": ["\\uparrowoncircle"],
        "⦾": ["\\circledwhitebullet"],
        "⦿": ["\\circledbullet"],
        "⊞": ["\\boxplus"],
        "⊟": ["\\boxminus"],
        "⊡": ["\\boxdot", "\\dotsquare"],
        "⊠": ["\\boxtimes"],
        "⧄": ["\\boxdiag"],
        "⧆": ["\\boxast"],
        "⧇": ["\\boxcircle"],
        "⨹": ["\\triangleplus"],
        "⨺": ["\\triangleminus"],
        "◬": ["\\trianglecdot"],
        "⨻": ["\\triangletimes"],
        "⩲": ["\\pluseqq"],
        "⩱": ["\\eqqplus"],
        "∔": ["\\dotplus"],
        "⨢": ["\\ringplus"],
        "⨣": ["\\plushat"],
        "⨤": ["\\simplus"],
        "⨥": ["\\plusdot"],
        "⨦": ["\\plussim"],
        "⨧": ["\\plussubtwo"],
        "⨨": ["\\plustrif"],
        "⧺": ["\\doubleplus"],
        "⧻": ["\\tripleplus"],
        "∸": ["\\dotminus"],
        "⨩": ["\\commaminus"],
        "⨪": ["\\minusdot"],
        "⨫": ["\\minusfdots"],
        "⨬": ["\\minusrdots"],
        "⧾": ["\\tplus"],
        "⧿": ["\\tminus"],
        "⋉": ["\\ltimes"],
        "⋊": ["\\rtimes"],
        "⋋": ["\\leftthreetimes"],
        "⋌": ["\\rightthreetimes"],
        "⨰": ["\\dottimes"],
        "⨱": ["\\timesbar"],
        "⨲": ["\\btimes"],
        "⨳": ["\\smashtimes"],
        "⋇": ["\\divideontimes"],
        "⫽": ["\\sslash"],
        "⫻": ["\\trslash"],
        "⧶": ["\\dsol"],
        "⟑": ["\\wedgedot", "logical and with dot"],
        "⋏": ["\\curlywedge"],
        "⌅": ["\\varbarwedge", "\\barwedge", "logical and with bar above"],
        "⌆": ["\\vardoublebarwedge", "\\doublebarwedge", "logical and with double bar above"],
        "⩑": ["\\wedgeodot"],
        "⩚": ["\\wedgemidvert"],
        "⩜": ["\\midbarwedge"],
        "⩞": ["\\doublebarwedge"],
        "⩟": ["\\wedgebar"],
        "⩠": ["\\wedgedoublebar"],
        "⩘": ["\\bigslopedwedge"],
        "⩓": ["\\Wedge"],
        "⩕": ["\\wedgeonwedge"],
        "⊻": ["\\veebar", "logical or with bar below", "exclusive disjunction"],
        "⟇": ["\\veedot", "logical or with dot inside"],
        "⋎": ["\\curlyvee", "curly logical or"],
        "⩒": ["\\veeodot"],
        "⩛": ["\\veemidvert"],
        "⩝": ["\\midbarvee"],
        "⩡": ["\\varveebar"],
        "⩢": ["\\doublebarvee"],
        "⩣": ["\\veedoublebar"],
        "⩗": ["\\bigslopedvee"],
        "⩔": ["\\Vee"],
        "⩖": ["\\veeonvee"],
        "⩀": ["\\capdot"],
        "⩃": ["\\barcap"],
        "⩄": ["\\capwedge"],
        "⩋": ["\\twocaps"],
        "⩍": ["\\closedvarcap"],
        "⋒": ["\\Cap", "\\doublecap"],
        "⊌": ["\\cupleftarrow"],
        "⩁": ["\\uminus"],
        "⩂": ["\\barcup"],
        "⩅": ["\\cupvee"],
        "⩊": ["\\twocups"],
        "⩌": ["\\closedvarcup"],
        "⩐": ["\\closedvarcupsmashprod"],
        "⋓": ["\\Cup", "\\doublecup"],
        "⩆": ["\\cupovercap"],
        "⩈": ["\\cupbarcap"],
        "⩇": ["\\capovercup"],
        "⩉": ["\\capbarcup"],
        "±": ["\\pm", "plus-or-minus"],
        "∓": ["\\mp", "minus-plus"],
        "+": ["\\mathplus"],
        "−": ["\\minus"],
        "⋅": ["\\cdot", "small middle dot"],
        "⋆": ["\\star", "small star, filled, low"],
        "∙": ["\\vysmblkcircle", "bullet operator"],
        "×": ["\\times", "multiply sign"],
        "⨯": ["\\vectimes"],
        "÷": ["\\div", "divide sign"],
        "∕": ["\\divslash"],
        "⁄": ["\\fracslash"],
        "⧵": ["\\setminus"],
        "⧷": ["\\rsolbar"],
        "∖": ["\\smallsetminus", "small set minus"],
        "∗": ["\\ast", "centered asterisk"],
        "∘": ["\\vysmwhtcircle", "composite function", "small circle"],
        "∧": ["\\wedge", "\\land"],
        "⊼": ["\\barwedge", "bar, wedge", "logical and with bar above"],
        "∨": ["\\vee", "\\lor"],
        "⊽": ["\\barvee", "bar, vee", "logical or with bar above"],
        "∩": ["\\cap"],
        "∪": ["\\cup", "logical sum"],
        "⊍": ["\\cupdot", "union with dot"],
        "⊎": ["\\uplus"],
        "⊓": ["\\sqcap", "square intersection"],
        "⩎": ["\\Sqcap"],
        "⊔": ["\\sqcup", "square union"],
        "⩏": ["\\Sqcup"],
        "†": ["\\dagger"],
        "‡": ["\\ddagger"],
        "⁀": ["\\tieconcat"],
        "∾": ["\\invlazys"],
        "≀": ["\\wr"],
        "⅋": ["\\upand"],
        "⊺": ["\\intercal"],
        "⧖": ["\\hourglass"],
        "⧗": ["\\blackhourglass"],
        "⧢": ["\\shuffle"],
        "⨾": ["\\fcmp"],
        "⨿": ["\\amalg"],
        "⫴": ["\\interleave"],
        "⫵": ["\\nhVvert"],
        "⫶": ["\\threedotcolon"],
        "⫾": ["\\talloblong"],
        "⨼": ["\\intprod"],
        "⨽": ["\\intprodr"],
        "§": ["\\mathsection"],
        "¬": ["\\neg", "\\lnot"],
        "⌐": ["\\invnot"],
        "¶": ["\\mathparagraph"],
        "Ƶ": ["\\Zbar", "impedance"],
        "϶": ["\\upbackepsilon"],
        "―": ["\\horizbar"],
        "‗": ["\\twolowline"],
        "‥": ["\\enleadertwodots", "double baseline dot", "en leader"],
        "…": ["\\unicodeellipsis"],
        "‸": ["\\caretinsert", "insertion mark"],
        "‼": ["\\Exclam"],
        "⁃": ["\\hyphenbullet", "filled rectangle"],
        "⁇": ["\\Question"],
        "ℇ": ["\\Eulerconst"],
        "ℎ": ["\\Planckconst"],
        "℧": ["\\mho", "conductance"],
        "Ⅎ": ["\\Finv"],
        "ℼ": ["\\Bbbpi"],
        "⅁": ["\\Game"],
        "⅂": ["\\sansLturned"],
        "⅃": ["\\sansLmirrored"],
        "⅄": ["\\Yup"],
        "⅊": ["\\PropertyLine"],
        "∀": ["\\forall"],
        "∁": ["\\complement"],
        "∃": ["\\exists", "at least one exists"],
        "∄": ["\\nexists", "negated exists"],
        "∅": ["\\varnothing", "\\emptyset", "circle, slash"],
        "⌀": ["\\diameter"],
        "⦰": ["\\revemptyset"],
        "⦱": ["\\emptysetobar"],
        "⦲": ["\\emptysetocirc"],
        "⦳": ["\\emptysetoarr"],
        "⦴": ["\\emptysetoarrl"],
        "∆": ["\\increment", "laplacian", "delta", "nabla squared"],
        "∎": ["\\QED"],
        "∞": ["\\infty"],
        "⧜": ["\\iinfin"],
        "⧝": ["\\tieinfty"],
        "⧞": ["\\nvinfty"],
        "♾": ["\\acidfree", "permanent paper sign"],
        "∠": ["\\angle"],
        "∟": ["\\rightangle", "90 degree angle"],
        "∡": ["\\measuredangle", "angle-measured"],
        "∢": ["\\sphericalangle", "angle-spherical"],
        "⊾": ["\\measuredrightangle", "right angle-measured"],
        "⟀": ["\\threedangle"],
        "⦛": ["\\measuredangleleft"],
        "⦜": ["\\rightanglesqr"],
        "⦝": ["\\rightanglemdot"],
        "⦞": ["\\angles"],
        "⦟": ["\\angdnr"],
        "⦠": ["\\gtlpar"],
        "⦡": ["\\sphericalangleup"],
        "⦢": ["\\turnangle"],
        "⦣": ["\\revangle"],
        "⦤": ["\\angleubar"],
        "⦥": ["\\revangleubar"],
        "⦦": ["\\wideangledown"],
        "⦧": ["\\wideangleup"],
        "⦨": ["\\measanglerutone"],
        "⦩": ["\\measanglelutonw"],
        "⦪": ["\\measanglerdtose"],
        "⦫": ["\\measangleldtosw"],
        "⦬": ["\\measangleurtone"],
        "⦭": ["\\measangleultonw"],
        "⦮": ["\\measangledrtose"],
        "⦯": ["\\measangledltosw"],
        "∴": ["\\therefore"],
        "∵": ["\\because"],
        "∿": ["\\sinewave"],
        "⏦": ["\\accurrent"],
        "⊤": ["\\top"],
        "⊥": ["\\bot"],
        "⊹": ["\\hermitmatrix"],
        "⋯": ["\\unicodecdots", "three dots, centered"],
        "⌂": ["\\house"],
        "⌒": ["\\profline", "profile of a line"],
        "⌓": ["\\profsurf", "profile of a surface"],
        "⌗": ["\\viewdata"],
        "⌙": ["\\turnednot"],
        "⌲": ["\\conictaper"],
        "⌶": ["\\topbot", "top and bottom"],
        "⍀": ["\\APLnotbackslash"],
        "⍼": ["\\rangledownzigzagarrow"],
        "⎯": ["\\harrowextender", "horizontal line extension for arrows"],
        "⎶": ["\\bbrktbrk", "bottom square bracket over top square bracket"],
        "⎸": ["\\lvboxline"],
        "⎹": ["\\rvboxline"],
        "⏤": ["\\strns"],
        "⏧": ["\\elinters"],
        "␢": ["\\blanksymbol"],
        "␣": ["\\mathvisiblespace"],
        "┆": ["\\bdtriplevdash", "doubly broken vert"],
        "▀": ["\\blockuphalf"],
        "▄": ["\\blocklowhalf"],
        "█": ["\\blockfull", "\\eqarray"],
        "▌": ["\\blocklefthalf"],
        "▐": ["\\blockrighthalf"],
        "░": ["\\blockqtrshaded", "25% shaded block"],
        "▒": ["\\blockhalfshaded", "50% shaded block"],
        "▓": ["\\blockthreeqtrshaded", "75% shaded block"],
        "○": ["\\mdlgwhtcircle", "medium large circle"],
        "⚆": ["\\circledrightdot"],
        "⚈": ["\\blackcircledrightdot"],
        "⚇": ["\\circledtwodots"],
        "⚉": ["\\blackcircledtwodots"],
        "⧂": ["\\cirscir"],
        "⧃": ["\\cirE"],
        "⧬": ["\\circledownarrow"],
        "⧭": ["\\blackcircledownarrow"],
        "⧲": ["\\errbarcircle"],
        "⧳": ["\\errbarblackcircle"],
        "⃝": ["\\enclosecircle"],
        "◍": ["\\circlevertfill"],
        "◎": ["\\bullseye"],
        "●": ["\\mdlgblkcircle"],
        "◐": ["\\circlelefthalfblack", "harvey ball"],
        "◑": ["\\circlerighthalfblack"],
        "◒": ["\\circlebottomhalfblack", "circle, filled bottom half"],
        "◓": ["\\circletophalfblack", "circle, filled top half"],
        "◔": ["\\circleurquadblack"],
        "◕": ["\\blackcircleulquadwhite"],
        "◖": ["\\blacklefthalfcircle"],
        "◗": ["\\blackrighthalfcircle"],
        "◴": ["\\circleulquad"],
        "◵": ["\\circlellquad"],
        "◶": ["\\circlelrquad"],
        "◷": ["\\circleurquad"],
        "◌": ["\\dottedcircle"],
        "◦": ["\\smwhtcircle"],
        "⚬": ["\\mdsmwhtcircle"],
        "⦁": ["\\mdsmblkcircle"],
        "⚪": ["\\mdwhtcircle", "medium white circle"],
        "⚫": ["\\mdblkcircle", "medium black circle"],
        "◯": ["\\lgwhtcircle"],
        "⬤": ["\\lgblkcircle"],
        "◠": ["\\topsemicircle"],
        "◡": ["\\botsemicircle"],
        "◙": ["\\inversewhitecircle"],
        "◚": ["\\invwhiteupperhalfcircle"],
        "◛": ["\\invwhitelowerhalfcircle"],
        "⬭": ["\\whthorzoval"],
        "⬬": ["\\blkhorzoval"],
        "⬯": ["\\whtvertoval"],
        "⬮": ["\\blkvertoval"],
        "△": ["\\bigtriangleup", "big up triangle, open"],
        "▲": ["\\bigblacktriangleup"],
        "⟁": ["\\whiteinwhitetriangle"],
        "⧊": ["\\triangleodot"],
        "⧋": ["\\triangleubar"],
        "⧌": ["\\triangles"],
        "◭": ["\\triangleleftblack"],
        "◮": ["\\trianglerightblack"],
        "▴": ["\\blacktriangle", "up triangle, filled"],
        "⧍": ["\\triangleserifs"],
        "⃤": ["\\enclosetriangle"],
        "▽": ["\\bigtriangledown", "big down triangle, open"],
        "▼": ["\\bigblacktriangledown", "big down triangle, filled"],
        "⧨": ["\\downtriangleleftblack"],
        "⧩": ["\\downtrianglerightblack"],
        "▿": ["\\triangledown", "down triangle, open"],
        "▾": ["\\blacktriangledown", "down triangle, filled"],
        "◁": ["\\triangleleft", "large left triangle, open"],
        "◀": ["\\blacktriangleleft", "large left triangle, filled"],
        "⩤": ["\\dsub"],
        "▷": ["\\triangleright", "large right triangle, open"],
        "▶": ["\\blacktriangleright", "large right triangle, filled"],
        "⩥": ["\\rsub"],
        "⊿": ["\\varlrtriangle"],
        "◿": ["\\lrtriangle"],
        "◢": ["\\lrblacktriangle"],
        "◺": ["\\lltriangle"],
        "◣": ["\\llblacktriangle"],
        "◸": ["\\ultriangle"],
        "◤": ["\\ulblacktriangle"],
        "◹": ["\\urtriangle"],
        "◥": ["\\urblacktriangle"],
        "◻": ["\\mdwhtsquare"],
        "◼": ["\\mdblksquare"],
        "□": ["\\mdlgwhtsquare", "\\box", "square, open"],
        "■": ["\\mdlgblksquare", "\\matrix", "square, filled"],
        "⟤": ["\\whitesquaretickleft"],
        "⟥": ["\\whitesquaretickright"],
        "⧅": ["\\boxbslash"],
        "⧈": ["\\boxbox"],
        "◫": ["\\boxbar", "vertical bar in box"],
        "⃞": ["\\enclosesquare"],
        "▢": ["\\squoval"],
        "▣": ["\\blackinwhitesquare"],
        "▤": ["\\squarehfill", "square, horizontal rule filled"],
        "▥": ["\\squarevfill", "square, vertical rule filled"],
        "▦": ["\\squarehvfill"],
        "▧": ["\\squarenwsefill", "square, nw-to-se rule filled"],
        "▨": ["\\squareneswfill", "square, ne-to-sw rule filled"],
        "▩": ["\\squarecrossfill"],
        "◧": ["\\squareleftblack", "square, filled left half"],
        "◨": ["\\squarerightblack", "square, filled right half"],
        "◩": ["\\squareulblack", "square, filled top left corner"],
        "◪": ["\\squarelrblack", "square, filled bottom right corner"],
        "⬒": ["\\squaretopblack", "square, filled top half"],
        "⬓": ["\\squarebotblack", "square, filled bottom half"],
        "⬔": ["\\squareurblack", "square, filled upper right diagonal"],
        "⬕": ["\\squarellblack", "square, filled lower left diagonal"],
        "◰": ["\\squareulquad"],
        "◱": ["\\squarellquad"],
        "◲": ["\\squarelrquad"],
        "◳": ["\\squareurquad"],
        "⬚": ["\\dottedsquare"],
        "⬞": ["\\vysmwhtsquare"],
        "⬝": ["\\vysmblksquare"],
        "▫": ["\\smwhtsquare"],
        "▪": ["\\smblksquare", "\\blacksquare", "sq bullet, filled"],
        "◽": ["\\mdsmwhtsquare"],
        "◾": ["\\mdsmblksquare"],
        "⬜": ["\\lgwhtsquare"],
        "⬛": ["\\lgblksquare"],
        "▯": ["\\vrectangle"],
        "▮": ["\\vrectangleblack"],
        "▭": ["\\hrectangle", "\\rect", "horizontal rectangle, open"],
        "▬": ["\\hrectangleblack", "horizontal rectangle, filled"],
        "▱": ["\\parallelogram", "parallelogram, open"],
        "▰": ["\\parallelogramblack", "parallelogram, filled"],
        "⏢": ["\\trapezium", "trapezium, open"],
        "⏥": ["\\fltns"],
        "⍓": ["\\APLboxupcaret", "boxed up caret"],
        "⍰": ["\\APLboxquestion", "boxed question mark"],
        "⟐": ["\\diamondcdot"],
        "⟠": ["\\lozengeminus"],
        "⟡": ["\\concavediamond", "\\phantom"],
        "⟢": ["\\concavediamondtickleft"],
        "⟣": ["\\concavediamondtickright"],
        "⧪": ["\\blackdiamonddownarrow"],
        "⧰": ["\\errbardiamond"],
        "⧱": ["\\errbarblackdiamond"],
        "⌑": ["\\sqlozenge"],
        "⋄": ["\\smwhtdiamond"],
        "⬩": ["\\smblkdiamond"],
        "⬫": ["\\smwhtlozenge"],
        "⬪": ["\\smblklozenge"],
        "⬦": ["\\mdwhtdiamond"],
        "⬥": ["\\mdblkdiamond"],
        "◇": ["\\mdlgwhtdiamond", "diamond, open"],
        "◆": ["\\mdlgblkdiamond", "diamond, filled"],
        "⬨": ["\\mdwhtlozenge"],
        "⬧": ["\\mdblklozenge"],
        "◈": ["\\blackinwhitediamond"],
        "⬖": ["\\diamondleftblack"],
        "⬗": ["\\diamondrightblack"],
        "⬘": ["\\diamondtopblack"],
        "⬙": ["\\diamondbotblack"],
        "⃟": ["\\enclosediamond"],
        "◊": ["\\mdlgwhtlozenge", "total mark"],
        "⧫": ["\\mdlgblklozenge"],
        "⬠": ["\\pentagon"],
        "⬟": ["\\pentagonblack"],
        "⭔": ["\\rightpentagon"],
        "⭓": ["\\rightpentagonblack"],
        "⎔": ["\\hexagon", "horizontal benzene ring", "hexagon flat open"],
        "⬣": ["\\hexagonblack"],
        "⬡": ["\\varhexagon"],
        "⬢": ["\\varhexagonblack"],
        "⌬": ["\\varhexagonlrbonds", "six carbon ring, corner down, double bonds lower right etc"],
        "⏣": ["\\benzenr"],
        "⋖": ["\\lessdot"],
        "⋗": ["\\gtrdot"],
        "⩹": ["\\ltcir"],
        "⩺": ["\\gtcir"],
        "⩻": ["\\ltquest"],
        "⩼": ["\\gtquest"],
        "⪇": ["\\lneq"],
        "⪈": ["\\gneq"],
        "≦": ["\\leqq"],
        "≨": ["\\lneqq"],
        "≧": ["\\geqq"],
        "≩": ["\\gneqq"],
        "⋜": ["\\eqless"],
        "⋝": ["\\eqgtr"],
        "⪙": ["\\eqqless"],
        "⪚": ["\\eqqgtr"],
        "⩽": ["\\leqslant"],
        "⩾": ["\\geqslant"],
        "⩿": ["\\lesdot"],
        "⪀": ["\\gesdot"],
        "⪁": ["\\lesdoto"],
        "⪂": ["\\gesdoto"],
        "⪃": ["\\lesdotor"],
        "⪄": ["\\gesdotol"],
        "⪕": ["\\eqslantless"],
        "⪖": ["\\eqslantgtr"],
        "⪗": ["\\elsdot"],
        "⪘": ["\\egsdot"],
        "⫹": ["\\leqqslant"],
        "⫺": ["\\geqqslant"],
        "⪛": ["\\eqqslantless"],
        "⪜": ["\\eqqslantgtr"],
        "≲": ["\\lesssim", "less, similar"],
        "≴": ["\\nlesssim", "not less, similar"],
        "≳": ["\\gtrsim", "greater, similar"],
        "≵": ["\\ngtrsim", "not greater, similar"],
        "⋦": ["\\lnsim", "less, not similar"],
        "⋧": ["\\gnsim", "greater, not similar"],
        "⪅": ["\\lessapprox"],
        "⪉": ["\\lnapprox"],
        "⪆": ["\\gtrapprox"],
        "⪊": ["\\gnapprox"],
        "⪍": ["\\lsime"],
        "⪎": ["\\gsime"],
        "⪝": ["\\simless"],
        "⪞": ["\\simgtr"],
        "⪟": ["\\simlE"],
        "⪠": ["\\simgE"],
        "⪣": ["\\partialmeetcontraction"],
        "⋘": ["\\lll", "\\llless", "triple less-than"],
        "⫷": ["\\lllnest", "stacked very much less-than"],
        "⋙": ["\\ggg", "\\gggtr", "triple greater-than"],
        "⫸": ["\\gggnest", "stacked very much greater-than"],
        "≷": ["\\gtrless"],
        "≹": ["\\ngtrless"],
        "⋚": ["\\lesseqgtr"],
        "⋛": ["\\gtreqless"],
        "⪋": ["\\lesseqqgtr"],
        "⪌": ["\\gtreqqless"],
        "⪏": ["\\lsimg"],
        "⪐": ["\\gsiml"],
        "⪑": ["\\lgE"],
        "⪒": ["\\glE"],
        "⪓": ["\\lesges"],
        "⪔": ["\\gesles"],
        "⪤": ["\\glj"],
        "⪥": ["\\gla"],
        "⪪": ["\\smt"],
        "⪫": ["\\lat"],
        "⪬": ["\\smte"],
        "⪭": ["\\late"],
        "⋞": ["\\curlyeqprec", "curly equals, precedes"],
        "⋟": ["\\curlyeqsucc", "curly equals, succeeds"],
        "⪯": ["\\preceq"],
        "⪱": ["\\precneq"],
        "⪰": ["\\succeq"],
        "⪲": ["\\succneq"],
        "⪳": ["\\preceqq"],
        "⪵": ["\\precneqq"],
        "⪴": ["\\succeqq"],
        "⪶": ["\\succneqq"],
        "≾": ["\\precsim", "precedes, similar"],
        "⋨": ["\\precnsim", "precedes, not similar"],
        "≿": ["\\succsim", "succeeds, similar"],
        "⋩": ["\\succnsim", "succeeds, not similar"],
        "⪷": ["\\precapprox"],
        "⪹": ["\\precnapprox"],
        "⪸": ["\\succapprox"],
        "⪺": ["\\succnapprox"],
        "⪻": ["\\Prec"],
        "⪼": ["\\Succ"],
        "⊰": ["\\prurel"],
        "⊱": ["\\scurel"],
        "⥽": ["\\rightfishtail"],
        "⥼": ["\\leftfishtail"],
        "∊": ["\\smallin", "small set membership"],
        "∍": ["\\smallni", "\\ni", "\\owns"],
        "⋲": ["\\disin"],
        "⋺": ["\\nisd"],
        "⋳": ["\\varisins"],
        "⋻": ["\\varnis"],
        "⋴": ["\\isins"],
        "⋼": ["\\nis"],
        "⋵": ["\\isindot"],
        "⋶": ["\\varisinobar"],
        "⋽": ["\\varniobar"],
        "⋷": ["\\isinobar"],
        "⋾": ["\\niobar"],
        "⋸": ["\\isinvb"],
        "⋹": ["\\isinE"],
        "⟒": ["\\upin"],
        "⫙": ["\\forkv"],
        "⋔": ["\\pitchfork"],
        "⫚": ["\\topfork"],
        "⫛": ["\\mlcp"],
        "⫝̸": ["\\forks"],
        "⫝": ["\\forksnot"],
        "⋿": ["\\bagmember"],
        "⪽": ["\\subsetdot"],
        "⪾": ["\\supsetdot"],
        "⪿": ["\\subsetplus"],
        "⫀": ["\\supsetplus"],
        "⫁": ["\\submult"],
        "⫂": ["\\supmult"],
        "⟈": ["\\bsolhsub"],
        "⟉": ["\\suphsol"],
        "⟃": ["\\subsetcirc"],
        "⟄": ["\\supsetcirc"],
        "⋐": ["\\Subset"],
        "⋑": ["\\Supset"],
        "⫏": ["\\csub"],
        "⫐": ["\\csup"],
        "⊊": ["\\subsetneq"],
        "⊋": ["\\supsetneq"],
        "⫃": ["\\subedot"],
        "⫄": ["\\supedot"],
        "⫑": ["\\csube"],
        "⫒": ["\\csupe"],
        "⫅": ["\\subseteqq"],
        "⫆": ["\\supseteqq"],
        "⫇": ["\\subsim"],
        "⫈": ["\\supsim"],
        "⫉": ["\\subsetapprox"],
        "⫊": ["\\supsetapprox"],
        "⫋": ["\\subsetneqq"],
        "⫌": ["\\supsetneqq"],
        "⫓": ["\\subsup"],
        "⫔": ["\\supsub"],
        "⫕": ["\\subsub"],
        "⫖": ["\\supsup"],
        "⫗": ["\\suphsub"],
        "⫘": ["\\supdsub"],
        "⊏": ["\\sqsubset", "square subset"],
        "⊐": ["\\sqsupset", "square superset"],
        "⫍": ["\\lsqhook"],
        "⫎": ["\\rsqhook"],
        "⊑": ["\\sqsubseteq", "square subset, equals"],
        "⋢": ["\\nsqsubseteq", "not, square subset, equals"],
        "⊒": ["\\sqsupseteq", "square superset, equals"],
        "⋣": ["\\nsqsupseteq", "not, square superset, equals"],
        "⋤": ["\\sqsubsetneq", "square subset, not equals"],
        "⋥": ["\\sqsupsetneq", "square superset, not equals"],
        "⩵": ["\\eqeq"],
        "⩶": ["\\eqeqeq"],
        "⧦": ["\\gleichstark"],
        "≖": ["\\eqcirc", "circle on equals sign"],
        "≝": ["\\eqdef"],
        "≟": ["\\questeq", "equal with question mark"],
        "≗": ["\\circeq", "circle, equals"],
        "≘": ["\\arceq", "arc, equals"],
        "≙": ["\\wedgeq", "wedge, equals"],
        "≚": ["\\veeeq", "logical or, equals"],
        "≛": ["\\stareq"],
        "⩮": ["\\asteq"],
        "≜": ["\\triangleq", "triangle, equals"],
        "≞": ["\\measeq"],
        "⪮": ["\\bumpeqq"],
        "⩦": ["\\eqdot"],
        "⩧": ["\\dotequiv"],
        "⋕": ["\\equalparallel"],
        "⩨": ["\\equivVert"],
        "⩩": ["\\equivVvert"],
        "⧣": ["\\eparsl"],
        "⧤": ["\\smeparsl"],
        "⧥": ["\\eqvparsl"],
        "≍": ["\\asymp", "asymptotically equal to"],
        "≭": ["\\nasymp", "not asymptotically equal to"],
        "≎": ["\\Bumpeq", "bumpy equals"],
        "≏": ["\\bumpeq", "bumpy equals, equals"],
        "≐": ["\\doteq", "equals, single dot above"],
        "≑": ["\\Doteq", "\\doteqdot", "equals, even dots"],
        "≒": ["\\fallingdotseq", "equals, falling dots"],
        "≓": ["\\risingdotseq", "equals, rising dots"],
        "≔": ["\\coloneq"],
        "⩴": ["\\Coloneq"],
        "≕": ["\\eqcolon"],
        "⩷": ["\\ddotseq"],
        "≣": ["\\Equiv", "four lines"],
        "⩸": ["\\equivDD"],
        "⋍": ["\\backsimeq", "reverse similar, equals"],
        "≅": ["\\cong(l)", "congruent with"],
        "≆": ["\\simneqq", "similar, not equals"],
        "≇": ["\\ncong", "not congruent with"],
        "≌": ["\\backcong"],
        "≂": ["\\eqsim", "equals, similar"],
        "≊": ["\\approxeq", "approximate, equals"],
        "≋": ["\\approxident", "approximately identical to"],
        "⩬": ["\\simminussim"],
        "⩭": ["\\congdot"],
        "⩯": ["\\hatapprox"],
        "⩰": ["\\approxeqq"],
        "⩳": ["\\eqqsim"],
        "∻": ["\\kernelcontraction"],
        "⩪": ["\\dotsim"],
        "⩫": ["\\simrdots"],
        "∽": ["\\backsim", "reverse similar"],
        "⊲": ["\\vartriangleleft", "left triangle, open, variant"],
        "⋪": ["\\nvartriangleleft", "not left triangle"],
        "⊳": ["\\vartriangleright", "right triangle, open, variant"],
        "⋫": ["\\nvartriangleright", "not right triangle"],
        "⊴": ["\\trianglelefteq", "left triangle, equals"],
        "⋬": ["\\ntrianglelefteq", "not left triangle, equals"],
        "⊵": ["\\trianglerighteq", "right triangle, equals"],
        "⋭": ["\\ntrianglerighteq", "not right triangle, equals"],
        "⧡": ["\\lrtriangleeq"],
        "⧏": ["\\ltrivb"],
        "⧐": ["\\vbrtri"],
        "⪦": ["\\ltcc"],
        "⪧": ["\\gtcc"],
        "⪨": ["\\lescc"],
        "⪩": ["\\gescc"],
        "⧎": ["\\rtriltri"],
        "⊢": ["\\vdash", "vertical, dash"],
        "⊬": ["\\nvdash", "not vertical, dash"],
        "⊣": ["\\dashv", "dash, vertical"],
        "⊦": ["\\assert", "vertical, short dash"],
        "⫞": ["\\shortlefttack"],
        "⫟": ["\\shortdowntack"],
        "⫠": ["\\shortuptack"],
        "⟝": ["\\vlongdash"],
        "⟞": ["\\longdashv"],
        "⊧": ["\\models", "vertical, short double dash"],
        "⊨": ["\\vDash", "vertical, double dash"],
        "⊭": ["\\nvDash", "not vertical, double dash"],
        "⊩": ["\\Vdash", "double vertical, dash"],
        "⊮": ["\\nVdash", "not double vertical, dash"],
        "⊪": ["\\Vvdash", "triple vertical, dash"],
        "⊫": ["\\VDash", "double vert, double dash"],
        "⊯": ["\\nVDash", "not double vert, double dash"],
        "⟚": ["\\DashVDash", "left and right double dash"],
        "⟛": ["\\dashVdash", "left and right tack"],
        "⫢": ["\\vDdash"],
        "⫣": ["\\dashV"],
        "⫤": ["\\Dashv"],
        "⫥": ["\\DashV"],
        "⫦": ["\\varVdash"],
        "⫧": ["\\Barv"],
        "⫨": ["\\vBar"],
        "⫩": ["\\vBarv"],
        "⫪": ["\\barV"],
        "⫫": ["\\Vbar"],
        "⫬": ["\\Not"],
        "⫭": ["\\bNot"],
        "≶": ["\\lessgtr", "less, greater"],
        "≸": ["\\nlessgtr", "not less, greater"],
        "<": ["\\less"],
        "≮": ["\\nless"],
        ">": ["\\greater"],
        "≯": ["\\ngtr"],
        "≪": ["\\ll"],
        "⪡": ["\\Lt"],
        "≫": ["\\gg"],
        "⪢": ["\\Gt"],
        "≤": ["\\leq", "\\le"],
        "≰": ["\\nleq", "not less-than-or-equal"],
        "≥": ["\\geq", "\\ge"],
        "≱": ["\\ngeq", "not greater-than-or-equal"],
        "≺": ["\\prec"],
        "⊀": ["\\nprec"],
        "≻": ["\\succ"],
        "⊁": ["\\nsucc"],
        "≼": ["\\preccurlyeq", "precedes, curly equals"],
        "⋠": ["\\npreccurlyeq", "not precedes, curly equals"],
        "≽": ["\\succcurlyeq", "succeeds, curly equals"],
        "⋡": ["\\nsucccurlyeq", "not succeeds, curly equals"],
        "∈": ["\\in", "set membership", "variant"],
        "∉": ["\\notin(l)", "negated set membership"],
        "∋": ["\\ni", "contains", "variant"],
        "∌": ["\\nni", "negated contains", "variant"],
        "∝": ["\\propto", "is proportional to"],
        "=": ["\\equal"],
        "≠": ["\\ne", "\\neq"],
        "≡": ["\\equiv"],
        "≢": ["\\nequiv"],
        "∼": ["\\sim", "similar"],
        "≁": ["\\nsim", "not similar"],
        "≃": ["\\simeq sime", "similar, equals"],
        "≄": ["\\nsime", "\\nsimeq", "not similar, equals"],
        "≈": ["\\approx", "approximate"],
        "≉": ["\\napprox", "not approximate"],
        "⊂": ["\\subset", "is implied by"],
        "⊄": ["\\nsubset"],
        "⊃": ["\\supset", "implies"],
        "⊅": ["\\nsupset"],
        "⊆": ["\\subseteq"],
        "⊈": ["\\nsubseteq", "not subset, equals"],
        "⊇": ["\\supseteq"],
        "⊉": ["\\nsupseteq", "not superset, equals"],
        "⋈": ["\\bowtie"],
        "⧓": ["\\fbowtie"],
        "⧔": ["\\lftimes"],
        "⧑": ["\\lfbowtie"],
        "⧒": ["\\rfbowtie"],
        "⧕": ["\\rftimes"],
        "⋮": ["\\vdots"],
        "⋰": ["\\adots", "three dots, ascending"],
        "⋱": ["\\ddots", "three dots, descending"],
        "≬": ["\\between"],
        "⁐": ["\\closure"],
        "⌢": ["\\frown", "down curve"],
        "⌣": ["\\smile", "up curve"],
        "⌿": ["\\APLnotslash", "solidus, bar through"],
        "▵": ["\\vartriangle", "\\triangle", "up triangle, open"],
        "⟂": ["\\perp"],
        "⫡": ["\\perps"],
        "⟓": ["\\pullback"],
        "⟔": ["\\pushout"],
        "⧟": ["\\dualmap"],
        "⊶": ["\\origof"],
        "⊷": ["\\imageof"],
        "⊸": ["\\multimap"],
        "⫯": ["\\cirmid"],
        "⫰": ["\\midcir"],
        "⟜": ["\\multimapinv"],
        "⟟": ["\\cirbot"],
        "⥾": ["\\upfishtail"],
        "⥿": ["\\downfishtail"],
        "⦂": ["\\typecolon"],
        "∶": ["\\mathratio"],
        "∷": ["\\Colon", "two colons"],
        "∹": ["\\dashcolon", "-:"],
        "∺": ["\\dotsminusdots", "minus with four dots"],
        "⧴": ["\\ruledelayed"],
        "⩙": ["\\veeonwedge"],
        "∣": ["\\mid"],
        "∤": ["\\nmid", "negated mid"],
        "∥": ["\\parallel"],
        "∦": ["\\nparallel"],
        "⫮": ["\\revnmid"],
        "⫲": ["\\nhpar"],
        "⫳": ["\\parsim"],
        "¯": ["\\overbar"],
        "▁": ["\\underbar"],
        "⬄": ["\\hphantom"],
        "⇳": ["\\vphantom"],
        "⬍": ["\\smash"],
        "⬆": ["\\asmash"],
        "⬇": ["\\dsmash"],
        "⬌": ["\\hsmash"],
        "♠": ["\\spadesuit"],
        "♤": ["\\varspadesuit"],
        "♡": ["\\heartsuit"],
        "♥": ["\\varheartsuit"],
        "♢": ["\\diamondsuit"],
        "♦": ["\\vardiamondsuit"],
        "♣": ["\\clubsuit"],
        "♧": ["\\varclubsuit"],
        "⚀": ["\\dicei"],
        "⚁": ["\\diceii"],
        "⚂": ["\\diceiii"],
        "⚃": ["\\diceiv"],
        "⚄": ["\\dicev"],
        "⚅": ["\\dicevi"],
        "♩": ["\\quarternote", "music note", "sung text sign"],
        "♪": ["\\eighthnote"],
        "♫": ["\\twonotes"],
        "♭": ["\\flat"],
        "♮": ["\\natural"],
        "♯": ["\\sharp"],
        "♀": ["\\female"],
        "♂": ["\\male"],
        "⚥": ["\\Hermaphrodite"],
        "⚲": ["\\neuter"],
        "◉": ["\\fisheye"],
        "◘": ["\\inversebullet"],
        "◜": ["\\ularc"],
        "◝": ["\\urarc"],
        "◞": ["\\lrarc"],
        "◟": ["\\llarc"],
        "★": ["\\bigstar", "star, filled"],
        "☆": ["\\bigwhitestar", "star, open"],
        "☉": ["\\astrosun"],
        "☡": ["\\danger", "dangerous bend"],
        "☻": ["\\blacksmiley"],
        "☼": ["\\sun"],
        "☽": ["\\rightmoon"],
        "☾": ["\\leftmoon"],
        "✓": ["\\checkmark", "tick"],
        "✠": ["\\maltese"],
        "✪": ["\\circledstar"],
        "✶": ["\\varstar"],
        "✽": ["\\dingasterisk"],
        "➛": ["\\draftingarrow", "right arrow with bold head"],
        "⤫": ["\\rdiagovfdiag"],
        "⤬": ["\\fdiagovrdiag"],
        "⦙": ["\\fourvdots"],
        "⦚": ["\\vzigzag"],
        "⦺": ["\\obot"],
        "⧉": ["\\boxonbox"],
        "⧠": ["\\laplac"],
        "⧧": ["\\thermod"],
        "⧮": ["\\errbarsquare"],
        "⧯": ["\\errbarblacksquare"],
        "⫱": ["\\topcir"],
        "⭐": ["\\medwhitestar", "white medium star"],
        "⭑": ["\\medblackstar", "black medium star"],
        "⭒": ["\\smwhitestar"],
        "〒": ["\\postalmark"],
        "〰": ["\\hzigzag", "zigzag"],
        "⎛": ["\\lparenuend"],
        "⎜": ["\\lparenextender"],
        "⎝": ["\\lparenlend"],
        "⎡": ["\\lbrackuend"],
        "⎢": ["\\lbrackextender"],
        "⎣": ["\\lbracklend"],
        "⎧": ["\\lbraceuend"],
        "⎨": ["\\lbracemid"],
        "⎪": ["\\vbraceextender"],
        "⎩": ["\\lbracelend"],
        "⎞": ["\\rparenuend"],
        "⎟": ["\\rparenextender"],
        "⎠": ["\\rparenlend"],
        "⎤": ["\\rbrackuend"],
        "⎥": ["\\rbrackextender"],
        "⎦": ["\\rbracklend"],
        "⎫": ["\\rbraceuend"],
        "⎬": ["\\rbracemid"],
        "⎭": ["\\rbracelend"],
        "⎲": ["\\sumtop"],
        "⎳": ["\\sumbottom"],
        "⌠": ["\\inttop"],
        "⎮": ["\\intextender"],
        "⌡": ["\\intbottom"],
        "⎷": ["\\sqrtbottom"],
        "円": ["yen"],
        "元": ["yuan"],
        "圓": ["yuan"],
    };
});
define("layout/vk", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.vkLookup = exports.VKMap = exports.VK = void 0;
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
    exports.VKMap = {
        a: 65,
        b: 66,
        c: 67,
        d: 68,
        e: 69,
        f: 70,
        g: 71,
        h: 72,
        i: 73,
        j: 74,
        k: 75,
        l: 76,
        m: 77,
        n: 78,
        o: 79,
        p: 80,
        q: 81,
        r: 82,
        s: 83,
        t: 84,
        u: 85,
        v: 86,
        w: 87,
        x: 88,
        y: 89,
        z: 90,
        d0: 48,
        d1: 49,
        d2: 50,
        d3: 51,
        d4: 52,
        d5: 53,
        d6: 54,
        d7: 55,
        d8: 56,
        d9: 57,
    };
    const ReverseVkMap = new Map();
    for (const [k, vk] of Object.entries(exports.VKMap)) {
        if (!ReverseVkMap.has(vk))
            ReverseVkMap.set(vk, []);
        ReverseVkMap.get(vk).push(k);
    }
    function vkLookup(vk) {
        return [vk, ...(ReverseVkMap.get(vk) ?? [])];
    }
    exports.vkLookup = vkLookup;
});
define("layout/sc", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExtraSC = exports.SC = void 0;
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
        SC[SC["Extra00"] = 1000] = "Extra00";
        SC[SC["Extra01"] = 1001] = "Extra01";
        SC[SC["Extra02"] = 1002] = "Extra02";
        SC[SC["Extra03"] = 1003] = "Extra03";
        SC[SC["Extra04"] = 1004] = "Extra04";
        SC[SC["Extra05"] = 1005] = "Extra05";
        SC[SC["Extra06"] = 1006] = "Extra06";
        SC[SC["Extra07"] = 1007] = "Extra07";
        SC[SC["Extra08"] = 1008] = "Extra08";
        SC[SC["Extra09"] = 1009] = "Extra09";
        SC[SC["Extra10"] = 1010] = "Extra10";
        SC[SC["Extra11"] = 1011] = "Extra11";
        SC[SC["Extra12"] = 1012] = "Extra12";
        SC[SC["Extra13"] = 1013] = "Extra13";
        SC[SC["Extra14"] = 1014] = "Extra14";
        SC[SC["Extra15"] = 1015] = "Extra15";
        SC[SC["Extra16"] = 1016] = "Extra16";
        SC[SC["Extra17"] = 1017] = "Extra17";
        SC[SC["Extra18"] = 1018] = "Extra18";
        SC[SC["Extra19"] = 1019] = "Extra19";
        SC[SC["Extra20"] = 1020] = "Extra20";
        SC[SC["Extra21"] = 1021] = "Extra21";
        SC[SC["Extra22"] = 1022] = "Extra22";
        SC[SC["Extra23"] = 1023] = "Extra23";
        SC[SC["Extra24"] = 1024] = "Extra24";
        SC[SC["Extra25"] = 1025] = "Extra25";
        SC[SC["Extra26"] = 1026] = "Extra26";
        SC[SC["Extra27"] = 1027] = "Extra27";
        SC[SC["Extra28"] = 1028] = "Extra28";
        SC[SC["Extra29"] = 1029] = "Extra29";
        SC[SC["Extra30"] = 1030] = "Extra30";
        SC[SC["Extra31"] = 1031] = "Extra31";
        SC[SC["Extra32"] = 1032] = "Extra32";
        SC[SC["Extra33"] = 1033] = "Extra33";
        SC[SC["Extra34"] = 1034] = "Extra34";
        SC[SC["Extra35"] = 1035] = "Extra35";
        SC[SC["Extra36"] = 1036] = "Extra36";
        SC[SC["Extra37"] = 1037] = "Extra37";
        SC[SC["Extra38"] = 1038] = "Extra38";
        SC[SC["Extra39"] = 1039] = "Extra39";
        SC[SC["Extra40"] = 1040] = "Extra40";
        SC[SC["Extra41"] = 1041] = "Extra41";
        SC[SC["Extra42"] = 1042] = "Extra42";
        SC[SC["Extra43"] = 1043] = "Extra43";
        SC[SC["Extra44"] = 1044] = "Extra44";
        SC[SC["Extra45"] = 1045] = "Extra45";
        SC[SC["Extra46"] = 1046] = "Extra46";
        SC[SC["Extra47"] = 1047] = "Extra47";
        SC[SC["Extra48"] = 1048] = "Extra48";
        SC[SC["Extra49"] = 1049] = "Extra49";
    })(SC = exports.SC || (exports.SC = {}));
    exports.ExtraSC = [
        1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009,
        1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019,
        1020, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029,
        1030, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039,
        1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049,
    ];
});
define("layout", ["require", "exports", "layout/sc", "helpers"], function (require, exports, sc_1, helpers_1) {
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
        [91]: { vk: 91, name: "Win" },
        ...(0, helpers_1.fromEntries)(sc_1.ExtraSC.map(sc => [sc, { vk: 0, name: '' }])),
    };
    exports.DigitsRow = [
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
    ];
    exports.FirstRow = [
        16,
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
    ];
    exports.SecondRow = [
        30,
        31,
        32,
        33,
        34,
        35,
        36,
        37,
        38,
        39,
        40,
        43,
    ];
    exports.ThirdRow = [
        44,
        45,
        46,
        47,
        48,
        49,
        50,
        51,
        52,
        53,
    ];
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
            42, ...exports.ThirdRow, 1000, 1001
        ],
        free: [...exports.DigitsRow, ...exports.FirstRow, ...exports.SecondRow, ...exports.ThirdRow],
        freeRows: [exports.DigitsRow, exports.FirstRow, exports.SecondRow, exports.ThirdRow],
        cssClass: 'ansi-layout',
    };
    exports.IsoLayout = {
        all: [
            41, ...exports.DigitsRow,
            15, ...exports.FirstRow,
            58, ...exports.SecondRow,
            42, 86, ...exports.ThirdRow, 1000
        ],
        free: [...exports.DigitsRow, ...exports.FirstRow, ...exports.SecondRow, 86, ...exports.ThirdRow],
        freeRows: [exports.DigitsRow, exports.FirstRow, exports.SecondRow, [86, ...exports.ThirdRow]],
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
        byRow: [
            [
                null,
                null,
                [
                    "↕",
                    "⇕",
                ],
                null,
                null,
                {
                    name: "NS Arrows",
                    symbol: "⇅",
                    content: [
                        "↨",
                        "⇅",
                        "⇵",
                        "⥌",
                        "⥍",
                        "⥏",
                        "⥑",
                        "⥮",
                        "⥯",
                    ]
                }
            ],
            [
                [
                    "↖",
                    "⇖",
                ],
                [
                    "↑",
                    "⇑",
                ],
                [
                    "↗",
                    "⇗",
                ],
                {
                    name: "NW Arrows",
                    symbol: "⤣",
                    content: [
                        "↸",
                        "↰",
                        "⤣",
                    ]
                },
                {
                    name: "North Arrows",
                    symbol: "↥",
                    content: [
                        "⇈",
                        "⤉",
                        "⇞",
                        "↟",
                        "↥",
                        "⤒",
                        "⥉",
                        "⇡",
                        "⤊",
                        "⟰",
                        "⇧",
                        "⇪",
                        "↿",
                        "⥘",
                        "⥠",
                        "↾",
                        "⥔",
                        "⥜",
                        "⥣",
                    ]
                },
                {
                    name: "NE Arrows",
                    symbol: "⤤",
                    content: [
                        "↱",
                        "⤤",
                    ]
                }
            ],
            [
                [
                    "←",
                    "⇐",
                ],
                [
                    "↔",
                    "⇔",
                ],
                [
                    "→",
                    "⇒",
                ],
                {
                    name: "West Arrows",
                    symbol: "↫",
                    content: [
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
                        "↫",
                        "⇤",
                        "⇷",
                        "⇺",
                        "⤌",
                        "⤎",
                        "⇠",
                        "⬸",
                        "⇍",
                        "⤂",
                        "⤆",
                        "⟸",
                        "⟽",
                        "⇚",
                        "⭅",
                        "⇦",
                        "↞",
                        "⬴",
                        "⬵",
                        "⬶",
                        "⬷",
                        "⬻",
                        "⬼",
                        "⬽",
                        "↼",
                        "⥒",
                        "⥚",
                        "⥪",
                        "⥢",
                        "↽",
                        "⥖",
                        "⥞",
                        "⥫",
                        "⇽",
                        "⤙",
                        "⤛",
                        "⤝",
                        "⤟",
                    ]
                },
                {
                    name: "EW Arrows",
                    symbol: "⇆",
                    content: [
                        "↮",
                        "⟷",
                        "↭",
                        "⇎",
                        "⤄",
                        "⟺",
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
                    ]
                },
                {
                    name: "East Arrows",
                    symbol: "↬",
                    content: [
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
                        "↬",
                        "⇥",
                        "⇸",
                        "⤀",
                        "⇻",
                        "⤁",
                        "⤍",
                        "⤏",
                        "⇢",
                        "⤑",
                        "⇏",
                        "⤃",
                        "⤇",
                        "⟹",
                        "⟾",
                        "⇛",
                        "⭆",
                        "⥰",
                        "⇨",
                        "⤐",
                        "⤔",
                        "⤕",
                        "⤖",
                        "⤗",
                        "⤘",
                        "⇀",
                        "⥓",
                        "⥛",
                        "⥬",
                        "⥤",
                        "⇁",
                        "⥗",
                        "⥟",
                        "⥭",
                        "⇾",
                        "⤚",
                        "⤜",
                        "⤞",
                        "⤠",
                    ]
                },
            ],
            [
                [
                    "↙",
                    "⇙",
                ],
                [
                    "↓",
                    "⇓",
                ],
                [
                    "↘",
                    "⇘",
                ],
                {
                    name: "SW Arrows",
                    symbol: "⤦",
                    content: [
                        "↲",
                        "⏎",
                        "⤦",
                        "⤶",
                        "⤸",
                        "↵",
                    ]
                },
                {
                    name: "South Arrows",
                    symbol: "↧",
                    content: [
                        "⇊",
                        "⤈",
                        "⇟",
                        "↡",
                        "↧",
                        "⤓",
                        "⇣",
                        "⤋",
                        "⟱",
                        "⇩",
                        "↯",
                        "⇃",
                        "⥙",
                        "⥡",
                        "⇂",
                        "⥕",
                        "⥝",
                        "⥥",
                    ]
                },
                {
                    name: "SE Arrows",
                    symbol: "⤥",
                    content: [
                        "↳",
                        "⤥",
                        "⤷",
                        "⤹",
                        "↴",
                    ]
                }
            ],
        ],
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
                    "⤽",
                    "⤼",
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
            {
                name: "Circular Arrows",
                symbol: "↻",
                content: [
                    "↻",
                    "↺",
                    "⟳",
                    "⟲",
                    "⥀",
                    "⥁",
                    "↶",
                    "↷",
                    "↩",
                    "↪",
                    "⤺",
                    "⤻",
                    "⤾",
                    "⤿",
                ]
            },
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
        noRecent: true,
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
        noRecent: true,
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
        noRecent: true,
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
        noRecent: true,
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
        noRecent: true,
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
        noRecent: true,
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
        noRecent: true,
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
        noRecent: true,
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
        noRecent: true,
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
        noRecent: true,
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
        noRecent: true,
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
        noRecent: true,
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
        noRecent: true,
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
        noRecent: true,
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
        noRecent: true,
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
        noRecent: true,
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
        noRecent: true,
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
        noRecent: true,
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
            "❳",
            "⦗",
            "⦘",
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
            "∑",
            {
                name: "More Sums",
                symbol: "⅀",
                content: [
                    "⅀",
                    "⨊",
                ]
            },
            "∫",
            {
                name: "More Integrals",
                symbol: "∬",
                content: [
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
                ]
            },
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
            "⨝",
            "⟗",
            "⟕",
            "⟖",
            "⨞",
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
            "ℵ",
            "ℶ",
            "∅",
            {
                name: "Var Empty Set",
                symbol: "⦳",
                content: [
                    "⌀",
                    "⦰",
                    "⦱",
                    "⦲",
                    "⦳",
                    "⦴",
                ],
            },
            "∆",
            "∎",
            "∞",
            {
                name: "Var Infinity",
                symbol: "⧞",
                content: [
                    "⧜",
                    "⧝",
                    "⧞",
                    "♾",
                ],
            },
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
            "⏤",
            "⏧",
            "␢",
            "␣",
            "┆",
            "▀",
            "▄",
            "█",
            "▌",
            "▐",
            "░",
            "▒",
            "▓",
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
define("unicodeInterface", ["require", "exports", "builder/consolidated", "builder/builder", "config/fallback"], function (require, exports, consolidated_1, builder_1, fallback_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.requiredOS = exports.emojiGroup = exports.clusterAliases = exports.clusterVariants = exports.clusterName = exports.charInfo = exports.UnicodeData = exports.IgnoreForName = void 0;
    exports.IgnoreForName = [
        8205,
        65039,
    ];
    const u = (0, consolidated_1.getUnicodeData)();
    exports.UnicodeData = u;
    window.u = u;
    function charName(code) {
        if (code >= 19968 && code <= 40956) {
            return `CJK Unified Ideograph ${code.toString(16)}`;
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
    function charAliases(code) {
        const info = charInfo(code);
        return [...info?.falias ?? [], ...info?.alias ?? []];
    }
    function clusterName(cluster) {
        return u.clusters[cluster]?.name ?? clusterFullName(cluster);
    }
    exports.clusterName = clusterName;
    function clusterVariants(cluster) {
        return u.clusters[cluster]?.variants;
    }
    exports.clusterVariants = clusterVariants;
    function clusterAliases(cluster) {
        const cp = (0, builder_1.toCodePoints)(cluster);
        if (cp.length === 1)
            return charAliases(cp[0]);
        return u.clusters[cluster]?.alias ?? [];
    }
    exports.clusterAliases = clusterAliases;
    function emojiGroup(g) {
        return u.groups[g.group]?.sub[g.subGroup]?.clusters ?? [];
    }
    exports.emojiGroup = emojiGroup;
    function requiredOS(cluster) {
        const info = u.clusters[cluster];
        for (const f of fallback_1.IconFallback) {
            if (info && f.version && info.version && info.version >= f.version)
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
define("config/unicodeBoard", ["require", "exports", "unicodeInterface", "builder/consolidated"], function (require, exports, unicodeInterface_1, consolidated_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UnicodeKeyboard = void 0;
    const BlockSymbolOverride = {
        0x2000: "†",
        0x2800: "⠳",
        0xFFF0: "�",
        0x1D100: "𝄞",
        0x1F300: "🌌",
        0x1F900: "🤔",
    };
    function validCode(code) {
        const info = (0, unicodeInterface_1.charInfo)(code);
        if (!info)
            return false;
        return !info.control && !info.reserved && !info.notACharacter;
    }
    exports.UnicodeKeyboard = {
        name: "Unicode Blocks",
        symbol: "∪",
        content: unicodeInterface_1.UnicodeData.blocks.filter(b => b.sub.some(s => s.char?.some(validCode))).map(block => {
            const codes = block.sub.map(sub => sub.char).flat().filter(validCode);
            let symbol = String.fromCodePoint(codes[0]);
            for (const code of codes) {
                const info = (0, unicodeInterface_1.charInfo)(code);
                if (info?.ca?.startsWith("L")) {
                    symbol = String.fromCodePoint(code);
                    break;
                }
            }
            if (BlockSymbolOverride[block.start])
                symbol = BlockSymbolOverride[block.start];
            return {
                name: block.name,
                statusName: `${block.name} ${(0, consolidated_2.toHex)(block.start)}–${(0, consolidated_2.toHex)(block.end)}`,
                symbol,
                content: codes.map(c => String.fromCodePoint(c)),
            };
        })
    };
});
define("config/extendedLatin", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExtendedLatin = void 0;
    const ae = 49;
    const alpha = 50;
    const turnedV = 51;
    const openE = 52;
    const schwa = 53;
    const turnedE = 54;
    const gamma = 55;
    const openO = 56;
    const thorn = 57;
    const yogh = 48;
    const hookV = 190;
    const ezh = 221;
    const stop = 219;
    const below = 189;
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
    };
    const BreveAndCedilla = {
        e: ["ḝ", "Ḝ"],
    };
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
    };
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
    };
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
    const DoubleAcute = {
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
    const Acute = {
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
            [188]: {
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
    };
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
    };
    const Breve = {
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
            [188]: {
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
    const Caron = {
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
            [188]: {
                name: "Caron+",
                symbol: "ṧ",
                content: [
                    DotAboveAndCaron,
                    CaronAndDiaeresis,
                ].flatMap(Object.values)
            }
        }
    };
    const Cedilla = {
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
            [188]: {
                name: "Cedilla+",
                symbol: "ḉ",
                content: [
                    AcuteAndCedilla,
                    BreveAndCedilla,
                ].flatMap(Object.values)
            },
        }
    };
    const Circumflex = {
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
            [188]: {
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
    const Hook = {
        name: "Hook Horn",
        symbol: "ɓ",
        byVK: {
            e: ["e̛", "E̛"],
            o: ["ơ", "Ơ"],
            u: ["ư", "Ư"],
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
            h: ["ⱨ", "Ⱨ"],
            z: ["ⱬ", "Ⱬ"],
            [188]: {
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
            ...Object.values({
                k: ["ⱪ", "Ⱪ"],
                n: ["ꞑ", "Ꞑ"],
            }),
        ]
    };
    const Macron = {
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
            [188]: {
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
    const MacronBelow = {
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
    };
    const Ogonek = {
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
            [188]: {
                name: "Ogonek+",
                symbol: "ǭ",
                content: [
                    MacronAndOgonek,
                ].flatMap(Object.values)
            }
        },
        content: [
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
    const Grave = {
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
            [188]: {
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
    const DotBelow = {
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
            [188]: {
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
    };
    const DotAbove = {
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
            [188]: {
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
    const Ring = {
        name: "Ring",
        symbol: "å",
        byVK: {
            a: ["å", "Å"],
            u: ["ů", "Ů"],
            e: ["e̊", "E̊"],
            o: ["o̊", "O̊"],
            v: ["v̊", "V̊"],
            w: ["ẘ", "W̊"],
            y: ["ẙ", "Y̊"],
            q: ["ḁ", "Ḁ"],
            l: ["l̥", "L̥"],
            m: ["m̥", "M̥"],
            n: ["n̥", "N̥"],
            r: ["r̥", "R̥"],
            [188]: {
                name: "Ring+",
                symbol: "ǻ",
                content: [
                    AcuteAndRingAbove,
                ].flatMap(Object.values)
            },
        },
    };
    const Tilde = {
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
            [188]: {
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
    const Diaeresis = {
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
            [188]: {
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
            ...Object.values({
                h: ["h̤", "H̤"],
                t: ["t̤", "T̤"],
                u: ["ṳ", "Ṳ"],
                w: ["w̤", "W̤"],
            })
        ]
    };
    const Stroke = {
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
            [188]: {
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
    const Comma = {
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
            d: ["d̦", "D̦"],
            s: ["ș", "Ș"],
            t: ["ț", "Ț"],
        },
        content: [
            ...Object.values({
                l: ["l̦", "L̦"],
                m: ["m̦", "M̦"],
                n: ["n̦", "N̦"],
                p: ["p̦", "P̦"],
                r: ["r̦", "R̦"],
                z: ["z̦", "Z̦"],
            })
        ]
    };
    exports.ExtendedLatin = {
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
});
define("config/boards", ["require", "exports", "chars", "config/arrows", "config/math", "unicodeInterface", "config/unicodeBoard", "builder/builder", "config/extendedLatin"], function (require, exports, chars_1, arrows_1, math_1, unicodeInterface_2, unicodeBoard_1, builder_2, extendedLatin_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MAIN_BOARD = exports.isCluster = void 0;
    function unicodeRange(from, to) {
        const result = [];
        const codeFrom = typeof from === 'number' ? from : (0, builder_2.toCodePoints)(from)[0];
        const codeTo = typeof to === 'number' ? to : (0, builder_2.toCodePoints)(to)[0];
        if (codeFrom && codeTo && codeTo > codeFrom) {
            for (let i = codeFrom; i <= codeTo; ++i)
                result.push(String.fromCodePoint(i));
        }
        return result;
    }
    function isCluster(item) {
        return typeof item === 'object' && (item?.hasOwnProperty('cluster') ?? false);
    }
    exports.isCluster = isCluster;
    exports.MAIN_BOARD = {
        name: 'Main Board',
        top: true,
        symbol: '⌨',
        content: [
            {
                name: "Happy",
                symbol: "😀",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Smileys & Emotion", subGroup: "face-smiling" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Smileys & Emotion", subGroup: "face-affection" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Smileys & Emotion", subGroup: "face-tongue" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Smileys & Emotion", subGroup: "face-hand" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Smileys & Emotion", subGroup: "face-neutral-skeptical" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Smileys & Emotion", subGroup: "face-hat" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Smileys & Emotion", subGroup: "face-glasses" }),
                ]
            },
            {
                name: "Unwell",
                symbol: "😱",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Smileys & Emotion", subGroup: "face-sleepy" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Smileys & Emotion", subGroup: "face-unwell" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Smileys & Emotion", subGroup: "face-concerned" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Smileys & Emotion", subGroup: "face-negative" }),
                ]
            },
            {
                name: "Roles",
                symbol: "👻",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Smileys & Emotion", subGroup: "face-costume" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "People & Body", subGroup: "person-fantasy" }),
                ]
            },
            {
                name: "Body",
                symbol: "👍",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "People & Body", subGroup: "hand-fingers-open" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "People & Body", subGroup: "hand-fingers-partial" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "People & Body", subGroup: "hand-single-finger" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "People & Body", subGroup: "hand-fingers-closed" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "People & Body", subGroup: "hands" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "People & Body", subGroup: "hand-prop" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "People & Body", subGroup: "body-parts" }),
                ]
            },
            {
                name: "Gestures & activities",
                symbol: "💃",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "People & Body", subGroup: "person-gesture" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "People & Body", subGroup: "person-activity" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "People & Body", subGroup: "person-resting" }),
                ]
            },
            {
                name: "Persons",
                symbol: "👤",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "People & Body", subGroup: "person" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "People & Body", subGroup: "person-role" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "People & Body", subGroup: "person-symbol" }),
                ]
            },
            {
                name: "Emotions",
                symbol: "😺",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Smileys & Emotion", subGroup: "cat-face" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Smileys & Emotion", subGroup: "monkey-face" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Smileys & Emotion", subGroup: "heart" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Smileys & Emotion", subGroup: "emotion" }),
                ]
            },
            {
                name: "Families",
                symbol: "👪",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "People & Body", subGroup: "family" }),
                ]
            },
            {
                name: "Clothing",
                symbol: "👖",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Objects", subGroup: "clothing" }),
                ]
            },
            {
                name: "Animals",
                symbol: "🐦",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Animals & Nature", subGroup: "animal-mammal" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Animals & Nature", subGroup: "animal-bird" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Animals & Nature", subGroup: "animal-amphibian" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Animals & Nature", subGroup: "animal-reptile" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Animals & Nature", subGroup: "animal-marine" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Animals & Nature", subGroup: "animal-bug" }),
                ]
            },
            {
                name: "Plants",
                symbol: "🌹",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Animals & Nature", subGroup: "plant-flower" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Animals & Nature", subGroup: "plant-other" }),
                ]
            },
            {
                name: "Raw food",
                symbol: "🥝",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Food & Drink", subGroup: "food-fruit" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Food & Drink", subGroup: "food-vegetable" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Food & Drink", subGroup: "food-marine" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Food & Drink", subGroup: "drink" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Food & Drink", subGroup: "dishware" }),
                ]
            },
            {
                name: "Cooked",
                symbol: "🌭",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Food & Drink", subGroup: "food-prepared" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Food & Drink", subGroup: "food-asian" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Food & Drink", subGroup: "food-sweet" }),
                ]
            },
            {
                name: "Places",
                symbol: "🏡",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Travel & Places", subGroup: "place-map" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Travel & Places", subGroup: "place-geographic" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Travel & Places", subGroup: "place-building" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Travel & Places", subGroup: "place-religious" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Travel & Places", subGroup: "place-other" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Travel & Places", subGroup: "hotel" }),
                ]
            },
            {
                name: "Vehicles",
                symbol: "🚗",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Travel & Places", subGroup: "transport-ground" }),
                ]
            },
            {
                name: "Ships",
                symbol: "✈",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Travel & Places", subGroup: "transport-air" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Travel & Places", subGroup: "transport-water" }),
                ]
            },
            {
                name: "Time",
                symbol: "⌛",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Travel & Places", subGroup: "time" })
                ]
            },
            {
                name: "Weather",
                symbol: "⛅",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Travel & Places", subGroup: "sky & weather" })
                ]
            },
            {
                name: "Sports",
                symbol: "🎽",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Activities", subGroup: "sport" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "People & Body", subGroup: "person-sport" })
                ]
            },
            {
                name: "Activities",
                symbol: "🎮",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Activities", subGroup: "event" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Activities", subGroup: "award-medal" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Activities", subGroup: "game" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Activities", subGroup: "arts & crafts" })
                ]
            },
            {
                name: "Sound & light",
                symbol: "🎥",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Objects", subGroup: "sound" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Objects", subGroup: "music" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Objects", subGroup: "musical-instrument" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Objects", subGroup: "light & video" })
                ]
            },
            {
                name: "Tech",
                symbol: "💻",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Objects", subGroup: "phone" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Objects", subGroup: "computer" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Objects", subGroup: "mail" }),
                ]
            },
            {
                name: "Paper & things",
                symbol: "📜",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Objects", subGroup: "book-paper" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Objects", subGroup: "money" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Objects", subGroup: "writing" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Objects", subGroup: "science" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Objects", subGroup: "medical" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Objects", subGroup: "household" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Objects", subGroup: "other-object" }),
                ]
            },
            {
                name: "Work",
                symbol: "💼",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Objects", subGroup: "office" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Objects", subGroup: "lock" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Objects", subGroup: "tool" })
                ]
            },
            {
                name: "Signs",
                symbol: "⛔",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Symbols", subGroup: "transport-sign" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Symbols", subGroup: "warning" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Symbols", subGroup: "zodiac" })
                ]
            },
            {
                name: "Symbols",
                symbol: "⚜",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Symbols", subGroup: "religion" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Symbols", subGroup: "gender" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Symbols", subGroup: "punctuation" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Symbols", subGroup: "currency" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Symbols", subGroup: "other-symbol" })
                ]
            },
            {
                name: "Alphanum",
                symbol: "🔤",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Symbols", subGroup: "alphanum" })
                ]
            },
            {
                name: "Geometric & keys",
                symbol: "🔷",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Symbols", subGroup: "keycap" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Symbols", subGroup: "geometric" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Symbols", subGroup: "av-symbol" })
                ]
            },
            {
                name: "Country Flags",
                symbol: "🌐",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Flags", subGroup: "country-flag" })
                ]
            },
            {
                name: "Flags",
                symbol: "🏁",
                content: [
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Flags", subGroup: "subdivision-flag" }),
                    ...(0, unicodeInterface_2.emojiGroup)({ group: "Flags", subGroup: "flag" })
                ]
            },
            {
                name: "Greek",
                symbol: "π",
                noRecent: true,
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
                    a: ["α", "Α"],
                    b: ["β", "Β"],
                    c: ["ψ", "Ψ"],
                    d: ["δ", "Δ"],
                    e: ["ε", "Ε"],
                    f: ["φ", "Φ"],
                    g: ["γ", "Γ"],
                    h: ["η", "Η"],
                    i: ["ι", "Ι"],
                    j: ["ξ", "Ξ"],
                    k: ["κ", "Κ"],
                    l: ["λ", "Λ"],
                    m: ["μ", "Μ"],
                    n: ["ν", "Ν"],
                    o: ["ο", "Ο"],
                    p: ["π", "Π"],
                    q: ";",
                    r: ["ρ", "Ρ"],
                    s: ["σ", "Σ"],
                    t: ["τ", "Τ"],
                    u: ["θ", "Θ"],
                    v: ["ω", "Ω"],
                    w: "ς",
                    x: ["χ", "Χ"],
                    y: ["υ", "Υ"],
                    z: ["ζ", "Ζ"],
                    [190]: "·",
                }
            },
            {
                name: "Boxes",
                symbol: "╚",
                byRow: [
                    [
                        ["┌", "╔"],
                        ["┬", "╦"],
                        ["┐", "╗"],
                        ["┏"],
                        ["┳"],
                        ["┓"],
                        ["╒", "╓"],
                        ["╤", "╥"],
                        ["╕", "╖"],
                        "╭",
                        "╮",
                        {
                            name: "Dashed",
                            symbol: "┉",
                            byRow: [
                                ["┆", "┇", "┊", "┋", "╎", "╏"],
                                ["┄", "┅", "┈", "┉", "╌", "╍"]
                            ]
                        }
                    ],
                    [
                        ["├", "╠"],
                        ["┼", "╬"],
                        ["┤", "╣"],
                        ["┣"],
                        ["╋"],
                        ["┫"],
                        ["╞", "╟"],
                        ["╪", "╫"],
                        ["╡", "╢"],
                        "╰",
                        "╯",
                        {
                            name: "Mixed Lines",
                            symbol: "╆",
                            content: [
                                "┍", "┎", "┭", "┮",
                                "┯", "┰", "┱", "┲",
                                "┑", "┒",
                                "┝", "┞", "┟", "┠", "┡", "┢",
                                "┽", "┾", "┿", "╀", "╁", "╂", "╃", "╄", "╅", "╆", "╇", "╈", "╉", "╊",
                                "┥", "┦", "┧", "┨", "┩", "┪",
                                "┕", "┖",
                                "┵", "┶", "┷", "┸", "┹", "┺",
                                "┙", "┚",
                                "╽", "╿",
                                "╼", "╾",
                            ]
                        }
                    ],
                    [
                        ["└", "╚"],
                        ["┴", "╩"],
                        ["┘", "╝"],
                        ["┗"],
                        ["┻"],
                        ["┛"],
                        ["╘", "╙"],
                        ["╧", "╨"],
                        ["╛", "╜"],
                        "╱",
                        "╲",
                    ],
                    [
                        ["│", "║"],
                        ["─", "═"],
                        "╳",
                        ["┃"],
                        ["━"],
                        ["╴", "╸"],
                        ["╵", "╹"],
                        ["╷", "╻"],
                        ["╶", "╺"],
                    ]
                ],
            },
            extendedLatin_1.ExtendedLatin,
            arrows_1.ArrowsKeyboard,
            {
                name: `Typo${chars_1.SoftHyphen}graphy`,
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
                    chars_1.ZeroWidthJoiner,
                    "\u205f",
                    "\u3000",
                    chars_1.SoftHyphen,
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
                    "₳",
                    "؋",
                    "฿",
                    "₿",
                    "₵",
                    "¢",
                    "₡",
                    "₢",
                    "$",
                    "₫",
                    "₯",
                    "₠",
                    "€",
                    "ƒ",
                    "₣",
                    "₲",
                    "₴",
                    "₭",
                    "₾",
                    "₤",
                    "₺",
                    "₶",
                    "₼",
                    "ℳ",
                    "₻",
                    "₥",
                    "₦",
                    "₰",
                    "₧",
                    "₱",
                    "£",
                    "﷼",
                    "៛",
                    "₽",
                    "₨",
                    "৳",
                    "૱",
                    "₹",
                    "৲",
                    "௹",
                    "₪",
                    "⃀",
                    "₷",
                    "₸",
                    "₮",
                    "₩",
                    "¥",
                    "円",
                    "元",
                    "圓",
                ]
            },
            math_1.MathKeyboard,
            unicodeBoard_1.UnicodeKeyboard,
        ]
    };
});
define("keys/symbol", ["require", "exports", "preact/hooks", "appVar", "unicodeInterface", "builder/builder", "chars", "helpers", "preact"], function (require, exports, hooks_1, appVar_1, unicodeInterface_3, builder_3, chars_2, helpers_2, preact_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Sprite = exports.Symbol = void 0;
    function Symbol({ symbol }) {
        const os = (0, hooks_1.useContext)(appVar_1.OSContext);
        return (0, hooks_1.useMemo)(() => {
            if (typeof symbol === 'string') {
                if ([...symbol].length == 1) {
                    const info = (0, unicodeInterface_3.charInfo)((0, builder_3.toCodePoints)(symbol)[0]);
                    if (info?.ca === "Zs" || info?.ca === "Cf" || info?.ca === "Cc") {
                        return (0, preact_1.h)("div", { className: "symbol s-space" }, info.n);
                    }
                    else if (info?.ca === "Mn") {
                        symbol = '◌' + symbol;
                    }
                }
                const req = (0, unicodeInterface_3.requiredOS)(symbol);
                const fallbackFont = os.lt(req);
                const textStyle = symbol.endsWith(chars_2.VarSel15);
                return (0, preact_1.h)("div", { className: (0, helpers_2.cl)(`symbol`, { fallbackFont, textStyle }) }, symbol);
            }
            else {
                return (0, preact_1.h)("div", { className: "symbol" },
                    (0, preact_1.h)(Sprite, { symbol: symbol }));
            }
        }, [symbol, os]);
    }
    exports.Symbol = Symbol;
    function Sprite({ symbol }) {
        const plugins = (0, hooks_1.useContext)(appVar_1.PluginsContext);
        for (const plugin of plugins) {
            const spriteMap = plugin.spriteMaps?.[symbol.spriteMap];
            if (spriteMap && spriteMap.index[symbol.sprite]) {
                return (0, preact_1.h)("div", { className: "sprite", style: {
                        backgroundImage: `url("plugins/${spriteMap.path}")`,
                        backgroundSize: `${spriteMap.cols}00%`,
                        backgroundPosition: `${spriteMap.index[symbol.sprite].col / (spriteMap.cols - 1) * 100}% ${spriteMap.index[symbol.sprite].row / (spriteMap.rows - 1) * 100}%`,
                        transform: `scale(--calc(3.6vw / ${spriteMap.height}px))`,
                    } });
            }
        }
        return (0, preact_1.h)(preact_1.Fragment, null, "?");
    }
    exports.Sprite = Sprite;
});
define("keys/base", ["require", "exports", "preact/hooks", "appVar", "preact", "helpers", "keys/symbol"], function (require, exports, hooks_2, appVar_2, preact_2, helpers_3, symbol_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BlankKey = exports.Key = exports.KeyName = void 0;
    function KeyName({ code }) {
        const layout = (0, hooks_2.useContext)(appVar_2.LayoutContext);
        return (0, preact_2.h)(preact_2.Fragment, null, layout.sys[code]?.name ?? '');
    }
    exports.KeyName = KeyName;
    class Key {
        name;
        statusName;
        symbol;
        active;
        blank;
        keyType;
        clickAlwaysAlternate;
        keyNamePrefix;
        constructor(p) {
            this.name = p.name;
            this.statusName = p.statusName ?? p.name;
            this.symbol = p.symbol;
            this.active = p.active ?? false;
            this.clickAlwaysAlternate = p.clickAlwaysAlternate ?? false;
            this.keyNamePrefix = p.keyNamePrefix ?? '';
            this.blank = p.blank ?? false;
            this.keyType = !p.name.length ? "empty" : p.keyType ?? "action";
        }
        Contents = ({ code }) => {
            return (0, preact_2.h)("div", { className: (0, helpers_3.cl)('key', this.keyType, { active: this.active }), onClick: (e) => {
                    e.preventDefault();
                    e.shiftKey || this.clickAlwaysAlternate ? this.actAlternate() : this.act();
                }, onContextMenu: (e) => {
                    e.preventDefault();
                    this.actAlternate();
                }, onMouseOver: () => (0, appVar_2.app)().updateStatus(this.statusName), "data-keycode": code },
                (0, preact_2.h)("div", { className: "keyname" },
                    this.keyNamePrefix,
                    (0, preact_2.h)(KeyName, { code: code })),
                (0, preact_2.h)("div", { className: "name" }, this.name),
                (0, preact_2.h)(symbol_1.Symbol, { symbol: this.symbol }));
        };
        act() {
        }
        actAlternate() {
            this.act();
        }
    }
    exports.Key = Key;
    exports.BlankKey = new Key({ name: '', symbol: '', blank: true, keyType: "empty" });
});
define("boards/utils", ["require", "exports", "preact/hooks", "appVar", "preact", "keys/base"], function (require, exports, hooks_3, appVar_3, preact_3, base_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mapKeysToSlots = exports.Keys = exports.MAX_PAGE_KEYS = void 0;
    exports.MAX_PAGE_KEYS = 9;
    function Keys({ keys }) {
        const l = (0, hooks_3.useContext)(appVar_3.LayoutContext);
        (0, appVar_3.app)().keyHandlers = keys;
        return (0, preact_3.h)("div", { className: "keyboard" }, l.all.map((code) => {
            const K = (keys[code] ?? base_1.BlankKey);
            return (0, preact_3.h)(K.Contents, { code: code, key: code });
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
});
define("config", ["require", "exports", "preact", "layout", "key", "board", "preact/hooks", "appVar", "boards/utils", "keys/base", "ahk"], function (require, exports, preact_4, layout_1, key_1, board_1, hooks_4, appVar_4, utils_1, base_2, ahk_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ConfigBoard = exports.DefaultThemeUrl = exports.ThemesMap = exports.DefaultConfig = exports.DefaultOpacity = exports.Themes = exports.DefaultTheme = void 0;
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
        openAt: "bottom",
        opacity: exports.DefaultOpacity,
        skinTone: 0,
        preferredVariant: {},
        recent: [],
        hideAfterInput: false,
        mainAfterInput: false,
        showAliases: false,
        showCharCodes: false,
    };
    exports.ThemesMap = new Map(exports.Themes.map((t) => [t.name, t]));
    exports.DefaultThemeUrl = exports.ThemesMap.get(exports.DefaultTheme).url;
    const ConfigPages = [
        {
            name: "General",
            symbol: "🛠️",
            keys(config, l) {
                return {
                    [16]: new key_1.ConfigToggleKey({
                        active: config.isoKeyboard,
                        statusName: `ISO layout: ${config.isoKeyboard ? 'on' : 'off'}`,
                        action() {
                            (0, appVar_4.app)().updateConfig({ isoKeyboard: !config.isoKeyboard });
                        }
                    }),
                    [17]: new key_1.ConfigLabelKey((0, preact_4.h)(preact_4.Fragment, null,
                        "ISO layout (",
                        (0, preact_4.h)(base_2.KeyName, { code: 86 }),
                        " between ",
                        (0, preact_4.h)(base_2.KeyName, { code: 42 }),
                        " and ",
                        (0, preact_4.h)(base_2.KeyName, { code: 44 }),
                        ")")),
                    ...(0, utils_1.mapKeysToSlots)(l.freeRows[2], [
                        new key_1.ConfigActionKey({
                            action() {
                                (0, appVar_4.app)().updateConfig({ preferredVariant: {} });
                            },
                            active: !Object.keys(config.preferredVariant).length,
                            name: "Reset Variants",
                            statusName: "Clear variant preferences for all symbols",
                            symbol: "🥷"
                        })
                    ]),
                    ...(0, utils_1.mapKeysToSlots)(l.freeRows[3], [
                        new key_1.ConfigActionKey({
                            name: 'Fallback Fonts',
                            symbol: '🔣',
                            action: () => (0, ahk_1.ahkOpenLink)('https://github.com/gilleswaeber/emoji-keyboard/wiki/Fallback-Fonts'),
                        }),
                        new key_1.ConfigActionKey({
                            name: 'Font Folder',
                            symbol: '📂',
                            action: () => (0, ahk_1.ahkOpenLink)('.\\wwwassets\\fallback_fonts'),
                        }),
                        new key_1.ConfigActionKey({
                            name: 'Plugins',
                            symbol: '🪇',
                            action: () => (0, ahk_1.ahkOpenLink)('https://github.com/gilleswaeber/emoji-keyboard/wiki/Plugins'),
                        }),
                        new key_1.ConfigActionKey({
                            name: 'Plugins Folder',
                            symbol: '📂',
                            action: () => (0, ahk_1.ahkOpenLink)('.\\wwwassets\\plugins'),
                        }),
                    ]),
                };
            }
        },
        {
            name: "Theme",
            symbol: "🎨",
            keys(config) {
                return {
                    ...(0, utils_1.mapKeysToSlots)(layout_1.FirstRow, exports.Themes.map((t) => new key_1.ConfigActionKey({
                        active: config.theme == t.name,
                        name: t.name, statusName: `Theme: ${t.name}`,
                        symbol: t.symbol,
                        action() {
                            (0, appVar_4.app)().updateConfig({ theme: t.name });
                        }
                    }))),
                    ...(0, utils_1.mapKeysToSlots)(layout_1.SecondRow, [
                        ...[
                            ["light", "🌞"],
                            ["dark", "🌚"],
                            ["system", "📟"]
                        ].map(([mode, symbol]) => new key_1.ConfigActionKey({
                            active: config.themeMode == mode,
                            name: mode, symbol: symbol,
                            statusName: `Theme variant: ${mode}`,
                            action() {
                                (0, appVar_4.app)().updateConfig({ themeMode: mode });
                            }
                        }))
                    ])
                };
            }
        },
        {
            name: "Display",
            symbol: "🖥️",
            keys(config, l) {
                return {
                    ...(0, utils_1.mapKeysToSlots)(l.freeRows[1], [
                        new key_1.ConfigActionKey({
                            symbol: "⏬", name: "-10", statusName: 'Opacity -10', action() {
                                (0, appVar_4.app)().updateConfig({ opacity: Math.max(config.opacity - .1, .2) });
                            }
                        }),
                        new key_1.ConfigActionKey({
                            symbol: "🔽", name: "-1", statusName: 'Opacity -1', action() {
                                (0, appVar_4.app)().updateConfig({ opacity: Math.max(config.opacity - .01, .2) });
                            }
                        }),
                        new key_1.ConfigActionKey({
                            symbol: "🔼", name: "+1", statusName: 'Opacity +1', action() {
                                (0, appVar_4.app)().updateConfig({ opacity: Math.min(config.opacity + .01, 1) });
                            }
                        }),
                        new key_1.ConfigActionKey({
                            symbol: "⏫", name: "+10", statusName: 'Opacity +10', action() {
                                (0, appVar_4.app)().updateConfig({ opacity: Math.min(config.opacity + .1, 1) });
                            }
                        }),
                        new key_1.ConfigActionKey({
                            symbol: `${Math.round(config.opacity * 100)}`,
                            name: "reset",
                            statusName: 'Reset opacity',
                            action() {
                                (0, appVar_4.app)().updateConfig({ opacity: exports.DefaultOpacity });
                            }
                        }),
                        new key_1.ConfigLabelKey("Opacity")
                    ]),
                    ...(0, utils_1.mapKeysToSlots)(l.freeRows[2], [
                        ...[
                            ["last position", "🗿", "last-position"],
                            ["bottom", "👇", "bottom"],
                            ["caret (beta)", "⌨️", "text-caret"],
                            ["mouse", "🖱️", "mouse"]
                        ].map(([name, symbol, mode]) => new key_1.ConfigActionKey({
                            active: config.openAt == mode,
                            name, statusName: `Open at ${name}`, symbol,
                            action() {
                                (0, appVar_4.app)().updateConfig({ openAt: mode });
                            }
                        })),
                        new key_1.ConfigLabelKey("Open At")
                    ]),
                    ...(0, utils_1.mapKeysToSlots)(l.freeRows[3], [
                        new key_1.ConfigToggleKey({
                            active: config.hideAfterInput,
                            name: 'Hide', statusName: `Hide after input: ${config.hideAfterInput ? 'on' : 'off'}`,
                            symbol: '🫥',
                            action() {
                                (0, appVar_4.app)().updateConfig({ hideAfterInput: !config.hideAfterInput });
                            }
                        }),
                        new key_1.ConfigToggleKey({
                            active: config.mainAfterInput,
                            name: 'Go Home',
                            symbol: '🏠', statusName: `Go home after input: ${config.hideAfterInput ? 'on' : 'off'}`,
                            action() {
                                (0, appVar_4.app)().updateConfig({ mainAfterInput: !config.mainAfterInput });
                            }
                        }),
                        new key_1.ConfigLabelKey('After Input')
                    ])
                };
            }
        },
        {
            name: "Tools",
            symbol: "🔨",
            keys(config) {
                return {
                    ...(0, utils_1.mapKeysToSlots)(layout_1.FirstRow, [
                        new key_1.ConfigBuildKey(),
                        new key_1.ConfigActionKey({
                            action: ahk_1.ahkReload,
                            name: 'Reload',
                            symbol: '🔄'
                        }),
                    ]),
                    ...(0, utils_1.mapKeysToSlots)(layout_1.SecondRow, [
                        new key_1.ConfigToggleKey({
                            active: config.devTools, statusName: `Open DevTools: ${config.devTools ? 'on' : 'off'}`,
                            action() {
                                (0, appVar_4.app)().updateConfig({ devTools: !config.devTools });
                            }
                        }),
                        new key_1.ConfigLabelKey("Open DevTools")
                    ]),
                };
            }
        },
        {
            name: "Details",
            symbol: "🔬",
            keys(config) {
                return {
                    ...(0, utils_1.mapKeysToSlots)(layout_1.FirstRow, [
                        new key_1.ConfigToggleKey({
                            active: config.showAliases,
                            statusName: `Show aliases in status bar: ${config.showAliases ? 'on' : 'off'}`,
                            action: () => (0, appVar_4.app)().updateConfig({ showAliases: !config.showAliases }),
                            name: 'Aliases',
                            symbol: '📛',
                        }),
                        new key_1.ConfigToggleKey({
                            active: config.showCharCodes,
                            statusName: `Show char codes in status bar: ${config.showCharCodes ? 'on' : 'off'}`,
                            action: () => (0, appVar_4.app)().updateConfig({ showCharCodes: !config.showCharCodes }),
                            name: 'Codes',
                            symbol: '🔢',
                        }),
                        new key_1.ConfigLabelKey('in Status Bar')
                    ]),
                };
            }
        },
        {
            name: "About",
            symbol: "📜",
            keys(config) {
                return {
                    ...(0, utils_1.mapKeysToSlots)(layout_1.FirstRow, [
                        new key_1.ConfigActionKey({
                            action: () => (0, ahk_1.ahkOpenLink)('https://github.com/gilleswaeber/emoji-keyboard'),
                            name: 'GitHub',
                            symbol: '🐙'
                        }),
                        new key_1.ConfigActionKey({
                            action: () => (0, ahk_1.ahkOpenLink)('https://github.com/gilleswaeber/emoji-keyboard/blob/master/LICENSE'),
                            name: 'MIT License',
                            symbol: '⚖️'
                        }),
                        new key_1.ConfigActionKey({
                            action: () => (0, ahk_1.ahkOpenLink)('https://github.com/gilleswaeber/emoji-keyboard#dependencies'),
                            name: 'Deps',
                            statusName: 'Dependencies',
                            symbol: '🪃',
                        }),
                        new key_1.ConfigLabelKey('Emoji Keyboard by Gilles Waeber')
                    ])
                };
            }
        }
    ];
    class ConfigBoard extends board_1.Board {
        constructor() {
            super({ name: '__config', symbol: '🛠️' });
        }
        Contents = ({ state }) => {
            const page = Math.min(state?.page ?? 0, ConfigPages.length - 1);
            const config = (0, hooks_4.useContext)(appVar_4.ConfigContext);
            const l = (0, hooks_4.useContext)(appVar_4.LayoutContext);
            const pageKeys = ConfigPages.map((c, n) => new key_1.PageKey(n, n === page, c.name, c.symbol));
            const keys = {
                [41]: new key_1.ExitSearchKey(),
                ...(0, utils_1.mapKeysToSlots)(layout_1.DigitsRow, pageKeys),
                ...ConfigPages[page].keys(config, l),
            };
            return (0, preact_4.h)(utils_1.Keys, { keys: keys });
        };
    }
    exports.ConfigBoard = ConfigBoard;
});
define("key", ["require", "exports", "preact", "board", "appVar", "helpers", "unicodeInterface", "builder/builder", "preact/hooks", "chars", "keys/base", "keys/symbol", "builder/consolidated"], function (require, exports, preact_5, board_2, appVar_5, helpers_4, unicodeInterface_4, builder_4, hooks_5, chars_3, base_3, symbol_2, consolidated_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExitRecentKey = exports.RecentKey = exports.ClusterKey = exports.ExitSearchKey = exports.SearchKey = exports.PageKey = exports.KeyboardKey = exports.BackKey = exports.ConfigBuildKey = exports.ConfigLabelKey = exports.ConfigToggleKey = exports.ConfigActionKey = exports.ConfigKey = void 0;
    class ConfigKey extends base_3.Key {
        constructor() {
            super({ name: "Settings", symbol: "🛠️" + chars_3.VarSel15, clickAlwaysAlternate: true, keyNamePrefix: "⇧" });
        }
        actAlternate() {
            (0, appVar_5.app)().setMode(2);
        }
    }
    exports.ConfigKey = ConfigKey;
    class ConfigActionKey extends base_3.Key {
        action;
        constructor({ action, ...p }) {
            super(p);
            this.action = action;
        }
        act() {
            this.action();
        }
    }
    exports.ConfigActionKey = ConfigActionKey;
    class ConfigToggleKey extends ConfigActionKey {
        constructor({ active, ...p }) {
            active = active ?? false;
            super({
                name: active ? "On" : "Off",
                symbol: active ? "✔️" : "❌",
                active,
                ...p,
            });
        }
    }
    exports.ConfigToggleKey = ConfigToggleKey;
    class ConfigLabelKey extends base_3.Key {
        text;
        constructor(text) {
            super({ name: "", symbol: "" });
            this.text = text;
        }
        Contents = ({ code }) => {
            return (0, preact_5.h)("div", { className: `key label` },
                (0, preact_5.h)("div", { className: "keyname" },
                    (0, preact_5.h)(base_3.KeyName, { code: code })),
                (0, preact_5.h)("div", { className: "symbol" }, this.text));
        };
    }
    exports.ConfigLabelKey = ConfigLabelKey;
    class ConfigBuildKey extends base_3.Key {
        constructor() {
            super({ name: "Build", symbol: "🏗️" });
        }
        act() {
            (0, builder_4.makeBuild)();
        }
        Contents = ({ code }) => {
            const active = (0, hooks_5.useContext)(appVar_5.ConfigBuildingContext);
            return (0, preact_5.h)("div", { className: (0, helpers_4.cl)('key action', { active }), onClick: (e) => {
                    e.preventDefault();
                    e.shiftKey || this.clickAlwaysAlternate ? this.actAlternate() : this.act();
                }, onContextMenu: (e) => {
                    e.preventDefault();
                    this.actAlternate();
                }, onMouseOver: () => (0, appVar_5.app)().updateStatus(this.name) },
                (0, preact_5.h)("div", { className: "keyname" },
                    (0, preact_5.h)(base_3.KeyName, { code: code })),
                (0, preact_5.h)("div", { className: "name" }, this.name),
                (0, preact_5.h)(symbol_2.Symbol, { symbol: this.symbol }));
        };
    }
    exports.ConfigBuildKey = ConfigBuildKey;
    class BackKey extends base_3.Key {
        constructor() {
            super({ name: 'Back/🛠️', symbol: '←', keyType: "back" });
        }
        act() {
            (0, appVar_5.app)().back();
        }
        actAlternate() {
            (0, appVar_5.app)().setMode(2);
        }
    }
    exports.BackKey = BackKey;
    class KeyboardKey extends base_3.Key {
        target;
        constructor(target) {
            super({ name: target.name, statusName: target.statusName, symbol: target.symbol });
            this.target = target;
        }
        act() {
            (0, appVar_5.app)().setBoard(this.target);
        }
    }
    exports.KeyboardKey = KeyboardKey;
    class PageKey extends base_3.Key {
        page;
        constructor(page, active, name, symbol) {
            super({ name: name ?? `page ${page + 1}`, symbol: symbol ?? '' + (page + 1), active });
            this.page = page;
        }
        act() {
            if (!this.active)
                (0, appVar_5.app)().setPage(this.page);
        }
    }
    exports.PageKey = PageKey;
    class SearchKey extends base_3.Key {
        constructor() {
            super({ name: 'search', symbol: '🔎' + chars_3.VarSel15 });
        }
        act() {
            (0, appVar_5.app)().setMode(1);
        }
    }
    exports.SearchKey = SearchKey;
    class ExitSearchKey extends base_3.Key {
        constructor() {
            super({ name: 'back', symbol: '←' });
        }
        act() {
            (0, appVar_5.app)().setMode(0);
        }
    }
    exports.ExitSearchKey = ExitSearchKey;
    class ClusterKey extends base_3.Key {
        cluster;
        variants;
        variantOf;
        noRecent;
        alt;
        lu;
        upperName;
        constructor(cluster, p) {
            const name = p?.name ?? (0, unicodeInterface_4.clusterName)(cluster);
            const variants = p?.variants ?? (0, unicodeInterface_4.clusterVariants)(cluster);
            super({
                name,
                symbol: p?.symbol ?? cluster,
                keyType: "char",
            });
            this.cluster = cluster;
            this.alt = !!variants && variants.length > 2;
            this.lu = variants?.length === 2;
            this.upperName = variants?.length == 2 ? variants[1] : "";
            this.noRecent = p?.noRecent ?? false;
            this.variants = variants;
            this.variantOf = p?.variantOf;
        }
        act(config) {
            if (this.alt) {
                config ??= (0, appVar_5.app)().getConfig();
                const cluster = config.preferredVariant[this.cluster] ?? this.cluster;
                (0, appVar_5.app)().send(cluster, { noRecent: this.noRecent, variantOf: this.variantOf });
            }
            else {
                (0, appVar_5.app)().send(this.cluster, { noRecent: this.noRecent, variantOf: this.variantOf });
            }
        }
        actAlternate(config) {
            if (this.alt) {
                (0, appVar_5.app)().setBoard(board_2.Board.clusterAlternates(this.cluster, this.variants, { noRecent: this.noRecent }));
            }
            else if (this.lu) {
                (0, appVar_5.app)().send(this.variants[1], { noRecent: this.noRecent });
            }
            else {
                (0, appVar_5.app)().send(this.cluster, { noRecent: this.noRecent });
            }
        }
        Contents = ({ code }) => {
            const config = (0, hooks_5.useContext)(appVar_5.ConfigContext);
            const cluster = this.alt ? config.preferredVariant[this.cluster] ?? this.cluster : this.cluster;
            const symbol = this.alt ? cluster : this.symbol;
            let status = this.alt ? (0, unicodeInterface_4.clusterName)(config.preferredVariant[this.cluster] ?? this.cluster) : this.name;
            if (config.showAliases) {
                const aliases = (0, unicodeInterface_4.clusterAliases)(this.cluster);
                if (aliases.length)
                    status += ` (${aliases.join(', ')})`;
            }
            if (config.showCharCodes) {
                status += ` [${(0, builder_4.toCodePoints)(cluster).map(consolidated_3.toHex).join(' ')}]`;
            }
            return (0, preact_5.h)("div", { className: (0, helpers_4.cl)('key', this.keyType, { alt: this.alt, lu: this.lu, active: this.active }), onClick: (e) => {
                    e.preventDefault();
                    e.shiftKey || this.clickAlwaysAlternate ? this.actAlternate(config) : this.act(config);
                }, onContextMenu: (e) => {
                    e.preventDefault();
                    this.actAlternate(config);
                }, onMouseOver: () => (0, appVar_5.app)().updateStatus(status), "data-keycode": code },
                (0, preact_5.h)("div", { className: "keyname" },
                    this.keyNamePrefix,
                    (0, preact_5.h)(base_3.KeyName, { code: code })),
                (0, preact_5.h)("div", { className: "uname" }, this.upperName),
                (0, preact_5.h)(symbol_2.Symbol, { symbol: symbol }));
        };
    }
    exports.ClusterKey = ClusterKey;
    class RecentKey extends base_3.Key {
        constructor() {
            super({ name: 'Recent', symbol: '↺' });
        }
        act() {
            (0, appVar_5.app)().setMode(3);
        }
    }
    exports.RecentKey = RecentKey;
    class ExitRecentKey extends base_3.Key {
        constructor() {
            super({ name: 'Back', symbol: '←', keyType: "back" });
        }
        act() {
            (0, appVar_5.app)().setMode(0);
        }
    }
    exports.ExitRecentKey = ExitRecentKey;
});
define("board", ["require", "exports", "preact", "preact/hooks", "config/boards", "appVar", "key", "memoize-one", "unicodeInterface", "helpers", "layout/vk", "boards/utils", "keys/base"], function (require, exports, preact_6, hooks_6, boards_1, appVar_6, key_2, memoize_one_1, unicodeInterface_5, helpers_5, vk_1, utils_2, base_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.StaticBoard = exports.Board = exports.getMainBoard = void 0;
    function getMainBoard(plugins) {
        const b = { ...boards_1.MAIN_BOARD };
        for (const p of plugins) {
            if (p.boards) {
                b.content = [...(b.content ?? []), ...p.boards];
            }
        }
        return Board.fromEmoji(b);
    }
    exports.getMainBoard = getMainBoard;
    function range(stop) {
        return Array.from((new Array(stop)).keys());
    }
    class Board {
        constructor(p) {
            this.name = p.name;
            this.statusName = p.statusName ?? p.name;
            this.symbol = p.symbol;
        }
        name;
        statusName;
        symbol;
        static fromKeys({ name, statusName, symbol, keys, top, noRecent, byRow, byVK }) {
            return new StaticBoard({
                name, statusName, symbol, noRecent, keys: (layout) => {
                    let freeKeys = new Set(layout.free);
                    const fixedKeys = {
                        [41]: top ? new key_2.ConfigKey() : new key_2.BackKey(),
                        [15]: new key_2.SearchKey(),
                        [58]: new key_2.RecentKey(),
                    };
                    const notPlaceable = [];
                    if (byRow) {
                        const f = layout.freeRows;
                        for (const [r, row] of byRow.entries()) {
                            for (const [c, key] of row.entries()) {
                                if (key.blank)
                                    continue;
                                if (r < f.length && c < f[r].length && freeKeys.has(f[r][c])) {
                                    fixedKeys[f[r][c]] = key;
                                    freeKeys.delete(f[r][c]);
                                }
                                else {
                                    notPlaceable.push(key);
                                }
                            }
                        }
                    }
                    if (byVK) {
                        const vkPlaced = new Set();
                        for (const sc of freeKeys) {
                            const vk = layout.sys[sc].vk;
                            for (const k of (0, vk_1.vkLookup)(vk)) {
                                if (byVK[k]) {
                                    fixedKeys[sc] = byVK[k];
                                    vkPlaced.add(k.toString());
                                    freeKeys.delete(sc);
                                }
                            }
                        }
                        for (const [k, key] of Object.entries(byVK)) {
                            if (!vkPlaced.has(k))
                                notPlaceable.push(key);
                        }
                    }
                    if (notPlaceable.length)
                        keys.unshift(...notPlaceable);
                    if (keys.length > freeKeys.size) {
                        let pages = 1;
                        while (keys.length > pages * (freeKeys.size - Math.min(pages, utils_2.MAX_PAGE_KEYS))) {
                            pages++;
                        }
                        const pageKeys = Math.min(pages, utils_2.MAX_PAGE_KEYS);
                        const perPage = freeKeys.size - pageKeys;
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
                                            return base_4.BlankKey;
                                    }
                            }))
                                .concat(keys.slice(i * perPage, i * perPage + perPage));
                            return { ...fixedKeys, ...(0, utils_2.mapKeysToSlots)([...freeKeys], page) };
                        });
                    }
                    else {
                        return [{ ...fixedKeys, ...(0, utils_2.mapKeysToSlots)([...freeKeys], keys) }];
                    }
                }
            });
        }
        static fromItem(item, p) {
            if (item === null) {
                return base_4.BlankKey;
            }
            else if (typeof item === 'string') {
                return new key_2.ClusterKey(item, p);
            }
            else if (Array.isArray(item)) {
                if (item.length) {
                    return new key_2.ClusterKey(item[0], { variants: item, ...p });
                }
                return base_4.BlankKey;
            }
            else if ((0, boards_1.isCluster)(item)) {
                return new key_2.ClusterKey(item.cluster, { symbol: item.symbol, name: item.name, noRecent: true });
            }
            else {
                return new key_2.KeyboardKey(Board.fromEmoji(item));
            }
        }
        static fromContents(contents, p) {
            const keys = [];
            for (const item of contents) {
                if (item === null || typeof item === 'string' || Array.isArray(item)) {
                    keys.push(this.fromItem(item, p));
                }
                else {
                    keys.push(this.fromItem(item, p));
                }
            }
            return keys;
        }
        static fromEmoji(k) {
            const p = { noRecent: k.noRecent };
            const keys = this.fromContents(k.content ?? [], p);
            const byRow = (k.byRow ?? []).map(row => row.map(key => this.fromItem(key, p)));
            const byVK = (0, helpers_5.fromEntries)(k.byVK ? Object.entries(k.byVK).map(([k, v]) => [k, this.fromItem(v, p)]) : []);
            return this.fromKeys({
                name: k.name,
                statusName: k.statusName,
                symbol: k.symbol,
                top: k.top,
                noRecent: k.noRecent,
                keys,
                byRow,
                byVK
            });
        }
        static clusterAlternates(cluster, variants, k) {
            const keys = variants.map((c) => new key_2.ClusterKey(c, { variants: [], variantOf: cluster, ...k }));
            if (keys.length == 6) {
                const byRow = [[], [], keys];
                return this.fromKeys({ name: (0, unicodeInterface_5.clusterName)(cluster), symbol: cluster, keys: [], byRow });
            }
            else if (keys.length == 18) {
                const byRow = [[], keys.slice(0, 6), keys.slice(6, 12), keys.slice(12)];
                return this.fromKeys({ name: (0, unicodeInterface_5.clusterName)(cluster), symbol: cluster, keys: [], byRow });
            }
            {
                return this.fromKeys({ name: (0, unicodeInterface_5.clusterName)(cluster), symbol: cluster, keys });
            }
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
            const l = (0, hooks_6.useContext)(appVar_6.LayoutContext);
            const pages = (0, hooks_6.useMemo)(() => this.keys(l), [l]);
            (0, hooks_6.useEffect)(() => (0, appVar_6.app)().updateStatus(), []);
            const keys = pages[state?.page ?? 0] ?? pages[0];
            return (0, preact_6.h)(utils_2.Keys, { keys: keys });
        };
    }
    exports.StaticBoard = StaticBoard;
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
define("emojis", ["require", "exports", "unicodeInterface", "builder/builder", "helpers"], function (require, exports, unicodeInterface_6, builder_5, helpers_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.search = void 0;
    const u = unicodeInterface_6.UnicodeData;
    const ESCAPE_REGEX = new RegExp('(\\' + ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-'].join('|\\') + ')', 'g');
    const SEPARATOR = '%';
    const SEPARATOR_REGEX_G = /%/g;
    const SEARCH_ID = SEPARATOR + '([\\d,]+)' + SEPARATOR + '[^' + SEPARATOR + ']*';
    const index = new Map();
    (function () {
        const endClusters = [];
        for (const c of Object.values(u.clusters)) {
            if (!c.parent) {
                if (c.version)
                    index.set((0, builder_5.toCodePoints)(c.cluster).join(','), `${c.name} ${c.alias?.join(' ') ?? ''}`);
                else
                    endClusters.push(c);
            }
        }
        for (const c of Object.values(u.chars)) {
            if (!c.reserved && !c.notACharacter) {
                index.set(c.code.toString(), `${c.n} ${c.alias?.join(' ') ?? ''} ${c.falias?.join(' ') ?? ''}`);
            }
        }
        for (const c of endClusters) {
            index.set((0, builder_5.toCodePoints)(c.cluster).join(','), `${c.name} ${c.alias?.join(' ') ?? ''}`);
        }
        console.log(index);
    })();
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
        const scores = (0, helpers_6.fromEntries)(result.map(v => [v, 0]));
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
define("searchView", ["require", "exports", "preact", "layout", "board", "emojis", "preact/hooks", "key", "appVar", "boards/utils", "keys/base"], function (require, exports, preact_7, layout_2, board_3, emojis_1, hooks_7, key_3, appVar_7, utils_3, base_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SearchBoard = void 0;
    class SearchBoard extends board_3.Board {
        constructor() {
            super({ name: "Search", symbol: "🔎" });
        }
        Contents() {
            const searchText = (0, hooks_7.useContext)(appVar_7.SearchContext);
            const onInput = (0, hooks_7.useCallback)((e) => (0, appVar_7.app)().setSearchText(e.target.value), []);
            (0, hooks_7.useEffect)(() => document.querySelector('input[type="search"]')?.focus(), []);
            const keys = (0, hooks_7.useMemo)(() => ({
                [41]: new key_3.ExitSearchKey(),
                [15]: new key_3.ExitSearchKey(),
                [58]: new key_3.RecentKey(),
                ...(0, utils_3.mapKeysToSlots)(layout_2.SearchKeyCodes, (0, emojis_1.search)(searchText).slice(0, layout_2.SearchKeyCodes.length).map((c) => new key_3.ClusterKey(c)))
            }), [searchText]);
            (0, appVar_7.app)().keyHandlers = keys;
            return (0, preact_7.h)("div", { class: "keyboard" },
                (0, preact_7.h)("input", { type: "search", value: searchText, onInput: onInput }),
                layout_2.SearchKeyCodesTable.map((code) => {
                    const K = (keys[code] ?? base_5.BlankKey);
                    return (0, preact_7.h)(K.Contents, { code: code, key: code });
                }));
        }
    }
    exports.SearchBoard = SearchBoard;
});
define("recentsActions", ["require", "exports", "appVar"], function (require, exports, appVar_8) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toggleFavorite = exports.removeRecent = exports.increaseRecent = exports.MAX_RECENT_ITEMS = exports.SCORE_DECR = exports.SCORE_INCR = exports.FAVORITE_SCORE = void 0;
    exports.FAVORITE_SCORE = 100;
    exports.SCORE_INCR = 11;
    exports.SCORE_DECR = 1;
    exports.MAX_RECENT_ITEMS = 47;
    function sortRecent(arr) {
        arr.sort((a, b) => b.useCount - a.useCount);
    }
    function increaseRecent(cluster) {
        (0, appVar_8.app)().updateConfig(c => {
            const current = c.recent.find(r => r.symbol == cluster);
            let recent = [
                { symbol: cluster, useCount: Math.min((current?.useCount ?? 0) + exports.SCORE_INCR, 100) },
                ...c.recent.filter(r => r.symbol != cluster).map(r => ({
                    symbol: r.symbol,
                    useCount: r.useCount < exports.FAVORITE_SCORE ? Math.max(r.useCount - exports.SCORE_DECR, 0) : exports.FAVORITE_SCORE,
                }))
            ];
            sortRecent(recent);
            if (recent.length > exports.MAX_RECENT_ITEMS)
                recent = recent.slice(0, exports.MAX_RECENT_ITEMS);
            return { recent };
        }, false);
    }
    exports.increaseRecent = increaseRecent;
    function removeRecent(cluster) {
        (0, appVar_8.app)().updateConfig(c => {
            return { recent: c.recent.filter(r => r.symbol != cluster) };
        });
    }
    exports.removeRecent = removeRecent;
    function toggleFavorite(cluster) {
        (0, appVar_8.app)().updateConfig(c => {
            const r = c.recent.find(r => r.symbol == cluster);
            if (!r)
                return { recent: [{ symbol: cluster, useCount: exports.FAVORITE_SCORE }, ...c.recent] };
            else {
                const rest = c.recent.filter(r => r.symbol != cluster);
                if (r.useCount < exports.FAVORITE_SCORE) {
                    return { recent: [{ symbol: cluster, useCount: exports.FAVORITE_SCORE }, ...rest] };
                }
                else {
                    return {
                        recent: [{
                                symbol: cluster,
                                useCount: exports.FAVORITE_SCORE / 2
                            }, ...rest].sort((a, b) => b.useCount - a.useCount)
                    };
                }
            }
        });
    }
    exports.toggleFavorite = toggleFavorite;
});
define("recentsView", ["require", "exports", "preact/hooks", "appVar", "key", "boards/utils", "preact", "board", "keys/base", "unicodeInterface", "layout", "recentsActions"], function (require, exports, hooks_8, appVar_9, key_4, utils_4, preact_8, board_4, base_6, unicodeInterface_7, layout_3, recentsActions_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RecentSettingsBoard = exports.RecentClusterKey = exports.RecentBoard = void 0;
    class RecentBoard extends board_4.Board {
        constructor() {
            super({ name: "Recent", symbol: "⟲" });
        }
        Contents = () => {
            (0, hooks_8.useEffect)(() => (0, appVar_9.app)().updateStatus(), []);
            const l = (0, hooks_8.useContext)(appVar_9.LayoutContext);
            const recentEmojis = (0, hooks_8.useContext)(appVar_9.ConfigContext).recent;
            const keys = (0, hooks_8.useMemo)(() => ({
                [41]: new key_4.ExitRecentKey(),
                [15]: new key_4.SearchKey(),
                [58]: new key_4.ExitRecentKey(),
                ...(0, utils_4.mapKeysToSlots)(l.free, recentEmojis.map(r => new RecentClusterKey(r.symbol)))
            }), [l, recentEmojis]);
            return (0, preact_8.h)(utils_4.Keys, { keys: keys });
        };
    }
    exports.RecentBoard = RecentBoard;
    function useUseCount(cluster) {
        const recent = (0, hooks_8.useContext)(appVar_9.ConfigContext).recent;
        return (0, hooks_8.useMemo)(() => recent.find(r => r.symbol == cluster)?.useCount ?? 0, [cluster, recent]);
    }
    class RecentClusterKey extends base_6.Key {
        cluster;
        constructor(cluster) {
            const useCount = useUseCount(cluster);
            const name = (0, unicodeInterface_7.clusterName)(cluster);
            super({
                name: `${name}, score: ${useCount >= 100 ? "★" : useCount}`,
                symbol: cluster,
                keyType: "char",
            });
            this.cluster = cluster;
        }
        act() {
            (0, appVar_9.app)().send(this.cluster, { noRecent: true });
        }
        actAlternate() {
            (0, appVar_9.app)().setBoard(new RecentSettingsBoard(this.cluster));
        }
    }
    exports.RecentClusterKey = RecentClusterKey;
    class RecentSettingsBoard extends board_4.Board {
        cluster;
        constructor(cluster) {
            super({
                name: `Settings for ${cluster}`,
                symbol: cluster,
            });
            this.cluster = cluster;
        }
        Contents = () => {
            (0, hooks_8.useEffect)(() => (0, appVar_9.app)().updateStatus(), []);
            const useCount = useUseCount(this.cluster);
            const keys = {
                [41]: new key_4.BackKey(),
                ...(0, utils_4.mapKeysToSlots)(layout_3.DigitsRow, [
                    new key_4.ConfigToggleKey({
                        name: "Favorite",
                        symbol: "⭐",
                        active: useCount >= recentsActions_1.FAVORITE_SCORE,
                        action: () => (0, recentsActions_1.toggleFavorite)(this.cluster)
                    }),
                    new key_4.ConfigActionKey({
                        name: "Remove", symbol: "🗑", action: () => {
                            (0, recentsActions_1.removeRecent)(this.cluster);
                            (0, appVar_9.app)().back();
                        }
                    })
                ]),
                [16]: new key_4.ConfigLabelKey(`Score: ${useCount}, +${recentsActions_1.SCORE_INCR} when used, -${recentsActions_1.SCORE_DECR} when others used`),
                [30]: new key_4.ConfigLabelKey(`Favorite when score ≥ ${recentsActions_1.FAVORITE_SCORE}`),
            };
            return (0, preact_8.h)(utils_4.Keys, { keys: keys });
        };
    }
    exports.RecentSettingsBoard = RecentSettingsBoard;
});
define("app", ["require", "exports", "preact", "layout", "board", "osversion", "ahk", "emojis", "config", "helpers", "appVar", "preact/hooks", "searchView", "recentsView", "recentsActions"], function (require, exports, preact_9, layout_4, board_5, osversion_1, ahk_2, emojis_2, config_1, helpers_7, appVar_10, hooks_9, searchView_1, recentsView_1, recentsActions_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.AppMode = void 0;
    var AppMode;
    (function (AppMode) {
        AppMode[AppMode["MAIN"] = 0] = "MAIN";
        AppMode[AppMode["SEARCH"] = 1] = "SEARCH";
        AppMode[AppMode["SETTINGS"] = 2] = "SETTINGS";
        AppMode[AppMode["RECENTS"] = 3] = "RECENTS";
    })(AppMode = exports.AppMode || (exports.AppMode = {}));
    const AppModes = [0, 1, 2, 3];
    class App extends preact_9.Component {
        keyHandlers = {};
        state = {
            mode: 0,
            searchText: '',
            layout: layout_4.SystemLayoutUS,
            config: { ...config_1.DefaultConfig, opacity: 1 },
            boardState: {},
            os: new osversion_1.Version('99'),
            currentBoard: {
                [0]: (0, board_5.getMainBoard)([]),
                [1]: new searchView_1.SearchBoard(),
                [2]: new config_1.ConfigBoard(),
                [3]: new recentsView_1.RecentBoard(),
            },
            parentBoards: (0, helpers_7.fromEntries)(AppModes.map(m => [m, []])),
            building: false,
            plugins: [],
        };
        constructor(props) {
            super(props);
            (0, appVar_10.setApp)(this);
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
                            this.setConfig(rest).catch(console.error);
                            break;
                        case 'defaultConfig':
                            this.defaultConfig();
                            break;
                        case 'os':
                            this.setOS(rest);
                            break;
                        case 'plugin':
                            this.loadPlugin(rest);
                            break;
                        case 'fonts':
                            this.loadFallbackFonts(rest);
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
            const c = (0, preact_9.h)(Board.Contents, { state: s.boardState[Board.name] });
            const l = (0, hooks_9.useMemo)(() => {
                const base = s.config.isoKeyboard ? layout_4.IsoLayout : layout_4.AnsiLayout;
                return { ...base, sys: s.layout };
            }, [s.config.isoKeyboard, s.layout]);
            return (0, preact_9.h)(appVar_10.LayoutContext.Provider, { value: l },
                (0, preact_9.h)(appVar_10.OSContext.Provider, { value: s.os },
                    (0, preact_9.h)(appVar_10.ConfigContext.Provider, { value: s.config },
                        (0, preact_9.h)(appVar_10.PluginsContext.Provider, { value: s.plugins },
                            (0, preact_9.h)(appVar_10.ConfigBuildingContext.Provider, { value: s.building },
                                (0, preact_9.h)(appVar_10.SearchContext.Provider, { value: s.searchText },
                                    (0, preact_9.h)("div", { className: `root ${s.config.themeMode}-color-scheme ${l.cssClass}` }, c)))))));
        }
        setMode(mode) {
            this.setState((s) => {
                if (s.mode != mode) {
                    if (mode == 1 && !s.parentBoards[1].length)
                        (0, ahk_2.ahkSetSearch)(true);
                    else
                        (0, ahk_2.ahkSetSearch)(false);
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
                case 3:
                    const board = s.currentBoard[s.mode];
                    (0, ahk_2.ahkTitle)('Emoji Keyboard - ' + board.name + (text?.length ? ': ' + text : ''));
                    break;
                case 1:
                    (0, ahk_2.ahkTitle)('Emoji Keyboard - ' + (text?.length ? text : 'Search'));
                    break;
                case 2:
                    (0, ahk_2.ahkTitle)('Emoji Keyboard - ' + (text?.length ? text : 'Settings'));
                    break;
                default:
                    return (0, helpers_7.unreachable)(s.mode);
            }
        }
        input(key, shift = false) {
            const s = this.state;
            switch (s.mode) {
                case 0:
                case 1:
                case 2:
                case 3:
                    var keydiv = document.querySelector('[data-keycode="' + key + '"]');
                    var symboldiv = keydiv?.getElementsByClassName("symbol")[0];
                    symboldiv?.classList.add("keypress");
                    setTimeout(() => {
                        symboldiv?.classList.remove("keypress");
                    }, 100);
                    const k = this.keyHandlers[key];
                    if (k) {
                        if (shift)
                            k.actAlternate();
                        else
                            k.act();
                    }
                    break;
                default:
                    return (0, helpers_7.unreachable)(s.mode);
            }
        }
        async setConfig(config) {
            await this.updateConfig(JSON.parse(config), false);
            (0, ahk_2.ahkReady)();
        }
        defaultConfig() {
            (0, ahk_2.ahkSaveConfig)(this.state.config);
            (0, ahk_2.ahkSetOpacity)(this.state.config.opacity);
            (0, ahk_2.ahkReady)();
        }
        getConfig() {
            return this.state.config;
        }
        updateConfig(config, save = true) {
            return new Promise((resolve) => {
                let noop = false;
                this.setState((s) => {
                    if (typeof config === 'function')
                        config = config(s.config);
                    if (!Object.keys(config).length) {
                        noop = true;
                        return {};
                    }
                    if (config.theme && s.config.theme != config.theme) {
                        const link = document.getElementById('themeCSS');
                        link.href = config_1.ThemesMap.get(config.theme)?.url ?? config_1.DefaultThemeUrl;
                    }
                    if (config.openAt) {
                        (0, ahk_2.ahkSetOpenAt)(config.openAt);
                    }
                    if ((config.x != undefined && config.y != undefined &&
                        config.width != undefined && config.height != undefined)) {
                        (0, ahk_2.ahkSetPosSize)(config.x, config.y, config.width, config.height);
                    }
                    if (config.opacity && s.config.opacity != config.opacity) {
                        (0, ahk_2.ahkSetOpacity)(config.opacity);
                    }
                    if (config.devTools && !s.config.devTools) {
                        (0, ahk_2.ahkOpenDevTools)();
                    }
                    return { config: { ...s.config, ...config } };
                }, () => {
                    if (save && !noop)
                        (0, ahk_2.ahkSaveConfig)(this.state.config);
                    resolve();
                });
            });
        }
        setOS(os) {
            os = os.replace(/^WIN_/, '');
            this.setState({ os: new osversion_1.Version(os) });
        }
        setSystemLayout(layout) {
            this.setState({ layout: { ...layout_4.SystemLayoutUS, ...layout } });
        }
        setSearchText(searchText) {
            this.setState({ searchText }, () => this.updateStatus());
        }
        setBoard(board) {
            this.setState((s) => {
                if (s.mode == 1)
                    (0, ahk_2.ahkSetSearch)(false);
                return {
                    currentBoard: { ...s.currentBoard, [s.mode]: board },
                    parentBoards: { ...s.parentBoards, [s.mode]: [s.currentBoard[s.mode], ...s.parentBoards[s.mode]] },
                };
            }, () => this.updateStatus());
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
                    if (s.mode == 1)
                        (0, ahk_2.ahkSetSearch)(s.parentBoards[s.mode].length == 1);
                    const [board, ...parents] = s.parentBoards[s.mode];
                    return {
                        parentBoards: { ...s.parentBoards, [s.mode]: parents },
                        currentBoard: { ...s.currentBoard, [s.mode]: board },
                    };
                }
                return {};
            });
        }
        main() {
            this.setState(s => ({
                mode: 0,
                currentBoard: {
                    ...s.currentBoard,
                    [0]: s.parentBoards[0][s.parentBoards[0].length - 1] ?? s.currentBoard[0]
                },
                parentBoards: {
                    ...s.parentBoards,
                    [0]: []
                }
            }));
        }
        send(cluster, { noRecent, variantOf }) {
            (0, ahk_2.ahkSend)(cluster);
            if (!noRecent)
                (0, recentsActions_2.increaseRecent)(cluster);
            if (variantOf)
                (0, appVar_10.app)().updateConfig(c => {
                    if (c.preferredVariant[variantOf] != cluster)
                        return {
                            preferredVariant: {
                                ...c.preferredVariant,
                                [variantOf]: cluster
                            }
                        };
                    else
                        return {};
                });
            if (this.state.config.hideAfterInput)
                (0, ahk_2.ahkHide)();
            if (this.state.config.mainAfterInput) {
                if (this.state.mode == 3 || this.state.mode == 0)
                    this.main();
            }
        }
        loadPlugin(rest) {
            const name = rest.split('\n', 1)[0];
            const contents = rest.slice(name.length + 1);
            const data = JSON.parse(contents);
            this.setState((s) => {
                const plugins = [...s.plugins, data];
                const mainBoard = (0, board_5.getMainBoard)(plugins);
                return {
                    plugins,
                    currentBoard: {
                        ...s.currentBoard,
                        [0]: mainBoard,
                    },
                    parentBoards: {
                        ...s.parentBoards,
                        [0]: [],
                    }
                };
            });
        }
        loadFallbackFonts(rest) {
            const fonts = rest.split('\n')
                .filter(f => f.length && f.match(/.*\.(otf|ttf|woff2?|eot|svg)$/i));
            const usedNames = new Set();
            const faces = fonts.map(f => {
                let fontName = f.replace(/.*[\\\/]([^\\\/]+)$/, '$1').replace(/[^a-z0-9]/ig, '_');
                if (usedNames.has(fontName)) {
                    let i = 1;
                    while (usedNames.has(fontName + i))
                        i++;
                    fontName = fontName + i;
                }
                usedNames.add(fontName);
                return `@font-face {
	font-family: "${fontName}";
	src: url("${f.replace(/([\\"])/g, '\\$1')}");
}`;
            });
            const fFonts = [...usedNames].map(f => `${f}, `).join('');
            const style = document.createElement('style');
            style.textContent = faces.join('\n\n') + `
:root {
	--f-fallback: ${fFonts} 'Cambria Math', Tahoma, Geneva, Verdana, sans-serif;
}`;
            document.head.appendChild(style);
            console.log(style);
        }
    }
    const main = document.querySelector('main');
    preact_9.options.debounceRendering = f => setTimeout(f, 0);
    (0, preact_9.render)((0, preact_9.h)(App, null), main);
    setTimeout(() => (0, ahk_2.ahkLoaded)(), 0);
});
define("appVar", ["require", "exports", "preact", "layout", "osversion"], function (require, exports, preact_10, layout_5, osversion_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PluginsContext = exports.SearchContext = exports.ConfigBuildingContext = exports.ConfigContext = exports.OSContext = exports.LayoutContext = exports.app = exports.setApp = void 0;
    let appVar;
    function setApp(app) {
        appVar = app;
    }
    exports.setApp = setApp;
    function app() {
        return appVar;
    }
    exports.app = app;
    exports.LayoutContext = (0, preact_10.createContext)({ ...layout_5.AnsiLayout, sys: layout_5.SystemLayoutUS });
    exports.OSContext = (0, preact_10.createContext)(new osversion_2.Version('99'));
    exports.ConfigContext = (0, preact_10.createContext)(undefined);
    exports.ConfigBuildingContext = (0, preact_10.createContext)(true);
    exports.SearchContext = (0, preact_10.createContext)('');
    exports.PluginsContext = (0, preact_10.createContext)([]);
});
define("builder/builder", ["require", "exports", "builder/unicode", "builder/consolidated", "ahk", "appVar"], function (require, exports, unicode_1, consolidated_4, ahk_3, appVar_11) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.makeBuild = exports.toCodePoints = void 0;
    function toCodePoints(s) {
        return [...s].map(c => c.codePointAt(0));
    }
    exports.toCodePoints = toCodePoints;
    let building = false;
    async function makeBuild() {
        if (building)
            return;
        try {
            (0, appVar_11.app)().setBuilding(true);
            building = true;
            await build();
        }
        catch (e) {
            console.error(e);
            alert(`Build failed: ${e}`);
        }
        finally {
            (0, appVar_11.app)().setBuilding(false);
            building = false;
        }
    }
    exports.makeBuild = makeBuild;
    async function build() {
        await (0, ahk_3.ahkDownloadUnicode)();
        const paths = {
            emojiTestPath: '../res/data/emoji/15.0/emoji-test.txt',
            emojiDataPath: '../res/data/15.0.0/ucd/emoji/emoji-data.txt',
            unicodeDataPath: '../res/data/15.0.0/ucd/UnicodeData.txt',
            namedSequencesPath: '../res/data/15.0.0/ucd/NamedSequences.txt',
            namesListPath: '../res/data/15.0.0/ucd/NamesList.txt',
            annotationsPath: '../res/data/cldr-json/42.0.0/cldr-json/cldr-annotations-full/annotations/en/annotations.json',
        };
        const ctx = {
            unicodeData: await (0, unicode_1.parseUnicodeData)(paths),
            emojiVersion: await (0, unicode_1.parseEmojiVersions)(paths.emojiDataPath),
            emojiTest: await (0, unicode_1.parseEmojiTest)(paths),
            namedSequences: await (0, unicode_1.parseNamedSequences)(paths),
            namesList: await (0, unicode_1.parseNamesList)(paths),
            annotations: await (0, unicode_1.parseAnnotations)(paths),
        };
        const u = (0, consolidated_4.consolidateUnicodeData)(ctx);
        console.log(u);
        (0, ahk_3.ahkSaveUnicodeData)(u);
        const emojiCount = u.groups.map(g => g.sub.reduce((v, s) => v + (s.clusters?.length ?? 0), 0)).reduce((a, b) => a + b, 0);
        alert(`Finished building “${u.name}”\n` +
            ` – ${u.chars.length} codepoints in ${u.blocks.length} blocks\n` +
            ` – ${u.clusters.length} grapheme clusters with length > 1\n` +
            ` – ${u.groups.length} emoji groups with ${emojiCount} base emojis\n\n` +
            `Reload the app to load the new data file`);
    }
});
define("builder/consolidated", ["require", "exports", "builder/titleCase", "chars", "config/aliases", "builder/builder"], function (require, exports, titleCase_1, chars_4, aliases_1, builder_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getUnicodeData = exports.consolidateUnicodeData = exports.toHex = void 0;
    const ExcludeStem = new Set(["keycap", "flag", "family"]);
    function toHex(code) {
        return code.toString(16).toUpperCase().padStart(4, '0');
    }
    exports.toHex = toHex;
    function consolidateUnicodeData({ annotations, namedSequences, namesList, unicodeData, emojiVersion, emojiTest }) {
        const blocks = [];
        const chars = [];
        const groups = [];
        const clusters = [];
        const knownClusters = new Set();
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
                            knownClusters.add(cluster);
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
                            knownClusters.add(cluster);
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
        const clustersByName = new Map(Object.values(clusters).map(c => [c.name, c]));
        for (const c of Object.values(clusters)) {
            if (!c.parent) {
                let variants = [];
                if (c.name.match(/^People /) && !c.name.match(/ Holding Hands$/)) {
                    const baseName = c.name.replace(/^People /, '');
                    variants = [
                        `Men ${baseName}`,
                        `Women ${baseName}`,
                    ];
                }
                else if (c.name.match(/ (?:Man|Woman|Person)$/) && !c.name.match(/^Old/)) {
                    const baseName = c.name.replace(/ (?:Man|Woman|Person)$/, '');
                    variants = [
                        `${baseName} Person`,
                        `${baseName} Man`,
                        `${baseName} Woman`,
                    ];
                }
                else if (c.name == 'Merperson') {
                    const baseName = c.name.replace(/person$/, '');
                    variants = [
                        `${baseName}man`,
                        `${baseName}maid`,
                    ];
                }
                else if (c.name == 'Person With Crown') {
                    variants = [
                        `Prince`,
                        `Princess`,
                    ];
                }
                else {
                    const baseName = c.name.replace(/^Person /, '');
                    variants = [
                        `Man ${baseName}`,
                        `Woman ${baseName}`,
                    ];
                }
                for (const v of variants) {
                    if (v != c.name && clustersByName.has(v)) {
                        const sc = clustersByName.get(v);
                        if (!sc.parent) {
                            sc.parent = c.cluster;
                            if (!c.variants)
                                c.variants = [c.cluster];
                            if (sc.variants) {
                                c.variants.push(...sc.variants);
                                delete sc.variants;
                            }
                            else
                                c.variants.push(sc.cluster);
                            if (sc.alias) {
                                c.alias ??= [];
                                for (const a in sc.alias)
                                    if (!c.alias.includes(a))
                                        c.alias.push(a);
                                delete sc.alias;
                            }
                        }
                    }
                }
            }
        }
        clusters["👩"].variants?.sort((a, b) => +clusters[a].name.includes('Beard') - +clusters[b].name.includes('Beard'));
        for (const group of u.groups) {
            const g = { ...group, sub: {} };
            groups[group.name] = g;
            for (const sub of group.sub) {
                const s = { ...sub, group: new WeakRef(g) };
                g.sub[sub.name] = s;
                s.clusters = s.clusters.filter(c => !clusters[c] || !clusters[c].parent);
                for (const cluster of s.clusters) {
                    if (!clusters[cluster])
                        continue;
                    clusters[cluster].group = g;
                    clusters[cluster].subGroup = s;
                }
            }
        }
        for (const c of ["👨‍👩‍👦", "👨‍👩‍👧", "👨‍👩‍👧‍👦", "👨‍👩‍👦‍👦", "👨‍👩‍👧‍👧", "👨‍👨‍👦", "👨‍👨‍👧", "👨‍👨‍👧‍👦", "👨‍👨‍👦‍👦", "👨‍👨‍👧‍👧", "👩‍👩‍👦", "👩‍👩‍👧", "👩‍👩‍👧‍👦", "👩‍👩‍👦‍👦", "👩‍👩‍👧‍👧", "👨‍👦", "👨‍👦‍👦", "👨‍👧", "👨‍👧‍👦", "👨‍👧‍👧", "👩‍👦", "👩‍👦‍👦", "👩‍👧", "👩‍👧‍👦", "👩‍👧‍👧"]) {
            if (clusters[c] && !clusters[c].variants) {
                const parts = c.split(chars_4.ZeroWidthJoiner);
                for (let i = 1; i < parts.length; ++i)
                    parts[i] = chars_4.ZeroWidthJoiner + parts[i];
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
        for (const [k, v] of Object.entries(aliases_1.EXTEND_ALIASES)) {
            const code = (0, builder_6.toCodePoints)(k);
            if (code.length == 1) {
                const info = chars[code[0]];
                if (info) {
                    info.alias ??= [];
                    info.alias.push(...v);
                }
            }
            else {
                const info = clusters[k];
                if (info) {
                    info.alias ??= [];
                    info.alias.push(...v);
                }
            }
        }
        return { blocks, chars, groups, clusters };
    }
    exports.getUnicodeData = getUnicodeData;
});
define("ahk", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ahkOpenLink = exports.ahkOpenDevTools = exports.ahkSetOpacity = exports.ahkSetOpenAt = exports.ahkSetPosSize = exports.ahkSaveUnicodeData = exports.ahkSaveConfig = exports.ahkSetSearch = exports.ahkSend = exports.ahkReload = exports.ahkReady = exports.ahkLoaded = exports.ahkTitle = exports.ahkHide = exports.ahkDownloadUnicode = void 0;
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
            return p;
        }
        else
            console.log("DownloadUnicode");
    }
    exports.ahkDownloadUnicode = ahkDownloadUnicode;
    function ahkHide() {
        if (isAHK())
            AHK.hide();
        else
            console.log("Hide");
    }
    exports.ahkHide = ahkHide;
    function ahkTitle(title) {
        if (isAHK())
            AHK.setTitle(title);
        else
            document.title = title;
    }
    exports.ahkTitle = ahkTitle;
    function ahkLoaded() {
        if (isAHK())
            AHK.loaded();
        else
            console.log("Loaded");
    }
    exports.ahkLoaded = ahkLoaded;
    function ahkReady() {
        if (isAHK())
            AHK.ready();
        else
            console.log("Ready");
    }
    exports.ahkReady = ahkReady;
    function ahkReload() {
        if (isAHK())
            AHK.reload();
        else
            document.location.reload();
    }
    exports.ahkReload = ahkReload;
    function ahkSend(text) {
        if (isAHK())
            AHK.send(text);
        else
            console.log("Send", text);
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
            AHK.saveConfig(JSON.stringify(config, null, 4));
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
    function ahkOpenLink(url) {
        if (isAHK())
            AHK.openLink(url);
        else
            window.open(url);
    }
    exports.ahkOpenLink = ahkOpenLink;
});
define("utils/compare", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.naturalCompare = void 0;
    function naturalCompare(a, b) {
        if (!a || !b)
            return +!!a - +!!b;
        const aParts = a.match(/[0-9]+|[^0-9]+/g);
        const bParts = b.match(/[0-9]+|[^0-9]+/g);
        for (const i of aParts.keys()) {
            if (bParts.length <= i)
                return 1;
            const aText = !/^[0-9]/.test(aParts[i]);
            const bText = !/^[0-9]/.test(bParts[i]);
            if (aText !== bText)
                return +aText - +bText;
            if (aText) {
                const cmp = aParts[i].localeCompare(bParts[i]);
                if (cmp !== 0)
                    return cmp;
            }
            else {
                const cmp = parseInt(aParts[i], 10) - parseInt(bParts[i], 10);
                if (cmp !== 0)
                    return cmp;
            }
        }
        return -1;
    }
    exports.naturalCompare = naturalCompare;
});
//# sourceMappingURL=script.js.map